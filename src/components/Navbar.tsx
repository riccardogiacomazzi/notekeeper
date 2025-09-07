import { useState } from "react";

export const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const handleSearchEnter = (toSearch: string) => {
    console.log("Searching: ", toSearch);
    setSearchText("");
  };

  return (
    <div className="fixed top-0 left-0 right-0 mx-auto w-14/15 h-12 border-b border-gray-300 bg-white flex items-center justify-between px-4">
      <div className="flex gap-4 items-center h-full">
        <div className="cursor-pointer p-1">notekeeper</div>
        <div className="flex relative">
          <input
            className="w-[30vw] text-left p-1 border border-transparent hover:border-gray-300 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:border-gray-300 cursor-text"
            type="text"
            onChange={handleSearchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchEnter(searchText);
            }}
            value={searchText}
            placeholder="search notebook"
          />
          {searchText.length !== 0 && (
            <span
              className="absolute w-[10%] right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => handleSearchEnter(searchText)}
            >
              →
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center h-full">
        <div className="cursor-pointer border border-gray-300 p-1 hover:opacity-50 hover:bg-gray-100 ">New Post</div>
        <div className="h-[1.75em] aspect-square rounded-full bg-gradient-to-r from-indigo-200 to-teal-200 cursor-pointer hover:opacity-30 transition-opacity duration-200"></div>
      </div>
    </div>
  );
};
