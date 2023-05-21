import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Filters } from "../components/Filter";
import { gql, useQuery } from "urql";
import { Character } from "../interfaces";

export type Filter = {
  species: string;
  icon: string;
};

const options: Filter[] = [
  { species: "Human", icon: "👩‍🦱" },
  { species: "Vampire", icon: "🧛" },
  { species: "Werewolf", icon: "🐺" },
  { species: "Witch", icon: "🧙" },
  { species: "Big Bad", icon: "👹" },
  { species: "Demon", icon: "👿" },
  { species: "Watcher", icon: "👓" },
  { species: "Slayer", icon: "🗡️" },
  { species: "Other", icon: "👽" },
];

const Deck = () => {
  const [filter, setFilter] = useState<string>("Human");
  //write query to get filter by species urql
  const PeopleQuery = gql`
    query ($species: String) {
      people(species: $species) {
        id
        name
        age
        species
        alias
        imageUrl
      }
    }
  `;

  const [{ data, fetching, error }] = useQuery({
    query: PeopleQuery,
    variables: { species: filter },
  });

  console.log(data, error, "err");
  if (error) {
    return <div>Oh no... {error.message}</div>;
  }

  return (
    <>
      <Filters options={options} />
      <div className="grid grid-cols-3 gap-8 px-8 text-center animate-fadeUp animate-fadeDown max-w-7xl">
        {!fetching &&
          data.people &&
          data.people.map((person: Character, i: number) => (
            <Link to={`${person.id}`} key={i}>
              <Card {...person} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Deck;
