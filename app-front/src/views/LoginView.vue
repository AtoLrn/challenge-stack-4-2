<template>
  <div class="card">
    <form>
      <div class="flex flex-col">
        <label for="email" class="caption c-purple">Email</label>
        <input type="email" id="email" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="caption c-purple">Password</label>
        <input type="password" id="password" required>
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
