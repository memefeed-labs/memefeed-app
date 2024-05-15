// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.
export default interface Meme {
  id: number;
  creatorId: number;
  roomId: number;
  url: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: number;
    username: string;
    address: string;
  };
  likers?: {
    id: number;
    username: string;
    address: string;
  }[];
};
