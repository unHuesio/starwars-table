import useSWR from 'swr'
import { API_BASE_URL } from '@/utils/config'
import { fetcher } from '@/utils/network'


export function useApiCharacter (id: string = "") {
    const { data, error, isLoading } = useSWR(`${API_BASE_URL}/people/${id}`, fetcher)
   
    return {
      character: data,
      isLoading,
      isError: error
    }
  }