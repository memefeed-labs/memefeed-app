// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.

// UserRoom defines a user's metadata that is specific to a room.
export default interface UserRoom {
  id: number;
  createdAt: string;
  lastVisit: string;
  userId: number;
  roomId: number;
};
