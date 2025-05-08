import useSWR from 'swr'
import { API_BASE_URL } from '@/utils/config'
import { fetcher } from '@/utils/network'
import People from 'swapi-typescript/dist/models/People'
import { BaseResult } from '@/types/baseResult'
import PagedResults from 'swapi-typescript/dist/models/PagedResults'
import useSWRInfinite from 'swr/infinite'

type Characters = PagedResults<{
  uid: string;
  name: string;
  url: string;
}>
type Character = BaseResult<People>

export function useApiCharacter (id?: string) {
    const { data, error, isLoading } = useSWR<typeof id extends string ? Character : Characters>(
      id ? `${API_BASE_URL}/people/${id}` : `${API_BASE_URL}/people/`,
      fetcher
    )
   
    return {
      character: data,
      isLoading,
      isError: error
    }
}

// New hook for infinite pagination
export function useApiCharacterInfinite() {
  // This function generates the key for each page - it points to the next URL to fetch
  const getKey = (pageIndex: number, previousPageData: Characters | null) => {
    // Reached the end
    if (previousPageData && !previousPageData.next) return null
    
    // First page, we don't have previousPageData
    if (pageIndex === 0) return `${API_BASE_URL}/people/`
    
    // Using the next URL from the previous page
    return previousPageData!.next
  }

  const {
    data,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate
  } = useSWRInfinite<Characters>(getKey, fetcher)

  // Combine all characters from all pages
  const characters = data ? data.flatMap(page => page.results) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.results.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.next === null)

  return {
    characters,
    error,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    size,
    setSize,
    isValidating,
    mutate
  }
}