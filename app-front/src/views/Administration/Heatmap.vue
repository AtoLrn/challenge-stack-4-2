<template>
  <div id="heatmap" class="card flex flex-col">

    <div class="filter"> 
        <label for="filterPath" class="title c-indigo">Choisissez un URL :</label>
        <select @change="onSelectUpdate" id="filterPath" class="w-25" v-model="choosedPath">
            <option v-for="path in paths" v-bind:value="path">{{ path }}</option>
        </select>
    </div>

    <div class="heatmaps">
        <div class="heatmap-container flex flex-col align-ctr">
            <iframe
                :src="'https://' + fullWebsite"
                height="1000px"
                width="100%"
            >
            </iframe>
            <div ref="clickMap" class="click-heatmap flex content-ctr">
            </div>
            <h3 class="mt-2 title">Heatmap des clics</h3>
        </div>

        <div class="filterLine w-100"></div>

        <div class="heatmap-container flex flex-col align-ctr">
            <iframe
                :src="'https://' + fullWebsite"
                height="1000px"
                width="100%"
            >
            </iframe>
            <div ref="movementMap" class="movement-heatmap w-100">
            </div>
            <h3 class="mt-2 title">Heatmap des mouvements de souris</h3>
        </div>
    </div>
  </div>
</template>

<script setup>
import { handleRequest } from '../../utils/request'
import { ref, onMounted } from 'vue';
import { parseHeatmap } from '../../utils/parser';
import h337 from "@mars3d/heatmap.js"

const paths = ref([])
const choosedPath = ref("/")
const websiteUrl = ref()
const data = ref({click: {}, movement: {}})
const clickMap = ref()
const movementMap = ref()
const heatmapClick = ref()
const heatmapMovement = ref()
const fullWebsite = ref()

const onSelectUpdate = async () => {
    fullWebsite.value = websiteUrl.value + choosedPath.value

    const filter = {
        startDate: 0,
        endDate: 0,
        dimension: [
            {
                type: "path",
                value: choosedPath.value
            }
        ]
    }

    const resData = await handleRequest("/event/filter", { json: filter })
    data.value.click = parseHeatmap(resData, "click", clickMap.value.clientHeight, clickMap.value.clientWidth)
    data.value.movement = parseHeatmap(resData, "mouse-movement", movementMap.value.clientHeight, movementMap.value.clientWidth)

    heatmapClick.value.setData(data.value.click);
    heatmapMovement.value.setData(data.value.movement);
}

onMounted(async () => {
    paths.value = await handleRequest("/event/path")

    const profilData = await handleRequest("/user/profile")
    websiteUrl.value = profilData.websiteUrl

    heatmapClick.value = h337.create({
      container: clickMap.value
    });

    heatmapMovement.value = h337.create({
      container: movementMap.value
    });

    onSelectUpdate()
})

</script>

<style scoped lang="scss">
#heatmap {
    overflow-y: scroll;

    .filter {
      label {
        padding-right: 0.5rem;
      }
    }

    .filterLine {
        border-bottom: 2px solid black;
        margin: 30px 0;
        opacity: 10%;
    }

    .heatmaps {
        margin-top: 30px;

        .heatmap-container {
            position: relative;

            iframe {
              border-width: unset;
              border-style: unset;
            }

            .click-heatmap, .movement-heatmap {
                border: 0.75px solid var(--indigo);
                height: 1000px;
                width: 100%;
                position: absolute !important;
                top: 0;
                left: 0;
            }
        }
    }
}
</style>
