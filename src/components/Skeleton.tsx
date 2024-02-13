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

export const ProfileWidgetHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Skeleton className="h-11 w-11 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-14 w-[125px]" />
    </div>
  );
};

export const ProfileWidgetMidSectionSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton className="my-1 mb-4 h-10 w-32" />
      <Skeleton className="h-[50px] w-40" />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-1 flex-row-reverse items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-9 w-60  items-center" />
      <Skeleton className="h-9 w-72  items-center" />
    </div>
  );
};
