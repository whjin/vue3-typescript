<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from './Test.vue';

export default defineComponent({
  components: { Test }
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
