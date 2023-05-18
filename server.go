package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/graphql-go/graphql"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/graphql-go/handler"
)

func main() {
	// Define your types
	var personType = graphql.NewObject(
		graphql.ObjectConfig{
			Name: "Person",
			Fields: graphql.Fields{
				"id": &graphql.Field{
					Type: graphql.Int,
				},
				"name": &graphql.Field{
					Type: graphql.String,
				},
				"age": &graphql.Field{
					Type: graphql.Int,
				},
			},
		},
	)
	// Define your root query
	var queryType = graphql.NewObject(
		graphql.ObjectConfig{
			Name: "Query",
			Fields: graphql.Fields{
				"person": &graphql.Field{
					Type: personType,
					Args: graphql.FieldConfigArgument{
						"id": &graphql.ArgumentConfig{
							Type: graphql.String,
						},
					},
					Resolve: func(params graphql.ResolveParams) (interface{}, error) {
						// Resolve the query and return the result
						// For example, fetch user data from a database
						id, ok := params.Args["id"].(string)
						if ok {
							// Fetch user data by ID
							// Replace with your actual implementation
							user := getUserByID(id)
							return user, nil
						}
						return nil, nil
					},
				},
			},
		},
	)

	// Define your schema
	var schema, _ = graphql.NewSchema(
		graphql.SchemaConfig{
			Query: queryType,
		},
	)

	// Create a new handler with the GraphQL schema
	graphqlHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	// Use the handler as the HTTP handler for /graphql
	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		graphqlHandler.ServeHTTP(w, r)
	})

	// Serve the GraphQL Playground at the root URL ("/")
	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))

	go func() {
		fmt.Println("Server is running on http://localhost:8080/graphql")
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			log.Fatal(err)
		}
	}()

	// Keep the main goroutine alive
	select {}
}

// Replace with your actual implementation
func getUserByID(id string) map[string]interface{} {
	// Replace with your actual database call
	return map[string]interface{}{
		"id":   1,
		"name": "Bob",
		"age":  20,
	}
}
