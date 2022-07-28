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
                          <label class="m-0" for="ip-image"
                            ><img
                              :src="
                                imagePreview ??
                                'https://th.bing.com/th/id/OIP.xo-BCC1ZKFpLL65D93eHcgHaGe?pid=ImgDet&rs=1'
                              "
                              class="image-preview m-1"
                              alt=""
                          /></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Email: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <input
                      type="email"
                      class="form-control"
                      name="email-coach"
                      v-model="detail.email"
                    />
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Điện thoại: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      class="form-control"
                      name="phone-coach"
                      v-model="detail.phone"
                    />
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Trình độ: </label>
                  <div class="col-sm-9">
                    <select
                      class="form-control"
                      v-model="detail.coach_level_id"
                    >
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
                      name="coach-experience"
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
                      name="coach-character"
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
                        <span
                          ><input type="number" min="1" max="12" /> -
                          <input type="number" min="1" max="12"
                        /></span>
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
        <button type="button" class="btn btn-sm btn-success" @click="create()">
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

const emits = defineEmits(["close", "create"]);

const store = useStore();

const showModalNote = ref(false);
const imagePreview = ref(null);
const coach_id = ref(null);
const dataImage = ref(null);

const detail = ref({
  id: null,
  user_id: null,
  coach_level_id: -1,
  experience: null,
  introduction: null,
  phone: null,
  timeline: "6h-12h, 15h-20h",
  character: null,
  email: null,
  avatar: "",
});
const levels = computed(() => store.state.coachLevels ?? null);

const toggleCloseModal = () => emits("close");

const uploadImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();
  detail.value.avatar = new Date().getTime() + "_" + image.name;
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  dataImage.value = new FormData();
  dataImage.value.append("avatar", image);
};

const create = async () => {
  let result = confirm("Xác nhận thêm mới HLV?");
  if (result) {
    await axios({
      method: "POST",
      url: coach.ADMIN_CRUD,
      headers: { Authorization: store.state.token, Accept: "application/json" },
      data: detail.value,
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        coach_id.value = res.data.coach.id;
        if (dataImage.value == null) {
          emits("create", coach_id.value);
          emits("close");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (dataImage.value != null) {
      createImage();
    }
  }
};

const createImage = async () => {
  await axios({
    method: "POST",
    url: coach.ADMIN_CREATE_AVATAR + detail.value.avatar,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: dataImage.value,
  })
    .then((res) => {
      console.log(res.data);
      emits("create", coach_id.value);
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
  width: 100%;
  max-width: 18rem;
  cursor: pointer;
}
.image-preview:active {
  transform: scale(0.98);
}
</style>
