import Dexie, { type Table } from 'dexie'
import type { ShoppingItem, Store } from '@/types/shopping'

export class ShoppingDatabase extends Dexie {
  items!: Table<ShoppingItem, string>
  stores!: Table<Store, string>

  constructor() {
    super('shopping_database')

    this.version(4).stores({
      items: 'id, storeId, bought',
      stores: 'id, name'
    })
  }
}

export const db = new ShoppingDatabase()
