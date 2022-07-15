<template>
  <router-view/>
  <div class="copyright">Copyright ©2022 横浜国立大学 大学祭実行委員会</div>
    <a href="https://www.flaticon.com" title="icons attribution">Icons Attribution: Flaticon</a>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.copyright{
  margin-top: 2rem;
}
</style>
