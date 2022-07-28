<template>
  <div v-if="product">
    <modal
      size="large"
      title="Cập nhật sản phẩm"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Mã sản phẩm: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ product.product_code }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên sản phẩm: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="product-name"
                      v-model="product.name"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Giá nhập: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="prduct-purchase-price"
                      v-model="product.purchase_price"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Giá bán: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="prduct-price"
                      v-model="product.price"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Mô tả: </label>
                      <div class="col-sm-9">
                        <textarea
                          type="text"
                          rows="5"
                          class="form-control"
                          v-model="product.description"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Loại sản phẩm:
                      </label>
                      <div class="col-sm-9">
                        <select
                          class="form-control"
                          v-model="product.product_type_id"
                        >
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
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Hình ảnh sản phẩm:
                      </label>
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
                            <input
                              type="text"
                              class="form-control"
                              placeholder=""
                              disabled
                              v-model="fileName"
                            />
                            <div class="input-group-append">
                              <label
                                class="btn btn-sm btn-primary m-0"
                                for="ip-image"
                                >Upload</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <img :src="imagePreview ?? imageLink(product.image)" class="image-preview m-5" alt="" />
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
          @click="updateProduct()"
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
import { productUrl } from "../../../config";
import axios from "axios";

const props = defineProps({
  product_id: {
    type: [String, Number],
    default: function () {
      return null;
    },
  },
});

const emits = defineEmits(["close-modal", "update"]);

const store = useStore();

const showModalNote = ref(false);
const imagePreview = ref(null);
const fileName = ref('');
const dataImage = ref(null);

const product = computed(() => store.state.product ?? null);
const product_types = computed(() => store.state.productTypes ?? null);

const toggleCloseModal = () => emits("close-modal");

const uploadImage = (e) => {

  const image = e.target.files[0];
  const reader = new FileReader();
  fileName.value = image.name;
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  dataImage.value = new FormData();
  dataImage.value.append("image", image);
};

const updateProduct = async () => {
  // var formUpdateAvatar = document.getElementById('fr-u'); //$('#formUpdateAvatar')
  // const formData = new FormData(formUpdateAvatar);
  // console.log(formData.get('image'));
  await axios({
    method: "PATCH",
    url: productUrl.CRUD + product.value.id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: product.value,
  })
    .then((res) => {
      console.log(res.data);
      alert(res.data.message);
      if(dataImage.value == null){
        emits("update", res.data.product.id);
        emits("close-modal");
      }

    })
    .catch((err) => {
      console.log(err);
    });
    if(dataImage.value != null){
      updateImage(product.value.id);
    }
};

const updateImage = async (id) =>{
  await axios({
    method: "POST",
    url: productUrl.UPDATE_IMAGE + id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: dataImage.value,
  })
    .then((res) => {
      console.log(res.data);
      emits("update", res.data.product.id);
      emits("close-modal");
    })
    .catch((err) => {
      console.log(err);
    });
}

const getDetail = () =>
  store.dispatch("getProduct", {
    token: store.state.token,
    product_id: props.product_id,
  });

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.image-preview{
  width: 16rem;
}
</style>
