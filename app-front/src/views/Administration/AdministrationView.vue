<template>

    <main class="flex flex-row">
      <NavBar></NavBar>
      <div id="content">
        <router-view></router-view>
      </div>
    </main>

</template>

<script setup>

import NavBar from "@/components/NavBar.vue";
</script>

<style scoped lang="scss">

  #content {
    width: 84%;
    margin: 1.5rem;

    >div {
      height: 94vh;
      padding: 1rem 1.25rem;
    }
  }

</style>
