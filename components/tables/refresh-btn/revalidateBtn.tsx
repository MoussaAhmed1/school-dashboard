'use client';
import { useRouter } from 'next/navigation';
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefreshButton() {
  const router = useRouter();

  return   <Button
  variant={"outline"}
  className="sm:mt-0 p-3 rounded-lg"
  onClick={() => {
    router.refresh();
  }}
>
  <RotateCcw  className="h-4 w-4" />
</Button>
}