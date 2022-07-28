<template lang="">
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-2 d-block grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Lọc</h4>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <div class="col-md-12">
                      <div class="input-group mt-2 mb-2">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nhập tên sản phẩm"
                          v-model="search"
                          aria-label="Product name"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-sm btn-outline"
                            @click="toggleSearch()"
                            type="button"
                          >
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-12 col-form-label"
                          >Loại sản phẩm:
                        </label>
                        <div class="col-sm-12">
                          <select
                            class="form-control"
                            v-model="product_type_id"
                          >
                            <option value="-1">-- Tất cả sản phẩm --</option>
                            <option
                              v-for="(item, index) in product_types"
                              :value="item.id"
                              :key="index"
                            >
                              {{ item.type_name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-12 col-form-label"
                          >Lọc theo giá:
                        </label>
                        <div class="col-sm-12 d-flex flex-wrap justify-content-around gap-1">
                            <button class="btn p-1" :class="{ 'btn-secondary' : filter_price == 0 }" @click="toggleFilterPrice(0)"><i class="mdi mdi-arrow-down"></i> Tăng dần</button>
                          
                            <button class="btn p-1" :class="{ 'btn-secondary' : filter_price == 1 }" @click="toggleFilterPrice(1)"><i class="mdi mdi-arrow-up"></i> Giảm dần</button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-12 col-form-label"
                          >Lọc tên:
                        </label>
                        <div class="col-sm-12 d-flex flex-wrap justify-content-around gap-1">
                            <button class="btn ps-3 pe-3" :class="{ 'btn-secondary' : filter_name == 0 }" @click="toggleFilterName(0)">A-Z</button>
                          
                            <button class="btn ps-3 pe-3" :class="{ 'btn-secondary' : filter_name == 1 }" @click="toggleFilterName(1)">Z-A</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="list-product" v-if="products && products.data.length > 0">
            <div
              class="card card-product " 
              v-for="(product, index) in products.data"
              :key="index"
            >
              <img
                :src="imageLink(product.image)"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <div class="product-info">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">{{ product.product_type.type_name }}</p>
                  <span class="card-text">Giá bán: {{ formatMoney(product.price) }}</span>
                </div>
                <div class="btn-group-action">
                  <button type="button" class="btn btn-outline-success m-1" @click="viewDetail(product.id)">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="btn btn-outline-success m-1" @click="addToCart(product.id)">
                    <i
                      class="fa fa-cart-plus"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="w-100 d-flex" v-if="products.links.length > 3">
              <div class="text-center mt-3 m-auto">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li
                        class="page-item"
                        v-for="(link, index) in products.links"
                        :key="index"
                        :class="{
                          active: link.active,
                          disabled: link.url == null,
                        }"
                        @click="changePage(index)"
                      >
                        <a class="page-link" href="#"
                          ><span>{{ link.label }}</span></a
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, computed, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { cart } from "../../../config";
import { formatMoney, imageLink } from "../../../helper";

const store = useStore();
const router = useRouter();
const route = useRoute();
const products = computed(() => store.state.stores ?? null);
const product_types = computed(() => store.state.productTypes ?? null);
const product_type_id = ref(-1);
const search = ref('');
const filter_price = ref(route.query.filter_price ?? -1);
const filter_name = ref(route.query.filter_name ?? -1);

const current_page = ref(1);
const page_size = ref(1);

watch(products, (newValue) => {
  current_page.value = newValue.current_page;
  page_size.value = newValue.last_page;
});

watch([current_page, product_type_id, filter_price, filter_name], async () => {
  console.log('data change');
  await getData();
});

watch(route, ()=>{
  if(route.query.type){
    product_type_id.value = route.query.type;
    getData();
  }
})

const toggleSearch = () => {
    current_page.value = 1;
    getData();
}

const toggleFilterName = (id) =>{
  if(id == filter_name.value){
    filter_name.value = -1;
  }else{
    filter_name.value = id;
  }
  filter_price.value = -1;
  router.replace({ query: null });
  router.push({
    query: { filter_name: filter_name.value }
  })
}

const toggleFilterPrice = (id) =>{
  if(id == filter_price.value){
    filter_price.value = -1;
  }else{
    filter_price.value = id;
  }
  filter_name.value = -1;
  router.replace({ query: null });
  router.push({
    query: { filter_price: filter_price.value }
  })
}

const getData = async() =>{
  await store.dispatch("getStores", 
    { 
      token: store.state.token,
      page: current_page.value,
      search: search.value,
      type_id: product_type_id.value,
      filterName: filter_name.value,
      filterPrice: filter_price.value,
    });
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

onBeforeMount(() => {
  if(route.query.type){
    product_type_id.value = route.query.type;
    getData();
    return;
  }
  if(products.value == null){
    getData();
  }else{
    current_page.value = products.value.current_page;
    page_size.value = products.value.last_page;
    // if(route.query.filter_price){
    //   filter_price.value = route.query.filter_price
    // }
    // if(route.query.filter_name){
    //   filter_price.value = route.query.filter_name
    // }
  }
});

const viewDetail = (id) => {
  router.push({
    name: "product-detail",
    params: {
      id: id,
    },
  });
};

const addToCart = async (product_id) => {
  await axios({
    url: cart.CRUD,
    method: "POST",
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      product_id: product_id,
      quantity: 1,
    },
  })
    .then((res) => {
      alert(res.data.message);
      store.dispatch("getCarts", store.state.token);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style scoped>
.card-product:hover {
  transform: translateY(-3px);
  box-shadow: 4px 4px 8px rgb(173, 173, 173);
}
.card-product {
  max-width: 12rem;
  min-width: unset;
  cursor: pointer;
}
.card-product img{
  width: 190px;
  height: 242.5px;
  object-fit: contain;
}
.card-text {
  max-width: 7rem;
}
.card-body {
  padding: 1rem 0.875rem 5rem 0.875rem;
  position: relative;
}
.list-product {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn-group-action {
  position: absolute;
  bottom: 10px;
}
.form-check .form-check-label {
  margin-left: 0.25rem;
  margin-right: 1.75rem;
}
</style>
