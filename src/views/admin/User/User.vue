<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <user-detail-modal
        :user_id="user_id"
        v-if="showDetailModal"
        @close="showDetailModal = false"
        @update="toggleShowUpdateModal"
      />
      <user-update-modal
        :user_id="user_id"
        v-if="showUpdateModal"
        @close="showUpdateModal = false"
        @update="toggleShowDetailModal"
      />
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Quản lý người dùng</h4>
              <p class="card-description">
                <br />
              </p>
              <div class="row">
                <div class="col-md-4">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nhập tên hoặc email người dùng"
                      v-model="search"
                      aria-label="Product name"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-sm btn-primary"
                        @click="toggleSearch()"
                        type="button"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group row">
                    <label class="col-sm-5 col-form-label">Nhóm người dùng</label>
                    <div class="col-sm-7">
                      <select class="form-control" v-model="position">
                        <option value="-1">--Tất cả--</option>
                        <option
                          v-for="(item, index) in userPositions"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.position }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart" v-if="users && users.data.length > 0">
                <div class="table-responsive table-hover">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Họ tên</th>
                        <th>Tên đăng nhập</th>
                        <th>Email</th>
                        <th>Đăng nhập cuối</th>
                        <th>Nhóm</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in users.data" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ user.name }}
                        </td>
                        <td>
                          {{ user.username }}
                        </td>
                        <td>{{ user.email }}</td>
                        <td>
                          {{ formatDateTime(user.created_at) }}
                        </td>
                        <td>
                          <label
                            class="badge"
                            :class="{
                              'badge-success': user.position == 0,
                              'badge-primary': user.position == 1,
                              'badge-warning': user.position == 2,
                              'badge-danger': user.position == 3,
                            }"
                            >{{ user.position_name }}</label
                          >
                        </td>
                        <td class="action">
                          <label
                            class="badge badge-info m-1"
                            @click="toggleShowDetailModal(user.id)"
                            >Chi tiết</label
                          >
                          <label class="badge badge-success m-1"
                            @click="toggleShowUpdateModal(user.id)"
                            >Cập nhật</label
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center" v-if="users.links.length > 3">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li
                        class="page-item"
                        v-for="(link, index) in users.links"
                        :key="index"
                        :class="{
                          active: link.active,
                          disabled: link.url == null,
                        }"
                        @click="changePage(index)"
                      >
                        <a class="page-link" href="#"
                          ><span>{{ index == 0 ? '&laquo;' : index == users.links.length - 1 ? '&raquo;' : link.label }}</span></a
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="order-emtry text-center" v-else>
                <h5>Chưa có người dùng</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import { formatMoney, formatDateTime } from "../../../helper";
import { user } from "../../../config";
import UserDetailModal from "./UserDetailModal.vue";
import UserUpdateModal from "./UserUpdateModal.vue";

const store = useStore();

const users = computed(() => store.state.users ?? null);
const userPositions = computed(() => store.state.userPositions ?? null);

const showDetailModal = ref(false);
const showUpdateModal = ref(false);
const user_id = ref(-1);
const search = ref("");
const position = ref(-1);
const current_page = ref(1);
const page_size = ref(1);

watch(users, (newValue) => {
  current_page.value = newValue.current_page;
  page_size.value = newValue.last_page;
});

watch(current_page, () => {
  getData();
});

watch(position, () =>{
  current_page.value = 1;
  getData();
})

const toggleSearch = () => {
    current_page.value = 1;
    getData();
}

const changePage = (page) => {
  if (page > 0 && page < page_size.value + 1) {
    current_page.value = page;
    console.log(page_size.value + 1);
  } else {
    if (page == 0) {
      current_page.value = current_page.value > 1 ? current_page.value - 1 : 1;
    } else if (page == page_size.value + 1) {
      current_page.value =
        current_page.value < page_size.value
          ? current_page.value + 1
          : page_size.value;
    }
  }
};


const toggleShowDetailModal = (value) => {
  if(value) user_id.value = value;
  showUpdateModal.value = false;
  showDetailModal.value = !showDetailModal.value;
};

const toggleShowUpdateModal = (value) => {
  if(value) user_id.value = value;
  showDetailModal.value = false;
  showUpdateModal.value = !showUpdateModal.value;
};

const getData = () =>
  store.dispatch("getUsers", {
    token: store.state.token,
    search: search.value,
    position: position.value,
  });

// watch(order_status_id,  async () => await getData());

onBeforeMount(() => {
  getData();
  // setInterval( async() => await getData(order_status_id.value), 30000);
});
</script>
<style scoped>
.order-emtry {
  min-height: 25rem;
  background-image: url("../../../assets/public/images/order-emtry.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.action label {
  cursor: pointer;
}
</style>
