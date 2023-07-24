<template>
  <div id="admin-panel" class="card">
    <table>
      <thead>
      <tr>
        <th class="title">Nom</th>
        <th class="title">Prénom</th>
        <th class="title">Email</th>
        <th class="title">Société</th>
        <th class="title">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>johndoe@gmail.com</td>
        <td>QuackMart</td>
        <td>
          <button class="btn btn-sm" style="margin-right: 0.25rem">Modifier &nbsp;<i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-sm">Supprimer &nbsp;<i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem 0.5rem;
    border-bottom: var(--border);
    text-align: left;
  }

  th {
    font-size: 16px;
  }

  thead tr th:last-child,
  tbody tr td:last-child{
    text-align: right;
  }

  tbody {

    tr {
      transition: var(--transition);
    }

    tr:hover {
      background-color: var(--light-purple);
    }


  }

}

</style>
