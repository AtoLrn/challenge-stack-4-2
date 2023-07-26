<template>
  <div class="card">

    <div class="flex content-sb bdr-btm w-100">
      <div class="tabs flex content-fs w-50">
        <div class="tab poppins" :class="{ active: activeTab === 'tags' }" @click="changeTab('tags')">Tags</div>
        <div class="tab poppins" :class="{ active: activeTab === 'tunnels' }" @click="changeTab('tunnels')">Tunnels de conversion</div>
      </div>
      <div class="w-50 text-r">
        <button v-if="activeTab === 'tags'"
                class="btn btn-purple btn-md">Ajouter un tag &nbsp;<i class="fa-solid fa-tag"></i>
        </button>
        <button v-else
                class="btn btn-purple btn-md">Ajouter un tunnel &nbsp;<i class="fa-solid fa-arrows-turn-right"></i>
        </button>
      </div>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'tags'">
        <TagsTable />
      </div>
      <div v-else-if="activeTab === 'tunnels'">
        <select @change="updateGraph">
          <option value="not-selected" selected>Choisir une option</option>
          <option v-for="tag in availableTags" :value="tag.name">{{  tag.name  }}</option>
        </select>

        <div v-if="data.length > 1">
          <SankeyView :data="data" />
        </div>

        <div  v-else>
          <p>No data to display</p>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";
import SankeyView from './SankeyView';

import TagsTable from "@/components/TagsTable.vue";
import ModalAlert from "@/components/ModalAlert.vue";
import { handleRequest } from "../../utils/request";

const availableTags = await handleRequest('/tag').then(({ data }) => data)

const data = ref([])

const activeTab = ref('tags');
const changeTab = (tab) => {
  activeTab.value = tab;
}

const updateGraph = async (value) => {
  if (value.target.value !== "not-selected") {
    const fetchedTagTunnel = await handleRequest(`/event/tunnel/${value.target.value}`)
    data.value = fetchedTagTunnel.data
  } 
}
</script>


<style scoped lang="scss">

.tabs {

  .tab {
    padding: 4px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .active {
    border-bottom: 2px solid var(--indigo);
    color: var(--indigo);
  }

}

.tab-content {
  margin-top: 20px;
}

</style>

