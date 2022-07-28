<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <order-detail-modal
        :order_id="order_id"
        v-if="show_detail"
        @close-modal="showModal()"
        @update="getData(order_status_id)"
      />
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Đơn mua</h4>
              <p class="card-description">
                <br />
              </p>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Trạng thái</label>
                    <div class="col-sm-9">
                      <select class="form-control" v-model="order_status_id">
                        <option value="-1">--Tất cả--</option>
                        <option
                          v-for="(item, index) in order_statuses"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.status + '( ' + item.orders_count + ' )' }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart" v-if="orders && orders.length > 0">
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
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(order, index) in orders" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ order.order_code }}
                        </td>
                        <td>
                          <div>
                            <span class="d-flex align-items-center gap-1 m-1"
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
                              'badge-warning': order.order_status_id == 2,
                              'badge-primary': order.order_status_id == 3,
                              'badge-success': order.order_status_id == 4,
                              'badge-danger': order.order_status_id == 5,
                              'badge-light' : order.order_status_id > 5,
                            }"
                            >{{ order.status.status }}</label
                          >
                        </td>
                        <td class="action">
                          <label
                            class="badge badge-info m-1"
                            @click="showModal(order.id)"
                            >Chi tiết</label
                          >
                          <!-- <label class="badge badge-success m-1">Cập nhật</label> -->
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
</template>
<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import { formatMoney, formatDateTime } from "../../../helper";
import { order } from "../../../config";
import OrderDetailModal from "./OrderDetailAdminModal.vue";

const store = useStore();

const orders = computed(() => store.state.orders ?? null);
const order_statuses = computed(() => store.state.orderStatuses ?? null);

const order_status_id = ref(-1);
const show_detail = ref(false);
const order_id = ref();

const showModal = (value) => {
  order_id.value = value;
  show_detail.value = !show_detail.value;
};

const getData = (order_status_id) =>
  store.dispatch("getOrders", {
    order_status_id: order_status_id,
    token: store.state.token,
  });

watch(order_status_id,  async () => await getData(order_status_id.value));

onBeforeMount(() => {
  getData(order_status_id.value)
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
