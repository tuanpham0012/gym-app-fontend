<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <post-detail-modal
        :post_id="post_id"
        v-if="showModalDetail"
        @close="toggleShowModalDetail()"
        @update="getData()"
      />

            <div class="page-header">
        <h3 class="page-title">Danh sách bài viết</h3>
        <nav aria-label="breadcrumb">
          <div class="btn-action">
            <button
              type="button"
              @click="acceptAll()"
              class="btn btn-sm btn-outline-success btn-text m-1"
            >
              <i class="mdi mdi-check-all btn-icon-prepend"></i> Duyệt tất cả
            </button>
          </div>
        </nav>
      </div>

      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Đơn mua</h4>
              <p class="card-description">
                <br />
              </p>
              <div class="row">
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-5 col-form-label">Trạng thái</label>
                    <div class="col-sm-7">
                      <select class="form-control" v-model="post_status_id">
                        <option value="-1">--Tất cả--</option>
                        <option v-for="(item, index) in status" :value="item.id" :key="index">
                          {{ item.status }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart" v-if="posts_list && posts_list.data.length > 0">
                <div class="table-responsive table-hover">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tác giả</th>
                        <th>Chuyên mục</th>
                        <th>Ngày đăng</th>
                        <th>Trạng thái</th>
                        <th>Số hình ảnh</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(article, index) in posts_list.data" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                          {{ article.user.name }}
                        </td>
                        <td>
                          {{ article.user.name }}
                        </td>
                        <td>{{ formatDateTime(article.created_at) }}</td>
                        <td>
                          <label class="badge" :class="{
                            'badge-info': article.post_status_id == 1,
                            'badge-success': article.post_status_id == 2,
                            'badge-primary': article.post_status_id == 3,
                            'badge-warning': article.post_status_id == 4,
                            'badge-danger': article.post_status_id == 5,
                            'badge-light': article.post_status_id > 5,
                          }">{{ article.status.status }}</label>
                        </td>
                        <td>
                          {{ article.images_count }}
                        </td>
                        <td class="action">
                          <label class="badge badge-info m-1" @click="toggleShowModalDetail(article.id)">Chi tiết</label>
                          <label class="badge badge-success m-1" v-if="article.post_status_id == 1" @click="updateStatus(article)">Duyệt bài</label>
                          <!-- <label class="badge badge-success m-1">Cập nhật</label> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item" v-for="(link, index) in posts_list.links" :key="index" :class="{
                        'active': link.active,
                        'disabled': link.url == null,
                      }" @click="changePage(index)">
                        <a class="page-link" href="#"><span>{{ index == 0 ? '&laquo;' : index == posts_list.links.length
                            - 1 ? '&raquo;' : link.label
                        }}</span></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="order-emtry text-center" v-else>
                <h5>Chưa có bài viết nào</h5>
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
import { posts } from "../../../config";
import axios from "axios";
import PostDetailModal from "./PostDetailModal.vue";

const store = useStore();

const posts_list = computed(() => store.state.postsAdmin ?? null);
const status = computed(() => store.state.postStatus ?? null);

const post_id = ref(-1);
const post_status_id = ref(-1);
const showModalDetail = ref(false);
const show_update = ref(false);
const show_create = ref(false);
const search = ref('');

const current_page = ref(1);
const page_size = ref(1);

watch(posts_list, (newValue) => {
  current_page.value = newValue.current_page;
  page_size.value = newValue.last_page;
});

watch(current_page, () => {
  getData();
});

watch(post_status_id, () => {
  current_page.value = 1;
  getData();
})

const toggleSearch = () => {
  current_page.value = 1;
  getData();
}

const updateStatus = async (article) => {
  article.post_status_id = 2;
  await axios({
    method: "PATCH",
    url: posts.ADMIN_CRUD + article.id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: article,
  })
    .then((res) => {
      console.log(res.data);
      getData();
      new Notify ({
          title: '',
          text: res.data.message,
          autoclose: true,
          status: 'success',
          autotimeout: 3000
      })
      // emits("close-modal");
    })
    .catch((err) => {
      console.log(err);
    });
}

const changePage = (page) => {
  if (page > 0 && page < page_size.value + 1) {
    current_page.value = page;
  } else {
    if (page == 0) {
      current_page.value = (current_page.value > 1) ? current_page.value - 1 : 1;
    } else if (page == page_size.value + 1) {
      current_page.value =
        (current_page.value < page_size.value)
          ? current_page.value + 1
          : page_size.value;
    }
  }
};

const toggleShowModalDetail = (value) => {
  //show_update.value = false;
  if(value) post_id.value = value;
  showModalDetail.value = !showModalDetail.value;
};


const acceptAll = async () => {
  await axios({
    method: "POST",
    url: posts.ACCEPT_ALL_POST,
    headers: { Authorization: store.state.token, Accept: "application/json" },
  })
    .then((res) => {
      console.log(res.data);
      getData();
      new Notify({
        title: '',
        text: res.data.message,
        autoclose: true,
        status: 'success',
        autotimeout: 3000
      })
      // emits("close-modal");
    })
    .catch((err) => {
      console.log(err);
    });
}


const getData = async () =>
  await store.dispatch("getPostsAdmin", {
    token: store.state.token,
    page: current_page.value,
    search: search.value,
    post_status_id: post_status_id.value,
  });

// const updateProductSuccess = (id) => {
//   getData(current_page.value, search.value, product_type_id.value);
//   showModal(id);
// }

onBeforeMount(async () => {
  await getData();
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
