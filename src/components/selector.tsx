
export type Selector = {
    type: string;
    list: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type SelectProps = {
    options: Selector;
    isLoading?: boolean;
    hasError?: boolean;
};

export default function Selector({ options, isLoading, hasError }: SelectProps) {
    const { list, type, onChange } = options;
    return (
        <div>
            <span className="mr-4">{type}:</span>
            {isLoading && <p>Loading...</p>}
            {hasError && <p>Something went wrong...</p>}
            {list && <select onChange={onChange} className="selector">
                {list.map((item: string) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>}
        </div>
    )
}