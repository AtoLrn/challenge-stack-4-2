<template>
  <nav class="flex flex-col content-sb">
    <ul>
      <li>
        <RouterLink :to="{name: 'dashboard'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-house"></i>
          </div>
          <p>Dashboard</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'heatmap'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <p>Heatmap</p>
        </RouterLink>
      </li>
      <li v-if="isAdmin">
        <RouterLink :to="{name: 'requests'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-user-check"></i>
          </div>
          <p>Validations</p>
        </RouterLink>
      </li>
      <li v-if="isAdmin">
        <RouterLink :to="{name: 'users'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-users"></i>
          </div>
          <p>Utilisateurs</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'tags'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-tags"></i>
          </div>
          <p>Tags</p>
        </RouterLink>
      </li>
    </ul>

    <ul>
      <li>
        <RouterLink :to="{name: 'profile'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-user-pen"></i>
          </div>
          <p>Mon profil</p>
        </RouterLink>
      </li>
      <li @click.prevent="handleDisconnect">
        <a class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-sign-out"></i>
          </div>
          <p>Déconnexion</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { deleteToken } from './../utils/token'
import { getRole, deleteRole } from "@/utils/role";

import router from './../router'

const handleDisconnect = () => {
  deleteToken()
  deleteRole()
  router.push('/')
}

const isAdmin = getRole() === 'admin';

</script>

<style scoped lang="scss">

nav {
  width: 16%;
  background: var(--gradient-dark);

  ul:first-child {
    margin-top: 2rem;
  }

  ul:last-child {
    margin-bottom: 2rem;
  }

  li {
    list-style: none;
    margin-bottom: 1rem;
  }

  .link-white {
    font-family: var(--font-title);
    font-size: 14px;

    > div {
      width: 15px;
    }

    > p {
      margin-left: 1rem;
    }

    &.router-link-exact-active {
      color: var(--white);
      font-weight: 600;
      text-shadow: 0 0 10px var(--white);

      &:hover {
        text-shadow: 0 0 10px var(--white);
      }

      &:first-of-type {
        border: 0;
      }

    }

  }

}


</style>
