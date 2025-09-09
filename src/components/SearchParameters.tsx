import { useEffect, useState } from "react";

interface TestContentItem {
  content: string;
  image?: string;
  author: string;
}

interface FilteredContentItem {
  content: string;
  image?: string;
  author: string;
}

interface SearchParametersProps {
  searchText: string;
  testContent: TestContentItem[];
  filteredContent: FilteredContentItem[];
  currentSearch: string;
  searchCriteria: string;
  setSearchCriteria: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchParameters = ({
  searchText,
  testContent,
  filteredContent,
  currentSearch,
  searchCriteria,
  setSearchCriteria,
}: SearchParametersProps) => {
  const searchType = ["Content", "Author", "Tags"];
  const [expanded, setExpanded] = useState(false);

  const handleSearchCriteriaChange = (criteria: string) => {
    setSearchCriteria(criteria);
    setExpanded(false);
  };

  return (
    <div className="flex text-left font-bold">
      Searching →{" "}
      <div className="relative">
        <span
          className="border rounded-md cursor-pointer w-20 flex items-center justify-center mx-2 hover:bg-gray-100 hover:text-gray-300"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {searchCriteria}{" "}
        </span>
        {expanded && (
          <div className="absolute top-0 left-0 w-20 mx-2 border rounded-md bg-white z-10">
            {searchType.map((item, index) => (
              <div
                className={`px-2 hover:bg-gray-100 cursor-pointer flex justify-center ${searchCriteria === item && "bg-gray-100"}`}
                key={index}
                onClick={() => handleSearchCriteriaChange(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      ⟶ “{<span className="text-gray-500">{currentSearch}</span>}” | {filteredContent.length} results
    </div>
  );
};
