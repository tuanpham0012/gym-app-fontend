<template lang="">
  <modal-vue
    size="large"
    title="Thông tin vé tập"
    @close-modal="toggleCloseModal()"
  >
    <template v-slot:body>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="col-12 row" v-if="detail">
              <div class="col-lg-5 col-md-12 col-sm-12 qr-code">
                <!-- <img
                  src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                /> -->
                <qrcode-vue :value="valueQr(detail)" :size="size" class="qr-code-img" level="L" />
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <h4 class="box-title mt-3">{{ detail.ticket_type.name }}</h4>
                <div class="col-md-12">
                  <p class="m-2 mt-3">
                  {{ detail.ticket_type.description }}
                </p>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Người tập: </label>
                    <div class="col-sm-8 d-flex align-items-center">
                      <h6>{{ detail.name }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">SDT: </label>
                    <div class="col-sm-8 d-flex align-items-center">
                      <h6>{{ detail.phone_number }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label"
                      >Ngày bắt đầu:
                    </label>
                    <div class="col-sm-8 d-flex align-items-center">
                      <h6>{{ formatDate(detail.registration_date) }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label"
                      >Ngày hết hạn:
                    </label>
                    <div class="col-sm-8 d-flex align-items-center">
                      <h6>{{ formatDate(detail.expiration_date) }}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Trạng thái: </label>
                    <div class="col-sm-8 d-flex align-items-center">
                      <h6>{{ detail.status.status }}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <h3 class="box-title mt-5">Chi tiết các dịch vụ</h3>
                <div class="table-responsive">
                  <table class="table table-striped table-product">
                    <tbody>
                      <tr>
                        <td width="390">Brand</td>
                        <td>Stellar</td>
                      </tr>
                      <tr>
                        <td>Delivery Condition</td>
                        <td>Knock Down</td>
                      </tr>
                      <tr>
                        <td>Seat Lock Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>Office Chair</td>
                      </tr>
                      <tr>
                        <td>Style</td>
                        <td>Contemporary&amp;Modern</td>
                      </tr>
                      <tr>
                        <td>Wheels Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Upholstery Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Upholstery Type</td>
                        <td>Cushion</td>
                      </tr>
                      <tr>
                        <td>Head Support</td>
                        <td>No</td>
                      </tr>
                      <tr>
                        <td>Suitable For</td>
                        <td>Study&amp;Home Office</td>
                      </tr>
                      <tr>
                        <td>Adjustable Height</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Model Number</td>
                        <td>F01020701-00HT744A06</td>
                      </tr>
                      <tr>
                        <td>Armrest Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Care Instructions</td>
                        <td>
                          Handle With Care,Keep In Dry Place,Do Not Apply Any
                          Chemical For Cleaning.
                        </td>
                      </tr>
                      <tr>
                        <td>Finish Type</td>
                        <td>Matte</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal-vue>
</template>
<script setup>
import ModalVue from "../../../components/Modal.vue";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { formatDate } from "../../../helper";
const props = defineProps({
  ticket_id: {
    type: [String, Number],
    default: function () {
      return null;
    },
  },
});
const emits = defineEmits(["close"]);

const store = useStore();
const size = ref(260);

const detail = computed(() => store.state.ticket ?? null);

const toggleCloseModal = () => emits("close");

const valueQr = (detail) =>{
  let result = {
    user: detail.name,
    code: detail.member_code,
    type: detail.ticket_type.name,
    start: formatDate(detail.registration_date),
    end: formatDate(detail.expiration_date),
    status: detail.status.status,
  };
  return JSON.stringify(result);
}

const getDetail = () =>
  store.dispatch("getTicket", {
    token: store.state.token,
    ticket_id: props.ticket_id,
  });

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.card {
  margin-bottom: 30px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0;
}
.card .card-subtitle {
  font-weight: 300;
  margin-bottom: 10px;
  color: #8898aa;
}
.table-product.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f3f8fa !important;
}
.table-product td {
  border-top: 0px solid #dee2e6 !important;
  color: #728299 !important;
}
.qr-code {
  padding: 1rem;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  min-width: 17rem;
  max-width: 19rem;
  height: fit-content;
}
.qr-code-img {
  max-width: 16rem;
  max-height: 16rem;
  padding: 0.5rem;
  background-color: #ffffff;
}
</style>
