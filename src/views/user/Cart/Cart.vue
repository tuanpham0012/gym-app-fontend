<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Giỏ hàng của bạn</h4>
              <p class="card-description">
                <br />
              </p>
              <div class="cart" v-if="carts && carts.length > 0">
                <div class="table-responsive tb-cart">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <input
                            type="checkbox"
                            @click="checkAll()"
                            v-model="isCheckAll"
                            :indeterminate="select"
                          />
                        </th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cart, index) in carts" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <input
                            type="checkbox"
                            v-model="selectProduct"
                            :value="cart"
                            @change="updateCheckall()"
                          />
                        </td>
                        <td>
                          <img
                            :src="imageLink(cart.product.image)"
                            class="card-img-top"
                            alt="..."
                          />
                        </td>
                        <td>{{ cart.product.name }}</td>
                        <td>{{ formatMoney(cart.product.price) }}</td>
                        <td class="">
                          <div
                            class="d-flex align-items-center"
                            :class="{
                              loading: loading == true && cart_id == cart.id,
                            }"
                          >
                            <button
                              class="btn-qty"
                              @click="
                                updateQuantity(
                                  'minus',
                                  cart.quantity,
                                  cart.id,
                                  index
                                )
                              "
                              :disabled="selectProduct.find(x => x.id == cart.id)"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              class="ip-qty"
                              v-model="cart.quantity"
                              @keypress="isNumber($event, cart.quantity)"
                               v-on:blur="updateQuantity('', cart.quantity, cart.id, index )"
                               :disabled="selectProduct.find(x => x.id == cart.id)"
                            />
                            <button
                              class="btn-qty"
                              @click="
                                updateQuantity(
                                  'plus',
                                  cart.quantity,
                                  cart.id,
                                  index
                                )
                              "
                              :disabled="selectProduct.find(x => x.id == cart.id)"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          {{ formatMoney(cart.product.price * cart.quantity) }}
                        </td>
                        <td>
                          <label
                            class="badge badge-info m-1"
                            @click="findProduct(cart.product.product_type_id)"
                            >Xem sản phẩm cùng loại</label
                          >
                          <label
                            class="badge badge-danger"
                            @click="deleteCart(cart.id, index)"
                            >Xoá</label
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-end align-items-center m-4">
                  <a href="#" class="text-danger" @click.stop="deleteAllCart()">Xóa giỏ hàng</a>
                  <span class="m-2"
                    >Tổng thanh toán ( {{ selectProduct.length ?? "0" }} sản
                    phẩm): {{ formatMoney(total) }}</span
                  >
                  <button class="btn btn-outline-success m-1" :disabled="selectProduct.length < 1" @click="payment()">Mua hàng</button>
                </div>
              </div>
              <div class="cart-emtry text-center" v-else>
                <h3>Giỏ hàng trống</h3>
                <router-link class="btn btn-outline-danger m-1" :to="{name: 'user-store'}">Sản phẩm</router-link>
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
import { useRoute, useRouter} from 'vue-router';
import axios from "axios";
import { cart } from "../../../config";
import { formatMoney, imageLink } from "../../../helper";

const store = useStore();

// Data

const loading = ref(false);
const cart_id = ref();
const total = ref(0);
const router = useRouter();

const select = ref(false);
const selectProduct = ref([]);
const isCheckAll = ref(false);

const checkAll = () => {
      if (select.value) {
        selectProduct.value = [];
        select.value = false;
        isCheckAll.value = 0;
      } else {
        isCheckAll.value = !isCheckAll.value;
        selectProduct.value = [];
        if (isCheckAll.value) {
          // Check all
          for (var key in carts.value) {
            selectProduct.value.push(carts.value[key]);
          }
        }
      }
      console.log(isCheckAll.value);
    };
const updateCheckall = () => {
      if (selectProduct.value.length == carts.value.length) {
        isCheckAll.value = true;
        select.value = false;
        console.log(isCheckAll.value);
      } else {
        isCheckAll.value = false;
      }
      if (selectProduct.value.length > 0) select.value = true;
      else select.value = false;
    };


// const sum = () => {
//   total.value = carts.value
//     .map((item) => item.product.price * item.quantity)
//     .reduce((prev, curr) => prev + curr, 0);
// };

const payment = () => {
  let cart = {
    cart: [...selectProduct.value],
    total: total.value,
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  router.push({
    name: 'user-carts-payment'
  })
}

const carts = computed(() => {
  return store.state.carts;
});
// watch(carts, () => {
//   if (carts.value) {
//     sum();
//   }
// });
watch(selectProduct, () => {
  total.value = 0;
  selectProduct.value.forEach(element => {
    total.value += element.product.price * element.quantity;
  });
})

onBeforeMount(() => {
  store.dispatch("getCarts", store.state.token);
});

const updateQuantity = async (key, value, id, index) => {
  switch (key) {
    case "plus":
      value++;
      break;
    case "minus":
      value = (value-- > 0) ? value-- : 0;
      break;
    default:
      break;
  }
  if (value == 0) {
    deleteCart(id, index);
    return;
  }
  console.log(value);
  loading.value = true;
  cart_id.value = id;
  await axios({
    url: cart.CRUD + id,
    method: "PATCH",
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      quantity: value,
    },
  })
    .then((res) => {
      loading.value = false;
      console.log(res.data);
      carts.value[index] = res.data.cart;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};

const isNumber = (evt, value) =>{
    evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode == 13){
        evt.target.blur();
      }
      else if(value == '' && charCode == 48){
        evt.preventDefault();
      }
      else if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
}

const deleteCart = async (id, index) => {
  let result = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng?");
  if (result) {
    await axios({
      url: cart.CRUD + id,
      method: "DELETE",
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
      .then((res) => {
        carts.value.splice(index, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    carts.value[index].quantity = 1;
  }
};

const deleteAllCart = async () => {
  let result = confirm("Bạn có muốn xóa toàn bộ giỏ hàng?");
  if (result) {
    await axios({
      url: cart.DELETE_ALL,
      method: "POST",
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
      .then((res) => {
        store.commit("setCarts", null);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return;
  }
};
const findProduct = (type_id) => {
  console.log(type_id);
  router.push({
    name: 'user-store',
    query:{
      type: type_id,
    }
  })
}
</script>
<style scoped>
td label{
  cursor: pointer;
}
.table td img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.btn-qty {
  border: 1px solid rgb(168, 168, 168);
  background-color: rgb(253, 253, 253);
  width: 2rem;
  height: 2rem;
}
.ip-qty {
  border-top: 1px solid rgb(168, 168, 168);
  border-bottom: 1px solid rgb(168, 168, 168);
  border-left: 0;
  border-right: 0;
  height: 2rem;
  width: 4rem;
  text-align: center;
}
.loading {
  opacity: 0.5;
}
.tb-cart {
  max-height: 100vh;
  overflow: auto;
}
</style>
