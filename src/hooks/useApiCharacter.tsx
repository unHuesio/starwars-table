import useSWR from 'swr'
import { API_BASE_URL } from '@/utils/config'
import { fetcher } from '@/utils/network'
import People from 'swapi-typescript/dist/models/People'
import { BaseResult } from '@/types/baseResult'
import PagedResults from 'swapi-typescript/dist/models/PagedResults'

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