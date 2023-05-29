import TriGrid from "../grid";

interface PageProps {
  params: {
    year: number;
  };
}

export default function Page({ params }: PageProps) {
  return <TriGrid year={params.year} />;
}
