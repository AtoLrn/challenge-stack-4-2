<template>
  <div class="card">
    <form>
      <div class="flex flex-row content-sb">
        <div class="flex flex-col">
          <label for="lastname" class="caption c-purple">Nom</label>
          <input type="text" id="lastname" required>
        </div>
        <div class="flex flex-col">
          <label for="firstname" class="caption c-purple">Prénom</label>
          <input type="text" id="firstname" required>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="email" class="caption c-purple">Email</label>
        <input type="email" id="email" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Mot de passe</label>
        <input type="password" id="password" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Confirmer le mot de passe</label>
        <input type="password" id="password" required>
      </div>
      <div class="flex flex-col">
        <label for="company" class="caption c-purple">Nom de société</label>
        <input type="text" id="company" required>
      </div>
      <div class="flex flex-col">
        <label for="url" class="caption c-purple">Url du site à analyser</label>
        <input type="text" id="url" required>
      </div>
      <div class="flex flex-col">
        <label for="kbis" class="caption c-purple">Kbis</label>
        <input type="file" id="kbis" required style="display: none">
        <button id="kbis-btn" class="btn btn-md">Choisir un fichier</button>
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
