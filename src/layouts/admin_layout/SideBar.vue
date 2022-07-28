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
              {{ user.position_name || 'Người dùng'}}
          </div>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'user-home'}">
              <i class="icon-box menu-icon"></i>
              <span class="menu-title">DashBoard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i class="icon-disc menu-icon"></i>
              <span class="menu-title">Bán hàng</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <router-link class="nav-link" :to="{name: 'admin-products'}">Quản lý sản phẩm</router-link></li>
                <li class="nav-item"> <router-link class="nav-link" :to="{name: 'admin-orders'}">Đơn hàng</router-link></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'admin-users'}">
              <i class="icon-file menu-icon"></i>
              <span class="menu-title">Quản lý người dùng</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'admin-coachs'}">
              <i class="icon-pie-graph menu-icon"></i>
              <span class="menu-title">Quản lý HLV</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'admin-tickets'}">
              <i class="icon-command menu-icon"></i>
              <span class="menu-title">Quản lý vé tập</span>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="icon-help menu-icon"></i>
              <span class="menu-title">Chương trình</span>
            </a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="icon-head menu-icon"></i>
              <span class="menu-title">Fitness Social</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <router-link class="nav-link" :to="{name: 'admin-posts'}"> Quản lý bài viết </router-link></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Báo cáo </a></li>
                <!-- <li class="nav-item"> <a class="nav-link" href="#"> Register </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Register 2 </a></li>
                <li class="nav-item"> <a class="nav-link" href="#"> Lockscreen </a></li> -->
              </ul>
            </div>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="icon-book menu-icon"></i>
              <span class="menu-title">Documentation</span>
            </a>
          </li> -->
        </ul>
      </nav>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore();

const user = computed( () => store.state.adminInfo ?? null);

</script>
<style scoped>
.sidebar{
    background: rgb(26,21,117);
background: linear-gradient(339deg, rgba(26,21,117,1) 0%, rgba(17,19,110,1) 54%, rgba(0,212,255,1) 100%);
}
</style>