import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useModifyQueryParams = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const modifyQueryParams = (key: string, value: string, cb?: (params: URLSearchParams) => void) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        if (cb) {
          cb(params)
          return
        }
        replace(`${pathname}?${params.toString()}`);
      }

      return { modifyQueryParams }
}