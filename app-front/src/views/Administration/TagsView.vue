<template>
  <div class="card">

    <div class="flex content-sb bdr-btm w-100">
      <div class="tabs flex content-st w-50">
        <div class="tab poppins" :class="{ active: activeTab === 'tags' }" @click="changeTab('tags')">Tags</div>
        <div class="tab poppins" :class="{ active: activeTab === 'tunnels' }" @click="changeTab('tunnels')">Tunnels de conversion</div>
      </div>
      <div class="w-50 text-r">
        <button v-if="activeTab === 'tags'"
                class="btn btn-purple btn-md">Ajouter un tag &nbsp;<i class="fa-solid fa-tag"></i>
        </button>
        <button v-else
                class="btn btn-md">Ajouter un tunnel &nbsp;<i class="fa-solid fa-arrows-turn-right"></i>
        </button>
      </div>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'tags'">

        <table class="table">
          <thead>
          <tr>
            <th class="title">Nom</th>
            <th class="title">Description</th>
            <th class="title">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <p class="tag">Tag 1</p>
            </td>
            <td>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi delectus dolorem explicabo.
            </td>
            <td>
              <button class="btn btn-sm" style="margin-right: 0.25rem">Modifier &nbsp;<i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-sm">Supprimer &nbsp;<i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <div v-else-if="activeTab === 'tunnels'">

        <select>
          <option value="" selected>Choisir une option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tags',
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
  },
};
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

.table {
  thead {
    tr {
      th:first-child {
        width: 30%;
        padding-right: 30px;
      }

      th:nth-child(2) {
        width: 45%;
      }

      th:nth-child(3) {
        width: 25%;
      }
    }
  }

  tbody {
    tr {
      td:first-child {
        padding-right: 30px;
      }
    }
  }

  .tag {
    background-color: var(--lilac);
    color: var(--purple);
    padding: 4px 8px;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    font-family: var(--font-title);
  }
}


</style>

