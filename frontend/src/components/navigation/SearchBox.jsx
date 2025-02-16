import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBox({ search, onChange, onSubmit }) {
  return (
    <form onSubmit={(e) => onSubmit(e)} className="flex bg-white px-4 py-2 rounded-2xl w-70 justify-between">
      <input
        type="search"
        name="search"
        onChange={(e) => onChange(e)}
        value={search}
        placeholder="Buscar producto..."
        className="bg-white text-black"
        aria-label="Search input"
        required
      />
      <button type="submit" aria-label="Perform search">
        <MagnifyingGlassIcon className="h-6 w-6 text-black" />
      </button>
    </form>
  );
}

export default SearchBox;
