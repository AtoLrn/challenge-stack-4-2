<template>

<main class="flex flex-row align-ctr content-ctr">
  <div class="img-container">
    <img src="@/assets/img/charts.png" alt="charts picture"/>
  </div>
  <div class="form-container">
    <router-view></router-view>
  </div>
</main>

</template>
<script setup>
</script>

<style scoped lang="scss">

.img-container,
.form-container {
  width: 50%;
}

.img-container {
  text-align: center;

  img {
    width: 400px;
  }
}

.form-container {
  .card {
    padding: 32px;
    margin-right: auto;
    margin-left: auto;
  }
}

</style>
