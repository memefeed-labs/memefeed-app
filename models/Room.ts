// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.
export default interface Room {
  id: number;
  creatorId: number;
  name: string;
  description: string;
  type: string;
  password?: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
};
