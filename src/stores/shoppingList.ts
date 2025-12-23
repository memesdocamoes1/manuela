import { defineStore } from 'pinia'
import { supabase } from '@/db/supabase'
import type { ShoppingItem, Store } from '@/types/shopping'

export const useShoppingListStore = defineStore('shoppingList', {
  state: () => ({
    stores: [] as Store[],
    items: [] as ShoppingItem[],
    loaded: false,

    // 🔎 filtros
    searchText: '',
    selectedStoreId: 'all' as 'all' | string | null
  }),

  getters: {
    storeById: (state) => (id: string | null | undefined) =>
      id ? state.stores.find(s => s.id === id) : undefined,

    filteredItems(state) {
      return state.items.filter(item => {
        // 🔎 texto
        const matchesText =
          state.searchText === '' ||
          item.name.toLowerCase().includes(state.searchText.toLowerCase())

        // 🏬 armazém
        const matchesStore =
          state.selectedStoreId === 'all' ||
          (state.selectedStoreId === null && item.store_id === null) ||
          item.store_id === state.selectedStoreId

        return matchesText && matchesStore
      })
    }
  },

  actions: {
    /* =========================
       LOAD
    ========================= */
    async loadAll() {
      this.loaded = false

      const { data: stores } = await supabase
        .from('stores')
        .select('*')
        .order('created_at')

      const { data: items } = await supabase
        .from('items')
        .select('*')
        .order('created_at')

      this.stores = stores ?? []
      this.items = items ?? []
      this.loaded = true
    },

    /* =========================
       FILTROS
    ========================= */
    setSearch(text: string) {
      this.searchText = text
    },

    setStoreFilter(storeId: 'all' | string | null) {
      this.selectedStoreId = storeId
    },

    /* =========================
       STORES
    ========================= */
    async addStore(name: string, color: string) {
      if (!name.trim()) return

      const { data, error } = await supabase
        .from('stores')
        .insert({ name, color })
        .select()
        .single()

      if (error) return console.error(error)

      this.stores.push(data)
    },

    async removeStore(storeId: string, deleteItems: boolean) {
      if (deleteItems) {
        await supabase.from('items').delete().eq('store_id', storeId)
      } else {
        await supabase
          .from('items')
          .update({ store_id: null })
          .eq('store_id', storeId)
      }

      await supabase.from('stores').delete().eq('id', storeId)

      this.stores = this.stores.filter(s => s.id !== storeId)
      this.items = deleteItems
        ? this.items.filter(i => i.store_id !== storeId)
        : this.items.map(i =>
            i.store_id === storeId ? { ...i, store_id: null } : i
          )
    },

    /* =========================
       ITEMS
    ========================= */
    async addItem(name: string, storeId: string | null) {
      if (!name.trim()) return

      const { data, error } = await supabase
        .from('items')
        .insert({
          name,
          quantity: 1,
          bought: false,
          store_id: storeId
        })
        .select()
        .single()

      if (error) return console.error(error)

      this.items.push(data)
    },

    async toggleItem(itemId: string) {
      const item = this.items.find(i => i.id === itemId)
      if (!item) return

      const newValue = !item.bought

      await supabase
        .from('items')
        .update({ bought: newValue })
        .eq('id', itemId)

      item.bought = newValue
    },

    async removeItem(itemId: string) {
      await supabase.from('items').delete().eq('id', itemId)
      this.items = this.items.filter(i => i.id !== itemId)
    }
  }
})
