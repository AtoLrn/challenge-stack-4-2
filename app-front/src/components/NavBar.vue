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
        <RouterLink :to="{name: 'requests'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-user-check"></i>
          </div>
          <p>Validations</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'users'}" class="link-white flex align-ctr">
          <div>
            <i class="fa-solid fa-users"></i>
          </div>
          <p>Utilisateurs</p>
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
      <li>
        <a class="link-white flex align-ctr" href="#">
          <div>
            <i class="fa-solid fa-sign-out"></i>
          </div>
          <p>Déconnexion</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: "NavBar"
}

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
}

</style>
