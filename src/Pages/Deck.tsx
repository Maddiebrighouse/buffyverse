import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Filters } from "../components/Filter";
import { gql, useQuery } from "urql";

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

//write query to get filter by species urql
const PeopleBySpecies = gql`
  query {
    allPeople(species: "Human") {
      id
      species
      urlImage
      name
    }
  }
`;
const People = gql`
  query {
    allPeople {
      id
      species
      alias
      occupation
      status
      urlImage
      affiliation
      name
    }
  }
`;

//TODO: Other filters + Key

const Deck = () => {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [{ data, error }] = useQuery({
    query: People,
  });
  useEffect(() => {
    if (data) {
      setPeople(data.allPeople);
    }
  }, [data]);

  useEffect(() => {
    if (filter) {
      const filterd = data.allPeople.filter(
        (person) => person.species === filter
      );
      setPeople(filterd);
    }
  }, [filter]);
  console.log(error);
  return (
    <>
      <Filters setFilter={setFilter} options={options} />
      <div className="grid grid-cols-3 gap-8 px-8 text-center animate-fadeUp animate-fadeDown max-w-7xl">
        {people.map((person, i) => (
          <Link to={`${person.id}`} key={i}>
            <Card {...person} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Deck;
