<template>
  <div id="heatmap" class="card flex flex-col">
      <h1 class="text-ctr">Heatmap</h1>

    <div class="filter"> 
        <label for="filterPath">URL :</label>
        <select @change="onSelectUpdate" id="filterPath" v-model="choosedPath">
            <option v-for="path in paths" v-bind:value="path">{{ path }}</option>
        </select>
    </div>

    <div class="heatmaps">
        <div class="click-heatmap">
        </div>
    </div>
  </div>
</template>

<script setup>
import { handleRequest } from '../../utils/request'
import { ref, onMounted } from 'vue';
import { parseHeatmap } from '../../utils/parser';

const paths = ref([])
const choosedPath = ref("/")
const websiteUrl = ref()
const data = ref()

const onSelectUpdate = () => {
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

    handleRequest("/event/filter", { json: filter }).then(data => console.log(parseHeatmap(data)))

}

onMounted(() => {
    handleRequest("/event/path")
        .then(data => paths.value = data)

    handleRequest("/user/profile")
        .then(data => websiteUrl.value = data.websiteUrl)

    onSelectUpdate()
})

</script>

<style scoped lang="scss">
#dashboard {
    overflow: scroll;

    h1 {
        margin-bottom: 20px;
    }

    .heatmaps {
        .click-heatmap {
            width: 600px;
            width: 600px;
        }
    }
}
</style>
