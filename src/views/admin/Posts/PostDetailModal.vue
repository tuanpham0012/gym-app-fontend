<template>
  <div v-if="article">
    <modal size="large" title="Thông tin bài viết" @close-modal="toggleCloseModal()">
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12 ">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Người đăng:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ article.user.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Ngày đăng: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ formatDateTime(article.created_at) }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Trạng thái:
                  </label>
                  <div class="col-sm-6 d-flex align-items-center">
                    <select class="form-control" v-model="article.post_status_id" @change="updateStatus(article.id)">
                      <option v-for="(item, index) in status" :value="item.id" :key="index">
                        {{ item.status }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Nội dung:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <div v-html="article.content"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Hình ảnh:
                      </label>
                      <div class="col-sm-12 d-flex align-items-center">
                        <div v-if="article.images.length == 0"> Không có hình ảnh kèm theo</div>
                        <div class="col-12 d-flex flex-wrap gap-2" v-else>
                          <div class="post-image " v-for="(item, index) in article.images" :key="index">
                            <button class="btn-close" @click="deleteImgage(item.id)"></button>
                            <img :src="imageLink(item.url)" alt="" />
                          </div>
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
      <template v-slot:footer>
        <button type="button" class="btn btn-sm btn-secondary" @click="toggleCloseModal()">
          Đóng
        </button>
      </template>
    </modal>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import Modal from "../../../components/Modal.vue";
import { formatMoney, formatDateTime, imageLink } from "../../../helper";
import { posts } from "../../../config";
import axios from "axios";

const props = defineProps({
  post_id: {
    type: [String, Number],
    default: function () {
      return null;
    },
  },
});

const emits = defineEmits(["close", "update"]);

const store = useStore();

const showModalNote = ref(false);
const note = ref('');

const article = computed(() => store.state.articleAdmin ?? null);
const status = computed(() => store.state.postStatus ?? null);

const toggleCloseModal = () => emits("close");
const toggleUpdate = (id) => {
  emits("update", id)
};

const getDetail = () =>
  store.dispatch("getArticleAdmin", {
    token: store.state.token,
    id: props.post_id,
  });

const updateStatus = async (id) => {
  await axios({
    method: "PATCH",
    url: posts.ADMIN_CRUD + id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: article.value,
  })
    .then((res) => {
      console.log(res.data);
      
      emits("update");
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

const deleteImgage = async (id) => {
  let result = confirm('Bạn có muốn xóa ảnh này?')
  if (result) {
    await axios({
      method: "POST",
      url: posts.DELETE_POST_IMAGE + id,
      headers: { Authorization: store.state.token, Accept: "application/json" },
    })
      .then((res) => {
        console.log(res.data);
        emits("update");
        getDetail();
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

}

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.post-image {
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}

.post-image:hover {
  background-color: rgba(227, 233, 238, 0.74);
}

.post-image button {
  position: absolute;
  background-color: rgb(214, 212, 208);
  border-radius: 100%;
  padding: 0.25rem;
  right: 0;
  top: 0;
}

.post-image img {
  width: 100%;
  height: auto;
  max-width: 25rem;
  object-fit: contain;
}
</style>
