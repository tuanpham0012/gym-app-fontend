<template>
  <div v-if="order_detail" >
    <modal
      size="large"
      :title="'Thông tin đơn hàng: ' + order_detail.order.order_code"
      @close-modal="toggleCloseModal" 
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12 d-flex flex-wrap">
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Tên người nhận:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ order_detail.order.receiver }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Số điện thoại: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ order_detail.order.receiver_phone }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Địa chỉ nhận hàng:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ order_detail.order.address }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-7 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Tổng tiền hàng:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ formatMoney(order_detail.order.total) }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Hình thức thanh toán:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ order_detail.order.method.method }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Trạng thái đơn hàng:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ order_detail.order.status.status }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Ngày đặt: </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ formatDateTime(order_detail.order.created_at) }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Cập nhật cuối:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ formatDateTime(order_detail.order.updated_at) }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ghi chú của người đặt:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <span>{{ order_detail.order.note }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-5 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-12 col-form-label"
                        >Lịch sử đơn hàng:
                      </label>
                      <div class="col-sm-12 d-flex align-items-center">
                        <ul class="list-star">
                          <li v-for="(item, index) in order_detail.order.notes" :key="index">{{ item.note + ' ( ' + formatDateTime(item.created_at) + ' )'}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Chi tiết sản phẩm</h4>
                <form class="form-sample">
                  <div
                    class="cart"
                    v-if="
                      order_detail.order_detail &&
                      order_detail.order_detail.length > 0
                    "
                  >
                    <div class="table-responsive table-hover tb-cart">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th class="text-right">Sản phẩm</th>
                            <th></th>
                            <th>Giá bán</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(order, index) in order_detail.order_detail"
                            :key="index"
                          >
                            <td>{{ index + 1 }}</td>
                            <td class="text-right">
                              <img
                                src="https://salt.tikicdn.com/cache/280x280/ts/product/fc/ee/57/e15f474fb5e019dac30092c532b723e7.jpg"
                                class="card-img-top"
                                alt="..."
                              />
                            </td>
                            <td>{{ order.product.name }}</td>
                            <td>{{ formatMoney(order.price) }}</td>
                            <td class="text-center">
                              {{ order.quantity }}
                            </td>
                            <td>
                              {{ formatMoney(order.total) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="showModalShipping = true"
          v-if="order_detail.order.order_status_id == 7"
        >
          Hoàn đơn hàng
        </button>
        <button
          type="button"
          class="btn btn-sm btn-success"
          @click="confirmAction('Hoàn')"
          v-if="order_detail.order.order_status_id == 4"
        >
          Yêu cầu hoàn trả
        </button>
        <button
          type="button"
          class="btn btn-sm btn-warning"
          @click="updateOrder()"
          v-if="order_detail.order.order_status_id == 3"
        >
          Đã nhận được hàng
        </button>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="confirmAction('Hủy')"
          v-if="order_detail.order.order_status_id < 3"
        >
          Hủy đơn
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

    <!-- Modal Huỷ đơn -->

    <modal
      title="Lý do hủy/hoàn đơn hàng"
      @close-modal="showModalNote = !showModalNote"
      v-if="showModalNote"
    >
      <template v-slot:body>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Phản hồi: </label>
            <div class="col-sm-9">
              <textarea
                type="text"
                rows="4"
                class="form-control"
                v-model="note"
              ></textarea>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="updateOrder(note)"
        >
          Xác nhận
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="showModalNote = !showModalNote"
        >
          Hủy
        </button>
      </template>
    </modal>

    <modal
      title="Thông tin vận chuyển đơn hàng hoàn trả"
      @close-modal="showModalShipping = !showModalShipping"
      v-if="showModalShipping"
    >
      <template v-slot:body>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Đơn vị vận chuyển </label>
            <div class="col-sm-9">
              <select class="form-control" v-model="shipping_unit">
                <option
                  v-for="(item, index) in shipping_methods"
                  :value="item"
                  :key="index"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Phí vận chuyển </label>
            <div class="col-sm-9">
              <input
                type="number"
                class="form-control"
                v-model="transport_fee"
              />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Mã vận đơn </label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="shipping_code" />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="transportOrder(shipping_unit, transport_fee, shipping_code)"
        >
          Xác nhận
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="showModalShipping = !showModalShipping"
        >
          Hủy
        </button>
      </template>
    </modal>


  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import Modal from "../../../components/Modal.vue";
import { formatMoney, formatDateTime } from "../../../helper";
import { order } from "../../../config";
import axios from "axios";

const props = defineProps({
  order_id: {
    type: [String, Number],
    default: function () {
      return null;
    },
  },
});

const emits = defineEmits(["close-modal"]);
const store = useStore();
const order_detail = computed(() => store.state.orderDetail ?? null);
const shipping_methods = computed(() => store.state.shippings ?? null);
const showModalNote = ref(false);
const note = ref('');
const showModalShipping = ref(false);
const shipping_unit = ref("");
const transport_fee = ref(0);
const shipping_code = ref("");

const toggleCloseModal = () => emits("close-modal");

const getDetail = () =>
  store.dispatch("getOrderDetail", {
    token: store.state.token,
    order_id: props.order_id,
  });

const confirmAction = (msg) =>{
  let result = confirm('Xác nhận '+ msg + ' đơn hàng?');
  if(result){
    showModalNote.value = true;
  }
}

const updateOrder = async() =>{
  let status_id = 5;
  switch (order_detail.value.order.order_status_id) {
    case 1:
      status_id = 5;
      break;
    case 2:
      status_id = 5;
      break;
    case 3:
      status_id = 4;
      break;
    case 4:
      status_id = 6;
      break;
    default:
      break;
  }
  await axios({
    url: order.CRUD + order_detail.value.order.id,
    method: "PATCH",
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      order_status_id: status_id,
      note: note.value,
    },
  })
    .then((res) => {
      getDetail();
      emits("update-order");
      alert(res.data.message);
      showModalNote.value = false;
    })
    .catch((err) => {
      console.log(err);
      showModalNote.value = false;
    });
}

const transportOrder = async (shipping_unit, transport_fee, shipping_code) => {
  console.log(order_detail.value);
  await axios({
    url: order.CRUD + order_detail.value.order.id,
    method: "PATCH",
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      order_status_id: 8,
      shipping_method: shipping_unit,
      transport_fee: transport_fee,
      shipping_code: shipping_code,
    },
  })
    .then((res) => {
      alert(res.data.message);
      console.log(res.data);
      showModalShipping.value = false;
      emits("update-order");
      getDetail();
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style lang=""></style>
