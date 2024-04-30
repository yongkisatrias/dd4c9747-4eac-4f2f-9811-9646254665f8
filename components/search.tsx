import { IoSearch } from "react-icons/io5";

const search = () => {
  return (
    <div className="relative flex flex-1">
      <input
        type="text"
        className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm"
        placeholder="Search..."
      />
      <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default search;
