//TODO: DEBUG FUNCTION
function getAge(dateStr: Date) {
  const endOfShow = new Date("2002-10-23");
  const birthDate = new Date(dateStr);
  let age = endOfShow.getFullYear() - birthDate.getFullYear();
  const m = endOfShow.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && endOfShow.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

type Props = {
  birthday?: number | string;
};
const Age = ({ birthday = "October 23, 1980" }: Props) => {
  const age = getAge(birthday);

  return (
    <div className="relative">
      <p className="absolute z-10 p-2 text-5xl text-black -pl-10 right-20 opacity-80 -rotate-12 -top-8 font-lacquer">
        17
      </p>
      <div className="absolute w-20 h-12 rounded-full -top-6 left-28 bg-amber-400 ">
        <img
          className="absolute w-10 h-10 pt-2 pl-1 invert left-1 mix-blend-color-dodge"
          src={"src/assets/icons/age.png"}
        />
      </div>
    </div>
  );
};
export default Age;
