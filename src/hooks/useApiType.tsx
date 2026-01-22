import useSWR from 'swr'
import { API_BASE_URL } from '@/utils/config'
import { fetcher } from '@/utils/network'

export type categoryType = "people" | "planets" | "films" | "species" | "vehicles" | "starships";
export function useApiType (type: categoryType = "people", id: string = "", queryParams: string = "") {
  const url = id ? `${API_BASE_URL}/${type}/${id}${queryParams}` : `${API_BASE_URL}/${type}${queryParams}`;
  const { data, error, isLoading } = useSWR(url, fetcher)
   
    return {
      data: data,
      isLoading,
      isError: error
    }
  }