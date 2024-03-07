"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function ProfileTitle({ skeletonClass }: { skeletonClass?: string }) {
  const { data, error, isLoading } = useAuth();

  if (isLoading) {
    return <Skeleton className={cn("h-4 w-full", skeletonClass)} />;
  }

  if (error) throw Error(error.message);
  return data?.user?.name;
}

function ProfileAvatar({
  className,
  skeletonClass,
  ...props
}: {
  className?: string;
  skeletonClass?: string;
}) {
  const { data, error, isLoading } = useAuth();

  if (isLoading) {
    return <Skeleton className={cn("h-12 w-12 rounded-full", skeletonClass)} />;
  }

  if (error) throw Error(error.message);

  return (
    <Avatar className={cn("h-12 w-12", className)} {...props}>
      <AvatarImage src={data?.user?.avatar} />
      <AvatarFallback>{data?.user?.avatarFallback}</AvatarFallback>
    </Avatar>
  );
}

export { ProfileAvatar, ProfileTitle };
