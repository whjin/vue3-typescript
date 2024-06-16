<template>
  <div class="container">
    <div>{{ counter }}</div>
    <div>{{ doubleCounter }}</div>
    <h1 :style="{ backgroundColor: titleInfo.color }">{{ titleInfo.value }}</h1>
    <div>
      <input type="text" v-model="todoName" @keydown.enter="addTodo(newTodo(todoName))" />
      <button @click="deleteNewTodo">delete</button>
    </div>
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed } from "vue";
import type { PropType } from "vue";
import type { Todo, TitleInfo } from '../types';

defineProps({
  titleInfo: {
    type: Object as PropType<TitleInfo>,
    required: true
  }
});

const counter = ref(1);
const doubleCounter = computed(() => counter.value * 2);

const items = ref([] as Todo[]);
let todoList = [
  { id: 1, name: "Hello World", completed: true },
  { id: 2, name: "Hello Vue", completed: true },
  { id: 3, name: "Hello Vite", completed: false },
];
items.value.push(...todoList);

const todoName = ref("");
const newTodo = (todoName: string): Todo => {
  return {
    id: items.value.length + 1,
    name: todoName,
    completed: false
  };
};
const addTodo = (todo: Todo): void => {
  items.value.push(todo);
  todoName.value = "";
};
const deleteNewTodo = () => {
  items.value.pop();
}

</script>

<style lang="less" scoped></style>
