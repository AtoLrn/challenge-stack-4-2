<template>
  <div id="admin-panel" class="card">
    <table class="table">
      <thead>
        <tr>
          <th class="title">Nom</th>
          <th class="title">Prénom</th>
          <th class="title">Email</th>
          <th class="title">Société</th>
          <th class="title">Statut</th>
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
            <p class="tag tag-verified">Vérifié</p>
          </td>
          <td>
            <button class="btn btn-sm" style="margin-right: 0.25rem">Modifier &nbsp;<i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm">Supprimer &nbsp;<i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>johndoe@gmail.com</td>
          <td>QuackMart</td>
          <td>
            <p class="tag tag-pending">En attente</p>
          </td>
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
  .tag {
    padding: 4px 8px;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;

    &-verified {
      background-color: var(--light-green);
      color: var(--green);
    }

    &-pending {
      background-color: var(--light-red);
      color: var(--red);
    }

  }
</style>
