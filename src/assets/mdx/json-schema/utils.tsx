export interface JsonField {
    code: string;
    required: boolean;
    type: 'string' | 'int' | 'int32' | 'int64' | 'boolean' | 'array' | 'enum';
    enum?: string[];
    title?: string;
    description?: string;
}

type FieldDescriptions<T> = Partial<Record<keyof T, { 
    title?: string; 
    description?: string;
    enum?: string[];
}>>;

type JsonFieldType = JsonField['type'];

function inferJsonType(value: any): JsonFieldType {
    if (value === null || value === undefined) return 'string';
    
    const t = typeof value;
    switch (t) {
        case 'number': return 'int';
        case 'boolean': return 'boolean';
        case 'string': return 'string';
        case 'object':
            if (Array.isArray(value)) return 'array';
            return 'string'; // объекты как string или отдельно обработать
        default: return 'string';
    }
}

export function defineSchema<T extends Record<string, any>>(
    sample: T,
    descriptions?: FieldDescriptions<T>,
): JsonField[] {
    return Object.keys(sample).map((key) => {
        const value = sample[key];
        const desc = descriptions?.[key as keyof T];
        const required = value !== undefined;
        
        const enumValues = desc?.enum;
        const fieldType: JsonFieldType = enumValues ? 'enum' : inferJsonType(value);

        return {
            code: key,
            required,
            type: fieldType,
            enum: enumValues,
            title: desc?.title || key,
            description: desc?.description || '',
        };
    });
}