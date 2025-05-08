export type Character = {
  uid: string;
  name: string;
  url: string;
};

type CardProps = {
  character: Character;
  highlight?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export default function Card({
  character,
  highlight = false,
  selected = false,
  onClick,
}: CardProps) {
  const { name } = character;
  const letter = name.charAt(0).toUpperCase();

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: selected ? "#ffcd38" : "#fffcdf",
      }}
      className="card flex flex-col items-center justify-center p-6 aspect-square cursor-pointer"
    >
      <h2 className="text-8xl font-bold">{letter}</h2>
      <p className="text-sm text-center mt-2">{name}</p>
    </div>
  );
}
