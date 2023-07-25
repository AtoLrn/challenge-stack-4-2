<template>
  <main>
    <div>
      <div id="text-container">
        <div>
          <h1 class="title">QuackMart !</h1>
          <p>
            Bienvenue chez Quackmart, le paradis des amoureux des canards ! <br>
            Plongez dans notre vaste collection de goodies à l'effigie de ces adorables créatures à plumes.
            Préparez-vous à quacker de joie en découvrant nos produits !
          </p>
        </div>
        <div>
          <RouterLink to="/shop">
            <button class="btn btn-lg" sdk-id="abcdefg2">Parcourir les goodies</button>
          </RouterLink>
        </div>
      </div>
      <div id="pic-container">
        <img src="../assets/img/logo.png" alt="logo app">
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style scoped lang="scss">

  main {

    >div {
      display: flex;
      padding-top: 10rem;
      align-items: center;

      @media (max-width: 768px) {
        flex-direction: column;
        padding-top: 2rem;
      }

      #text-container {
        padding-left: 10rem;

        @media (max-width: 768px) {
          padding: 1rem 4rem;
        }

        h1 {
          padding-bottom: 1rem;
        }

        p {
          padding-bottom: 4rem;

          @media (max-width: 768px) {
            padding-bottom: 1.75rem
          }

        }

        div:nth-child(2) {
          @media (max-width: 768px) {
            text-align: center;
            margin-top: 2rem;
            margin-bottom: 4rem;
          }
        }

      }

      #pic-container {
        text-align: center;

        img {
          width: 48%;
        }

      }

    }

  }

</style>
