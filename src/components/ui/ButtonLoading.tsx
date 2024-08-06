import { SpinnerBall } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({ size, variant }: { size: any; variant: any }) {
  return (
    <Button disabled size={size} variant={variant}>
      <SpinnerBall className="mr-2 h-4 w-4 animate-spin" />
      Mohon tunggu
    </Button>
  );
}
