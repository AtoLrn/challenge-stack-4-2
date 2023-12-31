<template>
  <div id="dashboard" class="card flex flex-col">
      <div class="top-container flex flex-col w-100">
        <form @submit.prevent="updateData">
          <div class="flex flex-row content-sb align-ctr pb-4">
            <h2 class="title">Personnalisation du dashbaord</h2>
            <div class="update text-r">
              <button class="btn btn-lg" type="submit">Actualiser&nbsp;&nbsp;<i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
          </div>
          <div class="filter-container flex content-sb">
            <div class="filter flex flex-col">
                <label for="filterPath">URL :</label>
                <select id="filterPath" v-model="choosedPath">
                    <option v-bind:value="path"></option>
                    <option v-for="path in paths" v-bind:value="path">{{ path }}</option>
                </select>
            </div>

            <div class="filter flex flex-col">
                <label for="filterTag">Tag :</label>
                <select id="filterTag" v-model="choosedTag">
                    <option v-bind:value="tag"></option>
                    <option v-for="tag in tags" v-bind:value="tag.name">
                        {{ tag.name }} | {{ tag.description }}
                    </option>
                </select>
            </div>
            
            <div class="filter flex flex-col">
                <label for="filterDevice">Appareil :</label>
                <select id="filterDevice" v-model="choosedDevice">
                    <option v-bind:value="device"></option>
                    <option v-for="device in devices" v-bind:value="device">{{ device }}</option>
                </select>
            </div>
          </div>

          <div class="date-filter flex content-sb">
            <div class="filter flex flex-col">
                <label for="start-date">Début : </label>
                <input id="start-date" v-model="startDate" type="datetime-local">
            </div>

            <div class="filter flex flex-col">
                <label for="end-date">Fin : </label>
                <input id="end-date" v-model="endDate" type="datetime-local">
            </div>

            <div class="filter flex flex-col">
                <label for="time-step">Step : </label>
                <select id="time-step" v-model="timeStep">
                  <option value="300000">5 minutes</option>
                  <option value="900000">15 minutes</option>
                  <option value="3600000">1 heure</option>
                  <option value="86400000">1 jour</option>
                </select>
            </div>
          </div>
        </form>
      </div>
      <div class="filterLine"></div>

      <ModalAlert>
          <template #activator="{ openModal }">
            <div class="flex content-ctr">
                <button title="Open modal" @click="openModal" class="btn btn-lg">Ajouter un graphique</button>
            </div>
      <div class="filterLine"></div>
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-md">Fermer</button>
          </template>
          <template v-slot:title class="title">Ajouter une analyse</template>
          <template v-slot:default>
              <form class="graph-create flex flex-col" @submit.prevent="addGraph">
                <div class="flex flex-row content-sb align-ctr">
                  <div class="data flex flex-col">
                    <label for="data-type">Data :</label>
                    <select required id="data-type" v-model="dataType">
                      <option value="click">Click</option>
                      <option v-if="dataRepr != 'graph'" value="newVisitor">Nouveaux Visiteurs</option>
                      <option value="page-view">Visites</option>
                      <option value="submit">Soumissions</option>
                    </select>
                  </div>

                  <div class="representation flex flex-col">
                    <label for="data-repr">Représentation :</label>
                    <select required id="data-repr" v-model="dataRepr">
                      <option v-if="dataType != 'newVisitor'" value="graph">Graphique</option>
                      <option value="kpi">KPI</option>
                    </select>
                  </div>

                  <div class="name flex flex-col">
                    <label for="graphName">Nom du graphique :</label>
                    <input type="text" id="graphName" v-model="graphName" required>
                  </div>
                </div>

                <div class="send text-ctr mt-3">
                    <button type="submit" class="btn btn-md btn-purple w-100">Ajouter</button>
                </div>
              </form>
          </template>
        </ModalAlert>

      <div class="graph flex flex-col content-ctr">
        <div class="graph-unit" v-for="option in dashboardOptions">
            <div class="kpi flex flex-col content-ctr" v-if="option.representation === 'kpi'">
                <p class="content">{{ parseKpi(option.type, eventData) }}</p>
                <p>{{ option.name }}</p>
            </div>
            <div class="chart" v-if="option.representation === 'graph'">
                <GChart 
                    type="LineChart"
                    :option="getChartOption(option)" 
                    :data="parseGraph(option.type, eventData, timeStep)" 
                />   
                <p>{{ option.name }}</p>
            </div>

            <div v-if="option.length !== 0" class="add-graph-btn flex content-ctr text-ctr mt-3">
                <button class="btn btn-md btn-purple" @click="removeGraph(option)">Supprimer</button>
            </div>
            <div class="filterLine"></div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { GChart } from 'vue-google-charts';
import ModalAlert from "@/components/ModalAlert.vue";
import { handleRequest, sseRequest } from '../../utils/request'
import { ref, onMounted } from 'vue';
import { parseKpi, parseGraph } from "../../utils/parser";

const dashboardOptions = ref([])
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
const eventData = ref()
const timeStep = ref("300000")

let sseListener = undefined

const addGraph = async () => {
    dashboardOptions.value.push({
        type: dataType.value,
        representation: dataRepr.value,
        name: graphName.value
    })

    await updateDbDashboard()
}

const removeGraph = async (option) => {
    const newOptions = dashboardOptions.value.filter(optionItem => optionItem != option)
    dashboardOptions.value = newOptions

    await updateDbDashboard()
}

const updateDbDashboard = async () => {
    await handleRequest("/user/dashboard", { json: { dashboardOptions: dashboardOptions.value }}, true, { method: "PUT" })
}

const getChartOption = (option) => {
    return {
        chart: {
            title: option.name,
            width: 400,
            height: 200
        }
    }
}

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

    handleRequest("/user/dashboard")
        .then(data => {
            dashboardOptions.value = data.data
            updateData()
        })

})

const updateData = async () => {
    const filter = {
        startDate: startDate.value ? new Date(startDate.value).getTime() : 0,
        endDate: endDate.value ? new Date(endDate.value).getTime() : 0,
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

    if (sseListener) {
        sseListener.close()
    }

    const res = await handleRequest("/event/filter", { json: filter })
    
    const callback = (data) => {
        console.log(data)
        eventData.value = data
    }

    sseListener = sseRequest(filter, callback)
    
    eventData.value = res
    }
</script>

<style scoped lang="scss">
#dashboard {
    overflow-y: scroll;

    .top-container {

        label {
          color: var(--indigo);
          margin-bottom: 0.25rem;
        }

        .date-filter {
            margin-top: 30px;
        }

        form > div > div {
            width: 30%;
        }
    }

    .filterLine {
        width: 100%;
        border-bottom: 2px solid black;
        margin: 30px 0;
        opacity: 10%;
    }

    .graph-unit {
        .kpi, .chart {
            text-align: center;

            p {
                color: black;
            }

            .content {
                font-size: 40px;
            }
        }

        .add-graph-btn {
            button {
                text-align: center;
            }
        }
    }

    .graph-create {

      label {
        color: var(--indigo);
        margin-bottom: 0.25rem;
      }

      >div:first-child >div:not(:last-child) {
        width: 25%;
      }

      >div:first-child >div:last-child {
        width: 40%;
      }

    }
}


</style>
