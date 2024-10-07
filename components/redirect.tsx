"use client";

import { Loader2 } from "lucide-react";
import { Route } from "next";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

type Props = { to: string };

export const Redirect = ({ to }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(to as Route);
  }, [router, to]);

  return (
    <div className="flex w-screen h-screen items-center justify-center fixed top-0">
      <Loader2 className="animate-spin" />
    </div>
  );
};
