package main

import (
	"database/sql"

	_ "github.com/lib/pq"
)

type DB struct {
	Connection *sql.DB
}

// Person struct holds a single person
type Person struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Age      int    `json:"age"`
	ImageURL string `json:"image_url"`
	Alias    string `json:"alias"`
	Species  string `json:"species"`
}

// GetPerson gets a single person from the database
// and all their information
func GetPerson(db *sql.DB, id string) (*Person, error) {
	rows := db.QueryRow("SELECT * FROM person WHERE id = $1", id)

	var p Person
	err := rows.Scan(&p.ID, &p.Name, &p.Age)
	if err != nil {
		return nil, err
	}

	return &p, nil
}

// FetchPeople gets all people from the database
// and key aspects of their information
func FetchPeople(db *sql.DB) ([]Person, error) {
	rows := db.Query("SELECT name alias image_url age species FROM person")

	var people []Person

	for rows.Next() {
		var p Person
		err := rows.Scan(&p.ID, &p.Name, &p.Age)
		if err != nil {
			return nil, err
		}
		people = append(people, p)
	}

	err := rows.Scan(&people)
	if err != nil {
		return nil, err
	}

	return people, nil
}
