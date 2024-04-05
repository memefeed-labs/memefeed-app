// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.

// UserRoom defines a user's metadata that is specific to a room.
// For simplicity, user is not a separate entity in the database.
export default interface UserRoom {
  id: number
  createdAt: string
  lastVisit: string
  address: string
  roomId: number
}
