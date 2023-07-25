<template>
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
    <tr>
      <td>
        <p class="tag">Tag 2</p>
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
</template>

<script setup>

</script>

<style scoped lang="scss">

.table {
  thead {
    tr {
      th:first-child {
        width: 25%;
        padding-right: 30px;
      }

      th:nth-child(2) {
        width: 50%;
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
    font-size: 12px;
  }
}

</style>
