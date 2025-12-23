<script setup lang="ts">
import { ref } from 'vue'
import { useShoppingListStore } from '@/stores/shoppingList'

const store = useShoppingListStore()

const name = ref('')
const color = ref('#4f46e5')

const add = async () => {
  if (!name.value.trim()) return

  await store.addStore(name.value, color.value)

  name.value = ''
  color.value = '#4f46e5'
}
</script>

<template>
  <div class="row">
    <input
      v-model="name"
      placeholder="Nome do armazém"
    />

    <input type="color" v-model="color" />

    <button @click="add">Adicionar</button>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
}
input {
  padding: 6px;
}
button {
  padding: 6px 12px;
}
</style>
