<template>
  <div class="container">
    <div class="left-content">
      <div class="loginSec">
        <v-card class="cardCls" style="color: black; background-color: cornflowerblue; animation: backwards;">
          <v-card-title
            style="text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">Login</v-card-title>
          <v-sheet width="300" class="mx-auto">
            <v-form @submit.prevent>
              <v-text-field v-model="username" :rules="rules" label="Name-Surname"></v-text-field>
              <v-text-field v-model="password" :rules="rules" label="Password" type="password"></v-text-field>
              <v-btn type="submit" @click="submit" color="#053B50" style="color: aliceblue;" block
                class="mt-2">Submit</v-btn>
            </v-form>
          </v-sheet>
        </v-card>
      </div>
    </div>
    <div class="right-content">
      <div class="img-log">
        <v-img />
      </div>
    </div>
  </div>
</template>


<script>
import httpService from '@/services/httpService';
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: [
        function (value) {
          if (value) return true;
          return 'You must enter this field.';
        },
      ],
      isAuth: false
    }
  },
  methods: {
    async submit(event) {      
      this.$root?.Loader.toggle({
        isShow: true
      });

      var response = await httpService.post("https://localhost:7280/api/Auths/Login", {
        usernameOrEmail: this.username,
        password: this.password
      }).then((resp) => {
        localStorage.setItem('accesstoken', resp.data.token.accessToken);
        localStorage.setItem('expiration', resp.data.token.expiration);

        this.$emit('login');
        this.$router.push({ name: 'Home' });

        console.log(resp);
      }).catch(err => {
        console.log(err);
      });

      this.$root?.Loader.toggle({
        isShow: false
      });

    }
  }
}


</script>


<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.left-content {
  flex: 1;
  background-color: #f2f2f2;
  padding: 20px;
}

.right-content {
  flex: 1;
  background-color: #e0e0e0;
  padding: 20px;
}

.img-log {
  display: grid;
  place-items: center;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 2%;
  background-image: url('https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80');
  background-size: cover;
}



.cardCls {
  box-shadow: transparent;
  transition: ease 1s;
}

.cardCls:hover {
  background-color: #f0f0f0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
  transition: ease 1s;
}


.loginSec {
  display: grid;
  place-items: center;
  /* İçeriği ortala */
  height: 100%;
  background-color: #f2f2f2;

}
</style>


