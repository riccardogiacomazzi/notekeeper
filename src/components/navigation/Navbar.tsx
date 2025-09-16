interface NavbarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  isSearching: boolean;
  setIsItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSearch: React.Dispatch<React.SetStateAction<string>>;
  isNewItemOpen: boolean;
  setIsNewItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({
  searchText,
  setSearchText,
  isSearching,
  setIsItemOpen,
  setIsSearching,
  setCurrentSearch,
  isNewItemOpen,
  setIsNewItemOpen,
}: NavbarProps) => {
  // search handles
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchEnter = (toSearch: string) => {
    if (toSearch.trim() === "") {
      return;
    }

    setIsSearching(true);
    console.log("Searching: ", toSearch);
    setCurrentSearch(toSearch);
    setIsItemOpen(false);
  };

  const handleSearchEmpty = () => {
    setIsSearching(false);
    setSearchText("");
  };

  // new post handles
  const handleNewPostModalOpen = () => {
    setIsNewItemOpen(!isNewItemOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 mx-auto w-full h-12 border-gray-300 z-50 bg-white flex items-center justify-between px-4">
      <div className="flex gap-4 items-center h-full">
        {/* App name */}
        <div className="cursor-pointer p-1">notenavigator</div>
        <div className="flex relative">
          {/* Search bar */}
          <input
            className={`w-[30vw] text-left p-1 border border-transparent hover:border-gray-300 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:border-gray-300 cursor-text
                      ${isSearching && "bg-gray-100 border-gray-300:"}`}
            type="text"
            onChange={handleSearchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchEnter(searchText);
            }}
            value={searchText}
            placeholder="search notenavigator"
          />
          {searchText.length !== 0 && (
            <div className="relative flex justify-center items-center">
              <span
                className="absolute w-[10%] right-10 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer items-center"
                onClick={handleSearchEmpty}
              >
                ✕
              </span>
              <span
                className="absolute w-[10%] right-6 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer items-center"
                onClick={() => handleSearchEnter(searchText)}
              >
                →
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center h-full">
        <div
          className={`cursor-pointer border border-gray-300 p-1 hover:bg-gray-100 text-gray-500
          ${isNewItemOpen && "bg-gray-100"}`}
          onClick={handleNewPostModalOpen}
        >
          new note
        </div>
        <div className="h-[1.75em] aspect-square rounded-full bg-gradient-to-r from-indigo-200 to-teal-200 cursor-pointer hover:opacity-30 transition-opacity duration-200"></div>
      </div>
    </div>
  );
};
