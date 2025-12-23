<script setup lang="ts">
import { computed } from 'vue'
import type { ShoppingItem } from '@/types/shopping'
import { useShoppingListStore } from '@/stores/shoppingList'

const props = defineProps<{
  item: ShoppingItem
}>()

const store = useShoppingListStore()

// ✅ USAR store_id (snake_case)
const category = computed(() =>
  store.storeById(props.item.store_id)
)
</script>

<template>
  <div
    style="
      display:flex;
      align-items:center;
      gap:10px;
      padding:8px 4px;
      border-bottom:1px solid #eee;
    "
  >
    <input
      type="checkbox"
      :checked="item.bought"
      @change="store.toggleItem(item.id)"
    />

    <div style="display:flex; flex-direction:column;">
      <span
        :style="{
          textDecoration: item.bought ? 'line-through' : 'none',
          fontWeight: 500
        }"
      >
        {{ item.name }}
      </span>

      <small
        v-if="category"
        :style="{ color: category.color, fontWeight: 600 }"
      >
        {{ category.name }}
      </small>

      <small v-else style="opacity:.5;">
        Sem categoria
      </small>
    </div>

    <button
      @click="store.removeItem(item.id)"
      style="
        margin-left:auto;
        background:none;
        border:none;
        cursor:pointer;
        font-size:16px;
      "
      title="Remover item"
    >
      🗑
    </button>
  </div>
</template>
