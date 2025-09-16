import { useEffect, useState } from "react";
import "./App.css";
import type { ContentItem } from "./types/types";
import { Navbar } from "./components/navigation/Navbar";
import testContent from "./assets/test";
import { SearchParameters } from "./components/home-page/SearchParameters";
import { ItemGrid } from "./components/home-page/ItemGrid";
import { OpenedItem } from "./components/open-item-modal/OpenedItem";
import { NewItem } from "./components/new-item-modal/NewItem";

function App() {
  // search feature on NavBar
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("Content");
  // opened item modal
  const [displayedContent, setDisplayedContent] = useState<ContentItem[]>([]);
  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);
  const [openedItem, setOpenedItem] = useState<ContentItem | null>(null);
  const [indexOpen, setIndexOpen] = useState<number | null>(null);
  // new post modal
  const [isNewItemOpen, setIsNewItemOpen] = useState<boolean>(false);

  // Data filtering of displayed notes
  const handleFilterContent = (array: ContentItem[], searchCriteria: string, searchText: string) => {
    const search = searchText.trim().toLowerCase();
    const criteria = searchCriteria.trim().toLowerCase();

    if (!search) return array;

    return array.filter((item) => {
      if (criteria === "author") {
        return item.author.toLowerCase().includes(search);
      } else if (criteria === "tags") {
        return item.tags.some((t) => t.toLowerCase().includes(search));
      } else return item.content.toLowerCase().includes(search);
    });
  };

  let filteredData: ContentItem[];

  useEffect(() => {
    filteredData = handleFilterContent(testContent, searchCriteria, searchText);
    setDisplayedContent(filteredData);
  }, [currentSearch, searchCriteria, isSearching]);

  //handle no scroll on modal open
  useEffect(() => {
    if (isItemOpen || isNewItemOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isItemOpen, isNewItemOpen]);

  return (
    <div className="hide-scrollbar">
      {/* NAVBAR */}
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setIsItemOpen={setIsItemOpen}
        setCurrentSearch={setCurrentSearch}
        isNewItemOpen={isNewItemOpen}
        setIsNewItemOpen={setIsNewItemOpen}
      />

      {/* MAPPING */}
      <div className="w-full">
        <div className="py-12 mx-4">
          {/* search results */}
          <div className=" flex items-center h-12">
            {isSearching ? (
              <SearchParameters
                searchText={searchText}
                testContent={testContent}
                filteredContent={displayedContent}
                currentSearch={currentSearch}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
              />
            ) : (
              <div className="flex text-left font-bold">
                <div>Explore •</div>
                <div> Explore •</div>
                <div> Explore </div>
              </div>
            )}
          </div>
          {/* item grid */}
          <ItemGrid
            displayedContent={displayedContent}
            setIsItemOpen={setIsItemOpen}
            setOpenedItem={setOpenedItem}
            setIndexOpen={setIndexOpen}
          />
          {/* opened item modal */}
          {isItemOpen && (
            <OpenedItem
              displayedContent={displayedContent}
              openedItem={openedItem}
              setOpenedItem={setOpenedItem}
              indexOpen={indexOpen}
              setIndexOpen={setIndexOpen}
              isItemOpen={isItemOpen}
              setIsItemOpen={setIsItemOpen}
            />
          )}
          {/* new post modal */}
          {isNewItemOpen && <NewItem setIsNewItemOpen={setIsNewItemOpen} />}
        </div>
      </div>
    </div>
  );
}

export default App;
