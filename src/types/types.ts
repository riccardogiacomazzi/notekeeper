export type CommentItem = {
  content: string;
  author: string;
};

export type ContentItem = {
  title?: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  comments?: CommentItem[];
};
