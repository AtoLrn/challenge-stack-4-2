<template>
  <div class="card">

    <div class="flex content-sb bdr-btm w-100">
      <div class="tabs flex content-fs w-50">
        <div class="tab poppins" :class="{ active: activeTab === 'tags' }" @click="changeTab('tags')">Tags</div>
        <div class="tab poppins" :class="{ active: activeTab === 'tunnels' }" @click="changeTab('tunnels')">Tunnels de conversion</div>
      </div>
      <div class="w-50 text-r">
        <div v-if="activeTab === 'tags'">
        <ModalAlert >
          <template #activator="{ openModal }">
            <button @click="openModal" 
                    class="btn btn-purple btn-md">Ajouter un tag &nbsp;<i class="fa-solid fa-tag"></i>
            </button>          
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-md">Fermer</button>
          </template>
          <template v-slot:title class="title">Ajouter un tag</template>
          <template v-slot:default>
            <form @submit.prevent="handleSubmit" class="flex flex-col align-ctr">
              <div class="flex flex-col align-ctr">
                <label for="description" class="caption c-purple">Description</label>
                <input type="text" id="description" v-model.trim="descriptionTag" required>
              </div>
              <div id="card-bottom" class="flex flex-row align-ctr content-sb">
                <div>
                  <button type="submit" class="btn btn-md">Ajouter</button>
                </div>
              </div>
            </form>
          </template>
        </ModalAlert>
      </div>
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

const descriptionTag = ref()

const handleSubmit = async () => {
  await handleRequest('/tag', { json: { description: descriptionTag.value } } ).catch((err) => {
    alert(err.message)
  })

  close
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

