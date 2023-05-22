import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import { useGetPersonQuery } from "../graphql/graphql";

const Character = () => {
  const { charId } = useParams();

  const [{ data, fetching, error }] = useGetPersonQuery({
    variables: { id: charId },
  });

  if (error) {
    console.log(error.message, "error");
  }

  return (
    <div className="flex justify-between mx-auto text-center animate-fadeInRight">
      {!fetching && data.person && <Card {...data.person} flip={true} />}
      <div className="flex-col">
        <div className="mb-3 ml-2 text-3xl text-white font-lacquer rounded-2xl">
          Close Friends
        </div>
      </div>
      <Link
        to="/"
        className="w-10 h-10 pl-5 ml-5 text-5xl text-white rounded-md font-lacquer"
      >
        X
      </Link>
    </div>
  );
};

export default Character;

{
  /* {relationships.map((char, i) => (
            <div key={i} className="p-1 text-3xl">
              {char.typeRelationships}
              <div key={i} className="p-1 text-3xl">
                <Link
                  className="text-2xl hover:text-red-900 "
                  to={`/${char.id}`}
                >
                  {char.name}
                </Link>
              </div>
            </div>
          ))} */
}
{
  /* <div className="p-2 ml-2 text-3xl bg-cover font-almendra bg-texture rounded-2xl">
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
        </div> */
}
