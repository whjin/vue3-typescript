<template>
  <div class="container">
    <h3>count:{{ count }}</h3>
    <button @click="plusCount(10)">+10</button>
    <button @click="minusCount(10)">-10</button>
    <h3>doubleCount:{{ doubleCount }}</h3>
    <button @click="changeInfo">批量更新</button>
    <h3 v-show="list.length">{{ list }}</h3>
    <h3>{{ name }}</h3>
    <h3 v-show="age != 0">{{ age }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "../stores/modules/useAppStore";
import { storeToRefs } from "pinia";

const store = useAppStore();

const { count, doubleCount, list, name, age } = storeToRefs(store);
const { plusCount, minusCount } = store;

const changeInfo = () => {
  store.$patch(state => {
    state.count++;
    state.list.push(1);
    state.name += "qwe";
    state.age += 20;
  });
};
</script>

<style lang="less" scoped></style>
