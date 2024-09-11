import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="font-bold text-4xl">Games</h1>
      <div className="grid grid-cols-6">
        <Link href="/games/eafc24">
          <Card>
            <CardHeader>
              <CardTitle>EA FC24</CardTitle>
            </CardHeader>
            <CardContent>
              <div>2 Divisons</div>
              <div>8 Players</div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
