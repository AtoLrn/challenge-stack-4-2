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
        <tr v-for="user in usersList.data">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.societyName }}</td>
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
import {handleRequest} from "@/utils/request";

const usersList = await handleRequest('/user');
</script>

<style scoped>

</style>
