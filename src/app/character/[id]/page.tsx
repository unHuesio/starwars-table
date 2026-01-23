"use client";
import { use } from "react";
import useSWR from 'swr';
import Link from 'next/link'
import { fetcher, fetcherForArray } from '@/utils/network';
import { useApiType } from "@/hooks/useApiType";

export default function Character({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading, isError } = useApiType("people", id);
    const { data: homeworldData } = useSWR(data?.result.properties.homeworld, fetcher);
    const { data: filmData } = useSWR(data?.result.properties.films, fetcherForArray);
    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20">
        <h1 className="font-semibold text-4xl text-left mb-8"><Link href="/">Star Wars <br/> Universe.</Link></h1>
        <hr className="text-secondary-100"/>
        <main>
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
        </div>
    )
}