import { useEffect, useState, type SetStateAction } from "react";

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

  useEffect(() => {
    console.log(openedItem);
  }, [openedItem]);

  //handle navigation though opened item -> next and prev item
  const handlePrevItem = (indexOpen: number | null) => {
    if (!displayedContent || displayedContent.length === 0 || indexOpen === null) return;

    const newIndex = indexOpen === 0 ? displayedContent.length - 1 : indexOpen - 1;

    setIndexOpen(newIndex);
    setOpenedItem(displayedContent[newIndex]);
  };

  const handleNextItem = (indexOpen: number | null) => {
    if (!displayedContent || displayedContent.length === 0 || indexOpen === null) return;

    const newIndex = indexOpen === displayedContent.length - 1 ? 0 : indexOpen + 1;
    setIndexOpen(newIndex);
    setOpenedItem(displayedContent[newIndex]);
  };

  // handle comment text change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (commentText: string) => {
    if (!commentText) return;
    console.log(commentText); //replace with API post
    setCommentText("");
  };

  //handle no scroll on modal open
  useEffect(() => {
    if (isItemOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isItemOpen]);

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-md overflow-hidden"
        onClick={() => setIsItemOpen(false)}
      ></div>
      {/* item box */}
      <div className="fixed h-[calc(100vh-12rem)] inset-0 z-50 m-24 flex bg-white border">
        <div className="w-3/4 border-r flex flex-col overflow-y-auto p-4">
          <div className="mx-12 my-4 min-h-[200px]">{openedItem?.content}</div>
          <div className="flex items-center justify-center">
            <img className="max-w-full max-h-[500px]" src={openedItem?.image} />
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
          <div className="w-full h-1/5 pt-12 px-2 mb-4">
            <div className="text-sm flex justify-between border-b">
              <span>Author</span>
              <span className="font-bold hover:cursor-pointer">{openedItem?.author}</span>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Added</span>
              <span>timestamp</span>
            </div>
            <div className="text-sm flex justify-between border-b">
              <span>Image</span>
              <a
                className={`text-black visited:text-black hover:underline hover:cursor-pointer`}
                href={openedItem?.image}
                target="_blank"
              >
                Source →
              </a>
            </div>

            <div className="text-sm flex justify-between border-b">
              <span>Tags</span>
              <span className="flex flex-row gap-1">
                {openedItem?.tag.map((item, index) => (
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
                  <div className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 text-gray-500 hover:cursor-pointer hover:border">
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
                w-full h-1/4 bg-gray-100 flex justify-center items-center text-sm`}
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
