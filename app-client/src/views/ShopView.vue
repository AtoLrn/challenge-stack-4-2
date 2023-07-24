<template>
  <div id="container">
    <div id="cards-container">
      <div class="card" v-for="goodie in goodies" :key="goodie.title">
        <div class="picture-container">
          <img :src="goodie.picture" alt="goodie illustration">
        </div>
        <p class="title">{{ goodie.title }}</p>
        <p class="description">{{ goodie.description }}</p>
        <div class="card-bottom">
          <p class="price">{{ goodie.price }} €</p>
          <button class="btn btn-sm"  @click="toggleReservation(goodie)">
            {{ goodie.reserved ? 'Ne plus réserver ):' : 'Réserver !' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {

  data() {
    return {
      goodies: [
        {
          picture: '/src/assets/img/army.jpeg',
          title: 'Boîte de poussins doux',
          description: 'Une armée de poussins jaune, rien que pour vous.',
          price: '25',
          reserved: false,
        },
        {
          picture: '/src/assets/img/bag.png',
          title: 'Sac à dos chicken',
          description: 'Un super sac à dos pour emporter plein de trucs.',
          price: '30',
          reserved: false,
        },
        {
          picture: '/src/assets/img/plush.png',
          title: 'Peluche poussin tueur',
          description: 'Une super peluche poussin pour un peu plus de douceur dans ce monde de brutes.',
          price: '20',
          reserved: false,
        },
        {
          picture: '/src/assets/img/pencilcase.png',
          title: 'Trousse à trucs',
          description: 'Une trousse de voyage bien jaune, bien poussin.',
          price: '15',
          reserved: false,
        },
        {
          picture: '/src/assets/img/shirt.jpeg',
          title: 'Chemise classe mais un peu moche',
          description: 'Une chemise poussin carrément classe pour les grandes occasions.',
          price: '40',
          reserved: false,
        },
        {
          picture: '/src/assets/img/mug.jpeg',
          title: 'Mug jaune pas ouf',
          description: 'Un mug jaune pour boire vos meilleurs breuvages.',
          price: '15',
          reserved: false,
        },
      ]
    };
  },

  methods: {
    toggleReservation(goodie) {
      goodie.reserved = !goodie.reserved;
    },
  }

};


</script>


<style lang="scss" scoped>


#container {
  padding: 3rem 1.5rem 1.5rem 1.5rem;

  #cards-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 20px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(8, 1fr);
    }

    .card {
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--white);
      box-shadow: var(--shadow);
      border-radius: var(--radius-medium);
      padding: 1rem;
      text-align: center;
      transition: var(--transition);

      &:hover {
        box-shadow: var(--shadow-hover);
      }

      .picture-container {
        height: 150px;
        display: flex;
        align-items: center;

        img {
          width: 100px;
          margin-left: auto;
          margin-right: auto;
        }

      }

      .title {
        font-size: 16px;
        padding: 0.75rem 0;
        font-weight: 600;
      }

      .description {
        text-align: left;
        line-height: 1.2;
        padding-bottom: 1rem;
      }

      .card-bottom {
        display: flex;
        justify-content: space-between;

        .price {
          color: var(--indigo);
          font-weight: 600;
          font-size: 18px;
        }

        >div {
          display: flex;
          justify-content: space-between;

          input {
            text-align: center;
            width: 40px;
            margin-right: 0.75rem;
          }
        }

      }
    }

  }

}

</style>
