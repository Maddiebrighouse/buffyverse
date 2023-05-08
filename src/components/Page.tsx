import { frontendSpec, demonstrate, skills } from "../about.json";
const Page = ({ title = "About" }) => {
  return (
    <div className="bg-[url('src/assets/frames/texture.jpg')] w-2/3 h-2/3 rounded-3xl bg-cover p-3">
      <div className="p-3 m-auto border-2 rounded-3xl border-amber-400">
        <div className="p-2 mb-2 text-4xl text-center border-b-2 font-almendra border-amber-400">
          {title}
        </div>
        <p>
          Front-end project: <br />
          {frontendSpec}
        </p>
        <br />
        <p>{demonstrate}</p>
        <br />
        <p> {skills}</p>
        <br />
      </div>
    </div>
  );
};

export default Page;
