import { MaxWidth } from "@/components/max-width";

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const PageHeader = ({ title, children }: Props) => (
  <header className="bg-gray-100 py-8 items-center">
    <MaxWidth>
      <div className="flex flex-row gap-2 justify-between">
        <h1 className="font-black text-4xl md:text-5xl">{title}</h1>
        {children}
      </div>
    </MaxWidth>
  </header>
);
