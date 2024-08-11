import { SpinnerBall } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({
  size,
  variant,
  className,
}: {
  size: any;
  variant: any;
  className: any;
}) {
  return (
    <Button disabled size={size} variant={variant} className={className}>
      <SpinnerBall className="mr-2 h-4 w-4 animate-spin" />
      Mohon tunggu
    </Button>
  );
}
