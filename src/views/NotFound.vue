<template>
  <div class="notfound">
    <img src="../assets/media/gifs/notfound.gif" alt="" />
    <h2>page Not found</h2>
    <h3>go back to <router-link to="/">Home Page</router-link></h3>
  </div>
</template>
<style lang="scss" scoped>
.notfound {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: var(--main_theme_clr);
  a {
    color: rgb(238, 140, 13);
  }
}
</style>
