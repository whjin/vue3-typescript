<template>
  <main>
    <h1>The HomeView Page</h1>
    <HelloWord :title-info="{ value: '待办事项', color: 'green' }"></HelloWord>
  </main>
</template>

<script setup lang="ts">
import HelloWord from './HelloWord.vue';

</script>
