<script setup lang="ts">
import { useShoppingListStore } from '@/stores/shoppingList'

const store = useShoppingListStore()

function remove(sId: string) {
  const deleteItems = confirm(
    'Apagar também os produtos desta categoria?\n\nOK = apagar tudo\nCancelar = manter produtos'
  )

  store.removeStore(sId, deleteItems)
}

</script>

<template>
  <ul>
    <li
      v-for="s in store.stores"
      :key="s.id"
      style="display:flex; align-items:center; gap:8px;"
    >
      <span
        :style="{
          background: s.color,
          width: '12px',
          height: '12px',
          borderRadius: '50%'
        }"
      />

      {{ s.name }}

      <button @click="remove(s.id)" style="margin-left:auto;">
        🗑
      </button>
    </li>
  </ul>
</template>
