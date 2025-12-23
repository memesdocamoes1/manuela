<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useShoppingListStore } from '@/stores/shoppingList'

import AddStore from '@/components/AddStore.vue'
import StoreManager from '@/components/StoreManager.vue'
import AddItem from '@/components/AddItem.vue'
import ShoppingItem from '@/components/ShoppingItem.vue'

const store = useShoppingListStore()
const items = computed(() => store.filteredItems)

onMounted(() => {
  store.loadAll()
})
</script>

<template>
  <main class="app">
    <h1>Lista de Compras 🛒</h1>



    <!-- 🔹 PRODUTOS -->
    <section class="box">
      <h2>Adicionar produto</h2>
      <AddItem />
    </section>

    <!-- 🔹 PESQUISA -->
    <section class="box">
      <h2>Pesquisar</h2>

      <input
        type="text"
        placeholder="Pesquisar produto..."
        :value="store.searchText"
        @input="store.setSearch(($event.target as HTMLInputElement).value)"
      />

      <select
        :value="store.selectedStoreId"
        @change="store.setStoreFilter(
          ($event.target as HTMLSelectElement).value || null
        )"
      >
        <option value="all">Todos os armazéns</option>

        <option
          v-for="s in store.stores"
          :key="s.id"
          :value="s.id"
        >
          {{ s.name }}
        </option>

        <option :value="null">Sem categoria</option>
      </select>
    </section>

    <!-- 🔹 LISTA -->
    <section class="box">
      <h2>Produtos</h2>

      <p v-if="store.loaded && items.length === 0" class="empty">
        Nenhum produto encontrado
      </p>

      <ShoppingItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </section>
        <!-- 🔹 CATEGORIAS -->
    <section class="box">
      <h2>Categorias</h2>
      <AddStore />
      <StoreManager v-if="store.stores.length" />
    </section>
  </main>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 40px auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}

.box {
  background: #fff;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.empty {
  opacity: 0.6;
  font-style: italic;
}
</style>
