// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.
export default interface Meme {
  id: number
  creatorAddress: string
  roomId: number
  url: string
  likers: string[]
  likesCount: number
  createdAt: string
  updatedAt: string
}
