// import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { people as mock } from "./people.json";
import { useEffect, useState } from "react";
import { Filters } from "../components/Filter";
import { gql, useQuery } from "urql";

// const endpoint =
//   "https://en.wikipedia.org/wiki/List_of_Buffy_the_Vampire_Slayer_characters";
// const params = {
//   origin: "*",
// };

// const getWiki = async () => {
//   const wiki = await axios.get(endpoint);
//   return wiki;
// };
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

const PeopleQuery = gql`
  query {
    allPeople {
      id
      name
    }
  }
`;
const Deck = () => {
  const [{ data, error }] = useQuery({ query: PeopleQuery });
  const [people, setPeople] = useState(mock);

  const filterOnSpecies = (species: string) => {
    const filtered = mock.filter(({ species: spec }) => spec === species);
    setPeople(filtered);
  };

  console.log(data, error, "urql working");
  return (
    <>
      <Filters setFilter={filterOnSpecies} options={options} />
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
