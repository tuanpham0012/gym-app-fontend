<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <coach-detail-modal
        :coach_id="coach_id"
        v-if="showDetail"
        @close="showDetail = false"
        @update="showModalUpdate"
      />
      <coach-update-modal
        :coach_id="coach_id"
        v-if="showUpdate"
        @close="showUpdate = false"
        @update="coachUpdateSuccess"
      />
      <coach-create-modal
        v-if="showCreate"
        @close="showCreate = false"
        @create="coachCreateSuccess"
      />

      <div class="page-header">
        <h3 class="page-title">Danh sách Huấn luyện viên</h3>
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
              @click="showCreate = true"
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
                      <input type="text" class="form-control" placeholder="Nhập tên hoặc email" v-model="search" aria-label="Product name">
                      <div class="input-group-append">
                        <button class="btn btn-sm btn-primary" @click="toggleSearch()" type="button">Tìm kiếm</button>
                      </div>
                    </div>
                </div>
                <div class="col-md-4">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Cấp độ</label>
                          <div class="col-sm-8">
                            <select class="form-control" v-model="coach_level_id">
                              <option value="-1">--Tất cả--</option>
                              <option v-for="(item, index) in levels" :value="item.id" :key="index">{{item.level}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
              </div>
              <div class="cart" v-if="coaches && coaches.data.length > 0">
                <div class="table-responsive table-hover">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Huấn luyện viên</th>
                        <th>Email</th>
                        <th>SDT</th>
                        <th>Ca làm</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(coach, index) in coaches.data"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img :src="imageLink(coach.avatar)" class="me-2" alt="" />
                                <h6>{{ coach.user.name }}</h6>
                            </div>
                        </td>
                        <td>
                          {{ coach.email }}
                        </td>
                        <td>
                          {{ coach.phone }}
                        </td>
                        <td>
                          {{ coach.timeline }}
                        </td>
                        <td class="action">
                          <label
                            class="badge badge-info m-1"
                            @click="showModalDetail(coach.id)"
                            >Chi tiết</label
                          >
                          <label class="badge badge-success m-1" @click="showModalUpdate(coach.id)"
                            >Chỉnh sửa</label
                          >
                          <label class="badge badge-danger m-1" @click="deleteProduct(coach.id)"
                            >Xóa</label
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center m-auto" v-if="coaches.links.length > 3">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination text-center">
                      <li
                        class="page-item"
                        v-for="(link, index) in coaches.links"
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
import CoachDetailModal from "./CoachDetailModal.vue";
import CoachUpdateModal from "./CoachUpdateModal.vue";
import CoachCreateModal from "./CoachCreateModal.vue";
import axios from "axios";

const store = useStore();

const coaches = computed(() => store.state.coaches ?? null);
const levels = computed(() => store.state.coachLevels ?? null);

const coach_id = ref(-1);
const coach_level_id = ref(-1);
const showDetail = ref(false);
const showUpdate = ref(false);
const showCreate = ref(false);
const search = ref('');

const current_page = ref(1);
const page_size = ref(1);

watch(coaches, (newValue) => {
  current_page.value = newValue.current_page;
  page_size.value = newValue.last_page;
});

watch(current_page, () => {
  getData();
});

// watch(product_type_id, () =>{
//   current_page.value = 1;
//   getData();
// })

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

const showModalDetail = (value) => {
  showUpdate.value = false;
  coach_id.value = value;
  showDetail.value = !showDetail.value;
};

const showModalUpdate = (value) => {
  showDetail.value = false;
  coach_id.value = value;
  showUpdate.value = !showUpdate.value;
};

const coachUpdateSuccess = (value) =>{
  getData();
  showModalDetail(value);
}

const coachCreateSuccess = (value) => {
  getData();
  showModalDetail(value);
}

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
      getData();

    }).catch(err => {
      console.log(err);
    })
  }
}

const getData = async () =>
  await store.dispatch("getCoaches", {
    token: store.state.token,
    page: current_page.value,
    search: search.value,
    level: coach_level_id.value,
  });

const updateProductSuccess = (id) => {
  getData();
  showModal(id);
}

onBeforeMount(() => {
  getData();
});
</script>
<style scoped>
.table td img {
    width: 6rem;
    height: auto;
    border-radius: 3px;
    object-fit: cover;
}
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
