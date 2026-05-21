export interface DatabaseStorageSources {
    schema_name: string;
    total_size_mb: number;
    total_size_pretty: string;
    table_size_mb: number;
    index_size_mb: number;
    toast_size_mb: number;
    table_count: number;
    index_count: number;
    sequence_count: number;
    view_count: number;
    materialized_view_count: number;
    total_rows: number;
    dead_rows: number;
    active_connections: number;
    last_vacuum: string | null;
    last_autovacuum: string | null;
    last_analyze: string | null;
    schema_exists: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface ModuleTable {
    exists: boolean;
    row_count: number;
    table_name: string;
    total_bytes: number;
    total_size_mb: number;
}

export interface ModuleStats {
    module: string;
    row_count: number;
    table_count: number;
    tables: ModuleTable[];
    total_bytes: number;
    total_size_mb: number;
}

export interface TotalStats {
    module: 'total';
    row_count: number;
    table_count: number;
    total_bytes: number;
    total_size_mb: number;
}

export interface StorageModulesData {
    modules: Record<string, ModuleStats>;
    total: TotalStats;
}