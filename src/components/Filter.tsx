import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

export type Filter = {
  species: string;
  icon: string;
};

const options: Filter[] = [
  { species: "Human", icon: "👩‍🦱" },
  { species: "Vampire", icon: "🧛" },
  { species: "Werewolf", icon: "🐺" },
  { species: "Witch", icon: "🧙" },
  { species: "Demon", icon: "👿" },
  { species: "Watcher", icon: "👓" },
  { species: "Slayer", icon: "🗡️" },
  { species: "Robot", icon: "🤖" },
  { species: "Key", icon: "🔑" },
  { species: "Other", icon: "👽" },
];

type Props = {
  setFilter: (species: string | null) => void;
};
export const Filters: React.FC<Props> = ({ setFilter }) => {
  // TODO: Create a way to highlight the selected filter on the filter button. Debug if active
  const [selected, setSelected] = useState<string | null>(null);

  // To check if filter is already set.
  const handleClick = (species: string) => {
    if (species === selected) {
      setSelected(null);
      setFilter(null);
    } else {
      setSelected(species);
      setFilter(species);
    }
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="inline-flex text-5xl text-white border-red-700 font-longCang gap-x-1 focus:border-red-700 focus:outline-none">
          <img
            className="w-12 invert"
            src={"https://cdn-icons-png.flaticon.com/512/234/234515.png"}
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 flex w-screen pl-8 mt-5 -translate-x-3/4 max-w-min">
            <div className="w-48 p-4 text-3xl text-gray-900 bg-cover shadow-lg font-longCang bg-texture shrink rounded-xl ring-1 ring-gray-900/5">
              {options.map((item: Filter) => (
                <button
                  key={item.species}
                  onClick={() => handleClick(item.species)}
                  className="block p-2 hover:text-red-800 active:bg-violet-700"
                >
                  {item.icon}
                  {item.species}
                </button>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};
