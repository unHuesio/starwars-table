"use client";
import Card, { Character } from "@/components/card";
import { useApiCharacter } from "@/hooks/useApiCharacter";

export default function Home() {
  const { character, isLoading, isError } = useApiCharacter()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-semibold text-6xl">Star Wars Universe.</h1>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}
        {character && <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {character.results.map((c: Character) => (
            <Card
              key={c.uid}
              character={c}
            />
          ))}
        </ul>}
      </main>
    </div>
  );
}
