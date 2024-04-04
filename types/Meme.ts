// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.
export default interface Meme {
  id: number
  creator_address: string
  room_id: number
  url: string
  likes_count: number
  created_at: string
  updated_at: string
}
