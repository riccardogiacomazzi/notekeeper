import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import testContent from "./assets/test";
import { SearchParameters } from "./components/SearchParameters";
import { ItemGrid } from "./components/ItemGrid";
import { OpenedItem } from "./components/OpenedItem";

type CommentItem = {
  content: string;
  author: string;
};

type ContentItem = {
  content: string;
  image?: string;
  author: string;
  tag: string[];
  comments?: CommentItem[];
};

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("Content");

  const [displayedContent, setDisplayedContent] = useState<ContentItem[]>([]);
  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);
  const [openedItem, setOpenedItem] = useState<ContentItem | null>(null);
  const [indexOpen, setIndexOpen] = useState<number | null>(null);

  // Data filtering of displayed notes
  const handleFilterContent = (array: ContentItem[], searchCriteria: string, searchText: string) => {
    const search = searchText.trim().toLowerCase();
    const criteria = searchCriteria.trim().toLowerCase();

    if (!search) return array;

    return array.filter((item) => {
      if (criteria === "author") {
        return item.author.toLowerCase().includes(search);
      } else if (criteria === "tags") {
        return item.tag.some((t) => t.toLowerCase().includes(search));
      } else return item.content.toLowerCase().includes(search);
    });
  };

  let filteredData: ContentItem[];

  useEffect(() => {
    filteredData = handleFilterContent(testContent, searchCriteria, searchText);
    setDisplayedContent(filteredData);
  }, [currentSearch, searchCriteria, isSearching]);

  return (
    <div className="hide-scrollbar">
      {/* NAVBAR */}
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setCurrentSearch={setCurrentSearch}
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
        </div>
      </div>
    </div>
  );
}

export default App;
