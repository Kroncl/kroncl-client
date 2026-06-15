export const invalidKeyResponse: string = `{
    "status": false,
    "message": "Invalid API key",
    "data": {},
    "meta": {
        "timestamp": "2026-06-13T16:01:30Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-006138",
        "path": "/api/v1/account/api-keys",
        "method": "GET"
    }
}`;

export const apiChart: string = `
graph LR
    A[Приложение<br/>API Key: kron_...] -->|Bearer Token| B[Аккаунт<br/>Account]
    B -->|Доступ к| C[Организация 1<br/>Company]
    B -->|Доступ к| D[Организация 2<br/>Company]
    B -->|Доступ к| E[Организация N<br/>Company]
`;