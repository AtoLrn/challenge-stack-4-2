<template>
  <main>
    <div>
      <div id="text-container">
        <div>
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
              <button id="shop-goodies" class="btn btn-lg" sdk-id="38c6d6e327">Parcourir les goodies</button>
            </RouterLink>
          </div>
        </div>
        <div id="newsletter" class="card">

          <h3 class="title">
            Inscrivez-vous à notre newsletter !
          </h3>
          <p>
            Recevez les dernières nouvelles de Quackmart directement dans votre boîte mail.
          </p>
          <div class="input-container">
            <form action="" sdk-id="fa24199695" @submit="handleNewsletter">
              <input type="text" placeholder="Votre adresse mail" />
              <button class="btn btn-sm"
                      sdk-id="fa24199695">S'inscrire</button>
            </form>

          </div>
        </div>
      </div>
      <div id="pic-container">
        <img src="../assets/img/logo.png" alt="logo app"/>
      </div>
    </div>
  </main>
</template>

<script setup>

  const handleNewsletter = (event) => {
    event.preventDefault()
    alert('Vous êtes inscrit à la newsletter !')
  }

</script>

<style scoped lang="scss">

  main {

    >div {
      display: flex;
      padding-top: 4rem;
      align-items: center;

      @media (max-width: 768px) {
        flex-direction: column;
        padding-top: 2rem;
      }

      #text-container {
        padding-left: 10rem;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        >div >div:first-child {
          padding-bottom: 2rem;
        }

        #shop-goodies {
          margin-bottom: 6rem;
        }

        @media (max-width: 768px) {
          padding: 1rem 4rem;
        }

        h1 {
          padding-bottom: 1rem;
        }

        p {
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

        #newsletter {
          background-color: var(--white);
          border-radius: 8px;
          padding: 20px;

          h3,
          p {
            padding-bottom: 0.5rem;
          }

          .input-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1rem;

            input {
              width: 70%;
              padding: 0.5rem;
              border-radius: 4px;
              border: 1px solid var(--divider);
              transition: all 0.3s ease-in-out;

              &:hover {
                border: 1px solid var(--purple);
              }

            }

            button {
              width: 25%;
              padding: 0.6rem;
            }
          }

        }

      }

      #pic-container {
        text-align: center;

        img {
          width: 48%;
          padding-top: 3rem;
        }

      }

    }

  }

</style>
