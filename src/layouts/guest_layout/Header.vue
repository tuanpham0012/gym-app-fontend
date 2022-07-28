<template lang="">
  <header>
    <div class="header-top">
      <div class="container">
        <img
          srcset="../../assets/public/images/Logo.png 2x"
          class="header-logo"
          alt=""
        />
        <ul class="menu d-none d-sm-flex">
          <li class="menu-item active">
            <a class="menu-link" href="#">Home</a>
          </li>
          <li class="menu-item"><a class="menu-link" href="#">Courses</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Pricing</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Reviews</a></li>
        </ul>
        <div class="header-login" v-if="!user">
          <button type="button" @click="toLogin()" class="btn-auth">Log in</button>
          <button type="button" @click="toRegister()" class="btn-auth">Sign Up</button>
        </div>
        <div v-else>
          <p style="color: white; cursor: pointer" @click="logout()">{{ user.name}}</p>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { auth } from '../../config';
export default {
  computed:{
    user(){
      return this.$store.state.userInfo ?? null;
    }
  },
  methods: {
    toLogin(){
      this.$router.push({name: 'login-user'});
    },
    toRegister(){
      this.$router.push({name: 'register-user'});
    },
    async logout(){
      await this.axios({
        method: 'post',
        url: auth.USER_LOGOUT,
        headers: 
          {'Authorization': this.$store.state.token,
            'Accept': 'application/json'
          },
      }).then( res =>{
        console.log(res.data);
        sessionStorage.removeItem('token');
        this.$store.commit('setToken', null);
        this.$store.commit('setUserInfo', null);
      }).catch( err => {
        console.log(err);
      })
    }
  },
};
</script>
<style lang=""></style>
