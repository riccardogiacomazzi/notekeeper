import type { SetStateAction } from "react";

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

interface ItemGridProps {
  displayedContent: ContentItem[];
  setIsItemOpen: React.Dispatch<SetStateAction<boolean>>;
  setOpenedItem: React.Dispatch<SetStateAction<ContentItem | null>>;
  setIndexOpen: React.Dispatch<SetStateAction<number | null>>;
}

export const ItemGrid = ({ displayedContent, setIsItemOpen, setOpenedItem, setIndexOpen }: ItemGridProps) => {
  //handle item selection
  const handleIsItemOpen = (displayedContent: ContentItem[], index: number) => {
    setIsItemOpen(true);
    setOpenedItem(displayedContent[index]);
    setIndexOpen(index);
    console.log(displayedContent[index]);
  };

  return (
    <div className="h-screen">
      <div className="w-auto pt-10 grid grid-cols-4 gap-4">
        {displayedContent.map((item, index: number) => (
          <div
            key={index}
            className="relative flex items-start aspect-square max-w-[300px] border mb-2 cursor-pointer hover:opacity-50 overflow-hidden"
            onClick={() => handleIsItemOpen(displayedContent, index)}
          >
            {item.image && <img className="w-full h-full object-cover opacity-20" src={item.image} alt="" />}
            <div className="absolute p-6 top-0 left-0">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
