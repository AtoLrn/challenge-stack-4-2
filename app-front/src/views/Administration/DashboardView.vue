<template>
  <div id="dashboard" class="card flex flex-col">
      <h1 class="text-ctr">Dashboard</h1>

        <div class="top-container flex flex-col">
        <form @submit.prevent="updateData">
          <div class="filter-container flex content-sa">
            <div class="filter"> 
                <label for="filterPath">URL :</label>
                <select id="filterPath" v-model="choosedPath">
                    <option v-bind:value="path"></option>
                    <option v-for="path in paths" v-bind:value="path">{{ path }}</option>
                </select>
            </div>

            <div class="filter"> 
                <label for="filterTag">Tag :</label>
                <select id="filterTag" v-model="choosedTag">
                    <option v-bind:value="tag"></option>
                    <option v-for="tag in tags" v-bind:value="tag.name">
                        {{ tag.name }} | {{ tag.description }}
                    </option>
                </select>
            </div>
            
            <div class="filter"> 
                <label for="filterDevice">Appareils :</label>
                <select id="filterDevice" v-model="choosedDevice">
                    <option v-bind:value="device"></option>
                    <option v-for="device in devices" v-bind:value="device">{{ device }}</option>
                </select>
            </div>
          </div>

          <div class="date-filter flex content-sa">
            <div>
                <label for="start-date">Début :</label>
                <input id="start-date" required v-model="startDate" type="datetime-local">
            </div>

            <div>
                <label for="end-date">Fin :</label>
                <input id="end-date" required v-model="endDate" type="datetime-local">
            </div>
          </div>

          <div class="update flex content-sa">
              <button class="btn btn-md" type="submit">Update</button>
          </div>
        </form>
      </div>
      <div class="filterLine"></div>


      <ModalAlert>
          <template #activator="{ openModal }">
            <button title="Open modal" @click="openModal" class="add-graph">Ajouter</button>
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-md">Fermer</button>
          </template>
          <template v-slot:title class="title">Ajouter une analyse</template>
          <template >
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
          </template>
        </ModalAlert>
  </div>
</template>

<script>
import ModalAlert from "@/components/ModalAlert.vue";
import { handleRequest } from '../../utils/request'

export default {
  data() {
    return {
      showPopup: false,
      graphData: "",
      graphName: "",
      paths: [],
      tags: [],
      devices: [],
      choosedPath: "",
      choosedTag: "",
      choosedDevice: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    async updateData() {
        const filter = {
            startDate: new Date(this.startDate).getTime(),
            endDate: new Date(this.endDate).getTime(),
            dimension: [
                {
                    type: "path",
                    value: this.choosedPath
                },
                {
                    type: "tag",
                    value: this.choosedTag
                },
                {
                    type: "device",
                    value: this.choosedDevice
                }
            ]
        }
        const res = await handleRequest("/event/filter", { json: filter })
        console.log(res)
    },
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
  beforeMount() {
    handleRequest("/event/path")
        .then(data => this.paths = data)

    handleRequest("/event/device")
        .then(data => this.devices = data)

    handleRequest("/tag")
        .then(res => {
            const tags = res.data.map(tag => {
              return {
                name: tag.name,
                description: tag.description
              };
            });
            this.tags = tags
        })
  }
};
</script>

<style scoped lang="scss">
#dashboard {
    h1 {
        margin-bottom: 20px;
    }

    .top-container{
        .filter-container {
            width: 100%;

            .filter {

                select{
                    margin-left: 10px;
                }

            }
        }

        .date-filter {
            margin-top: 30px;
        }

        .update {
            button {
                margin-top: 10px;
            }
        }
    }

    .filterLine {
        width: 100%;
        height: 1px;
        background-color: black;
        margin-top: 30px;
        opacity: 10%;
    }

    button {
        cursor: pointer;
        font-weight: 600;
        border-radius: 4px;
        font-size: 15px;
        height: 30px;
        background-color: white;
        color: #9147ff;
        padding: 0 10px;
        border: 1px solid #9147ff;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #9147ff;
            border: none;
            color: white;
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
