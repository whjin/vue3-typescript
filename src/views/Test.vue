<template>
  <div class="container">
    {{ counter }}
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type Todo = {
  id: number;
  name: String;
  completed: Boolean;
};

export default defineComponent({
  data() {
    return {
      counter: 1,
      items: [] as Todo[]
    };
  },
  created() {
    this.items.push({ id: 1, name: 'vue311', completed: false });
  }
});
</script>

<style lang="less" scoped></style>
