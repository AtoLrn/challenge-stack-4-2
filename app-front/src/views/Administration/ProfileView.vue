<template>
  <div id="right-side" class="flex flex-row content-se align-ctr">
    <div class="flex flex-col align-ctr">
      <img src="@/assets/img/profile.png" alt="profile picture" style="width: 300px;">
    </div>
    <div class="flex flex-col">
      <div class="card">
        <form>
          <div class="flex flex-row content-sb">
            <div class="flex flex-col">
              <label for="lastname" class="caption c-purple">Nom</label>
              <input type="text" id="lastname" value="DOE" required>
            </div>
            <div class="flex flex-col">
              <label for="firstname" class="caption c-purple">Prénom</label>
              <input type="text" id="firstname" value="John" required>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="email" class="caption c-purple">Email</label>
            <input type="email" id="email" value="johndoe@gmail.com" required>
          </div>
          <div class="flex flex-col">
            <label for="password" class="caption c-purple">Password</label>
            <input type="password" id="password" value="vzjzoijvozijeoizjioz" required>
          </div>
          <div class="flex flex-col">
            <label for="company" class="caption c-purple">Nom de société</label>
            <input type="text" id="company" value="QuackMart" required>
          </div>
          <div class="flex flex-col">
            <label for="url" class="caption c-purple">Url du site à analyser</label>
            <input type="text" id="url" value="https://quackmart.com" required>
          </div>
          <div class="flex flex-col">
            <label for="kbis" class="caption c-purple">Kbis</label>
            <input type="file" id="kbis" required style="display: none">
            <button id="kbis-btn" class="btn btn-md">Choisir un fichier</button>
          </div>
          <div id="card-bottom">
            <button type="submit" class="btn btn-md">Modifier mes informations</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

#right-side {
  height: 100vh;
}

#right-side > img {
  text-align: center;
}

#right-side > div:last-child {
  width: 40%;
}

.card {
  width: 80%;
  margin-left: auto;
  margin-right: auto;

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
      background-color: var(--purple);

      &:hover {
        background-color: var(--indigo);
      }

    }

  }
}



</style>
