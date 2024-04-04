// NOTE: THIS FILE IS COPIED FROM BACKEND REPO. ANY CHANGES MADE HERE OR THERE SHOULD BE MADE THERE AS WELL.
export default interface Room {
  id: number
  creator_address: string
  name: string
  description: string
  type: string
  password?: string
  logo_url: string
  created_at: string
  updated_at: string
}
