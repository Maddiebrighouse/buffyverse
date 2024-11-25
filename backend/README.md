# Buffy Verse Backend

This is the backend for the Buffy Verse application, which provides a GraphQL API to interact with the Buffy Verse database locally.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Example Query](#example-query)

## Installation

1. Install dependencies:

    ```sh
    go mod download
    ```

2. Set up the PostgreSQL database:

    ```sh
    psql -U postgres -d buffy_verse_1 -h localhost -p 5432 -f path/to/your/dumpfile.sql
    ```

3. Create a `.env` file with your environment variables:

    ```sh
    touch .env
    ```

    Add your database connection string to the `.env` file:

    ```env
    DATABASE_URL=postgresql://localhost:5432/buffy_verse_1?sslmode=disable
    ```

## Usage

1. Start the server:

    ```sh
    go run main.go
    ```

2. The server will be running at `http://localhost:8080/`.

3. Access the GraphQL playground at `http://localhost:8080/`.

### GraphQL Schema

The GraphQL schema is defined in the `schema.graphql` file. It includes the following types and queries:

- `Person`: Represents a person in the Buffy Verse.
- `Query`: The root query type, which includes the following fields:
  - `person(id: String!): Person`: Fetch a person by ID.

### Example Query

```graphql
query {
  person(id: "1") {
    id
    name
    alias
    species
    imageUrl
    age
    occupation
  }
}

### Testing
Test the backend server by running the following command:

```sh   
go test ./...
```

## TODO's

Codgen working
Test resolvers
Better database security (env variables setup and connection strings)
Deploy backend and database
Create more relationships between tables
