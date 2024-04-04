// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.

// UserRoom defines a user's metadata that is specific to a room.
// For simplicity, user is not a separate entity in the database.
export default interface UserRoom {
  id: number
  created_at: string
  last_visit: string
  address: string
  room_id: number
}
