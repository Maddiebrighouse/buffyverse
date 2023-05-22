import React from "react";
import { Badge } from "./Species";
import Age from "./Age";
import { Person } from "../graphql/graphql";

type Props = Person & { flip?: boolean };
const Card: React.FC<Props> = ({
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
    <div className="w-[300px] h-[504px] group perspective">
      <div className={flip ? filpClass : noFilpClass}>
        <div className="absolute flex-col justify-around w-full h-full p-1 border-2 backface-hidden border-amber-400 rounded-3xl ">
          <div className="absolute z-10 w-1/2 ml-16 text-3xl text-black border-2 rounded-md font-almendra bg-slate-100 border-amber-400">
            {alias}
          </div>
          <div className="mt-4 border-4 border-amber-400 rounded-3xl">
            <img
              className="object-cover w-[300px] grayscale h-[470px] rounded-2xl hover:grayscale-0"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="absolute flex-col justify-around w-full h-full p-2 overflow-hidden border-2 my-rotate-y-180 backface-hidden border-amber-400 rounded-3xl">
          <div className="w-[280px] h-[475px] mt-3 pt-2 justify-around border-amber-400 rounded-3xl border-4 font-almendra absolute">
            <Age age={age} />
            <br />
            <div className="flex m-1 text-3xl text-black">{name}</div>
            <div className="flex text-xl">
              <div className="p-1 m-1">Species: </div>
              <div className="pt-1 m-1">{species}</div>
            </div>
            <div className="flex text-xl">
              <div className="p-1 m-1">Occupations: </div>
              <div className="flex-wrap pt-1 m-1">{occupation}</div>
            </div>
            <div className="flex-col text-xl">
              <div className="p-1 m-1">About: </div>
              <div className="overflow-hidden text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, quibusdam. Quisquam, voluptatum. Quisquam, quia
                voluptas. Quisquam, voluptatum. Quisquam, quia voluptas.quia
                voluptas. Quisquam, voluptatum. Quisquam, quia voluptas.quia
                voluptas. Quisquam, voluptatum. Quisquam, quia voluptas. elit.
                Voluptatum, quibusdam. Quisquam, voluptatum. Quisquam, quia
                voluptas. Quisquam, voluptatum. Quisquam, quia voluptas.quia
              </div>
            </div>
            <br />
            <div className="flex-col-reverse text-xl">
              <Badge icon={species} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
