<template>

  <header>

    <div class="wrapper">
      <div>
        <img src="../assets/img/logo.png" alt="logo">
        <p>QuackMart</p>
      </div>
      <nav>
        <RouterLink to="/" sdk-id="abcdefg">Accueil</RouterLink>
        <RouterLink to="/shop">Shopping</RouterLink>
      </nav>

    </div>

  </header>

</template>

<script>

import {RouterLink} from "vue-router";

export default {
  name: "NavBar",
  components: {RouterLink}
}

</script>

<style scoped lang="scss">

header {
  line-height: 1.5;
  max-height: 100vh;
  background: var(--gradient-dark);
  padding: 0.5rem;
}

.wrapper {
  display: flex;
  align-items: center;
  font-family: var(--font-title);
  font-size: 16px;
  font-weight: bolder;
  justify-content: space-between;

  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);

    img {
      width: 40px;
      margin-right: 1rem;
      margin-left: 0.75rem;
      transform: scaleX(-1);
    }

  }

  nav a {
    padding: 0 1.75rem;
    color: var(--white);
    border-left: 1px solid var(--color-border);
    font-family: var(--font-title);
    font-size: 14px;
    transition: all 0.2s ease-in-out;

    &.router-link-exact-active {
      color: var(--white);
      font-weight: 600;
      text-shadow: 0 0 10px #fff;
    }

    &:hover {
      text-shadow: 0 0 10px #fff;
    }

    &:first-of-type {
      border: 0;
    }

  }

}

</style>
