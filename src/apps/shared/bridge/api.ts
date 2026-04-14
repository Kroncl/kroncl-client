import { ApiResponse, RequestOptions } from './types';

const ACCESS_TOKEN_COOKIE = 'auth_access_token';

class ApiBridge {
    private baseUrl: string;
    private refreshInProgress = false;
    private refreshPromise: Promise<boolean> | null = null;
    
    private requestCache = new Map<string, {
        promise: Promise<ApiResponse<any>>;
        timestamp: number;
    }>();
    private cacheTTL = 1000;
    
    private debounceTimers = new Map<string, NodeJS.Timeout>();

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    setToken(token: string | null): void {}

    private setAccessTokenCookie(token: string, expiresAt: string): void {
        if (typeof window === 'undefined') return;
        try {
            const expires = new Date(expiresAt).getTime();
            const now = Date.now();
            const maxAge = Math.floor((expires - now) / 1000);
            if (maxAge > 0) {
                document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
            }
        } catch {}
    }

    private clearAccessTokenCookie(): void {
        if (typeof window === 'undefined') return;
        document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0`;
    }

    private async handleTokenRefresh(): Promise<boolean> {
        if (this.refreshInProgress && this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshInProgress = true;
        this.refreshPromise = (async () => {
            try {
                const response = await this.makeRequest<any>(
                    '/account/refresh',
                    { method: 'POST', credentials: 'include' },
                    0,
                    true
                );
                
                if (response.status && response.data?.access_token) {
                    if (typeof window !== 'undefined') {
                        const expiresAt = response.data.expires_at;
                        const user = JSON.parse(localStorage.getItem('auth_user_data') || 'null');
                        
                        localStorage.setItem('auth_access_token', response.data.access_token);
                        if (expiresAt) {
                            localStorage.setItem('auth_expires_at', expiresAt);
                        }
                        if (user) {
                            localStorage.setItem('auth_user_data', JSON.stringify(user));
                        }
                        
                        this.setAccessTokenCookie(response.data.access_token, expiresAt);
                    }
                    
                    return true;
                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_access_token');
                        localStorage.removeItem('auth_expires_at');
                        localStorage.removeItem('auth_user_data');
                        this.clearAccessTokenCookie();
                        
                        if (window.location.pathname.includes('/platform')) {
                            window.location.href = '/sso/sign_in';
                        }
                    }
                    return false;
                }
            } catch {
                return false;
            } finally {
                this.refreshInProgress = false;
                this.refreshPromise = null;
            }
        })();

        return this.refreshPromise;
    }

    private generateRequestKey(endpoint: string, options: RequestOptions): string {
        const { method = 'GET', params, body } = options;
        
        let key = `${method}:${endpoint}`;
        
        if (params) {
            const sortedParams = Object.keys(params)
                .sort()
                .map(k => `${k}=${params[k]}`)
                .join('&');
            key += `?${sortedParams}`;
        }
        
        if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            try {
                const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
                key += `:body=${bodyStr.length}`;
            } catch {}
        }
        
        return key;
    }

    private async debouncedRequest<T>(
        endpoint: string,
        options: RequestOptions = {},
        retryCount = 0
    ): Promise<ApiResponse<T>> {
        const requestKey = this.generateRequestKey(endpoint, options);
        
        const cached = this.requestCache.get(requestKey);
        const now = Date.now();
        
        if (cached && (now - cached.timestamp) < this.cacheTTL) {
            return cached.promise as Promise<ApiResponse<T>>;
        }
        
        const requestPromise = this.makeRequest<T>(endpoint, options, retryCount, false);
        
        this.requestCache.set(requestKey, {
            promise: requestPromise,
            timestamp: now
        });
        
        this.cleanupCache();
        
        return requestPromise;
    }

    private cleanupCache(): void {
        const now = Date.now();
        for (const [key, value] of this.requestCache.entries()) {
            if (now - value.timestamp > this.cacheTTL * 10) {
                this.requestCache.delete(key);
            }
        }
    }

    private async makeRequest<T>(
        endpoint: string,
        options: RequestOptions = {},
        retryCount = 0,
        skipAuth = false
    ): Promise<ApiResponse<T>> {
        const { params, headers, credentials, ...fetchOptions } = options;
        const maxRetries = 1;

        let url = `${this.baseUrl}${endpoint}`;
        
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }

        const authToken = !skipAuth && typeof window !== 'undefined' 
            ? localStorage.getItem('auth_access_token')
            : null;
            
        const defaultHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
            ...headers,
        };

        try {
            const response = await fetch(url, {
                ...fetchOptions,
                headers: defaultHeaders,
                credentials: credentials || 'same-origin',
            });

            const contentType = response.headers.get('content-type');
            const hasJson = contentType && contentType.includes('application/json');

            let jsonResponse: ApiResponse<T> | null = null;
            if (hasJson) {
                try {
                    jsonResponse = await response.json();
                } catch {}
            }

            if (response.status === 401 && !skipAuth) {
                const isAuthEndpoint = endpoint.includes('/account/auth') || 
                                    endpoint.includes('/account/reg') ||
                                    endpoint.includes('/account/refresh');
                
                if (!isAuthEndpoint && retryCount < maxRetries) {
                    const refreshSuccess = await this.handleTokenRefresh();
                    
                    if (refreshSuccess) {
                        return this.makeRequest<T>(endpoint, options, retryCount + 1, false);
                    } else {
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('auth_access_token');
                            localStorage.removeItem('auth_expires_at');
                            localStorage.removeItem('auth_user_data');
                            this.clearAccessTokenCookie();
                            
                            if (window.location.pathname.includes('/platform')) {
                                window.location.href = '/sso/sign_in';
                            }
                        }
                    }
                }
                
                if (jsonResponse) {
                    return jsonResponse;
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            }

            if (!response.ok && jsonResponse) {
                return jsonResponse;
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            if (jsonResponse) {
                return jsonResponse;
            } else {
                throw new Error('Response is not JSON');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error('Unknown error occurred');
            }
        }
    }

    private async request<T>(
        endpoint: string,
        options: RequestOptions = {},
        retryCount = 0
    ): Promise<ApiResponse<T>> {
        const method = options.method?.toUpperCase() || 'GET';
        
        if (method === 'GET') {
            return this.debouncedRequest<T>(endpoint, options, retryCount);
        }
        
        return this.makeRequest<T>(endpoint, options, retryCount, false);
    }

    get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    clearCache(): void {
        this.requestCache.clear();
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
    }
}

export const api = new ApiBridge();