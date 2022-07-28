<template lang="">
  <div class="main-panel">
    <div class="content-wrapper">
      <my-ticket-detail-modal
        :ticket_id="ticket_id"
        @close="showModalDetail = false"
        v-if="showModalDetail"
      ></my-ticket-detail-modal>
      <div class="container">
        <div class="col-lg-12">
          <h4 class="card-title">Danh sách vé tập</h4>
          <div
            class="d-flex gap-3 justify-content-start flex-wrap"
            v-if="myTickets && myTickets.length > 0"
          >
            <div
              class="card card-product"
              v-for="(item, index) in myTickets"
              :key="index"
              @click="viewDetail(item.id)"
            >
              <!-- <img
                src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                class="card-img-top"
                alt="..."
              /> -->
              <div class="d-flex justify-content-center p-3 mt-1 with-100">
                <qrcode-vue :value="valueQr(item)" :size="size" level="H" />
              </div>

              <div class="card-body">
                <div class="product-info">
                  <h5 class="card-title">
                    Tên gói: {{ item.ticket_type.name }}
                  </h5>
                  <p class="card-text">Người tập: {{ item.name }}</p>
                  <span class="card-text"
                    >Thời gian:<br />
                    {{ formatDate(item.registration_date) }} -
                    {{ formatDate(item.expiration_date) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import MyTicketDetailModal from "./MyTicketDetailModal.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { formatDate } from "../../../helper";
// import { formatMoney, slugify } from '../../../helper';

const store = useStore();
const router = useRouter();
const route = useRoute();
const showModalDetail = ref(false);
const ticket_id = ref(-1);
const size = ref(190);

const myTickets = computed(() => store.state.myTickets ?? null);

const viewDetail = (id) => {
  ticket_id.value = id;
  showModalDetail.value = true;
};

const valueQr = (detail) => {
  let result = {
    user: detail.name,
    code: detail.member_code,
    type: detail.ticket_type.name,
    start: formatDate(detail.registration_date),
    end: formatDate(detail.expiration_date),
    status: detail.status.status,
  };
  return JSON.stringify(result);
};

onBeforeMount(() => store.dispatch("getMyTickets", store.state.token));
</script>
<style scoped>
.qr-code {
  padding: 1rem;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}
.qr-code img {
  max-width: 20rem;
  height: 20rem;
  object-fit: cover;
}
.card-product:hover {
  transform: translateY(-3px);
  box-shadow: 4px 4px 8px rgb(173, 173, 173);
}
.card-product {
  max-width: 14rem;
  min-width: unset;
  cursor: pointer;
}
.card-product img {
  width: 100%;
  max-width: 14rem;
  object-fit: contain;
}
.card-body {
  padding: 1rem 0.875rem 0.5rem 0.875rem;
  position: relative;
}
</style>
