"use client";
import Card from "@/components/card";
import { useApiCharacterInfinite } from "@/hooks/useApiCharacter";
import { useState, useRef, useEffect, useCallback } from "react";

export default function Home() {
  const {
    characters,
    isLoading,
    error: isError,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    size,
    setSize,
  } = useApiCharacterInfinite();

  const [filterFilm, setFilterFilm] = useState("xx");
  const [filterPlanet, setFilterPlanet] = useState("xx");
  const [filterSpecies, setFilterSpecies] = useState("xx");
  const [sortOrder, setSortOrder] = useState("Name");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Create a ref for the sentinel element (to observe for intersection)
  const observerTarget = useRef<HTMLDivElement>(null);

  // Load more data when the sentinel element is visible
  const loadMoreCharacters = useCallback(() => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [isLoadingMore, isReachingEnd, setSize, size]);

  // Set up intersection observer to detect when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When sentinel element is visible, load more data
        if (entries[0].isIntersecting) {
          loadMoreCharacters();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreCharacters]);

  const handleCardClick = (uid: string) => {
    console.log("handleCardClick - current:", selectedCard, "clicking:", uid); // Debug log
    setSelectedCard((currentSelected) => {
      const newSelected = currentSelected === uid ? null : uid;
      console.log("Setting selected to:", newSelected); // Debug log
      return newSelected;
    });
  };

  return (
    <div className="flex flex-col p-8 pb-20 gap-8 sm:p-20">
      <h1 className="font-bold text-6xl sm:text-8xl">
        Star Wars
        <br />
        Universe.
      </h1>

      <div className="my-4">
        <p className="mb-4">What are you looking for?</p>

        <div className="flex flex-wrap items-center gap-6">
          <div className="filter-group">
            <label className="mr-2">Film</label>
            <button className="px-2">{filterFilm}</button>
          </div>

          <div className="filter-group">
            <label className="mr-2">Planet</label>
            <button className="px-2">{filterPlanet}</button>
          </div>

          <div className="filter-group">
            <label className="mr-2">Species</label>
            <button className="px-2">{filterSpecies}</button>
          </div>

          <div className="filter-group ml-auto">
            <label className="mr-2">Sort</label>
            <button className="px-2">{sortOrder}</button>
          </div>
        </div>
      </div>

      <main className="mt-4">
        {isLoading && !characters.length && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}
        {isEmpty && <p>No characters found</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characters.map((character, index) => (
            <Card
              key={character.uid}
              character={character}
              highlight={index % 5 === 1} // Highlight every 5th card (arbitrary pattern)
              selected={selectedCard === character.uid}
              onClick={() => handleCardClick(character.uid)}
            />
          ))}
        </div>

        {/* Sentinel element for infinite scroll */}
        {!isReachingEnd && (
          <div ref={observerTarget} className="h-4 mt-8 text-center">
            {isLoadingMore && <p>Loading more characters...</p>}
          </div>
        )}

        {isReachingEnd && characters.length > 0 && (
          <p className="text-center mt-8">
            You&apos;ve reached the end of the galaxy!
          </p>
        )}
      </main>
    </div>
  );
}
