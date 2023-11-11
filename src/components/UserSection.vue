<template>

  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-chip style="margin: 5px;" v-bind="props" color="blue-lighten-5" variant="outlined" size="small">
        <v-icon start icon="mdi-account-settings"></v-icon>
        Saruhan
      </v-chip>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown" size="small">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
          <h5>Saruhan Furkan</h5>
          <p class="text-caption mt-1">
            srhnfrkn75@gmail.com
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn rounded variant="text">
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn rounded variant="text" @click="logOut">
            LogOut
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    logOut() {
      this.$root.Loader.toggle({
        isShow: true
      });

      localStorage.clear();
      window.location.reload();

      this.$root.Loader.toggle({
        isShow: false
      });
    }
  }
}
</script>
