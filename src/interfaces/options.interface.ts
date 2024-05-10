export interface Options {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SortBy {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
