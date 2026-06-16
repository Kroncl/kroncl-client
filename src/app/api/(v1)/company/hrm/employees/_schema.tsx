import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const employeeFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор сотрудника' },
    { code: 'first_name', required: true, type: 'string', title: 'Имя', description: 'Имя сотрудника' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия сотрудника' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Рабочий email' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Рабочий номер телефона' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус сотрудника', enum: ['active', 'inactive'] },
    { code: 'is_account_linked', required: true, type: 'boolean', title: 'Привязан аккаунт', description: 'Привязан ли аккаунт платформы' },
    { code: 'account_id', required: false, type: 'string', title: 'ID аккаунта', description: 'Идентификатор привязанного аккаунта' },
    { code: 'linked_at', required: false, type: 'string', title: 'Привязан', description: 'Дата привязки аккаунта (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const employeeDetailFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор сотрудника' },
    { code: 'first_name', required: true, type: 'string', title: 'Имя', description: 'Имя сотрудника' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия сотрудника' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Рабочий email' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Рабочий номер телефона' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус сотрудника', enum: ['active', 'inactive'] },
    { code: 'is_account_linked', required: true, type: 'boolean', title: 'Привязан аккаунт', description: 'Привязан ли аккаунт платформы' },
    { code: 'account_id', required: false, type: 'string', title: 'ID аккаунта', description: 'Идентификатор привязанного аккаунта' },
    { code: 'linked_at', required: false, type: 'string', title: 'Привязан', description: 'Дата привязки аккаунта (RFC 3339)' },
    { code: 'positions', required: false, type: 'array', title: 'Должности', description: 'Список должностей сотрудника (Position[])' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const createEmployeeRequestFields: JsonField[] = [
    { code: 'first_name', required: true, type: 'string', title: 'Имя', description: 'Имя сотрудника' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия сотрудника' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Рабочий email' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Рабочий номер телефона' },
];

export const linkAccountRequestFields: JsonField[] = [
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор аккаунта платформы для привязки' },
];

export const linkPositionRequestFields: JsonField[] = [
    { code: 'position_id', required: true, type: 'string', title: 'ID должности', description: 'Идентификатор должности для назначения' },
];

export const unlinkPositionRequestFields: JsonField[] = [
    { code: 'position_id', required: true, type: 'string', title: 'ID должности', description: 'Идентификатор должности для снятия' },
];

export const employeesDataFields: JsonField[] = [
    { code: 'employees', required: true, type: 'array', title: 'Сотрудники', description: 'Список сотрудников (Employee[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const employeesList200: string = `{
    "status": true,
    "message": "Employees retrieved successfully",
    "data": {
        "employees": [
            {
                "id": "a00e8400-e29b-41d4-a716-446655440150",
                "first_name": "Иван",
                "last_name": "Петров",
                "email": "ivan@example.com",
                "phone": "+79000000000",
                "status": "active",
                "is_account_linked": true,
                "account_id": "550e8400-e29b-41d4-a716-446655440001",
                "linked_at": "2026-04-24T00:20:54Z",
                "created_at": "2026-04-24T00:17:05Z",
                "updated_at": "2026-06-14T00:00:00Z"
            }
        ],
        "pagination": {
            "total": 1,
            "page": 1,
            "limit": 20,
            "pages": 1
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees",
        "method": "GET"
    }
}`;

const getEmployee200: string = `{
    "status": true,
    "message": "Employee retrieved successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440150",
        "first_name": "Иван",
        "last_name": "Петров",
        "email": "ivan@example.com",
        "phone": "+79000000000",
        "status": "active",
        "is_account_linked": true,
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "linked_at": "2026-04-24T00:20:54Z",
        "positions": [
            {
                "id": "ff0e8400-e29b-41d4-a716-446655440140",
                "name": "Менеджер",
                "description": "Работа с клиентами и сделками",
                "permissions": ["crm.clients", "dm.deals.create"],
                "created_at": "2026-04-24T00:20:54Z",
                "updated_at": "2026-06-14T00:00:00Z"
            }
        ],
        "created_at": "2026-04-24T00:17:05Z",
        "updated_at": "2026-06-14T00:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees/...",
        "method": "GET"
    }
}`;

const createEmployee201: string = `{
    "status": true,
    "message": "Employee created successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440151",
        "first_name": "Пётр",
        "last_name": null,
        "email": null,
        "phone": null,
        "status": "active",
        "is_account_linked": false,
        "account_id": null,
        "linked_at": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees",
        "method": "POST"
    }
}`;

const updateEmployee200: string = `{
    "status": true,
    "message": "Employee updated successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440151",
        "first_name": "Пётр",
        "last_name": "Сидоров",
        "email": "petr@example.com",
        "phone": "+79000000001",
        "status": "active",
        "is_account_linked": false,
        "account_id": null,
        "linked_at": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees/...",
        "method": "PATCH"
    }
}`;

const deactivateEmployee200: string = `{
    "status": true,
    "message": "Employee deactivated successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440151",
        "first_name": "Пётр",
        "last_name": "Сидоров",
        "email": "petr@example.com",
        "phone": "+79000000001",
        "status": "inactive",
        "is_account_linked": false,
        "account_id": null,
        "linked_at": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees/.../deactivate",
        "method": "POST"
    }
}`;

const activateEmployee200: string = `{
    "status": true,
    "message": "Employee activated successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440151",
        "first_name": "Пётр",
        "last_name": "Сидоров",
        "email": "petr@example.com",
        "phone": "+79000000001",
        "status": "active",
        "is_account_linked": false,
        "account_id": null,
        "linked_at": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/employees/.../activate",
        "method": "POST"
    }
}`;

export const employeesListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={employeesList200} />
        </>
    }
];

export const getEmployeeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getEmployee200} />
        </>
    }
];

export const createEmployeeResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createEmployee201} />
        </>
    }
];

export const updateEmployeeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateEmployee200} />
        </>
    }
];

export const deactivateEmployeeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateEmployee200} />
        </>
    }
];

export const activateEmployeeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateEmployee200} />
        </>
    }
];

export const linkAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateEmployee200.replace('is_account_linked": false', 'is_account_linked": true').replace('"account_id": null', '"account_id": "550e8400-e29b-41d4-a716-446655440001"')} />
        </>
    }
];

export const unlinkAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateEmployee200} />
        </>
    }
];

export const linkPositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getEmployee200} />
        </>
    }
];

export const unlinkPositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getEmployee200} />
        </>
    }
];