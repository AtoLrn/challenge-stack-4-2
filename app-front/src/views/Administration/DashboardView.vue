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
                <label for="filterDevice">Appareil :</label>
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
            <div>
                <button title="Open modal" @click="openModal" class="btn btn-md">Ajouter</button>
            </div>
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-md">Fermer</button>
          </template>
          <template v-slot:title class="title">Ajouter une analyse</template>
          <template v-slot:default>
              <form class="graph-create flex flex-col content-sa align-ctr" @submit.prevent="addGraph">
                <div class="data flex flex-col">
                    <label for="data-type">Data :</label>
                    <select required id="data-type" v-model="dataType">
                      <option value="click">Click</option>
                      <option value="newVisitor">Nouveaux Visiteurs</option>
                      <option value="visit">Visites</option>
                      <option value="submit">Soumissions</option>
                    </select>
                </div>

                <div class="representation flex flex-col">
                    <label for="data-repr">Représentation :</label>
                    <select required id="data-repr" v-model="dataRepr">
                      <option value="graph">Graphique</option>
                      <option value="kpi">KPI</option>
                    </select>
                </div>

                <div class="name flex flex-col">
                    <label for="graphName">Nom du graphique:</label>
                    <input type="text" id="graphName" v-model="graphName" required>
                </div>

                <div class="send">
                    <button type="submit" class="btn btn-md">Ajouter</button>
                </div>
              </form>
          </template>
        </ModalAlert>
  </div>
</template>

<script setup>
import ModalAlert from "@/components/ModalAlert.vue";
import { handleRequest } from '../../utils/request'
import { ref, onMounted } from 'vue'

const graphName = ref()
const dataType = ref()
const dataRepr = ref()
const paths = ref([])
const tags = ref([])
const devices = ref([])
const choosedPath = ref()
const choosedTag= ref()
const choosedDevice = ref()
const startDate = ref()
const endDate = ref()

onMounted(() => {
    handleRequest("/event/path")
        .then(data => paths.value = data)

    handleRequest("/event/device")
        .then(data => devices.value = data)

    handleRequest("/tag")
        .then(res => {
            const tagsRes = res.data.map(tag => {
              return {
                name: tag.name,
                description: tag.description
              };
            });
            tags.value = tagsRes
        })
})

const updateData = async () => {
    const filter = {
        startDate: new Date(startDate.value).getTime(),
        endDate: new Date(endDate.value).getTime(),
        dimension: [
            {
                type: "path",
                value: choosedPath.value
            },
            {
                type: "tag",
                value: choosedTag.value
            },
            {
                type: "device",
                value: choosedDevice.value
            }
        ]
    }
    const res = await handleRequest("/event/filter", { json: filter })
    console.log(res)
}

const addGraph = async () => {
    console.log(graphName.value)
    console.log(dataType.value)
    console.log(dataRepr.value)
}
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
        margin: 30px 0;
        opacity: 10%;
    }

    .graph-create {
        div {
            margin: 10px 0;
            width: 50%;
        }

        .send {
            text-align: center;
        }
    }
}
</style>
