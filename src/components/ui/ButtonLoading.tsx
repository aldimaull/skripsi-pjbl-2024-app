import { SpinnerBall } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button disabled>
      <SpinnerBall className="mr-2 h-4 w-4 animate-spin" />
      Mohon tunggu
    </Button>
  );
}
