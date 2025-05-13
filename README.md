# Strapi CMS MCP

This is a Model Context Protocol (MCP) implementation for Strapi CMS, allowing AI assistants to interact with Strapi's REST API.

## Features

This MCP provides tools to interact with Strapi's REST API endpoints:

### Collection Types

- `get_documents`: Get a list of documents from a collection type
- `get_document`: Get a single document from a collection type by ID
- `create_document`: Create a new document in a collection type
- `update_document`: Update a document in a collection type
- `delete_document`: Delete a document from a collection type

### Single Types

- `get_single_type`: Get a single type content
- `update_single_type`: Update a single type content
- `delete_single_type`: Delete a single type content

## Setup and Usage

### Requirements

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
cd strapi-cms-mcp
npm install
```

3. Build the project:

```bash
npm run build
```

### Configuration

Before running the MCP, you need to set the following environment variables:

- `STRAPI_API_TOKEN`: Your Strapi API token
- `STRAPI_API_URL`: The URL of your Strapi API (e.g., `http://localhost:1337`)

You can create a `.env` file in the root directory with these variables:

```
STRAPI_API_TOKEN=your_api_token
STRAPI_API_URL=http://localhost:1337
```

### Running

To run the MCP:

```bash
npm start
```

For development with environment variables loaded from `.env`:

```bash
npm run dev
```

## Examples

### Collection Types

#### Getting a list of documents

```json
{
  "contentType": "restaurants",
  "populate": "*",
  "sort": "name:asc"
}
```

#### Getting a specific document

```json
{
  "contentType": "restaurants",
  "documentId": "znrlzntu9ei5onjvwfaalu2v",
  "populate": "categories,image"
}
```

#### Creating a new document

```json
{
  "contentType": "restaurants",
  "data": {
    "Name": "New Restaurant",
    "Description": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "text": "A description of the restaurant."
          }
        ]
      }
    ]
  }
}
```

#### Updating a document

```json
{
  "contentType": "restaurants",
  "documentId": "znrlzntu9ei5onjvwfaalu2v",
  "data": {
    "Name": "Updated Restaurant Name"
  }
}
```

#### Deleting a document

```json
{
  "contentType": "restaurants",
  "documentId": "znrlzntu9ei5onjvwfaalu2v"
}
```

### Single Types

#### Getting a single type

```json
{
  "contentType": "homepage",
  "populate": "*"
}
```

#### Updating a single type

```json
{
  "contentType": "homepage",
  "data": {
    "Title": "Updated Homepage Title",
    "Description": "New homepage description"
  }
}
```

## License

MIT 