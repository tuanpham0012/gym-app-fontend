<template>
  <div v-if="detail">
    <modal
      size="large"
      title="Thông tin người dùng"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <div class="avatar-header">
                    <div class="avatar">
                      <div class="avatar-img">
                        <img :src="imageLink(detail.avatar)" alt="" />
                      </div>
                      <div class="avatar-name">
                        <p class="fs-5 fw-bolder mb-2">{{ detail.name }}</p>
                        <label
                          class="badge"
                          :class="{
                            'badge-success': detail.position == 0,
                            'badge-primary': detail.position == 1,
                            'badge-warning': detail.position == 2,
                            'badge-danger': detail.position == 3,
                          }"
                          >{{ detail.position_name }}</label
                        >
                        <p>
                          <span>Hiện tại: </span
                          ><span>{{
                            detail ? "Đang hoạt động" : "Đã Khóa"
                          }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="nav nav-tabs mb-4">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: tabIndex == 1 }"
                    @click="tabIndex = 1"
                    aria-current="page"
                    href="#"
                    >Thông tin cá nhân</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: tabIndex == 2 }"
                    @click="tabIndex = 2"
                    aria-current="page"
                    href="#"
                    >Vé tập</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: tabIndex == 3 }"
                    @click="tabIndex = 3"
                    aria-current="page"
                    href="#"
                    >Đơn hàng</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: tabIndex == 4 }"
                    @click="tabIndex = 4"
                    aria-current="page"
                    href="#"
                    >Gửi email</a
                  >
                </li>
              </ul>
              <div class="row" v-if="tabIndex == 1">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"
                      >Tên đăng nhập:
                    </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <h6>{{ detail.username }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Email: </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <h6>{{ detail.email }}</h6>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 d-flex flex-wrap">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Giới tính:
                        </label>
                        <div class="col-sm-9 d-flex align-items-center">
                          <h6>{{ detail.gender }}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Địa chỉ: </label>
                        <div class="col-sm-9 d-flex align-items-center">
                          <h6>{{ detail.address ?? "Chưa cập nhật" }}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Ngày sinh:
                        </label>
                        <div class="col-sm-9 d-flex align-items-center">
                          <h6>
                            {{
                              formatDate(detail.date_of_birth) ??
                              "Chưa cập nhật"
                            }}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Lần đăng nhập cuối:
                        </label>
                        <div class="col-sm-9 d-flex align-items-center">
                          <h6>
                            {{
                              formatDate(detail.date_of_birth) ??
                              "Chưa cập nhật"
                            }}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Vé tập -->
              <div class="container" v-if="tabIndex == 2">
                <div class="col-lg-12">
                  <div class="header d-flex justify-content-between">
                    <h5 class="card-title">Danh sách vé tập</h5>
                    <router-link class="btn btn-primary" :to="{name: 'admin-tickets'}">Vé tập</router-link>
                  </div>
                  <div
                    class="d-flex gap-3 justify-content-start flex-wrap"
                    v-if="detail && detail.tickets && detail.tickets.length > 0"
                  >
                    <div
                      class="card card-product"
                      v-for="(item, index) in detail.tickets"
                      :key="index"
                    >
                      <div
                        class="d-flex justify-content-center p-3 mt-1 with-100"
                      >
                        <qrcode-vue
                          :value="valueQr(item)"
                          :size="size"
                          level="H"
                        />
                      </div>

                      <div class="card-body">
                        <div class="product-info">
                          <h5 class="card-title">
                            Tên gói: {{ item.ticket_type.name }}
                          </h5>
                          <p class="card-text">Người tập: {{ item.name }}</p>
                          <span class="card-text"
                            >Thời gian:<br />
                            {{ formatDate(item.registration_date) }} -
                            {{ formatDate(item.expiration_date) }}</span
                          >
                          <p>Trạng thái: {{item.status.status}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- //ĐƠn hàng -->
              <div class="row" v-if="tabIndex == 3">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <div class="header d-flex justify-content-between">
                        <h5 class="card-title">Danh sách đơn hàng</h5>
                        <router-link class="btn btn-primary" :to="{name: 'admin-tickets'}">Đơn hàng</router-link>
                      </div>
                      <p class="card-description">
                        <br />
                      </p>
                      <div
                        class="cart"
                        v-if="
                          detail && detail.orders && detail.orders.length > 0
                        "
                      >
                        <div class="table-responsive table-hover">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Mã đơn hàng</th>
                                <th>Người nhận</th>
                                <th>Ngày đặt</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(order, index) in detail.orders"
                                :key="index"
                              >
                                <td>{{ index + 1 }}</td>
                                <td>
                                  {{ order.order_code }}
                                </td>
                                <td>
                                  <div>
                                    <span
                                      class="d-flex align-items-center gap-1 m-1"
                                      ><span class="fs-6 fw-bolder">{{
                                        order.receiver
                                      }}</span>
                                      ( {{ order.receiver_phone }} )</span
                                    >
                                    <span class="m-1">{{ order.address }}</span>
                                  </div>
                                </td>
                                <td>{{ formatDateTime(order.created_at) }}</td>
                                <td>
                                  {{ formatMoney(order.total) }}
                                </td>
                                <td>
                                  <label
                                    class="badge"
                                    :class="{
                                      'badge-info': order.order_status_id == 1,
                                      'badge-warning':
                                        order.order_status_id == 2,
                                      'badge-primary':
                                        order.order_status_id == 3,
                                      'badge-success':
                                        order.order_status_id == 4,
                                      'badge-danger':
                                        order.order_status_id == 5,
                                      'badge-light': order.order_status_id > 5,
                                    }"
                                    >{{ order.status.status }}</label
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="order-emtry text-center" v-else>
                        <h5>Chưa có đơn hàng</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="toggleUpdate(detail.id)"
        >
          Khóa tài khoản
        </button>
        <button
          type="button"
          class="btn btn-sm btn-success"
          @click="toggleUpdate(detail.id)"
        >
          Cập nhật thông tin
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="toggleCloseModal()"
        >
          Đóng
        </button>
      </template>
    </modal>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import Modal from "../../../components/Modal.vue";
import {
  formatMoney,
  formatDate,
  formatDateTime,
  imageLink,
} from "../../../helper";
import axios from "axios";

const props = defineProps({
  user_id: {
    type: [String, Number],
  },
});

const emits = defineEmits(["close", "update"]);

const store = useStore();

const showModalNote = ref(false);
const tabIndex = ref(1);
const size = ref(190);

const detail = computed(() => store.state.user ?? null);

const toggleCloseModal = () => emits("close");
const toggleUpdate = (id) => {
  emits("update", id);
};

const valueQr = (detail) => {
  let result = {
    user: detail.name,
    code: detail.member_code,
    type: detail.ticket_type.name,
    start: formatDate(detail.registration_date),
    end: formatDate(detail.expiration_date),
    status: detail.status.status,
  };
  return JSON.stringify(result);
};

const getDetail = () =>
  store.dispatch("getUser", {
    token: store.state.token,
    user_id: props.user_id,
  });

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.avatar-header {
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
}
.avatar {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  align-items: center;
}
.avatar-name {
  font-size: 1.1rem;
}
.avatar-name .name {
  font-weight: 600;
  font-size: 1.675rem;
  margin-bottom: 0.5rem;
}

.avatar img {
  width: 10rem;
  height: 10rem;
  margin: 0 1rem;
  border-radius: 100%;
  margin: 0.5rem 1rem;
  object-fit: cover;
}
.avatar img:hover {
  opacity: 0.99;
  cursor: pointer;
}
.avatar img:active {
  transform: scale(0.98);
}
.avatar-img {
  position: relative;
}
</style>
