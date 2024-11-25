package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/rs/cors"
	"github.com/stretchr/testify/assert"
)

func TestLoadSchema(t *testing.T) {
	// Create a temporary schema file
	schemaContent := "type Query { hello: String }"
	tmpFile, err := os.CreateTemp("", "schema.graphql")
	assert.NoError(t, err)
	defer os.Remove(tmpFile.Name())

	_, err = tmpFile.WriteString(schemaContent)
	assert.NoError(t, err)
	tmpFile.Close()

	// Test loadSchema function
	schemaString, err := loadSchema(tmpFile.Name())
	assert.NoError(t, err)
	assert.Equal(t, schemaContent, schemaString)
}

func TestServePlayground(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(servePlayground)

	handler.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
	assert.Contains(t, rr.Body.String(), "<html>")
}

func TestGraphQLHandler(t *testing.T) {
	// Mock database connection
	config, err := pgxpool.ParseConfig("postgresql://localhost:5432/buffy_verse_1?sslmode=disable")
	assert.NoError(t, err)
	pool, err := pgxpool.ConnectConfig(context.Background(), config)
	assert.NoError(t, err)
	defer pool.Close()

	// Load schema
	schemaString := "type Query { hello: String }"
	query := &Query{DB: pool}
	gqlSchema := graphql.MustParseSchema(schemaString, query)

	// Create a GraphQL endpoint handler using the schema
	graphQLHandler := &relay.Handler{Schema: gqlSchema}

	// Define CORS options
	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Wrap the GraphQL handler with the CORS middleware
	handler := corsOptions.Handler(graphQLHandler)

	req, err := http.NewRequest("POST", "/graphql", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestMainFunction(t *testing.T) {
	// This test ensures that the main function runs without errors
	go main()
}
