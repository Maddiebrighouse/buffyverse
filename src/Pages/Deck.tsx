import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Filters } from "../components/Filter";
import { useState } from "react";
import Loader from "../components/Loader";
import { useGetPeopleQuery, Person } from "../graphql/graphql";

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
  const [filter, setFilter] = useState<string | null>(null);

  const [{ data, fetching, error }] = useGetPeopleQuery({
    variables: { species: filter },
  });

  if (error) {
    console.log(error.message, "error");
  }

  if (fetching && !data) {
    return <Loader />;
  }
  return (
    <>
      <Filters setFilter={setFilter} options={options} />
      <div className="grid grid-cols-3 gap-8 px-8 text-center animate-fadeUp animate-fadeDown max-w-7xl">
        {!fetching &&
          data.people &&
          data.people.map((person: Person, i: number) => (
            <Link to={`${person.id}`} key={i}>
              <Card {...person} flip={false} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Deck;
