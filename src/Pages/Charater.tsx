import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import Card from "../components/Card";

const Person = gql`
  query ($id: ID!) {
    Person(id: $id) {
      id
      species
      urlImage
      relationships
      name
    }
  }
`;

const Character = () => {
  const { charId } = useParams();
  const deString = charId?.replace(/['"]+/g, "");

  const [{ data, fetching, error }] = useQuery({
    query: Person,
    variables: { id: deString },
  });

  console.log(error, "err");
  return (
    <div className="flex justify-between mx-auto text-center animate-fadeInRight">
      {!fetching && data.Person && <Card {...data.Person} />}
      <div className="flex-col">
        <div className="mb-3 ml-2 text-3xl bg-cover font-almendra bg-texture rounded-2xl">
          Close Friends
          {/* {data.Person.relationships &&
            data.Person.relationships.map((char, i) => (
              <div key={i} className="p-1 text-3xl">
                <Link
                  className="text-2xl hover:text-red-900 "
                  to={`/${char.id}`}
                >
                  {char.name}
                </Link>
              </div>
            ))} */}
        </div>
        {/* <div className="p-2 ml-2 text-3xl bg-cover font-almendra bg-texture rounded-2xl">
          Killed By
          {data.Person.relationships.map(({ killedBy, date }, i) => (
            <div key={i} className="flex-col">
              <Link
                className="text-2xl hover:text-red-900 "
                to={`c/${killedBy}`}
              >
                {killedBy}
              </Link>
              <br />
              <Link className="text-2xl hover:text-red-900 " to={`e/${date}`}>
                during {date}
              </Link>
            </div>
          ))}
        </div> */}
      </div>
      <Link
        to="/"
        className="w-10 h-10 rounded-md font-longCang text-white text-5xl px-3.5 py-2.5"
      >
        X
      </Link>
    </div>
  );
};

export default Character;
