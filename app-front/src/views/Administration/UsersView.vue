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

            <ModalAlert>
              <template #activator="{ openModal }">
                <button title="Open modal" @click="openModal" class="btn btn-sm btn-purple" style="margin-right: 0.25rem">
                  Modifier&nbsp;&nbsp;<i class="fa-solid fa-pen"></i>
                </button>
              </template>
              <template #actions="{ closeModal }">
                <button title="close" @click="closeModal" class="btn btn-md">Annuler</button>
              </template>
              <template v-slot:title class="title">Modifier un utilisateur</template>
              <template v-slot:default>
                <form id="update-form" @submit.prevent="handleSubmit(user)">
                  <div>
                    <p class="title c-indigo">
                      Informations personnelles
                    </p>
                    <div class="flex flex-row content-sb">
                      <div class="flex flex-col w-48">
                        <label for="lastname" class="caption c-purple">Nom</label>
                        <input v-model="user.lastname" type="text" id="lastname" required>
                      </div>
                      <div class="flex flex-col w-48">
                        <label for="firstname" class="caption c-purple">Prénom</label>
                        <input v-model="user.firstname" type="text" id="firstname" required>
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <label for="email" class="caption c-purple">Email</label>
                      <input v-model="user.email" type="email" id="email" required>
                    </div>
                  </div>
                  <div>
                    <p class="title c-indigo">
                      Entreprise & Site
                    </p>
                    <div class="flex flex-col">
                      <label for="company" class="caption c-purple">Nom de société</label>
                      <input v-model="user.societyName" type="text" id="company" required readonly>
                    </div>
                    <div class="flex flex-col">
                      <label for="url" class="caption c-purple">Url du site à analyser</label>
                      <input v-model="user.websiteUrl"  type="text" id="url" required readonly>
                    </div>
                  </div>
                  <div id="card-bottom">
                    <button type="submit" class="btn btn-purple btn-md">Mettre à jour</button>
                  </div>
                </form>
              </template>
            </ModalAlert>

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
import ModalAlert from "@/components/ModalAlert.vue";

const usersList = ref(await handleRequest('/user'));

const deleteUser = async (user) => {
  await handleRequest('/user/' + user, undefined, true, { method: 'DELETE' });
  usersList.value = await handleRequest('/user');
}

const handleSubmit = async (editUser) => {

  const json = {
    firstname: editUser.firstname,
    lastname: editUser.lastname,
    email: editUser.email,
    societyName: editUser.societyName,
    websiteUrl: editUser.websiteUrl
  }

  await handleRequest('/user/' + editUser.id, { json }, true, { method: 'put' });

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

  #update-form {
    >div:first-child {
      padding-bottom: 1rem;
    }

    p,
    input {
      margin-bottom: 0.75rem;
    }
  }
</style>
