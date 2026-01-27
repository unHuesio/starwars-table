"use client";
import { use, useState } from "react";
import useSWR from 'swr';
import Link from 'next/link'
import { fetcher, fetcherForArray } from '@/utils/network';
import { useApiType } from "@/hooks/useApiType";
import Card, { Character } from "@/components/card";

export default function Character({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading, isError } = useApiType("people", id);
    const { data: homeworldData } = useSWR(data?.result.properties.homeworld, fetcher);
    const { data: filmData } = useSWR(data?.result.properties.films, fetcherForArray);
    const [nextPage, setNextPage] = useState({"params":"?page=1&limit=10", "currentPage":1});
    const { data: charactersData, isLoading: isCharactersLoading, isError: isCharactersError } = useApiType("people", "", nextPage.params);
    const pageOptions = Array.from({ length: charactersData?.total_pages || 1 }, (_, i) => (i + 1).toString());
    const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = e.target.value;
        setNextPage({"params":`?page=${selectedPage}&limit=10`, "currentPage":parseInt(selectedPage)});
    };
    return (
        <div>
            <div className="px-8 py-10 sm:py-10">
            <h1 className="font-semibold text-4xl text-left mb-8"><Link href="/">Star Wars <br/> Universe.</Link></h1>
            <hr className="text-secondary-100"/>
            </div>
        <main className="px-8 py-10 sm:py-10">
            <div className="flex flex-row mt-12 justify-between content-between items-center">
                <div className="text-left p-8">
                    <h1 className="text-8xl font-bold">{data?.result.properties.name}</h1>
                    <p className="text-xl mt-4">Films: {filmData?.map((film: any) => film?.result.properties.title).join(', ') || 'Loading...'}</p>
                </div>
                <div className="text-left p-8">
                    <ol>
                        <li><strong>Birthyear:</strong> {data?.result.properties.birth_year}</li>
                        <li><strong>Gender:</strong> {data?.result.properties.gender}</li>
                        <li><strong>Eye Color:</strong> {data?.result.properties.eye_color}</li>
                        <li><strong>Height:</strong> {data?.result.properties.height} cm</li>
                        <li><strong>Mass:</strong> {data?.result.properties.mass} kg</li>
                        <li><strong>Hair Color:</strong> {data?.result.properties.hair_color}</li>
                        <li><strong>Skin Color:</strong> {data?.result.properties.skin_color}</li>
                        <li><strong>Homeplanet:</strong> {homeworldData?.result.properties.name || 'Loading...'}</li>
                    </ol>
                </div>
            </div>
        </main>
        <section className="p-8 pb-20 sm:p-20 bg-foreground">
            <h3 className="text-secondary text-4xl font-bold">Some other characters to explore,
            Page <select className="text-secondary-100" value={nextPage.currentPage} onChange={handlePageChange}>{pageOptions.map(page => (<option key={page} value={page}>{page}</option>))}</select>
            from {charactersData?.total_pages || "Loading..."}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                {isCharactersLoading && <p>Loading...</p>}
                {isCharactersError && <p>Error loading characters.</p>}
                {charactersData?.results.map((character: Character) => (
                    <Card
                        key={character.uid}
                        character={character}
                    />
                ))}
            </div>
        </section>
        </div>
    )
}