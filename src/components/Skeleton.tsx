import { Skeleton } from "./ui/skeleton";

export const InventoryTabsSkeleton = () => {
  return (
    <Skeleton className="h-[416px] rounded-xl bg-gray-800 px-4 py-2">
      <div className="flex h-full flex-col gap-2 bg-gray-800 p-2">
        <div className="flex gap-2 rounded-xl bg-gray-900 p-2">
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
        </div>
      </div>
    </Skeleton>
  );
};
