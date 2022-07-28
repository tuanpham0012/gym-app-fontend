<template>
  <div v-if="detail">
    <modal
      size="medium"
      title="Thông tin người dùng"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <div class="avatar-header">
                    <div class="avatar">
                      <div class="avatar-img">
                        <input
                          type="file"
                          accept="image/jpeg"
                          name="image"
                          id="ip-image"
                          @change="uploadImage($event)"
                          class="file-upload-default"
                        />
                        <img :src=" imagePreview ?? imageLink(detail.avatar)" alt="" />
                        <label class="ic-update-img" for="ip-image"><i class="mdi mdi-lead-pencil"></i></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"
                      >Họ tên:
                    </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <input
                      type="text"
                      class="form-control"
                      name="user-name"
                      v-model="detail.name"
                    />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Email: </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <h6>{{ detail.email }}</h6>
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
                            name="user-address"
                            v-model="detail.phone"
                          />
                        </div>
                      </div>
                    </div>
                <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Giới tính:
                        </label>
                        <div class="col-sm-9 d-flex align-items-center">
                          <select class="form-control" v-model="detail.gender">
                            <option>Nam</option>
                            <option>Nữ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Địa chỉ: </label>
                        <div class="col-sm-9 d-flex align-items-center">
                           <input
                            type="text"
                            class="form-control"
                            name="user-address"
                            v-model="detail.address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Ngày sinh:
                        </label>
                        <div class="col-sm-9 d-flex align-items-center">
                           <input
                              type="date"
                              class="form-control"
                              name="user-birth"
                              v-model="detail.date_of_birth"
                            />
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
          Cập nhật thông tin
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
import { ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import Modal from "../../../components/Modal.vue";
import {
  formatMoney,
  formatDate,
  formatDateTime,
  imageLink,
} from "../../../helper";
import { user } from '../../../config'
import axios from "axios";

const emits = defineEmits(["close", "update"]);

const store = useStore();
const imagePreview = ref(null);
const fileName = ref('');
const dataImage = ref(null);

const detail = computed(() => store.state.userInfo ?? null);

watch(detail, () => {
    console.log('abc');
})

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

const update = async() =>{
  let result = confirm("Xác nhận cập nhật thông tin");
  if(result){
    await axios({
      url: user.USER_CRUD,
      method: 'PATCH',
      headers: { Authorization: store.state.token, Accept: "application/json" },
      data: detail.value,
    }).then( res =>{
      console.log(res.data);
      alert(res.data.message);
      if(dataImage.value == null){
        toggleCloseModal();
        emits("update");
      }
    }).catch( err =>{
      console.log(err);
    })
    if(dataImage.value){
      updateImage();
    }
  }
}

const updateImage = async () =>{
  await axios({
    method: "POST",
    url: user.USER_UPDATE_AVATAR,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: dataImage.value,
  })
    .then((res) => {
      console.log(res.data);
      toggleCloseModal();
      emits("update");
    })
    .catch((err) => {
      console.log(err);
    });
}
// const getDetail = () =>
//   store.dispatch("getUser", {
//     token: store.state.token,
//     user_id: props.user_id,
//   });

// onBeforeMount(async () => {
//   await getDetail();
// });
</script>
<style scoped>
.avatar-header {
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}
.avatar img {
  width: 10rem;
  height: 10rem;
  margin: 0 1rem;
  border-radius: 50%;
  margin: 0.5rem 1rem;
  object-fit: cover;
}
.avatar img:hover {
  opacity: 0.89;
  cursor: pointer;
  border: 1px solid rgba(165, 165, 165, 0.514);
}
.avatar img:active {
  transform: scale(0.98);
}
.avatar-img {
  position: relative;
}
.ic-update-img{
  padding: 0.25rem;
  font-size: 1.25rem;
  color: rgb(52, 62, 65);
  position: absolute;
  bottom: 0;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
}
.ic-update-img:hover{
  cursor: pointer;
  background-color: rgb(218, 218, 201);
  border-radius: 100%;
}
.ic-update-img:active{
  transform: scale(1.1);
}
</style>
