<template>
  <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
    >
      <a class="navbar-brand brand-logo" href="#"
        ><img
          srcset="../../assets/public/images/Logo.png 2x"
          alt="logo"
          class="img-logo"
      /></a>
      <a class="navbar-brand brand-logo-mini" href="#"
        ><img
          srcset="../../assets/public/images/logo-mini.png 2x"
          class="img-logo"
          alt="logo"
      /></a>
    </div>
    <div
      class="navbar-menu-wrapper d-flex align-items-center justify-content-end"
    >
      <button
        class="navbar-toggler navbar-toggler align-self-center d-none"
        type="button"
        data-toggle="minimize"
      >
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
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-label="search"
              aria-describedby="search"
            />
          </div>
        </li>
      </ul>
      <ul class="navbar-nav navbar-nav-right">
        <!-- <li class="nav-item dropdown d-lg-flex d-none">
                <button type="button" class="btn btn-info font-weight-bold">+ Create New</button>
            </li> -->
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
          :class="{ 'active' : fill('home', $route.path)}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Bảng tin"
        >
          <router-link
            class="nav-link count-indicatord-flex"
            :to="{ name: 'user-home' }"
          >
            <i
              class="icon-layout"
              aria-hidden="true"
              style="font-size: 1.4rem; margin-right: 0"
            ></i>
          </router-link>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
          :class="{ 'active' : fill('course', $route.path)}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Khóa học"
        >
          <a
            class="nav-link count-indicator dropdown-toggle"
            id="notificationDropdown"
            href="#"
            data-toggle="dropdown"
          >
            <i class="mdi mdi-school" style="font-size: 1.45rem"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
            aria-labelledby="notificationDropdown"
          >
            <p class="mb-0 font-weight-normal float-left dropdown-header">
              Khóa học
            </p>
            <a class="dropdown-item preview-item">
              <i class="icon-command"></i> Miễn phí
            </a>
            <a class="dropdown-item preview-item" @click="logout()">
              <i class="icon-box"></i> Trả phí
            </a>
            <a class="dropdown-item preview-item" @click="logout()">
              <i class="icon-cloud-download"></i> Đã mua
            </a>
          </div>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
          :class="{ 'active' : fill('store', $route.path)}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Gian hàng"
        >
          <router-link
            class="nav-link count-indicatord-flex align-item s-center justify-content-center "
            :to="{ name: 'user-store' }"
          >
            <i class="mdi mdi-store" style="font-size: 1.45rem"></i>
          </router-link>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
          :class="{ 'active' : fill('service', $route.path)}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Dịch vụ"
        >
          <router-link
            class="nav-link count-indicatord-flex align-item s-center justify-content-center "
            :to="{ name: 'user-services' }"
          >
            <i class="mdi mdi-thumbs-up-down" style="font-size: 1.4rem"></i>
          </router-link>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center position-relative"
          :class="{ 'active' : fill('cart', $route.path)}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Giỏ hàng"
        >
          <span class="cart-quantity">{{ cart_size }}</span>
          <router-link
            class="nav-link count-indicatord-flex align-item s-center justify-content-center"
            :to="{ name: 'user-carts' }"
          >
            <i
              class="mdi mdi-cart-outline"
              aria-hidden="true"
              style="font-size: 1.4rem"
            ></i>
          </router-link>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
          
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tin nhắn"
        >
          <a
            class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
            id="messageDropdown1"
            href="#"
            data-toggle="dropdown"
          >
            <i class="mdi mdi-facebook-messenger mx-0 text-primary" style="font-size: 1.45rem"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
            aria-labelledby="messageDropdown1"
          >
            <p class="mb-0 font-weight-normal float-left dropdown-header">
              Tin nhắn
            </p>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img
                  src="../../assets/public/images/user.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content flex-grow">
                <h6 class="preview-subject ellipsis font-weight-normal">
                  David Grey
                </h6>
                <p class="font-weight-light small-text text-muted mb-0">
                  The meeting is cancelled
                </p>
              </div>
            </a>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img
                  src="../../assets/public/images/user.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content flex-grow">
                <h6 class="preview-subject ellipsis font-weight-normal">
                  Tim Cook
                </h6>
                <p class="font-weight-light small-text text-muted mb-0">
                  New product launch
                </p>
              </div>
            </a>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img
                  src="../../assets/public/images/user.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content flex-grow">
                <h6 class="preview-subject ellipsis font-weight-normal">
                  Johnson
                </h6>
                <p class="font-weight-light small-text text-muted mb-0">
                  Upcoming board meeting
                </p>
              </div>
            </a>
          </div>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center" :class="{ 'active' : showNotification}"
          data-bs-toggle="tooltip" data-bs-placement="bottom" title="Thông báo"
        >
          <a
            class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
            href="javascript:void(0)" @click="toggleShowNotification()"
          >
            <i class="mdi mdi-bell-ring-outline mx-0"></i>
            <span class="count-unread" v-if="notificationUnread > 0">{{ notificationUnread }}</span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown show preview-list notification" v-if="showNotification"
            
          >
          <div class="notification-header">
            <p class="mb-0 font-weight-normal float-left dropdown-header">
              Thông báo
            </p>
            <button
              type="button"
              class="btn-close "
              @click.stop="toggleShowNotification()"
            ></button>
						<div class="notification-header">
							<div class="btn-action">
								<button type="button" class="btn btn-sm m-1" :class="{'btn-active' : !read}" @click="toggleGetNotification()">Tất cả</button>
								<button type="button" class="btn btn-sm m-1" :class="{'btn-active' : read}" @click="toggleGetNotification()">Chưa đọc</button>
							</div>
						</div>
          </div>
						<div class="notification-container">
							<div class="notification-list">
								<div class="" v-if="notifications && notifications.length > 0">
									<div class="dropdown-divider"></div>
									<a class="notification-item" v-for="(notification, index) in notifications" :key="index" :class="{'notification-unread': !notification.read}" @click="readNotification(notification)">
										<div class="avatar-thumbnail">
											<img :src=" imageLink(notification.user.avatar) " alt="">
										</div>
										<div
											class="preview-item-content d-flex align-items-start flex-column justify-content-center"
										>
											<span class="content" v-html="notification.content"></span>
											<span class="time">{{ countDownTime(notification.created_at) }}</span>
										</div>
									</a>
									<div class="unread"></div>
								</div>
								<div class="notification-blank d-flex align-items-center flex-column justify-content-center mt-5 mb-5" v-else>
									<i class="mdi mdi-bell-ring-outline fs-1"></i>
									<p>Bạn không có thông báo nào!</p>
								</div>
								<div class="p-0 mb-0 text-center"><button class="btn btn-sm btn-link" v-if="notifications && notifications.length >= total" @click="viewMore()">Xem thêm</button></div>
							</div>
							<!-- <div>
								<div class="notification" >
									<div class="dropdown-divider"></div>
									<a class="dropdown-item preview-item">
										<div class="preview-thumbnail">
											<div class="preview-icon bg-success">
												<i class="mdi mdi-calendar"></i>
											</div>
										</div>
										<div
											class="preview-item-content d-flex align-items-start flex-column justify-content-center"
										>
											<h6 class="font-weight-normal mb-1">qw</h6>
											<p class="text-gray ellipsis mb-0"> v-html="notif.content"</p>
											<span class="notification-time">12</span>
										</div>
									</a>
									<div class="unread"></div>
								</div>
								<div class="notification-blank">
									<i class="mdi mdi-bell-ring-outline"></i>
									<p>Bạn không có thông báo nào!</p>
								</div>
								<div class="p-0 mb-0 text-center"><button class="btn btn-sm btn-link" @click="toggleLoadMore(loadMoreSize)">Xem thêm</button></div>
							</div> -->
							
						</div>
						<div class="dropdown-divider"></div>
						<div class="notification-btn">
							<button class="btn btn-sm btn-link">Xem tất cả thông báo</button>
							<button class="btn btn-sm btn-link" @click="readAllNotification()">Đánh dấu đã đọc</button>
						</div>
          </div>
        </li>
        <li
          class="nav-item dropdown ml-2 mr-2 d-flex align-items-center justify-content-center"
        >
          <a
            href="#"
            class="nav-link count-indicator d-flex justify-content-center align-items-center"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="d-flex justify-content-between align-items-center">
              <img
                :src=" imageLink(user.avatar)"
                class="user-image"
              />
            </div>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" v-if="user"
          >
            <div
              class="d-flex justify-content-start align-items-center m-2 ms-3 me-3 border shadow p-1 mb-2 bg-body rounded-3"
            >
              <img
                :src=" imageLink(user.avatar)"
                class="user-image"
              />
              <p class="user-name text-dark">{{ user.name }}</p>
            </div>
            <router-link
              class="dropdown-item fs-6 me-5 mt-3"
              :to="{name: 'user-infomation'}"
            >
              <i class="fa fa-user" aria-hidden="true"></i> Thông tin cá nhân</router-link
            >
            <router-link
              class="dropdown-item fs-6 me-5"
              :to="{ name: 'user-orders' }"
            >
              <i class="mdi mdi-note-text" aria-hidden="true"></i> Đơn hàng của
              tôi</router-link
            >
            <!-- <a class="dropdown-item fs-6 fw-bold me-5" href="#">HLV</a> -->
            <router-link
              class="dropdown-item fs-6 me-5"
              :to="{name: 'user-my-ticket'}"
            >
              <i class="fa fa-ticket" aria-hidden="true"></i> Vé tập</router-link
            >
            <a
              class="dropdown-item fs-6 me-5"
              href="#"
              @click="logout()"
            >
              <i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất</a
            >
          </div>
        </li>
        <!-- <button class="btn btn-primary d-none d-sm-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div> -->
      </ul>

      <!-- <button class="btn align-self-center" type="button" v-if="user">
          <div class="d-flex justify-content-between align-items-center">
            <img src="../../assets/public/images/user.jpg" class="user-image">
            <p class="user-name">{{ user.name }}</p>
          </div>
        </button> -->
    </div>
  </nav>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onBeforeMount, watch } from "vue";
import { auth, notification } from "../../config";
import { countDownTime, imageLink } from "../../helper";
import axios from "axios";

const store = useStore();
const router = useRouter();
const showNotification = ref(false);
const read = ref(false);
const total = ref(10);

const cart_size = computed(() =>
  store.state.carts ? store.state.carts.length : 0
);

const user = computed(() => store.state.userInfo ?? null);

const notifications = computed( () => store.state.notifications ? store.state.notifications.slice(0, total.value) : null);
const notificationUnread = computed(() => store.state.countNotificationUnread ?? null);
const getNotifications = () =>{
  store.dispatch("getNotifications", { token: store.state.token, read: read.value});
}

const toggleShowNotification = () => {
 showNotification.value = !showNotification.value;
}

watch(read, () => {
  getNotifications();
})

onBeforeMount(() => {
  store.dispatch("getCarts", store.state.token);
  getNotifications();

  Echo.channel('th_gym_fitness_database_send_notification')
    .listen('NotificationPosted', (data) => {
        console.log(data);
        if(data.user_id == store.state.userInfo.id){
          getNotifications();
          new Notify ({
              title: '',
              text: data.notification.content,
              autoclose: true,
              autotimeout: 3000,
              status: 'success'
          })
        }
    })
});

const toggleGetNotification = () => {
  read.value = !read.value;
  total.value = 10;
}

const viewMore = () => {
  total.value = total.value + 5;
}

const fill = (value, patch) => {
      return patch.includes(value);
    }

const readNotification = async (data) => {
  let router_name = '';
  switch (data.type) {
    case 'posts':
      router_name = 'user-post-detail';
      break;
    case 'orders':
      router_name = 'user-orders';
    default:
      router_name = 'user-home';
      break;
  }
  router.push({
    name: router_name,
    params: {
      id: data.taget_id,
    },
  });
  await axios({
      method: "PATCH",
      url: notification.CRUD + data.id,
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
    .then((res) => {
      console.log(res.data);
      getNotifications();
    })
    .catch((err) => {
      console.log(err);
    });
  showNotification.value = false;
}

const readAllNotification = async () => {
  await axios({
      method: "DELETE",
      url: notification.CRUD + store.state.userInfo.id,
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
    .then((res) => {
      console.log(res.data);
      read.value = false;
      getNotifications();
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout() {
  let result = confirm("Bạn có chắc muốn đăng xuất khỏi server Trái đất?");
  if(result){
    axios({
      method: "post",
      url: auth.USER_LOGOUT,
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
    .then((res) => {
      console.log(res.data);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      store.commit("setToken", null);
      store.commit("setUserInfo", null);
      router.push({
        name: "login-user",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>
<style scoped>
.img-logo {
  object-fit: cover;
}
.user-name {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0.5rem;
}
.user-image {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  padding: 0.25rem;
  margin: 0.25rem;
  object-fit: cover;
}
.cart-quantity {
  border-radius: 100%;
  width: max-content;
  height: 1rem;
  padding: 0.25rem;
  font-size: 0.675rem;
  font-weight: 600;
  background-color: red;
  color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
  right: 0.8rem;
}
.count-unread{
  border-radius: 100%;
  width: max-content;
  height: 1rem;
  padding: 0.25rem;
  font-size: 0.675rem;
  font-weight: 600;
  background-color: rgb(255, 0, 0);
  color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.25rem;
  right: -0.5rem;
}
.nav-item{
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 9px 9px 0 0;
}
.nav-item:hover{
  background-color: rgb(244, 246, 248);
}
.active a i {
  color: blue;
  border-radius: 8px;
}
.active {
  box-sizing: content-box;
  border-bottom: 3px solid blue;
}
.notification{
  width: 21rem;
}
.notification-header{
  position: relative;
  padding: 0.35rem 0.25rem;
  display: flex;
}
.notification-header .btn-close{
  position: absolute;
  top: 1px;
  right: 2px;
  cursor: pointer;
}
.notification-header .btn-action button{
  border: 1px solid rgb(131, 131, 131);
  border-radius: 12px;
}
.notification-header .btn-action button:hover{
  background-color: blue;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 255);
  box-shadow: 2px 2px 4px rgb(151, 151, 151);
}
.btn-active{
  background-color: blue;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 255);
  box-shadow: 2px 2px 4px rgb(151, 151, 151);
  cursor: none;
}
.notification-item{
  padding: 0.45rem 0.75rem;
  display: flex;
  align-content: center;
  align-items: center;
  gap: 1rem;
  text-decoration: unset;
  border-bottom: 1px solid rgb(194, 190, 190);
}
.notification-item:hover{
  cursor: pointer;
  background-color: rgb(234, 239, 243);
}
.notification-item img{
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 100%;
}
.notification-item .content{
  font-size: 1rem;
  color: rgb(36, 35, 35);
  word-break: break-all;
  line-height: 1.35rem;
}
.notification-item .time{
  font-size: 0.875rem;
  color: rgb(90, 90, 90);
}
.notification-unread{
  background-color: rgb(241, 244, 247);
}
.notification-list{
  max-height: 70vh;
  overflow: auto;
}
</style>
