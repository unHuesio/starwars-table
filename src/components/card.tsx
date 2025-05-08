export type Character = {
    uid: string;
    name: string;
    url: string;
}

type CardProps = {
    character: Character;
    highlight?: boolean;
};

export default function Card({ character, highlight = false }: CardProps) {
    const { name } = character;
    // Get the first letter of the name for the big letter display
    const letter = name.charAt(0).toUpperCase();
    
    return (
        <div className={`card flex flex-col items-center justify-center p-6 aspect-square ${highlight ? 'bg-[#ffcd38]' : 'bg-[#fffcdf]'}`}>
            <h2 className="text-8xl font-bold">{letter}</h2>
            <p className="text-sm text-center mt-2">{name}</p>
        </div>
    )
}