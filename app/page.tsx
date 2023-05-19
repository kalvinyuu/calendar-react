import TriGrid from "./grid";

export default function Page() {
  return (
    <div>
      <TriGrid year={new Date().getFullYear()} />
    </div>
  );
}
