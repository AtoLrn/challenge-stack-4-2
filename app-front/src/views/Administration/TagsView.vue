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

        <select>
          <option value="" selected>Choisir une option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        <ModalAlert>
          <template #activator="{ openModal }">
            <button title="Open modal" @click="openModal" class="btn btn-md btn-purple">Ouvrir</button>
          </template>
          <template #actions="{ closeModal }">
            <button title="close" @click="closeModal" class="btn btn-md">Fermer</button>
          </template>
          <template v-slot:title class="title">Ma super modal</template>
          <template v-slot:default>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur at consequatur molestias possimus ratione repudiandae saepe sapiente? Dolore id illo non odit quae ratione unde? Eius molestias officiis quasi.
            </p>
          </template>
        </ModalAlert>


      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";
import TagsTable from "@/components/TagsTable.vue";
import ModalAlert from "@/components/ModalAlert.vue";

const activeTab = ref('tags');
const changeTab = (tab) => {
  activeTab.value = tab;
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

