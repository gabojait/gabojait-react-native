import {useState} from 'react';
import {QueryFunctionContext, useInfiniteQuery} from 'react-query';

export interface PageRequest {
    pageFrom?: number;
    pageSize: number;
}

export interface PageModel<T> {
    page: number;
    total: number;
    data: T[];
}

export function useModelList<P extends (PageRequest & { [key: string]: string | number }), R>({
                                                                                                  initialParam,
                                                                                                  key,
                                                                                                  fetcher,
                                                                                              }: {
    initialParam: P;
    key: string | Array<string | {}>
    fetcher:
        | ((params: { pageParam: number; queryKey: string | Array<string | {}> }) => Promise<PageModel<R>>)
        | ((params: { pageParam: number; queryKey: string | Array<string | {}> }) => PageModel<R>);
}) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {data, isLoading, error, fetchNextPage, refetch} = useInfiniteQuery(
        typeof key === 'string' ? [key, {...initialParam, pageFrom: undefined}] : key,
        async ({pageParam = 0, queryKey}) => {
            const res = await fetcher({pageParam, queryKey});
            setIsRefreshing(false);
            return res;
        },
        {
            staleTime: 200000,
            getNextPageParam: (lastPage: PageModel<R>) => {
                // 현재 페이지의 요소 수가 페이지 크기보다 적을 때 last page!
                console.log(lastPage.page)
                if (lastPage.data.length < initialParam.pageSize) return undefined;
                else return lastPage.page + 1;
            },
        },
    );
    return {
        data,
        isLoading: isLoading,
        error,
        fetchNextPage,
        refetch,
        isRefreshing,
    };
}
