import Card from "../components/Card";

const Deck = ({ people }) => {
  return (
    <div className="px-6 mx-auto text-center max-w-7xl lg:px-8">
      <ul
        role="list"
        className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-20"
      >
        {people.map((person) => (
          <Card {...person} />
        ))}
      </ul>
    </div>
  );
};

export default Deck;
