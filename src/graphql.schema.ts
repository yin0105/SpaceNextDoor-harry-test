/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum OrderBy {
    asc = "asc",
    desc = "desc"
}

export class Pagination {
    limit: number;
    skip: number;
}

export class NumberOperators {
    _eq?: number;
    _lt?: number;
    _lte?: number;
    _gt?: number;
    _gte?: number;
    _in?: number[];
}

export class StringOperators {
    _eq?: string;
    _contains?: string;
}

export class Foo {
    id: number;
    foo: string;
    bar: string;
}

export abstract class IQuery {
    abstract foo(): Foo | Promise<Foo>;
}

export abstract class IMutation {
    abstract addFoo(): Foo | Promise<Foo>;
}

export class PageInfo {
    limit: number;
    skip: number;
    total: number;
    has_more?: boolean;
}

export class DeleteResult {
    total_deleted: number;
}

export type date = any;
export type JSON = any;
export type JSONObject = any;
