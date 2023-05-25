interface Props {
  age: number;
}

const Age: React.FC<Props> = ({ age }) => {
  return (
    <div className="relative">
      <p className="absolute z-10 p-2 text-5xl text-black -pl-8 right-20 opacity-80 -rotate-12 -top-6 font-lacquer">
        {age}
      </p>
      <div className="absolute w-12 h-12 rounded-full -top-6 left-28 bg-amber-400 ">
        <img
          className="absolute w-10 h-10 pt-2 pl-1 invert left-1 mix-blend-color-dodge"
          src={"src/assets/icons/age.png"}
        />
      </div>
    </div>
  );
};
export default Age;
