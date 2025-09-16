import { useState, type SetStateAction } from "react";

interface NewItemProps {
  setIsNewItemOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const NewItem = ({ setIsNewItemOpen }: NewItemProps) => {
  const [newItemTitleText, setNewItemTitleText] = useState<string>("");
  const [newItemText, setNewItemText] = useState<string>("");
  const [newItemTags, setNewItemTags] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  //new title handle
  const handleNewTitleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemTitleText(e.target.value);
  };

  //new item text handle
  const handleNewItemText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewItemText(e.target.value);
  };

  //tags input handle
  const handleNewTagsText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemTags(e.target.value);
  };

  const handleAddTags = () => {
    // split on comma, trim whitespace, remove empties
    const newTags = newItemTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setTags((prev) => [...prev, ...newTags]);
    setNewItemTags("");
    setIsNewItemOpen(false);
    return newTags;
  };

  //new note submit
  const handleNewItemSubmit = (title: string, noteContent: string) => {
    const tags = handleAddTags();
    console.log(title, noteContent, tags);
  };

  return (
    <div className="fixed inset-0 flex justify-center z-40">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md overflow-hidden" />
      <div className="relative h-[calc(100vh-8rem)] w-full z-50 mt-16 mx-12 flex flex-col bg-white border">
        {/* title input */}
        <input
          className={`text-left max-w-[50%] p-1 border border-transparent border-gray-300 bg-gray-100 focus:outline-none cursor-text`}
          type="text"
          onChange={handleNewTitleText}
          value={newItemTitleText}
          placeholder="title"
        />
        {/* post input */}
        <div className="relative w-full h-full px-12 py-4">
          <textarea
            value={newItemText}
            onChange={handleNewItemText}
            className="w-full h-full px-2 bg-gray-100 focus:outline-none"
          ></textarea>
        </div>
        {/* tags input */}
        <input
          className={`text-left max-w-[50%] p-1 border border-transparent border-gray-300 bg-gray-100 focus:outline-none cursor-text`}
          type="text"
          placeholder="add tags separated by comma"
          value={newItemTags}
          onChange={handleNewTagsText}
        ></input>

        {/* close button */}
        <div className="absolute h-5 top-2 right-2 ml-2 flex gap-1">
          <div
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 hover:cursor-pointer hover:border"
            onClick={() => setIsNewItemOpen(false)}
          >
            ✕
          </div>
        </div>
        {/* add note button */}
        <div className="absolute h-5 bottom-2 right-2 ml-2 flex">
          <div
            className={`
            ${!newItemText ? "text-gray-300" : "text-black"}
            ${!newItemText ? "cursor-default" : "cursor-pointer"}
            bg-gray-100 flex ml-auto justify-center items-center text-sm`}
            onClick={() => handleNewItemSubmit(newItemTitleText, newItemText)}
          >
            Add note →
          </div>
        </div>
      </div>
    </div>
  );
};
