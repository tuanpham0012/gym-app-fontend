<template>
  <div>
    <modal-vue size="medium" title="Tạo bài viết" @close-modal="toggleCloseModal()">
      <template v-slot:body>
        <div class="">
          <div class="col-sm-12 editor">
            <QuillEditor theme="snow" v-model:content="content" contentType="html" />
          </div>
        </div>
        <div class="col-sm-12 image-preview">
          <input type="file" accept="image/jpeg" hidden name="image" id="ip-image" multiple @change="uploadImage($event)"
            class="file-upload-default" />
            <div v-for="(item, index) in imagePreview" :key="index" class="image">
              <button
                type="button"
                class="btn-close"
                @click="deleteImage(index)"
              ></button>
              <img :src="item" alt=""/>
            </div>

            <label for="ip-image" class="btn d-inline btn-success add-image m-2">
              <i class="mdi mdi-folder-multiple-image"></i>
            </label>
          
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-sm btn-primary btn-icon-text" @click="create()">
          Đăng bài
        </button>
        <button type="button" class="btn btn-sm btn-secondary" @click="toggleCloseModal()">
          Hủy
        </button>
      </template>
    </modal-vue>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ModalVue from "./Modal.vue";
// import { formatMoney} from '../../../helper';
import axios from 'axios';
import { posts } from '../config'
import moment from "moment";

const store = useStore();
const router = useRouter();

const emits = defineEmits(["close", "update"]);
const content = ref("");
const imagePreview = ref([]);
const fileName = ref('');
const dataImage = new FormData();
const toggleCloseModal = () => emits("close");

const uploadImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();
  fileName.value = image.name;
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value.push(e.target.result);
  };
  dataImage.append("images[]", image);
};

const deleteImage = (index) => {
  imagePreview.value.splice(index, 1);
  var values = dataImage.getAll("images[]");
  values.splice(index, 1);
  // dataImage.set('images[]', values);
  dataImage.delete("images[]");
  values.forEach(element => {
    dataImage.append("images[]", element);
  });
}

const create = async () => {
  dataImage.append("content", content.value);
  await axios({
    method: "POST",
    url: posts.CRUD,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: dataImage,
  })
    .then((res) => {
      console.log(res.data);
      alert(res.data.message);
      emits('update');
      toggleCloseModal();
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style>
.swal-danger {
  background-color: rgb(245, 9, 9);
}

.swal-warning {
  background-color: rgb(255, 251, 0);
  color: #000;
}
.image-preview{
  display: flex;
  gap: 0.15rem;
  flex-wrap: wrap;
}
.image-preview img{
  width: 100%;
  max-width: 10rem;
  object-fit: cover;
}
.image-preview .image{
  position: relative;
}
.image-preview .image button{
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  font-size: 0.875rem;
  background-color: rgb(255, 255, 255);
  border-radius: 100%;
}
.add-image{
  height: fit-content;
}
.editor {
  height: 9rem;
  max-width: 100%;
  /* min-height: 5rem;
  max-height: 10rem; */
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}
.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0 0;
}
</style>
