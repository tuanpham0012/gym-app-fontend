<template>
  <div v-if="detail">
    <modal
      size="medium"
      title="Cập nhật thông tin huấn luyện viên"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Ảnh đại diện: </label>
                  <div class="col-sm-9">
                    <form id="fr-u">
                      <input
                        type="file"
                        accept="image/jpeg"
                        name="image"
                        id="ip-image"
                        @change="uploadImage($event)"
                        class="file-upload-default"
                      />
                    </form>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-append">
                          <label
                            class=" m-0"
                            for="ip-image"
                            ><img
                                :src="imagePreview ?? imageLink(detail.avatar)"
                                class="image-preview m-1"
                                alt=""
                            /></label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên HLV: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.user.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Trình độ: </label>
                  <div class="col-sm-9">
                    <select class="form-control" v-model="detail.coach_level_id">
                      <option
                        v-for="(item, index) in levels"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.level }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Kinh nghiệm: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="prduct-purchase-price"
                      v-model="detail.experience"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tính cách: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="prduct-price"
                      v-model="detail.character"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Giới thiệu:
                      </label>
                      <div class="col-sm-9">
                        <textarea
                          type="text"
                          rows="6"
                          class="form-control"
                          v-model="detail.introduction"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Thời gian làm việc:
                      </label>
                      <div class="col-sm-9">
                        <span><input type="number" min="1" max="12" /> - <input type="number" min="1" max="12" /></span>
                        
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
        <button
          type="button"
          class="btn btn-sm btn-success"
          @click="update()"
        >
          Xác nhận
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
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import Modal from "../../../components/Modal.vue";
import { formatMoney, formatDateTime, imageLink } from "../../../helper";
import { coach } from "../../../config";
import axios from "axios";

const props = defineProps({
  coach_id: {
    type: [String, Number],
    default: function () {
      return null;
    },
  },
});

const emits = defineEmits(["close", "update"]);

const store = useStore();

const showModalNote = ref(false);
const imagePreview = ref(null);
const fileName = ref("");
const dataImage = ref(null);

const detail = computed(() => store.state.coach ?? null);
const levels = computed(() => store.state.coachLevels ?? null);

const toggleCloseModal = () => emits("close");

const uploadImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();
  fileName.value = image.name;
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  dataImage.value = new FormData();
  dataImage.value.append("avatar", image);
};

const update = async () => {
  // var formUpdateAvatar = document.getElementById('fr-u'); //$('#formUpdateAvatar')
  // const formData = new FormData(formUpdateAvatar);
  // console.log(formData.get('image'));
  await axios({
    method: "PATCH",
    url: coach.ADMIN_CRUD + detail.value.id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: detail.value,
  })
    .then((res) => {
      console.log(res.data);
      alert(res.data.message);
      if (dataImage.value == null) {
        emits("update", res.data.coach.id);
        emits("close");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (dataImage.value != null) {
    updateImage();
  }
};

const updateImage = async () => {
  await axios({
    method: "POST",
    url: coach.ADMIN_UPDATE_AVATAR + detail.value.id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: dataImage.value,
  })
    .then((res) => {
      console.log(res.data);
      emits("update", res.data.coach.id);
      emits("close");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDetail = () =>
  store.dispatch("getCoach", {
    token: store.state.token,
    coach_id: props.coach_id,
  });

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.image-preview {
  width:100%;
  max-width: 18rem;
  cursor: pointer;
}
.image-preview:active{
  transform: scale(0.98);
}
</style>
