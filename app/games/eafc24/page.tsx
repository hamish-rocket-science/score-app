import { divisions } from "@/app/data/divisions";
import { DivisionSection } from "./division";

export default function Game() {
  return (
    <main className="flex flex-col">
      <header className="bg-gray-100 p-4">
        <h1 className="font-black text-4xl">EA FC24</h1>
      </header>
      <div className="p-4">
        {divisions.map((division) => (
          <DivisionSection division={division} key={division.id} />
        ))}
      </div>
    </main>
  );
}
