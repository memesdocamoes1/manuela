export interface ShoppingItem {
  id: string
  name: string
  quantity: number
  bought: boolean
  store_id: string | null
  created_at?: string
}

export interface Store {
  id: string
  name: string
  color: string
  created_at?: string
}
