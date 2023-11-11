<template>
  <v-container v-if="isAuthenticated" fluid>
    <v-app-bar app color="blue-darken-2" dark :style="{ zIndex: 1 }">
      <v-app-bar-nav-icon @click="toggleNav()" fixed>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <UserSection/>
    </v-app-bar>

    <NavigationSection v-if="drawer" :style="{ zIndex: 1 }" />
    <v-main>
      <v-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </v-container>
    </v-main>

  </v-container>

  <LoginPage v-if="!isAuthenticated" @login="onLogin" />
</template>

<script>
import UserSection from '@/components/UserSection.vue';
import NavigationSection from '@/components/NavigationSection.vue';
import LoginPage from '../views/LoginPage.vue';


export default {
  data() {
    return {
      drawer: true,
      isAuthenticated: false,
      rail: true,
    };
  },
  components: { LoginPage, UserSection, NavigationSection },
  methods: {
    onLogin(el) {
      this.isAuthenticated = true;
    },
    toggleNav() {
      this.drawer = this.drawer == false;
    }
  },
  beforeMount() {
    const token = localStorage.getItem('accesstoken');
    const expire = localStorage.getItem('expiration');

    if (token != null && expire != null) {

      if (token && Date.parse(expire) > Date.now()) {
        this.isAuthenticated = true;
      }
    } else {
      this.isAuthenticated = false;
      localStorage.clear();
      this.$router.push({ name: 'HomePage' })
    }

  }
}
</script>
