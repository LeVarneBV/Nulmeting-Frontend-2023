<template>
  <div class="page-wrapper">
    <div class="element-wrapper">
      <div class="element-body">
        <h1>Welkom bij de Levarne Nulmeting</h1>
        <LevButton @clicked="todoStore.callAPI">Haal opdracht op! {{ todoStore.listOfActions }}</LevButton>
        <br>
        <br>
        <NuxtLink to="/about">Over ons</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();


const cnt = ref(0);

function increment() {
  cnt.value += 1;
}
</script>