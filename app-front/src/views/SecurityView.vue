<template>

<main class="flex flex-row align-ctr content-ctr">
  <div class="img-container text-ctr">
    <img src="@/assets/img/charts.png" alt="charts picture"/>
  </div>
  <div class="form-container">
    <Suspense>
        <router-view></router-view>

        <template #fallback>
        Loading...
        </template>
    </Suspense>
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
