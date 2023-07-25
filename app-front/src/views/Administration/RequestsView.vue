<template>
  <div id="admin-panel" class="card">
    <table class="table">
      <thead>
        <tr>
          <th class="title">Nom</th>
          <th class="title">Prénom</th>
          <th class="title">Email</th>
          <th class="title">Société</th>
          <th class="title">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>johndoe@gmail.com</td>
          <td>QuackMart</td>
          <td>
            <button class="btn btn-sm" style="margin-right: 0.25rem">Accepter &nbsp;<i class="fa-solid fa-circle-check"></i></button>
            <button class="btn btn-sm">Refuser &nbsp;<i class="fa-solid fa-circle-xmark"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
