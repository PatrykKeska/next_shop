/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    id\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}": types.GetProductDetailsBySlugDocument,
    "query GetProducts {\n  products {\n    id\n    price\n    name\n    slug\n    images(first: 1) {\n      url\n    }\n  }\n}": types.GetProductsDocument,
    "query GetProductsSlugs {\n  products {\n    slug\n  }\n}": types.GetProductsSlugsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    id\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    id\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    id\n    price\n    name\n    slug\n    images(first: 1) {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProducts {\n  products {\n    id\n    price\n    name\n    slug\n    images(first: 1) {\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductsSlugs {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetProductsSlugs {\n  products {\n    slug\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;