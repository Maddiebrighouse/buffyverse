import React from "react";
import { Badge } from "./Species";
import Age from "./Age";
import { Person } from "../graphql/graphql";

type Props = Person & { flip?: boolean };
const Card: React.FC<Props> = ({
  id,
  name,
  alias,
  species,
  imageUrl,
  age,
  occupation,
  flip = false,
}) => {
  const filpClass =
    "relative w-full h-full duration-1000 preserve-3d group-hover:my-rotate-y-180 bg-[url('src/assets/frames/texture.jpg')] bg-cover rounded-3xl";
  const noFilpClass =
    "relative w-full h-full duration-1000 preserve-3d bg-[url('src/assets/frames/texture.jpg')] bg-cover rounded-3xl";

  return (
    <div className="w-[300px] h-[550px] group perspective">
      <div className={flip ? filpClass : noFilpClass}>
        <div className="absolute flex-col justify-around w-full h-full p-2 border-2 backface-hidden border-amber-400 rounded-3xl ">
          <div className="m-3 text-3xl text-black font-almendra">{alias}</div>
          <div className="m-2 border-4 border-amber-400 rounded-3xl">
            <img
              className="object-cover w-[280px] grayscale h-[430px] rounded-2xl hover:grayscale-0"
              src={imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3">
            <Badge icon={species} />
          </div>
        </div>

        <div className="absolute flex-col justify-around w-full h-full p-2 overflow-hidden border-2 my-rotate-y-180 backface-hidden border-amber-400 rounded-3xl">
          <div className="w-[280px] h-[460px] p-2 mt-4 pt-2 pb-2 mb-4 justify-around border-amber-400 rounded-3xl border-4 absolute">
            <Age age={age} />
            <br />
            <div className="flex text-xl">
              <div className="font-almendra">Occupations: </div>
              <div className="flex text-l rounded-3xl font-lacquer">
                {occupation}
              </div>
            </div>
            <br />
            <div className="flex text-xl">
              <div className="p-1 m-1 font-almendra">Species: </div>
              <div className="flex p-1 m-1 text-l rounded-3xl font-lacquer">
                {species}
              </div>
            </div>
            <div className="flex-col text-xl">
              <div className="p-1 m-1 font-almendra">About: </div>
              <div className="flex p-1 m-1 overflow-hidden text-l rounded-3xl font-lacquer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, quibusdam. Quisquam, voluptatum. Quisquam, quia
                voluptas. Quisquam, voluptatum. Quisquam, quia voluptas.
              </div>
            </div>
          </div>
          <div className="absolute text-3xl text-black bottom-4 left-14 font-almendra">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
