import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[400px]" />
        <Skeleton className="h-4 w-[400px]" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-5 w-46" />
      </div>
    </>
  );
};

export default Loading;
