<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-row content-sb">
        <div class="flex flex-col">
          <label for="lastname" class="caption c-purple">Nom</label>
          <input type="text" id="lastname" v-model.trim="lastname" required>
        </div>
        <div class="flex flex-col">
          <label for="firstname" class="caption c-purple">Prénom</label>
          <input type="text" id="firstname" v-model.trim="firstname" required>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="email" class="caption c-purple">Email</label>
        <input type="email" id="email" v-model.trim="email" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Mot de passe</label>
        <input type="password" id="password" v-model.trim="password" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Confirmer le mot de passe</label>
        <input type="password" id="password-validation" v-model.trim="passwordConfirmation" required>
      </div>
      <div class="flex flex-col">
        <label for="company" class="caption c-purple">Nom de société</label>
        <input type="text" id="company" v-model.trim="company" required>
      </div>
      <div class="flex flex-col">
        <label for="url" class="caption c-purple">Url du site à analyser</label>
        <input type="text" id="url" v-model.trim="url" required>
      </div>
      <div class="flex flex-col">
        <label for="kbis" class="caption c-purple">Kbis</label>
        <input type="file" id="kbis" required style="display: none" @change="onChangeKbis">
        <label for="kbis" id="kbis-btn" class="btn btn-md">Choisir un fichier</label>
      </div>
      <div id="card-bottom" class="flex flex-row align-ctr content-sb">
        <div>
          <p>Vous avez déjà un compte ?</p>
          <RouterLink :to="{name: 'login'}" class="link-indigo">Connectez-vous</RouterLink>
        </div>
        <div>
          <button type="submit" class="btn btn-md">S'inscrire</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { handleRequest } from './../utils/request'

import router from './../router'

import { ref } from 'vue'

const firstname = ref()
const lastname = ref()
const email = ref()
const password = ref()
const passwordConfirmation = ref()

const company = ref()
const url = ref()

const kbis = ref()

const onChangeKbis = (changeEvent) => {
  kbis.value = changeEvent.currentTarget.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('firstname', firstname.value)
  formData.append('lastname', lastname.value)

  formData.append('email', email.value)
  formData.append('password', password.value)

  formData.append('societyName', company.value)
  formData.append('websiteUrl', url.value)

  formData.append('kbisFile', kbis.value, 'kbis.pdf')


  const res = await handleRequest('/auth/register', { formData }, false)

  router.push('/security/login')
}

</script>

<style scoped lang="scss">

.card {
  width: 70%;

  form {

    >div:first-child {
      div {
        width: 48%;
      }
    }

    >div:not(:last-child) {
      margin-bottom: 16px !important;
    }

    label {
      margin-bottom: 0.25rem;
    }

  }

  #card-bottom {
    margin-top: 2rem;
  }

}

</style>
