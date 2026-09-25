'use client';

import { useMemo, useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { CatalogCategory } from '@/apps/company/modules/wm/types';
import { CategoryStatus } from './_types';

export function useTreeSearch() {
    const wmModule = useWm();

    const [searchInput, setSearchInput] = useState('');
    const [activeOnly, setActiveOnly] = useState(false);
    const [inactiveOnly, setInactiveOnly] = useState(false);

    const [appliedSearch, setAppliedSearch] = useState('');
    const [appliedStatus, setAppliedStatus] = useState<CategoryStatus | undefined>(undefined);

    const [searchResults, setSearchResults] = useState<CatalogCategory[] | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const isSearchMode = appliedSearch.trim().length > 0 || appliedStatus !== undefined;

    const searchDirty = useMemo(() => {
        const nextStatus: CategoryStatus | undefined =
            activeOnly ? 'active' : inactiveOnly ? 'inactive' : undefined;

        return searchInput !== appliedSearch || nextStatus !== appliedStatus;
    }, [searchInput, appliedSearch, activeOnly, inactiveOnly, appliedStatus]);

    function handleActiveToggle(checked: boolean) {
        setActiveOnly(checked);
        if (checked) setInactiveOnly(false);
    }

    function handleInactiveToggle(checked: boolean) {
        setInactiveOnly(checked);
        if (checked) setActiveOnly(false);
    }

    async function handleSearch() {
        const nextStatus: CategoryStatus | undefined =
            activeOnly ? 'active' : inactiveOnly ? 'inactive' : undefined;

        setAppliedSearch(searchInput);
        setAppliedStatus(nextStatus);

        const hasFilters = searchInput.trim().length > 0 || nextStatus !== undefined;

        if (!hasFilters) {
            setSearchResults(null);
            return;
        }

        setSearchLoading(true);
        try {
            const res = await wmModule.getCategories({
                search: searchInput.trim() || undefined,
                status: nextStatus,
            });
            if (res.status) setSearchResults(res.data.categories);
        } finally {
            setSearchLoading(false);
        }
    }

    function handleReset() {
        setSearchInput('');
        setActiveOnly(false);
        setInactiveOnly(false);
        setAppliedSearch('');
        setAppliedStatus(undefined);
        setSearchResults(null);
    }

    return {
        searchInput, setSearchInput,
        activeOnly, inactiveOnly,
        handleActiveToggle, handleInactiveToggle,
        searchResults, searchLoading,
        isSearchMode, searchDirty,
        handleSearch, handleReset,
    };
}