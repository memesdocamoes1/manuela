<script setup lang="ts">
import { ref, computed } from 'vue'
import { useShoppingListStore } from '@/stores/shoppingList'

const store = useShoppingListStore()

const name = ref('')
const storeId = ref('')

const stores = computed(() => store.stores)

const add = async () => {
  if (!name.value || !storeId.value) return

  await store.addItem(name.value, storeId.value)
  name.value = ''
}
</script>

<template>
  <div class="row">
    <input
      v-model="name"
      placeholder="Produto..."
    />

    <select v-model="storeId">
      <option disabled value="">Escolhe o armazém</option>
      <option
        v-for="s in stores"
        :key="s.id"
        :value="s.id"
      >
        {{ s.name }}
      </option>
    </select>

    <button @click="add">+</button>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
}
input, select {
  padding: 6px;
}
button {
  padding: 6px 12px;
}
</style>
