export interface FindPartyRequest {
    query: string;
    branch_type?: 'MAIN' | 'BRANCH';
    type?: 'LEGAL' | 'INDIVIDUAL';
}

export interface PartyName {
    full_with_opf: string;
    short_with_opf: string;
    full: string;
    short: string;
}

export interface PartyOPF {
    code: string;
    full: string;
    short: string;
}

export interface PartyManagement {
    name: string;
    post: string;
    start_date: number;
}

export interface PartyAddress {
    value: string;
    unrestricted_value: string;
}

export interface PartyState {
    status: string;
    actuality_date: number;
    registration_date: number;
    liquidation_date: number | null;
}

export interface PartySuggestion {
    value: string;
    unrestricted_value: string;
    data: {
        inn: string;
        kpp: string;
        ogrn: string;
        ogrn_date: number;
        hid: string;
        type: string;
        name: PartyName;
        opf: PartyOPF;
        management: PartyManagement;
        address: PartyAddress;
        state: PartyState;
        branch_type: string;
        branch_count: number;
        employee_count: number;
        okpo: string;
        oktmo: string;
        okato: string;
    };
}

export interface CounterpartyPreview {
    name: string;
    inn: string;
    kpp?: string;
    ogrn: string;
    address: string;
    type: 'legal' | 'person';
}

export interface FindPartyResponse {
    suggestions: PartySuggestion[];
}