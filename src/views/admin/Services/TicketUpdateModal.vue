<template>
  <div v-if="detail">
    <modal-vue
      size="medium"
      :title="'Thông tin vé tập: ' + detail.member_code"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label"
                    >Tên người dùng:
                  </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      class="form-control"
                      name="ticket-name"
                      v-model="detail.name"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Số điện thoại: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      class="form-control"
                      name="ticket-name"
                      v-model="detail.phone_number"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên gói tập: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.ticket_type.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Giá: </label>
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
                      <label class="col-sm-3 col-form-label"
                        >Ngày đăng kí:
                      </label>
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
                        <input
                          type="date"
                          class="form-control"
                          name="ticket-name"
                          v-model="detail.registration_date"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ngày kết thúc:
                      </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <input
                          type="date"
                          class="form-control"
                          name="ticket-name"
                          v-model="detail.expiration_date"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Ghi chú: </label>
                      <div class="col-sm-9 d-flex align-items-center">
                        <input
                          type="text"
                          class="form-control"
                          name="ticket-name"
                          v-model="detail.note"
                        />
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
          @click="update()"
        >
          Chỉnh sửa
        </button>
       
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="toggleCloseModal()"
        >
          Đóng
        </button>
      </template>
    </modal-vue>

  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed, } from "vue";
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

const detail = computed(() => store.state.ticket ?? null);

const toggleCloseModal = () => emits("close");

const getDetail = () =>
  store.dispatch("getTicket", {
    token: store.state.token,
    ticket_id: props.ticket_id,
  });
const update = async () => {
    let result = confirm('Xác nhận cập nhật thông tin')
    if(result){
        await axios({
        url: ticket.ADMIN_CRUD + detail.value.id,
        method: "PATCH",
        headers: { Authorization: store.state.token, Accept: "application/json" },
        data: detail.value
    })
        .then((res) => {
        alert(res.data.message);
        console.log(res.data);
        toggleCloseModal();
        emits("update");
        getDetail();
        })
        .catch((err) => {
        console.log(err);
        });
    }
  
};

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style lang=""></style>
