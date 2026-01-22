export type Character = {
    uid: string;
    name: string;
    url: string;
}

type CardProps = {
    character: Character;
};

export default function Card({ character }: CardProps) {
    const { uid, name, url } = character;
    const firstLetter = name.charAt(0).toUpperCase();
    return (
        <li className="card px-16 text-center flex flex-col items-center place-content-between">
            <h2 className="text-9xl font-bold mt-16">{firstLetter}</h2>
            <p className="mb-8 mt-4">{name}</p>
        </li>
    )
}