import React from "react";
import { Character } from "../interfaces";
import { Badge } from "./Species";
import Age from "./Age";
import { Link } from "react-router-dom";

const Card: React.FC<Character> = (
  {
    id,
    notes,
    name,
    alias,
    species,
    occupation,
    abilities,
    birthdate,
    catchPhrase,
    urlImage,
  },
  noFlip: boolean
) => {
  return (
    <div className="w-[300px] h-[550px] group perspective">
      <div className="relative w-full h-full duration-1000 preserve-3d group-hover:my-rotate-y-180 bg-[url('src/assets/frames/texture.jpg')] bg-cover rounded-3xl">
        <div className="absolute flex-col justify-around w-full h-full p-2 border-2 backface-hidden border-amber-400 rounded-3xl ">
          <div className="m-3 text-3xl text-black font-almendra">{name}</div>
          <div className="m-2 border-4 border-amber-400 rounded-3xl">
            <img
              className="object-cover w-[280px] grayscale h-[400px] rounded-2xl"
              src={urlImage}
              alt=""
            />
          </div>
          {occupation && (
            <div className="p-1 mt-4 text-xl text-black font-almendra">
              {occupation}
            </div>
          )}
        </div>
        <div className="absolute w-full h-full overflow-hidden border-2 my-rotate-y-180 backface-hidden border-amber-400 rounded-3xl">
          <div className="flex-col justify-between">
            <div className="p-2 mt-2 mb-4 text-3xl text-black font-almendra">
              {name}
            </div>
            <div className="w-[280px] h-[400px]  border-amber-400 rounded-3xl border-2 ml-2">
              <Age birthday={birthdate} />
              <br />
              <div className="flex text-xl">
                <div className="p-1 m-1 font-almendra">Occupations: </div>
                <div className="flex p-1 m-1 text-l rounded-3xl font-lacquer">
                  {occupation}
                </div>
              </div>
              <br />
              {abilities && (
                <div className="flex-col text-xl">
                  <div className="p-1 m-1 font-almendra">Abilities: </div>
                  <div className="flex p-1 m-1 text-l rounded-3xl font-lacquer">
                    {abilities}
                  </div>
                </div>
              )}
              <Link
                to={`/s1`}
                className="p-1 text-2xl text-black font-almendra"
              >
                First Seen: S01E01
              </Link>
              {/* <Debut debut={debut} /> */}
              {/* <div className="flex justify-evenly">
                <button className="font-lacquer">Kills</button>
                <button className="font-lacquer">RIP</button>
                <button className="font-lacquer">Loves</button>
              </div> */}
            </div>
            <div className="ml-3">
              <Badge icon={species} />
            </div>
            {catchPhrase && (
              <div className="p-1 mt-4 text-xl text-black font-almendra">
                {catchPhrase}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
