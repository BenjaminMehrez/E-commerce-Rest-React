import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBox({ search, onChange, onSubmit }) {
  return (
    <form onSubmit={(e) => onSubmit(e)} className="flex border-b py-2 px-2 w-70 justify-between">
      <input
        type="search"
        name="search"
        onChange={(e) => onChange(e)}
        value={search}
        placeholder="Buscar producto..."
        className="font-medium bg-transparent outline-none"
        aria-label="Search input"
        required
      />
      <button type="submit" aria-label="Perform search">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>
    </form>
  );
}

export default SearchBox;
