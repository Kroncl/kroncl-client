'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authLinks } from '@/config/links.config';
import { accountAuth } from '../api';
import { AuthStorage } from '../storage';
import { Account } from '../../types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
    user: Account | null;
    status: AuthStatus;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithKey: (key: string) => Promise<boolean>;
    register: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>;
    confirmEmail: (code: string) => Promise<boolean>;
    resendConfirmation: (email: string) => Promise<boolean>;
    logout: () => Promise<void>;
    logoutLocal: () => void;
    refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ACCESS_TOKEN_COOKIE = 'auth_access_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<Account | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');

    const setAccessTokenCookie = (token: string, expiresAt: string) => {
        if (typeof window === 'undefined') return;
        try {
            const expires = new Date(expiresAt).getTime();
            const now = Date.now();
            const maxAge = Math.floor((expires - now) / 1000);
            if (maxAge > 0) {
                document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
            }
        } catch {}
    };

    const clearAccessTokenCookie = () => {
        if (typeof window === 'undefined') return;
        document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0`;
    };

    const refreshAuth = useCallback(async (): Promise<boolean> => {
        const refreshResult = await accountAuth.refreshTokens();
        if (refreshResult?.status && refreshResult.data) {
            const userData = AuthStorage.getUser();
            if (userData) {
                setUser(userData);
                setStatus('authenticated');
                if (refreshResult.data.access_token && refreshResult.data.expires_at) {
                    setAccessTokenCookie(refreshResult.data.access_token, refreshResult.data.expires_at);
                }
                return true;
            }
        }
        setStatus('unauthenticated');
        return false;
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const restored = await accountAuth.tryRestoreAuth();
                const userData = AuthStorage.getUser();
                
                if (restored && userData) {
                    setUser(userData);
                    
                    const accessToken = AuthStorage.getAccessToken();
                    const expiresAt = AuthStorage.getExpiresAt();
                    if (accessToken && expiresAt) {
                        setAccessTokenCookie(accessToken, expiresAt);
                    }
                    
                    if (userData.status === 'waiting') {
                        setStatus('unauthenticated');
                    } else {
                        setStatus('authenticated');
                    }
                } else {
                    setStatus('unauthenticated');
                }
            } catch {
                setStatus('unauthenticated');
            }
        };

        initAuth();
    }, []);

    useEffect(() => {
        if (status !== 'authenticated') return;

        const checkAndRefresh = async () => {
            if (AuthStorage.isTokenExpired()) {
                await refreshAuth();
            }
        };

        const interval = setInterval(checkAndRefresh, 60 * 1000);
        return () => clearInterval(interval);
    }, [status, refreshAuth]);

    const login = async (email: string, password: string): Promise<boolean> => {
        setStatus('loading');
        try {
            const response = await accountAuth.login({ email, password });
            
            if (response.status && response.data) {
                setUser(response.data.user);
                setStatus('authenticated');
                setAccessTokenCookie(response.data.access_token, response.data.expires_at);
                return true;
            }
            
            setStatus('unauthenticated');
            return false;
        } catch {
            setStatus('unauthenticated');
            return false;
        }
    };

    const loginWithKey = async (key: string): Promise<boolean> => {
        try {
            const response = await accountAuth.loginWithKey(key);
            
            if (response.status && response.data) {
                setUser(response.data.user);
                setStatus('authenticated');
                setAccessTokenCookie(response.data.access_token, response.data.expires_at);
                return true;
            }
            
            setStatus('unauthenticated');
            return false;
        } catch {
            setStatus('unauthenticated');
            return false;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setStatus('loading');
        
        const response = await accountAuth.register({ email, password, name });
        
        if (response.status && response.data) {
            const userData = AuthStorage.getUser();
            if (userData) {
                setUser(userData);
            }
            
            setStatus('unauthenticated');
            
            setAccessTokenCookie(response.data.access_token, response.data.expires_at);
            
            return {
                success: true,
                message: response.data.email_sent 
                    ? 'Код подтверждения отправлен на вашу почту' 
                    : 'Регистрация успешна'
            };
        } else {
            setStatus('unauthenticated');
            
            const errorTranslations: Record<string, string> = {
                'email already exists': 'Этот email уже используется',
                'invalid email': 'Неверный формат email',
                'password too weak': 'Пароль слишком лёгкий',
            };
            
            const message = response.message || 'Ошибка при регистрации';
            
            return {
                success: false,
                message: errorTranslations[message] || message
            };
        }
    };

    const confirmEmail = async (code: string): Promise<boolean> => {
        try {
            const userData = AuthStorage.getUser();
            if (!userData?.id) return false;
            
            const response = await accountAuth.confirmEmail({ 
                user_id: userData.id, 
                code 
            });
            
            if (response.status) {
                const profileResponse = await accountAuth.getProfile();
                if (profileResponse.status && profileResponse.data) {
                    setUser(profileResponse.data);
                    setStatus('authenticated');
                }
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const resendConfirmation = async (email: string): Promise<boolean> => {
        try {
            const userData = AuthStorage.getUser();
            if (!userData?.id) return false;
            
            const response = await accountAuth.resendConfirmation({ 
                user_id: userData.id,
                email 
            });
            return response.status === true;
        } catch {
            return false;
        }
    };

    const logout = async (localOnly = false) => {
        try {
            if (!localOnly) {
                await accountAuth.logout();
            } else {
                accountAuth.logoutLocal();
            }
        } catch {
            accountAuth.logoutLocal();
        } finally {
            AuthStorage.clear();
            accountAuth.clearToken();
            clearAccessTokenCookie();
            setUser(null);
            setStatus('unauthenticated');
            router.push(authLinks.login);
        }
    };

    const value = {
        user,
        status,
        login,
        register,
        confirmEmail,
        resendConfirmation,
        logout: () => logout(false),
        logoutLocal: () => logout(true),
        loginWithKey,
        refreshAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}