<template lang="">
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Thông tin người nhận</h4>
              <form class="form-sample">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Tên người nhận</label
                      >
                      <div class="col-sm-9">
                        <input type="text" class="form-control" name="receiver" v-model="receiver"/>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Số điện thoại</label
                      >
                      <div class="col-sm-9">
                        <input type="text" class="form-control" name="receiver_phone" v-model="receiver_phone"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Địa chỉ người nhận</label
                      >
                      <div class="col-sm-9">
                        <input type="text" class="form-control" name="address" v-model="address"/>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Thông tin đơn hàng</h4>
              <form class="form-sample">
                <div class="cart" v-if="carts && carts.cart.length > 0">
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
                        <tr v-for="(cart, index) in carts.cart" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td class="text-right">
                            <img
                              src="https://salt.tikicdn.com/cache/280x280/ts/product/fc/ee/57/e15f474fb5e019dac30092c532b723e7.jpg"
                              class="card-img-top"
                              alt="..."
                            />
                          </td>
                          <td>{{ cart.product.name }}</td>
                          <td>{{ formatMoney(cart.product.price) }}</td>
                          <td class="text-center">
                            {{ cart.quantity }}
                          </td>
                          <td>
                            {{
                              formatMoney(cart.product.price * cart.quantity)
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center m-5 p-5" v-else>
                  <span class="fw-bold">Chưa có sản phẩm</span>
                  <router-link class="nav-link" :to="{name: 'user-store'}"> Thêm sản phẩn</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-4 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Thông tin thanh toán</h4>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"
                      >Phương thức thanh toán</label
                    >
                    <div class="col-sm-12" v-if="payment_methods && payment_methods.length > 0">
                      <div class="form-check" v-for="(method, index) in payment_methods" :key="index">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          :id="index"
                          :value="method.id"
                          v-model="payment_method_id"
                          :disabled="method.id > 1"
                        />
                        <label class="form-check-label" :for="index">
                          {{ method.method}}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label">Ghi chú: </label>
                    <div class="col-sm-12">
                      <textarea
                        type="text"
                        rows="4"
                        class="form-control"
                        v-model="note"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label"
                      >Tổng tiền hàng:
                    </label>
                    <label class="col-sm-6 col-form-label">{{ formatMoney(carts.total)}}</label>
                  </div>
                </div>
                <!-- <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label"
                      >Phí giao hàng:
                    </label>
                    <label class="col-sm-6 col-form-label"> Phí giao hàng sẽ phụ thuộc </label>
                  </div>
                </div> -->
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label"
                      >Tổng thanh toán:
                    </label>
                    <label class="col-sm-6 col-form-label">{{ formatMoney(carts.total)}}</label>
                  </div>
                </div>
                <div class="col-md-12 text-center m-3">
                  <button v-if="!loading" class="btn btn-lg btn-outline-danger btn-block" @click="pay()" :disabled="carts && carts.cart.length <= 0" 
                    >Đặt hàng</button
                  >
                  <button v-else class="btn btn-lg btn-outline-danger btn-block" @click="pay()"
                    ><div class="spinner-border text-danger" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
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
import { useRouter } from "vue-router";
import axios from "axios";
import { cart, order } from "../../../config";
import { formatMoney } from "../../../helper";

const store = useStore();
const router = useRouter()

// Data

const payment_method_id = ref();
const receiver = ref('');
const receiver_phone = ref('');
const address = ref('');
const note = ref('');
const carts = ref(null);
const loading = ref(false);


const payment_methods = computed(() => {
  return store.state.paymentMethods;
});

onBeforeMount(() => {
  store.dispatch("getCarts", store.state.token);
  store.dispatch('getPaymentMethods', store.state.token);
  if(sessionStorage.getItem('cart')){
    carts.value = JSON.parse(sessionStorage.getItem('cart'))
  }
});

const pay = async () =>{
  let result = confirm('Xác nhận đặt hàng? Lưu ý phí vận chuyển sẽ phát sinh tùy theo địa chỉ nhận hàng!');
  if(result){
    loading.value = true;
    await axios({
    url: order.CRUD,
    method: 'POST',
    headers: {'Authorization': store.state.token,
              'Accept': 'application/json'
            },
    data:{
      receiver: receiver.value,
      receiver_phone: receiver_phone.value,
      address: address.value,
      total: carts.value.total,
      payment_method_id: payment_method_id.value,
      note: note.value,
      carts: carts.value.cart
    }
  }).then( res =>{
    alert(res.data.message);
    router.push(
      {
        name: 'user-orders',
        params: res.data.order.id
      }
    )
    loading.value = false;
    console.log(res.data);
  }).catch(err =>{
    console.log(err);
    loading.value = false;
  })
  }
  
}



</script>
<style scoped>
.table td img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}

.tb-cart {
  max-height: 100vh;
  overflow: auto;
}
</style>
