<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <product-detail-modal
        :product_id="product_id"
        v-if="show_detail"
        @close-modal="showModal()"
        @update="showModalUpdate"
      />
      <product-update-modal
        :product_id="product_id"
        v-if="show_update"
        @close-modal="show_update = false"
        @update="updateProductSuccess"
      />
      <product-create-modal
        v-if="show_create"
        @close-modal="show_create = false"
        @create="updateProductSuccess"
      />

      <div class="page-header">
        <h3 class="page-title">Danh sách sản phẩm</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action">
            <button
              type="button"
              @click="toggleCreateCustomerList()"
              class="btn btn-sm btn-outline-success btn-icon-text"
            >
              <i class="mdi mdi-cloud-upload"></i> Nhập excel
            </button>
            <button
              type="button"
              @click="show_create = true"
              class="btn btn-sm btn-outline-success btn-text m-1"
            >
              <i class="mdi mdi-plus btn-icon-prepend"></i> Thêm mới
            </button>
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-sm btn-outline-info dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Hành động
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a
                class="dropdown-item"
                
                href="#"
                @click="toggleModalLead()"
                >Cập nhật người phụ trách</a
              >
              <a class="dropdown-item" @click="toggleModalSendMail()" href="#">Gửi Mail</a>
              <a class="dropdown-item" href="#">Gửi SMS</a>
              <a class="dropdown-item" href="#" @click="toggleModalUpdateTypeCustomer()">Cập nhật quan hệ</a>
              <a class="dropdown-item" href="#" @click="toggleDeleteCustomer()">Xóa khách hàng</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <div class="input-group">
                      <input type="text" class="form-control" placeholder="Nhập tên hoặc mã sản phẩm" v-model="search" aria-label="Product name">
                      <div class="input-group-append">
                        <button class="btn btn-sm btn-primary" @click="toggleSearch()" type="button">Tìm kiếm</button>
                      </div>
                    </div>
                </div>
                <div class="col-md-4">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Loại sản phẩm</label>
                          <div class="col-sm-8">
                            <select class="form-control" v-model="product_type_id">
                              <option value="-1">--Tất cả--</option>
                              <option v-for="(item, index) in product_types" :value="item.id" :key="index">{{item.type_name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
              </div>
              <div class="cart" v-if="products && products.data.length > 0">
                <div class="table-responsive table-hover">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Loại sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(product, index) in products.data"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ product.product_code }}
                        </td>
                        <td>
                          {{ product.name }}
                        </td>
                        <td>
                          {{ product.product_type.type_name }}
                        </td>
                        <td>
                          {{ formatMoney(product.price) }}
                        </td>
                        <td class="text-description">
                          {{ product.description }}
                        </td>
                        <td>
                          <img :src="imageLink(product.image)" alt="" />
                        </td>
                        <td class="action">
                          <label
                            class="badge badge-info m-1"
                            @click="showModal(product.id)"
                            >Chi tiết</label
                          >
                          <label class="badge badge-success m-1" @click="showModalUpdate(product.id)"
                            >Chỉnh sửa</label
                          >
                          <label class="badge badge-danger m-1" @click="deleteProduct(product.id)"
                            >Xóa</label
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center">
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
              <div class="order-emtry text-center" v-else>
                <h5>Chưa có sản phẩm</h5>
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
import { formatMoney, formatDateTime, imageLink } from "../../../helper";
import { productUrl } from "../../../config";
import ProductDetailModal from "./ProductDetailModal.vue";
import ProductUpdateModal from "./ProductUpdateModal.vue";
import ProductCreateModal from "./ProductCreateModal.vue";
import axios from "axios";

const store = useStore();

const products = computed(() => store.state.products ?? null);
const product_types = computed(() => store.state.productTypes ?? null);

const product_id = ref(-1);
const product_type_id = ref(-1);
const show_detail = ref(false);
const show_update = ref(false);
const show_create = ref(false);
const search = ref('');

const current_page = ref(1);
const page_size = ref(1);

watch(products, (newValue) => {
  current_page.value = newValue.current_page;
  page_size.value = newValue.last_page;
});

watch(current_page, () => {
  getData(current_page.value, search.value, product_type_id.value);
});

watch(product_type_id, () =>{
  current_page.value = 1;
  getData(current_page.value, search.value, product_type_id.value);
})

const toggleSearch = () => {
    current_page.value = 1;
    getData(current_page.value, search.value, product_type_id.value);
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

const showModal = (value) => {
  show_update.value = false;
  product_id.value = value;
  show_detail.value = !show_detail.value;
};

const showModalUpdate = (value) => {
  show_detail.value = false;
  product_id.value = value;
  show_update.value = !show_update.value;
};

const deleteProduct = async (product_id) => {
  let result = confirm('Xác nhận xóa sản phẩm?');
  if(result){
    await axios({
      method: 'DELETE',
      url: productUrl.CRUD + product_id,
      headers: {'Authorization': store.state.token,
                'Accept': 'application/json'},
    }).then( res => {
      swal({
        title: "Xóa sản phẩm!",
        text: res.data.message,
        icon: "success",
        button: "Xác nhận",
      });
      getData(current_page.value, search.value, product_type_id.value);

    }).catch(err => {
      console.log(err);
    })
  }
}

const getData = async (page, search, type_id) =>
  await store.dispatch("getProducts", {
    token: store.state.token,
    page: page,
    search: search,
    type_id: type_id,
  });

const updateProductSuccess = (id) => {
  getData(current_page.value, search.value, product_type_id.value);
  showModal(id);
}

onBeforeMount(() => {
  getData(current_page.value, search.value, product_type_id.value);
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
.text-description {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
}

</style>
