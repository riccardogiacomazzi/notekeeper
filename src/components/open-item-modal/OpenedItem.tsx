import type { ContentItem } from "../../types/types";
import { useEffect, useState, type SetStateAction } from "react";

interface OpenedItemProps {
  displayedContent: ContentItem[];
  openedItem: ContentItem | null;
  setOpenedItem: React.Dispatch<SetStateAction<ContentItem | null>>;
  indexOpen: number | null;
  setIndexOpen: React.Dispatch<SetStateAction<number | null>>;
  isItemOpen: boolean;
  setIsItemOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const OpenedItem = ({
  displayedContent,
  openedItem,
  setOpenedItem,
  indexOpen,
  setIndexOpen,
  isItemOpen,
  setIsItemOpen,
}: OpenedItemProps) => {
  const [commentText, setCommentText] = useState<string>("");
  const [isEditMenuOpen, SetIsEditMenuOpen] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [updatedNoteText, setUpdatedNoteText] = useState<string>("");

  // handle noteEdit Button - editing note & saving
  const handleNoteEdit = (indexOpen: number | null) => {
    if (indexOpen === null) return;
    SetIsEditMenuOpen(!isEditMenuOpen);

    console.log("editing the note with index:", indexOpen);
  };

  const handleNoteEditClose = () => {
    SetIsEditMenuOpen(false);
    setIsEditingNote(false);
  };

  const handleSaveNote = () => {
    setIsEditingNote(!isEditingNote);
    SetIsEditMenuOpen(!isEditMenuOpen);
    if (openedItem) {
      setUpdatedNoteText(openedItem?.content);
    }
    // send POST to api to update note
  };

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedNoteText(e.target.value);
  };

  const handleUpdateEditedNote = (updatedNote: string, index: number) => {
    console.log("text:", updatedNote);
    console.log("index of the note:", index);
  };

  //handle navigation though opened item -> next and prev item
  const handlePrevItem = (indexOpen: number | null) => {
    if (!displayedContent || displayedContent.length === 0 || indexOpen === null) return;

    const newIndex = indexOpen === 0 ? displayedContent.length - 1 : indexOpen - 1;

    setIndexOpen(newIndex);
    setOpenedItem(displayedContent[newIndex]);
    setIsEditingNote(false);
    SetIsEditMenuOpen(false);
  };

  const handleNextItem = (indexOpen: number | null) => {
    if (!displayedContent || displayedContent.length === 0 || indexOpen === null) return;

    const newIndex = indexOpen === displayedContent.length - 1 ? 0 : indexOpen + 1;
    setIndexOpen(newIndex);
    setOpenedItem(displayedContent[newIndex]);
    setIsEditingNote(false);
    SetIsEditMenuOpen(false);
  };

  // handle comment text change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (commentText: string) => {
    if (!commentText || !openedItem) return;

    console.log(commentText); //replace with API post
    const updatedComments = [...(openedItem.comments ?? []), { content: commentText, author: "me" }];
    const newItem = { ...openedItem, comments: updatedComments };

    setOpenedItem(newItem);

    setCommentText("");
  };

  const handleCommentDelete = (index: number) => {
    if (!openedItem || !openedItem.comments) return;

    console.log(openedItem?.comments[index].content);
  };

  return (
    <div className="fixed inset-0 flex justify-center z-40">
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-md overflow-hidden"
        onClick={() => setIsItemOpen(false)}
      />
      {/* item box */}
      <div className="h-[calc(100vh-8rem)] w-full z-50 mt-16 mx-12 flex bg-white border">
        <div className="w-3/4 border-r flex flex-col overflow-y-auto py-8 relative">
          {/* item title */}
          <div className={`absolute h-6 max-w-[90%] truncate text-lg top-2 left-4 text-gray-400`}>
            {openedItem?.title}
          </div>
          {/* edit text button */}
          <div className="absolute h-5 top-2 right-2 ml-2 flex gap-1">
            {isEditMenuOpen && (
              <div className="flex flex-row gap-1">
                {isEditingNote && (
                  <div
                    className={`w-24 h-6 relative flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:cursor-pointer border`}
                    onClick={handleSaveNote}
                  >
                    Save
                  </div>
                )}
                <div className="w-24 h-6 relative flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:cursor-pointer border">
                  Delete
                </div>
              </div>
            )}

            {!isEditMenuOpen ? (
              <div
                className={`w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:cursor-pointer hover:border
                ${isEditMenuOpen && "bg-gray-100 border"}`}
                onClick={() => handleNoteEdit(indexOpen)}
              >
                •••
              </div>
            ) : (
              <div
                className={`w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:cursor-pointer hover:border
                ${isEditMenuOpen && "bg-gray-100 border"}`}
                onClick={() => handleNoteEditClose()}
              >
                ✕
              </div>
            )}
          </div>
          <div className="relative w-full h-full px-12 py-4">
            {!isEditingNote ? (
              <div
                className={`w-full h-full px-2 hover:cursor-pointer whitespace-pre-wrap border
            ${isEditingNote && "bg-gray-100"}`}
                onClick={handleSaveNote}
              >
                {openedItem?.content}
              </div>
            ) : (
              <textarea
                value={updatedNoteText}
                onChange={handleNoteTextChange}
                className="w-full h-full px-2 bg-gray-100 focus:outline-none"
              ></textarea>
            )}
          </div>
        </div>
        {/* Info - comments - add comment box */}
        <div className="w-1/4 flex flex-col relative">
          {/* buttons */}
          <div className="absolute w-20 h-5 top-2 right-2 ml-2 flex gap-1">
            <div
              className="w-6 h-6 flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer hover:border"
              onClick={() => handlePrevItem(indexOpen)}
            >
              ←
            </div>
            <div
              className="w-6 h-6 flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer hover:border"
              onClick={() => handleNextItem(indexOpen)}
            >
              →
            </div>
            <div
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 hover:cursor-pointer hover:border"
              onClick={() => setIsItemOpen(false)}
            >
              ✕
            </div>
          </div>
          {/* Post info - comments - text box */}
          {/* post info */}
          <div className="w-full h-auto pt-12 px-2 mb-4">
            <div className="text-sm flex justify-between border-b">
              <span>Author</span>
              <span className="font-bold hover:cursor-pointer">{openedItem?.author}</span>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Added</span>
              <span>timestamp</span>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Edited</span>
              <span>timestamp</span>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Background</span>
              <a
                className={`text-black visited:text-black hover:underline hover:cursor-pointer`}
                href={openedItem?.image}
                target="_blank"
              >
                ✵ Source ✵ →
              </a>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Tags</span>
              <span className="flex flex-row gap-1">
                {openedItem?.tags.map((item, index) => (
                  <div key={index} className="hover:cursor-pointer hover:underline">
                    {item}
                  </div>
                ))}
              </span>
            </div>
          </div>
          {/* comments posted */}
          <div className="p-2 w-full flex-1 text-sm overflow-y-auto">
            {openedItem?.comments?.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <div className="font-bold mr-2 hover:cursor-pointer">{item.author}</div>
                    <div className="text-xs text-gray-500">timestamp</div>
                  </div>
                  <div
                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-gray-500 hover:cursor-pointer hover:border"
                    onClick={() => handleCommentDelete(index)}
                  >
                    •••
                  </div>
                </div>
                <span>{item.content}</span>
              </div>
            ))}
          </div>

          {/* add comment box */}
          <div className="p-2 w-full h-1/5 flex flex-col justify-between items-center">
            <textarea
              className="w-full h-3/4 p-2 mb-1 text-start text-sm resize-none bg-gray-100 focus:outline-none"
              placeholder="Add new comment"
              value={commentText}
              onChange={handleCommentChange}
            />
            <div
              className={`
                ${!commentText ? "text-gray-300" : "text-black"}
                ${!commentText ? "cursor-default" : "cursor-pointer"}
                w-1/2 h-1/4 bg-gray-100 flex ml-auto justify-center items-center text-sm`}
              onClick={() => handleCommentSubmit(commentText)}
            >
              Add comment →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
