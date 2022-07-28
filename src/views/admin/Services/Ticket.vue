<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <ticket-detail-modal
        :ticket_id="ticket_id"
        v-if="showModalDetail"
        @close="showModalDetail = false"
        @update="getData()"
        @toggleUpdate ="toggleShowModalUpdate()"
      />
      <ticket-update-modal
        :ticket_id="ticket_id"
        v-if="showModalUpdate"
        @close="showModalUpdate = false"
        @update="getData()"
      />
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Vé tập</h4>
              <p class="card-description">
                <br />
              </p>
              <div class="row">
                <!-- <div class="col-md-4">
                  <div class="input-group">
                      <input type="text" class="form-control" placeholder="Nhập mã vé tập" v-model="search" aria-label="Product name">
                      <div class="input-group-append">
                        <button class="btn btn-sm btn-primary" @click="toggleSearch()" type="button">Tìm kiếm</button>
                      </div>
                    </div>
                </div> -->
                <div class="col-md-4">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Trạng thái</label>
                    <div class="col-sm-8">
                      <select class="form-control" v-model="ticket_status_id">
                        <option value="-1">--Tất cả--</option>
                        <option
                          v-for="(item, index) in ticketStatuses"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.status }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart" v-if="tickets && tickets.length > 0">
                <div class="table-responsive table-hover">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Mã</th>
                        <th>Người dùng</th>
                        <th>Người đăng kí</th>
                        <th>Ngày đặt</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ticket, index) in tickets" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ ticket.member_code }}
                        </td>
                        <td>
                          <div>
                            <span class="d-flex align-items-center gap-1 m-1"
                              ><span class="fs-6 fw-bolder">{{
                                ticket.name
                              }}</span>
                              </span
                            ><p>( {{ ticket.phone_number }} )</p>
                          </div>
                        </td>
                        <td>{{ ticket.user.name }}</td>
                        <td>{{ formatDateTime(ticket.created_at) }}</td>
                        <td>
                          {{ formatMoney(ticket.cost) }}
                        </td>
                        <td>
                          <label
                            class="badge"
                            :class="{
                              'badge-info': ticket.ticket_status_id == 1,
                              'badge-success': ticket.ticket_status_id == 2,
                              'badge-primary': ticket.ticket_status_id == 3,
                              'badge-danger': ticket.ticket_status_id == 4,
                            }"
                            >{{ ticket.status.status }}</label
                          >
                        </td>
                        <td class="action">
                          <label
                            class="badge badge-info m-1"
                            @click="showModal(ticket.id)"
                            >Chi tiết</label
                          >
                          <label
                            class="badge badge-warning m-1"
                            @click="toggleShowModalUpdate(ticket.id)"
                            >Chỉnh sửa</label
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
import TicketDetailModal from "./TicketDetailModal.vue";
import TicketUpdateModal from "./TicketUpdateModal.vue";

const store = useStore();

const tickets = computed(() => store.state.tickets ?? null);
const ticketStatuses = computed(() => store.state.ticketStatuses ?? null);

const ticket_status_id = ref(-1);
const showModalDetail = ref(false);
const showModalUpdate = ref(false);
const ticket_id = ref(-1);

const showModal = (value) => {
  ticket_id.value = value;
  showModalDetail.value = true;
  showModalUpdate.value = false;
};

const toggleShowModalUpdate = (value) => {
  if(value) ticket_id.value = value;
  showModalDetail.value = false;
  showModalUpdate.value = true;
};


const getData = (ticket_status_id) =>
  store.dispatch("getTickets", {
    status_id: ticket_status_id,
    token: store.state.token,
  });

watch(ticket_status_id,  async () => await getData(ticket_status_id.value));

onBeforeMount(() => {
  getData(ticket_status_id.value)
  setInterval( async() => await getData(ticket_status_id.value), 60000);
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
