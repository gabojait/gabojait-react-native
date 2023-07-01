import {useState} from 'react'
import {QueryFunctionContext, useInfiniteQuery} from 'react-query'

export interface PageReqeust {
  pageFrom: number
  pageSize: number
}

export function useTeamList<P extends PageReqeust & {[key: string]: string | number}, R>({
  initialParam,
  key,
  fetcher,
}: {
  initialParam: P
  key: string
  fetcher:
    | ((params: QueryFunctionContext<(string | number)[], P>) => Promise<R[]>)
    | ((params: QueryFunctionContext<(string | number)[], P>) => R[])
}) {
  const [param, setParam] = useState<P>(initialParam)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {data, isLoading, error, fetchNextPage, refetch} = useInfiniteQuery(
    [key, ...Object.values(initialParam)],
    async p => {
      const res = await fetcher({...p, pageParam: param});
      setIsRefreshing(false)
      return res ?? []
    },
    {
      staleTime: 200000,
      getNextPageParam: (lastPage: R[]) => {
        if (lastPage.length >= param.pageSize) {
          return param.pageFrom + 1
        } else {
          return undefined
        }
      },
    },
  )
  return {
    data,
    isLoading: isLoading,
    error,
    fetchNextPage,
    refetch,
    param,
    isRefreshing,
  }
}
