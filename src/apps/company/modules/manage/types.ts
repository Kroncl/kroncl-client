export interface UpdateCompanyRequest {
    name?: string;
    description?: string;
}

export interface Company {
    avatar_url?: string;
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    description?: string;
    is_public: boolean;
    slug: string;
}