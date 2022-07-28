<template>
  <div v-if="detail">
    <modal-vue
      size="large"
      :title="'Thông tin vé tập: ' + detail.member_code"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12 d-flex flex-wrap">
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Tên người dùng:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Số điện thoại: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.phone_number }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Tên gói tập:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.ticket_type.name}}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-7 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Giá:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ formatMoney(detail.cost) }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Trạng thái:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>{{ detail.status.status }}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Ngày đăng kí: </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ formatDateTime(detail.created_at) }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ngày bắt đầu:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ formatDate(detail.registration_date) }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ngày kết thúc:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ formatDate(detail.expiration_date) }}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ghi chú:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <h6>
                          {{ detail.note }}
                        </h6>
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
          class="btn btn-sm btn-primary"
          @click="toggleUpdate()"
        >
          Chỉnh sửa
        </button>
        <button
          type="button"
          class="btn btn-sm btn-success"
          v-if="detail.ticket_status_id == 1 || detail.ticket_status_id == 4"
          @click="confirmUpdate(2,'Kích hoạt')"
        >
          Kích hoạt
        </button>
        <button
          type="button"
          class="btn btn-sm btn-warning"
          v-if="detail.ticket_status_id == 2"
          @click="confirmUpdate(4,'Khóa')"
        >
          Khóa
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="confirmUpdate(5,'Xóa')"
        >
          Xóa
        </button>
      </template>
    </modal-vue>

    <modal-vue
      title="Lý do khóa"
      @close-modal="showModalNote = false"
      v-if="showModalNote"
    >
      <template v-slot:body>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Ghi chú: </label>
            <div class="col-sm-9">
              <textarea
                type="text"
                rows="4"
                class="form-control"
                v-model="note"
              ></textarea>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="update(4, note)"
        >
          Xác nhận
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="showModalNote = false"
        >
          Hủy
        </button>
      </template>
    </modal-vue>

  </div>
</template>
<script setup>

import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import ModalVue from "../../../components/Modal.vue";
import { formatMoney, formatDateTime, formatDate } from "../../../helper";
import { ticket } from "../../../config";
import axios from "axios";

const props = defineProps({
  ticket_id: {
    type: [String, Number],
  },
});

const emits = defineEmits(["close", "update"]);

const store = useStore();

const showModalNote = ref(false);
const showModalEdit = ref(false);
const showModalPrint = ref(false);
const note = ref("");

const detail = computed(() => store.state.ticket ?? null);

const toggleCloseModal = () => emits("close", "toggleUpdate");
const toggleUpdate = () => emits('toggleUpdate');

const getDetail = () =>
  store.dispatch("getTicket", {
    token: store.state.token,
    ticket_id: props.ticket_id,
  });

const confirmUpdate = (status_id, msg) => {
  let result = confirm("Xác nhận " + msg + " vé tập?");
  if (result) {
    switch (status_id) {
      case 4:
        showModalNote.value = true;
        break;
      // case 5:
      //   showModalNote.value = true;
      //   break;
      default:
        update(status_id, "");
        break;
    }

    // if (status_id != 5) {
    //   updateOrder(status_id, "");
    // } else {
    //   showModalNote.value = true;
    // }
  }
};
const update = async (status_id, msg) => {
  await axios({
    url: ticket.ADMIN_CRUD + detail.value.id,
    method: "PATCH",
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      ticket_status_id: status_id,
      note: msg,
    },
  })
    .then((res) => {
      alert(res.data.message);
      console.log(res.data);
      // showModalNote.value = false;
      emits("update");
      getDetail();
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style lang=""></style>
