const About = () => {
  return (
    <div className="bg-[url('src/assets/frames/texture.jpg')] w-2/3 h-2/3 rounded-3xl bg-cover p-3">
      <div className="p-3 m-auto border-2 rounded-3xl border-amber-400">
        <div className="p-2 mb-2 text-4xl text-center border-b-2 font-lacquer border-amber-400">
          About
        </div>
        <div className="flex flex-col justify-around">
          The project combines various technologies to create a web application
          dedicated to the Buffyverse, a fictional universe created by Joss
          Whedon. The inspiration for this project came from the Rick and Morty
          API project. The front-end of the application is built using
          TypeScript, Urql, React, and Tailwind CSS, while the backend server
          utilizes Graph-go, Golang, GraphQL, and PostgreSQL.
        </div>
      </div>
    </div>
  );
};

export default About;
