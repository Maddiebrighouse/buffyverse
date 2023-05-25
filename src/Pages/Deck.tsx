import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Filters } from "../components/Filter";
import { useState } from "react";
import Loader from "../components/Loader";
import { useGetPeopleQuery } from "../graphql/graphql";

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
      <Filters setFilter={setFilter} />
      <div className="grid grid-cols-3 gap-8 px-8 text-center animate-fadeUp animate-fadeDown max-w-7xl">
        {!fetching &&
          data &&
          data.people &&
          data.people.map((person, i) => (
            <Link to={`${person.id}`} key={i}>
              <Card {...person} flip={false} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Deck;
