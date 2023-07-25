<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label for="email" class="caption c-purple">Email</label>
        <input type="email" id="email" v-model.trim="email" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div id="card-bottom" class="flex flex-row align-ctr content-sb">
        <div>
          <p>Vous n'avez pas de compte ?</p>
          <RouterLink :to="{name: 'register'}" class="link-indigo">Inscrivez-vous</RouterLink>
        </div>
        <div>
          <button type="submit" class="btn btn-md">Se connecter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { handleRequest } from './../utils/request'
import { saveToken } from './../utils/token'

import router from './../router'

import { ref } from 'vue'

const email = ref()
const password = ref()

const handleSubmit = async () => {
  const res = await handleRequest('/auth/login', { json: { email: email.value, password: password.value } }, false)

  saveToken(res.token)

  router.push('/administration/dashboard')
}
</script>

<style scoped lang="scss">


  .card {
    width: 60%;

    form > div:not(:last-child) {
      margin-bottom: 16px !important;
    }

    label {
      margin-bottom: 0.25rem;
    }

    #card-bottom {
      margin-top: 2rem;
    }

  }


</style>
