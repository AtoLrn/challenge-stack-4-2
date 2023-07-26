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
        <tr v-if="usersList.data.filter(user => !user.isVerified)">
          <td class="text-ctr" colspan="5">Aucun utilisateur en attente de vérification</td>
        </tr>
        <tr v-else
            v-for="user in usersList.data.filter(user => !user.isVerified)">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.societyName }}</td>
          <td>
            <button class="btn btn-sm"
                    style="margin-right: 0.25rem"
                    @click="verifyUser(user.id)">
                    Accepter &nbsp;<i class="fa-solid fa-circle-check"></i>
            </button>
            <button class="btn btn-sm"
                    @click="declineUser(user.id)">
                    Refuser &nbsp;<i class="fa-solid fa-circle-xmark"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {handleRequest} from "@/utils/request";

const usersList = ref(await handleRequest('/user'));

const verifyUser = async (user) => {
  await handleRequest('/user/verify/' + user, undefined, true, { method: 'PUT' });
  usersList.value = await handleRequest('/user');
}

const declineUser = async (user) => {
  await handleRequest('/user/' + user, undefined, true, { method: 'DELETE' });
  usersList.value = await handleRequest('/user');
}

</script>

<style scoped>

</style>
