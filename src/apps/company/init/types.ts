export type StorageStatus = 
  | 'none'
  | 'provisioning' 
  | 'active' 
  | 'failed' 
  | 'deprecated';

export interface CreateCompanyRequest {
  name: string;
  slug: string;
  description?: string;
  avatar_url?: string;
  is_public: boolean;
  plan_code: string;
  region?: string;
  promocode?: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar_url: string;
  is_public: boolean;
  storage: Storage;
  created_at: string;
  updated_at: string;
  region: string;
  site: string;
  email: string;
  metadata: any;
}

export interface CheckSlugUniqueRequest {
  slug: string;
}

export interface SlugUniqueData {
  slug: string;
  unique: boolean;
}