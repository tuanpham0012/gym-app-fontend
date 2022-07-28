<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { auth} from './config'

const store = useStore();
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

onMounted ( () => {
  if(sessionStorage.getItem('token') && sessionStorage.getItem('role')){
    if(sessionStorage.getItem('role') == 1){
      store.commit('setToken', sessionStorage.getItem('token'));
      store.dispatch('getuserInfo', sessionStorage.getItem('token'));
    }else if(sessionStorage.getItem('role') == -999){
      store.commit('setToken', sessionStorage.getItem('token'));
      store.dispatch('getAdminInfo', sessionStorage.getItem('token'));
    }
  }
});


 function logout(){
       axios({
        method: 'post',
        url: auth.USER_LOGOUT,
        headers: 
          {'Authorization': store.state.token,
            'Accept': 'application/json'
          },
      }).then( res =>{
        console.log(res.data);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        store.commit('setToken', null);
        store.commit('setAdminInfo', null);
      }).catch( err => {
        console.log('acac');
      })
}

onBeforeUnmount( () => {
  logout();
})

</script>

<template>
  <router-view></router-view>
</template>

<style>
::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 1rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(204, 203, 223);
  border-radius: 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(156, 155, 170);
}
</style>
