<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="page-header">
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#" @click="$router.go(-1)">Gian hàng</a></li>
                  <li v-if="product" class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
                </ol>
              </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h5 class="">Chi tiết sản phẩm:</h5>
              <div class="pd-wrap">
                <div class="container">
                  <div class="heading-section"></div>
                  <div class="row" v-if="product">
                    <div class="col-md-6">
                      <div id="slider" class="owl-carousel product-slider">
                        <div class="item">
                          <img
                            :src="imageLink(product.image)"
                            class="card-img-top"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="product-dtl">
                        <div class="product-info">
                          <div class="product-name">
                            <h3>{{ product.name }}</h3>
                          </div>

                          <div class="product-price-discount">
                            {{ formatMoney(product.price) }}
                          </div>
                        </div>
                        <p>
                          {{ product.description }}
                        </p>
                        <div class="product-count">
                          <label for="size">Quantity</label>
                          <div class="d-flex align-items-center">
                            <button
                              class="btn-qty"
                              @click="quantity--"
                              :disabled="quantity <= 1"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              class="ip-qty"
                              v-model="quantity"
                              @keypress="isNumber($event, quantity)"
                              v-on:blur="minQuantity()"
                            />
                            <button type="button" class="btn-qty" @click="quantity++">
                              +
                            </button>
                          </div>
                          <br />
                          <button
                            type="button"
                            @click="addToCart(product.id, quantity)"
                            class="btn btn-outline-success btn-icon-text btn-icon-prepend m-1"
                          >
                          <i class="mdi mdi-cart-plus"></i>
                            Thêm vào giỏ hàng
                          </button>
                          <button type="button" class="btn btn-outline-danger m-1">
                            Mua ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <h3 class="box-title mt-5">Thành phần</h3>
            <div class="table-responsive">
              <table class="table table-striped table-product">
                <tbody>
                  <tr>
                    <td width="390">Tên</td>
                    <td>Khối lượng</td>
                  </tr>
                  <tr>
                    <td>Delivery Condition</td>
                    <td>Knock Down</td>
                  </tr>
                  <tr>
                    <td>Seat Lock Included</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>Office Chair</td>
                  </tr>
                  <tr>
                    <td>Style</td>
                    <td>Contemporary&amp;Modern</td>
                  </tr>
                  
                  <tr>
                    <td>Upholstery Type</td>
                    <td>Cushion</td>
                  </tr>
                  <tr>
                    <td>Head Support</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Suitable For</td>
                    <td>Study&amp;Home Office</td>
                  </tr>
                  <tr>
                    <td>Adjustable Height</td>
                    <td>Yes</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
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
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { formatMoney, imageLink } from "../../../helper";
import { cart } from "../../../config";
import axios from "axios";

const store = useStore();
const route = useRoute();
const router = useRouter();

const quantity = ref(1);

const product = computed(() => {
  return store.state.product ?? null;
});

const mount = onBeforeMount(() => {
  store.dispatch("getProduct", {
    token: store.state.token,
    product_id: route.params.id,
  });
});

const isNumber = (evt, value) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode == 13) {
    evt.target.blur();
  } else if (value == "" && charCode == 48) {
    evt.preventDefault();
  } else if (charCode < 48 || charCode > 57) {
    evt.preventDefault();
  } else {
    return true;
  }
};

const updateQuantity = (key) => {
  switch (key) {
    case "plus":
      quantity.value = quantity.value + 1;
      break;
    case "minus":
      quantity.value = quantity.value - 1;
    default:
      break;
  }
};

const minQuantity = () => {
  if (quantity.value == "") {
    quantity.value = 1;
  }
};

const addToCart = async (product_id, quantity) => {
  await axios({
    method: "POST",
    url: cart.CRUD,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      product_id: product_id,
      quantity: quantity,
    },
  })
    .then((res) => {
      console.log(res.data);
      alert(res.data.message);
      store.dispatch("getCarts", store.state.token);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style scoped>
.product-slider .item img {
  width: 75%;
  height: auto;
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
</style>
