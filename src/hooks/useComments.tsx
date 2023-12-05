import useSWR, { SWRConfiguration } from "swr";

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())


const useComments = (url: string, config: SWRConfiguration = {}) => {
    const { data, isLoading, error } = useSWR(url, fetcher, config);
    return {
        data: data || '',
        isLoading: !error && !data,
        error,
    }
}

export {
    useComments
}