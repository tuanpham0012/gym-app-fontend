<template>
  <div v-if="product">
    <modal
      size="large"
      :title="'Thông tin sản phẩm: ' + product.name"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12 ">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Mã sản phẩm:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ product.product_code }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên sản phẩm: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ product.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Giá bán:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ formatMoney(product.price) }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Mô tả:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ product.description}}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Loại sản phẩm:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ product ? product.product_type.type_name : 'not find' }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Hình ảnh sản phẩm:
                      </label>
                      <div class="col-sm-9">
                        <img :src="imageLink(product.image)" class="product-image"/>
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
          @click="toggleUpdate(product.id)"
        >
          Cập nhật
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
import { order } from "../../../config";
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
const note = ref('');

const product = computed(() => store.state.product ?? null);

const toggleCloseModal = () => emits("close-modal");
const toggleUpdate = (id) => {
        emits("update", id)
    };

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
.product-image{
  max-width: 12rem;
  height: auto;
}
</style>
