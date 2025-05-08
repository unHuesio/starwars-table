export type Character = {
    uid: string;
    name: string;
    url: string;
}

type CardProps = {
    letter: string;
    name: string;
    highlight?: boolean;
};

export default function Card({ letter, name, highlight = false }: CardProps) {
    return (
        <div className={`card flex flex-col items-center justify-center p-6 aspect-square ${highlight ? 'bg-[#ffcd38]' : 'bg-[#fffcdf]'}`}>
            <h2 className="text-8xl font-bold">{letter}</h2>
            <p className="text-sm text-center mt-2">{name}</p>
        </div>
    )
}