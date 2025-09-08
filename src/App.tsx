import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import testContent from "./assets/test";
import { SearchParameters } from "./components/SearchParameters";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("Content");

  const [displayedContent, setDisplayedContent] = useState<ContentItem[]>([]);

  // Data filtering of displayed notes
  type ContentItem = {
    content: string;
    image?: string;
    author: string;
    tag: string[];
  };

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

  useEffect(() => {
    const filteredData = handleFilterContent(testContent, searchCriteria, searchText);
    setDisplayedContent(filteredData);
  }, [currentSearch, searchCriteria, isSearching]);

  return (
    <>
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
          <div className="h-screen w-auto pt-10 grid grid-cols-4 gap-4">
            {displayedContent.map((item, index) => (
              <div
                key={index}
                className="relative flex items-start aspect-square border mb-2 cursor-pointer hover:opacity-50 overflow-hidden"
              >
                {item.image && <img className="w-full h-full object-cover opacity-20" src={item.image} alt="" />}
                <div className="absolute p-6 top-0 left-0">{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
