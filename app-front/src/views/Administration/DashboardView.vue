<template>

  <div id="dashboard" class="card">
      <div class="add-graph">
          <button @click="openPopup">+</button>
      </div>

      <div v-if="!showPopup" class="popup-overlay">
        <div class="popup">
          <span class="close" @click="closePopup">&times;</span>
          <form @submit.prevent="addGraph">
            <label for="graphType">Data :</label>
            <select id="graphType" v-model="graphType">
              <option value="visite">Nb de visite</option>
              <option value="page">Pages Vues</option>
              <option value="heatmap">Heatmap clicks</option>
            </select>

            <label for="graphName">Nom du graphique:</label>
            <input type="text" id="graphName" v-model="graphName" required>

            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      graphData: "",
      graphName: "",
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    addGraph() {
      this.showPopup = false;
    },
    closePopup() {
      this.showPopup = false;
      graphData = "";
      graphName = "";
    },
  },
};
</script>

<style scoped lang="scss">
#dashboard {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .add-graph {
        button {
          padding: 15px 22px;
          font-size: 20px;
          background-color: #f2f2f2;
          color: #444;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #ddd;
          }
        }
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;

      .popup {
        position: relative;
        background-color: #fff;
        padding: 50px 0;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 400px;

        .close {
            cursor: pointer;
            color: red;
            position: absolute;
            top: 5px;
            right: 20px;
            font-size: 30px;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;

          input {
            color: black;
          }

          label {
            margin-top: 20px;
          }

          button {
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
            margin-top: 30px;

            &:hover {
              background-color: #45a049;
            }
          }
        }
      }
    }

}
</style>
