package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/joho/godotenv"
)

type Query struct {
	DB *pgxpool.Pool
}

type Person struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Alias      string `json:"alias"`
	Species    string `json:"species"`
	ImageURL   string `json:"imageUrl"`
	Age        int32  `json:"age"`
	Occupation string `json:"occupation"`
}

type PersonResolver struct {
	Person *Person
	People []*Person
}

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
}

func (q *Query) Person(ctx context.Context, args struct{ ID string }) (*PersonResolver, error) {
	db := q.DB
	row := db.QueryRow(ctx, "SELECT id, name, alias, species, image_url, age, occupation FROM person WHERE id = $1", args.ID)

	var p Person
	err := row.Scan(
		&p.ID, &p.Name, &p.Alias,
		&p.Species, &p.ImageURL, &p.Age,
		&p.Occupation,
	)
	if err != nil {
		return nil, err
	}

	return &PersonResolver{Person: &p}, nil
}

func (q *Query) People(ctx context.Context) ([]*PersonResolver, error) {
	db := q.DB
	rows, err := db.Query(ctx, "SELECT id, name, alias, species,image_url, age FROM person")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer rows.Close()

	var people []*PersonResolver

	for rows.Next() {
		var p Person
		err := rows.Scan(
			&p.ID, &p.Name, &p.Alias,
			&p.Species, &p.ImageURL, &p.Age,
		)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		people = append(people, &PersonResolver{Person: &p})
	}

	if err := rows.Err(); err != nil {
		fmt.Println(err)
		return nil, err
	}

	return people, nil
}

func (q *Query) PeopleBySpecies(ctx context.Context, args struct{ Species string }) ([]*PersonResolver, error) {
	db := q.DB
	rows, err := db.Query(ctx, "SELECT id, name, alias, species, image_url, age FROM person WHERE species = $1", args.Species)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var people []*PersonResolver

	for rows.Next() {
		var p Person
		err := rows.Scan(
			&p.ID, &p.Name, &p.Alias,
			&p.Species, &p.ImageURL, &p.Age,
		)
		if err != nil {
			return nil, err
		}
		people = append(people, &PersonResolver{Person: &p})
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return people, nil

}

func (p *PersonResolver) ID() string {
	return strconv.Itoa(p.Person.ID)
}

func (p *PersonResolver) Name() string {
	return p.Person.Name
}

func (p *PersonResolver) Alias() string {
	return p.Person.Alias
}

func (p *PersonResolver) ImageURL() string {
	return p.Person.ImageURL
}

func (p *PersonResolver) Age() int32 {
	return p.Person.Age
}

func (p *PersonResolver) Species() string {
	return p.Person.Species
}

func (p *PersonResolver) Occupation() string {
	return p.Person.Occupation
}

func main() {
	path := os.Getenv("DATABASE_URL")
	config, err := pgxpool.ParseConfig(path)
	if err != nil {
		log.Fatal(err)
	}
	pool, err := pgxpool.ConnectConfig(context.Background(), config)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	schemaString, err := loadSchema("./schema.graphql")
	if err != nil {
		log.Fatal(err)
	}

	query := &Query{DB: pool}
	gqlSchema := graphql.MustParseSchema(schemaString, query)

	// Create a GraphQL endpoint handler using the schema
	graphQLHandler := &relay.Handler{Schema: gqlSchema}
	// Define a middleware handler to enable CORS
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Set CORS headers
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			// Handle preflight requests for CORS
			if r.Method == http.MethodOptions {
				return
			}

			// Call the next handler
			next.ServeHTTP(w, r)
		})
	}

	// Wrap the GraphQL handler with the CORS middleware
	http.Handle("/graphql", corsHandler(graphQLHandler))

	http.HandleFunc("/", servePlayground)

	fmt.Println("Server is running on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func loadSchema(filepath string) (string, error) {
	schemaBytes, err := os.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(schemaBytes), nil
}

func servePlayground(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./playground.html")
}
