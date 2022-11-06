import axios from "axios";
import useSWR from "swr";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DICTIONARY_API,
});

const fetch = (url: string) => api.get(url).then(({ data }) => data[0]);

export function useApi<T = any>(
  url?: string
): {
  loading: boolean;
  data: T;
  error: any;
  isValidating: boolean;
} {
  const { data, error, isValidating } = useSWR(url, fetch, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    loading: !data && !error,
    data,
    error,
    isValidating,
  };
}
