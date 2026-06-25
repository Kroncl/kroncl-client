import { StructureBlock } from './sections/structure/block';
import { SecurityBlock } from './sections/security/block';
import { DocsBlock } from './sections/docs/block';
import { MulticurrencyBlock } from './sections/multicurrency/block';
import { ApiBlock } from './sections/api/block';

export type TabId = 'modules' | 'security' | 'docs' | 'multicurrency' | 'api';

export interface TabConfig {
    id: TabId;
    label: string;
    component: React.ComponentType;
}

export const tabs: TabConfig[] = [
    {
        id: 'modules',
        label: 'Модули',
        component: StructureBlock
    },
    {
        id: 'multicurrency',
        label: 'Мультивалютность',
        component: MulticurrencyBlock
    },
    {
        id: 'security',
        label: 'Безопасность',
        component: SecurityBlock
    },
    {
        id: 'docs',
        label: 'Руководство',
        component: DocsBlock
    },
    {
        id: 'api',
        label: 'API',
        component: ApiBlock
    }
];