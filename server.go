package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

	"github.com/madeleineb/buffyverse/schema"
)

type Resolver struct {
	DB *sql.DB
}

func (r *Resolver) People(ctx context.Context) ([]Person, error) {
	db := r.DB
	users, err := FetchPeople(db)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (r *Resolver) Person(ctx context.Context, args struct{ ID string }) (*Person, error) {
	db := r.DB
	user, err := GetPerson(db, args.ID)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func main() {
	// Create a new connection to our pg database
	db, err := sql.Open("postgres", "postgresql://localhost:5432/buffy_verse_1?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	schema, err := schema.LoadSchema("/Users/madeleineb/workspace/buffyverse/schema.graphqls")
	if err != nil {
		log.Fatal(err)
	}

	resolvers := &Resolver{
		DB: db,
	}

	// Create a new handler with the GraphQL schema and resolvers
	graphqlHandler := handler.NewDefaultServer(schema)
	graphqlHandler.SetQueryResolver(resolvers)

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
