# Strapi CMS MCP Guide

This guide provides detailed information on how to use the Strapi CMS MCP to interact with a Strapi headless CMS instance.

## Introduction

Strapi is a headless CMS that provides a powerful and customizable content management system with a REST API. This MCP allows AI assistants to interact with Strapi's REST API by providing tools to perform CRUD operations on both collection types and single types.

## Authentication

The Strapi CMS MCP requires an API token to authenticate with the Strapi API. You can create an API token in the Strapi admin panel under Settings > API Tokens. The token should have appropriate permissions to perform the operations you need.

## Content Types in Strapi

In Strapi, there are two main types of content:

1. **Collection Types**: These are collections of entries, like blog posts, products, or users.
2. **Single Types**: These are single instances of content, like a homepage or about page.

## API IDs

When using this MCP, you need to specify the API ID of the content type you want to interact with. There are two types of API IDs:

- **Plural API ID**: Used for collection types (e.g., `restaurants`, `articles`)
- **Singular API ID**: Used for single types (e.g., `homepage`, `about`)

You can find these API IDs in the Strapi admin panel when creating or editing a content type.

## Using the MCP

### Collection Types

#### Getting Documents

The `get_documents` tool retrieves a list of documents from a collection type.

**Parameters:**
- `contentType` (required): The plural API ID of the collection type (e.g., `restaurants`)
- `populate`: Fields to populate (e.g., `image`, `*`, `categories,image`)
- `filters`: Filters to apply (e.g., `filters[name][$eq]=Restaurant`)
- `sort`: Sorting options (e.g., `name:asc`, `createdAt:desc`)
- `pagination`: Pagination options (e.g., `{ "page": 1, "pageSize": 10 }`)
- `locale`: Locale to filter by (e.g., `en`, `fr`)

#### Getting a Document

The `get_document` tool retrieves a specific document from a collection type.

**Parameters:**
- `contentType` (required): The plural API ID of the collection type (e.g., `restaurants`)
- `documentId` (required): The document ID to retrieve
- `populate`: Fields to populate (e.g., `image`, `*`, `categories,image`)

#### Creating a Document

The `create_document` tool creates a new document in a collection type.

**Parameters:**
- `contentType` (required): The plural API ID of the collection type (e.g., `restaurants`)
- `data` (required): The data to create

#### Updating a Document

The `update_document` tool updates an existing document in a collection type.

**Parameters:**
- `contentType` (required): The plural API ID of the collection type (e.g., `restaurants`)
- `documentId` (required): The document ID to update
- `data` (required): The data to update

#### Deleting a Document

The `delete_document` tool deletes a document from a collection type.

**Parameters:**
- `contentType` (required): The plural API ID of the collection type (e.g., `restaurants`)
- `documentId` (required): The document ID to delete

### Single Types

#### Getting a Single Type

The `get_single_type` tool retrieves the content of a single type.

**Parameters:**
- `contentType` (required): The singular API ID of the single type (e.g., `homepage`)
- `populate`: Fields to populate (e.g., `image`, `*`, `components`)
- `locale`: Locale to filter by (e.g., `en`, `fr`)

#### Updating a Single Type

The `update_single_type` tool updates the content of a single type.

**Parameters:**
- `contentType` (required): The singular API ID of the single type (e.g., `homepage`)
- `data` (required): The data to update
- `locale`: Locale to update (e.g., `en`, `fr`)

#### Deleting a Single Type

The `delete_single_type` tool deletes the content of a single type.

**Parameters:**
- `contentType` (required): The singular API ID of the single type (e.g., `homepage`)

## Common Issues

### Authentication Errors

If you encounter authentication errors, check that your API token has the appropriate permissions for the operations you're trying to perform.

### Missing Fields

If you're trying to update or create a document with fields that don't exist in the content type, Strapi will return an error. Make sure the fields you're using match the fields defined in your content type.

### Populate Parameter

By default, Strapi doesn't populate relations, media fields, components, or dynamic zones. Use the `populate` parameter to include these fields in the response.

## Examples

### Getting a list of restaurants

```json
{
  "contentType": "restaurants",
  "populate": "*",
  "filters": "filters[name][$contains]=Restaurant",
  "sort": "name:asc",
  "pagination": {
    "page": 1,
    "pageSize": 10
  }
}
```

### Creating a restaurant with rich text description

```json
{
  "contentType": "restaurants",
  "data": {
    "Name": "New Italian Restaurant",
    "Description": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "The best Italian food in town. We offer authentic pasta, pizza, and more."
          }
        ]
      }
    ],
    "Category": "Italian"
  }
}
```

### Getting the homepage content with populated fields

```json
{
  "contentType": "homepage",
  "populate": "*"
}
```