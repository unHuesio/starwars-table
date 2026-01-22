"use client";
import { useEffect, useState, useCallback, useRef } from "react"
import Card, { Character } from "@/components/card";
import Selector from "@/components/selector";
import { useApiType } from "@/hooks/useApiType";

export default function Home() {
  const [nextPage, setNextPage] = useState("?page=1");
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, isLoading, isError } = useApiType("people", "", nextPage);
  const filmResponse = useApiType("films")
  const planetResponse = useApiType("planets")
  const speciesResponse = useApiType("species")
  const [items, setItems] = useState<{results: Character[]; next: string}>({results: [], next: ""});
  const itemsRef = useRef(items); // Ref to hold current items for scroll handler

  // Update ref whenever items changes
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const loadMoreItems = () => {
    if (loadingMore) return; // Prevent multiple loads
    if(itemsRef.current && itemsRef.current.next) {
      setLoadingMore(true);
      const nextParams = itemsRef.current.next.split("api/people")[1];
      setNextPage(nextParams);
    }
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreItems()
    }
  }

  useEffect(() => {
    if(data && !isLoading && !isError) {
      setItems(prev => ({ results: [...prev.results, ...data.results], next: data.next })); // Append results
      setLoadingMore(false);
    }
  }, [data, isLoading, isError])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="font-semibold text-9xl text-left mb-8">Star Wars <br/> Universe.</h1>
      <nav>
        <h6>What are you looking for?</h6>
        <ul className="flex gap-4 text-lg mb-8">
          <li className="cursor-pointer">
            <Selector
              options={{
                type: "Film",
                list: filmResponse.data ? filmResponse.data.result.map((f: any) => f.properties.title) : [],
                onChange: (e) => console.log(e.target.value)
              }}
              isLoading={filmResponse.isLoading}
              hasError={filmResponse.isError}
            />
          </li>
           <li className="cursor-pointer">
            <Selector
              options={{
                type: "Planet",
                list: planetResponse.data ? planetResponse.data.results.map((p: any) => p.name) : [],
                onChange: (e) => console.log(e.target.value)
              }}
              isLoading={planetResponse.isLoading}
              hasError={planetResponse.isError}
            />
          </li>
          <li className="cursor-pointer">
            <Selector
              options={{
                type: "Species",
                list: speciesResponse.data ? speciesResponse.data.results.map((s: any) => s.name) : [],
                onChange: (e) => console.log(e.target.value)
              }}
              isLoading={speciesResponse.isLoading}
              hasError={speciesResponse.isError}
            />
          </li>
        </ul>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}
        {items && <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.results.map((c: Character) => (
            <Card
              key={c.uid+c.name}
              character={c}
            />
          ))}
        </ul>}
      </main>
    </div>
  );
}
