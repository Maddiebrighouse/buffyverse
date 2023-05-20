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
)

type Query struct {
	DB *pgxpool.Pool
}

type Person struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Alias    string `json:"alias"`
	ImageURL string `json:"imageUrl"`
	Age      int32  `json:"age"`
}

type PersonResolver struct {
	Person *Person
}

func (q *Query) People(ctx context.Context) ([]*PersonResolver, error) {
	db := q.DB
	rows, err := db.Query(ctx, "SELECT id, name, alias, image_url, age FROM person")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var people []*PersonResolver

	for rows.Next() {
		var p Person
		err := rows.Scan(
			&p.ID, &p.Name, &p.Alias,
			&p.ImageURL, &p.Age,
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

func main() {
	config, err := pgxpool.ParseConfig("postgresql://localhost:5432/buffy_verse_1?sslmode=disable")
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

	http.Handle("/graphql", &relay.Handler{Schema: gqlSchema})
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
