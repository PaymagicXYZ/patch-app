import { useSearchParams } from "next/navigation";

export const useAppendQueryParams = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const appendQueryParams = (key: string, value: string, cb?: (params: URLSearchParams) => void) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        cb?.(params)
      }

      return { appendQueryParams }
}