<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo" href="#"><img srcset="../../assets/public/images/Logo.png 2x" alt="logo" class="img-logo"/></a>
        <a class="navbar-brand brand-logo-mini" href="#"><img srcset="../../assets/public/images/logo-mini.png 2x" class="img-logo" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center d-none" type="button" data-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
        <ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text m-2" id="search">
                  <i class="icon-search"></i>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="Search..." aria-label="search" aria-describedby="search">
            </div>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown d-flex">
            <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
              <i class="icon-mail mx-0"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal">David Grey
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    The meeting is cancelled
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal">Tim Cook
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    New product launch
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal"> Johnson
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    Upcoming board meeting
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown d-flex">
            <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
              <i class="icon-bell mx-0"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal">David Grey
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    The meeting is cancelled
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal">Tim Cook
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    New product launch
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                    <img src="../../assets/public/images/user.jpg" alt="image" class="profile-pic">
                </div>
                <div class="preview-item-content flex-grow">
                  <h6 class="preview-subject ellipsis font-weight-normal"> Johnson
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                    Upcoming board meeting
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown d-flex mr-4 ">
            <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i class="icon-cog"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Settings</p>
              <a class="dropdown-item preview-item">               
                  <i class="icon-head"></i> Thông tin cá nhân
              </a>
              <a class="dropdown-item preview-item" @click.stop="logout()">
                  <i class="icon-inbox"></i> Đăng xuất
              </a>
            </div>
          </li>
          <li class="nav-item dropdown mr-4 d-lg-flex d-none">
            <a class="nav-link count-indicatord-flex align-item s-center justify-content-center" href="#">
              <i class="icon-grid"></i>
            </a>
          </li>
          <!-- <li class="nav-item dropdown mr-4 d-lg-flex d-none">
            <router-link class="nav-link count-indicatord-flex align-item s-center justify-content-center" :to="{name: 'user-carts'}">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </router-link>
          </li> -->
        </ul>
        <button class="btn d-lg-none align-self-center" type="button" v-if="user">
          <div class="d-flex justify-content-between align-items-center">
            <img src="../../assets/public/images/user.jpg" class="user-image">
            <p class="user-name">{{ user.name }}</p>
          </div>
        </button>
      </div>
    </nav>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios';
import { auth } from '../../config'

const store = useStore();
const router = useRouter();

const user = computed( () => store.state.userInfo ?? null);

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
        router.push({
          name: 'login-admin',
        })
      }).catch( err => {
        console.log(err);
      })
}
</script>
<style scoped>
.img-logo{
    object-fit: cover;
}
.user-name{
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0.5rem;
}
.user-image{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}
.navbar .navbar-brand-wrapper{
background: rgb(62,55,175);
background: linear-gradient(332deg, rgba(62,55,175,1) 0%, rgba(98,168,170,1) 50%, rgba(76,66,167,1) 100%);
}
</style>