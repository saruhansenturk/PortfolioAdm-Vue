<template>
  <v-app>
    <HomePage/>
</v-app>
<Loader ref="Loader"></Loader>
<ShowContent ref="ShowContent"></ShowContent>
</template>


<script>
import HomePage from './views/HomePage.vue';
import Loader from './components/Loader.vue';
import ShowContent from './components/ShowContent.vue';

export default{
  name: 'App',
  components: {
    Loader,
    HomePage,
    ShowContent
},
  mounted(){
    if (this.$root != null) {
      this.$root.Loader = this.$refs.Loader;
      this.$root.ShowContent = this.$refs.ShowContent;
    }
  }
}

</script>

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
</style>
