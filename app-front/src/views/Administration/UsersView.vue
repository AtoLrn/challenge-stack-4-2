<template>
  <div id="admin-panel" class="card">
    <table class="table">
      <thead>
        <tr>
          <th class="title">Nom</th>
          <th class="title">Prénom</th>
          <th class="title">Email</th>
          <th class="title">Société</th>
          <th class="title">Statut</th>
          <th class="title">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="usersList.data.length === 0">
          <td class="text-ctr" colspan="6">Aucun utilisateur enregistré</td>
        </tr>
        <tr v-else
            v-for="user in usersList.data">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.societyName }}</td>
          <td>
            <p class="tag" :class="tagColour(user.isVerified)">
              {{ user.isVerified ? 'Vérifié' : 'En attente' }}
            </p>
          </td>
          <td>
            <button class="btn btn-sm" style="margin-right: 0.25rem">
                    Modifier &nbsp;<i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm"
                    @click="deleteUser(user.id)">Supprimer &nbsp;<i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import {handleRequest} from "@/utils/request";
import {ref} from "vue";

const usersList = ref(await handleRequest('/user'));

const deleteUser = async (user) => {
  await handleRequest('/user/' + user, undefined, true, { method: 'DELETE' });
  usersList.value = await handleRequest('/user');
}

const tagColour = (status) => {
  return status ? 'tag-verified' : 'tag-pending';
}

</script>

<style scoped lang="scss">
  .tag {
    padding: 4px 8px;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;

    &-verified {
      background-color: var(--light-green);
      color: var(--green);
    }

    &-pending {
      background-color: var(--light-red);
      color: var(--red);
    }

  }
</style>
