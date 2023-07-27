<template>
  <div id="right-side" class="flex flex-row content-se align-ctr">
    <div class="h-100 flex flex-col align-ctr content-se">
      <div>
        &nbsp;<br>
        &nbsp;<br>
      </div>
      <div class="text-ctr">
        <img src="../../assets/img/profile.png" alt="profile picture" style="width: 300px;" />
      </div>
      <div id="kbis-container" class="card">
        <button type="button" @click="downloadKbisFile" class="w-100 btn btn-md">Voir mon fichier Kbis&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-file"></i></button>
      </div>
      <div id="app-id-container" class="card">
        <ModalAlert modalSize="w-25">
          <template #activator="{ openModal }">
            <button @click="openModal" class="w-100 btn btn-md">
              Voir mon app ID&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-key"></i>
            </button>
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-sm">Fermer</button>
          </template>
          <template v-slot:title class="title">Mon application ID</template>
          <template v-slot:default>
            <div id="app-id" class="c-indigo text-ctr poppins">
              {{ generateAppId.data }}
            </div>
          </template>
        </ModalAlert>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div>
            <p class="title c-indigo">
              Informations personnelles
            </p>
          </div>
          <div class="flex flex-row content-sb">
            <div class="flex flex-col">
              <label for="lastname" class="caption c-purple">Nom</label>
              <input type="text" id="lastname"  v-model.trim="lastname" required>
            </div>
            <div class="flex flex-col">
              <label for="firstname" class="caption c-purple">Prénom</label>
              <input type="text" id="firstname" v-model.trim="firstname" required>
            </div>
          </div>
          <div class="flex flex-col bdr-btm">
            <label for="email" class="caption c-purple">Email</label>
            <input type="email" id="email"  v-model.trim="email" required>
          </div>
          <div>
            <p class="title c-indigo">
              Entreprise & Site
            </p>
          </div>
          <div class="flex flex-col">
            <label for="company" class="caption c-purple">Nom de société</label>
            <input type="text" id="company" v-model.trim="company" required readonly>
          </div>
          <div class="flex flex-col bdr-btm">
            <label for="url" class="caption c-purple">Url du site à analyser</label>
            <input type="text" id="url" v-model.trim="url" required readonly>
          </div>
          <div>
            <p class="title c-indigo">
              Modifier mon mot de passe
            </p>
          </div>
          <div class="flex flex-col">
            <label for="password" class="caption c-purple">Mot de passe actuel</label>
            <input type="password" id="password" v-model="password">
          </div>
          <div class="flex flex-col">
            <label for="new-password" class="caption c-purple">Nouveau mot de passe</label>
            <input type="password" id="new-password" v-model="passwordConfirmation">
          </div>
          <div id="card-bottom">
            <button type="submit" class="btn btn-purple btn-md">Modifier mes informations</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { handleRequest } from './../../utils/request'

import { ref } from 'vue'
import ModalAlert from "@/components/ModalAlert.vue";

const lastValues = await handleRequest('/user/profile');

const generateAppId = await handleRequest('/user/app-id', {}, true, { method: 'get' })

console.log(generateAppId);

const firstname = ref(lastValues.firstname)
const lastname = ref(lastValues.lastname)
const email = ref(lastValues.email)
const password = ref()
const passwordConfirmation = ref()

const company = ref(lastValues.societyName)
const url = ref(lastValues.websiteUrl)
const kbisFileUrl = ref(lastValues.kbisFileUrl)
console.log(lastValues)

const downloadKbisFile = () => {
  window.location.href = kbisFileUrl.value
}

const handleSubmit = async () => {

  if (password.value !== passwordConfirmation.value) {
    alert('Password missmatch')
    return
  }

  const json = {
    firsname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value
  }

  await handleRequest('/user', { json }, true, { method: 'put' })
  }
</script>

<style scoped lang="scss">

#right-side {
  height: 100vh;
}

#right-side > div:last-child {
  width: 40%;
}

#kbis-container,
#app-id-container{
  text-align: center;
  padding: 1.25rem;

  button {
    padding: 0.75rem 1rem;
  }

  #app-id {
    font-size: 16px;
  }
}

.card {
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  .title {
    font-size: 18px;
  }

  form {
    padding: 1rem;

    > div:first-child > div {
      width: 48%;
    }

    > div:not(:last-child) {
      margin-bottom: 16px;
    }

  }

  #card-bottom {
    padding-top: 1rem;
    border-top: var(--border);

    button {
      width: 100%;
    }

  }

  .bdr-btm {
    padding-bottom: 1rem;
  }
}



</style>
