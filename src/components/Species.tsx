interface BadgeProps {
  icon: string;
}

const defaultIcon = "src/assets/icons/watcher.png";

const whichIcon = (species: string) => {
  switch (species) {
    case "Human":
      return "src/assets/icons/loves.png";
    case "key":
      return "src/assets/icons/key.png";
    case "Demon":
      return "src/assets/icons/demon.png";
    case "Witch":
      return "src/assets/icons/witch.png";
    case "Robot":
      return "src/assets/icons/robot.png";
    case "Hell-God":
      return "src/assets/icons/god.png";
    case "Vampire":
      return "src/assets/icons/vampire.png";
    case "Watcher":
      return "src/assets/icons/watcher.png";
    case "Werewolf":
      return "src/assets/icons/werewolf.png";
    case "Slayer":
      return "src/assets/icons/slayer.png";
    default:
      return defaultIcon;
  }
};

export const Badge: React.FC<BadgeProps> = ({ icon }) => {
  const speciesIcon = whichIcon(icon);
  return (
    <div className="relative">
      <div className="absolute w-12 h-12 rounded-full -top-6 left-28 bg-amber-400 ">
        <img
          className="absolute w-10 h-10 pt-1 pl-1 grayscale-0 left-1 mix-blend-darken"
          src={speciesIcon}
        />
      </div>
    </div>
  );
};
