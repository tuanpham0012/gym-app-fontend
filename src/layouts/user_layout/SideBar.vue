<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="user-profile" v-if="user">
          <div class="user-image">
            <img src="../../assets/public/images/user.jpg">
          </div>
          <div class="user-name">
              {{ user.name }}
          </div>
          <div class="user-designation">
              {{ user.position || 'Người dùng'}}
          </div>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'user-home'}">
              <i class="icon-box menu-icon"></i>
              <span class="menu-title">Bảng tin</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i class="icon-disc menu-icon"></i>
              <span class="menu-title">Cá nhân</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="#">Vé tập</a></li>
                <li class="nav-item"> <a class="nav-link" href="#">Khóa học</a></li>
                <li class="nav-item"> <a class="nav-link" href="#">Thông tin</a></li>
                <li class="nav-item"> <router-link class="nav-link" :to="{name: 'user-orders'}">Đơn hàng</router-link></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="icon-file menu-icon"></i>
              <span class="menu-title">HLV</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'user-store'}">
              <i class="icon-pie-graph menu-icon"></i>
              <span class="menu-title">Gian hàng</span>
            </router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="icon-command menu-icon"></i>
              <span class="menu-title">Khóa học</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="icon-help menu-icon"></i>
              <span class="menu-title">Icons</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="icon-head menu-icon"></i>
              <span class="menu-title">User Pages</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="#"> Login </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Login 2 </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Register </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Register 2 </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Lockscreen </a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="icon-book menu-icon"></i>
              <span class="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore();

const user = computed( () => store.state.userInfo ?? null);

</script>
<style lang="">
    
</style>