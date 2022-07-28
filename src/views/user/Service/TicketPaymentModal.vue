<template>
    <div>
       <modal-vue
      size="medium"
      title="Đăng kí vé tập"
      @close-modal="toggleCloseModal()"
    >
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên gói tập: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ detail.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Thời hạn: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ quantity }} tháng</h6>
                  </div>
                          
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Chi phí: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ formatMoney(total) }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tên người dùng: </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="prduct-price"
                      v-model="name"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex flex-wrap">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">SDT liên hệ: </label>
                      <div class="col-sm-9">
                         <input
                            type="text"
                            class="form-control"
                            name="prduct-price"
                            v-model="phoneNumber"
                            />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Ngày bắt đầu:
                      </label>
                      <div class="col-sm-9">
                        <input
                        type="date"
                        :min="moment().format('YYYY-MM-DD')"
                        class="form-control"
                        name="prduct-price"
                        v-model="startDate"
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
          class="btn btn-sm btn-success"
          @click="check()"
        >
          Đăng kí
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

    <modal-vue
      title="Đăng kí thành công!"
      v-if="showModalSuccess"
      @close-modal="showModalSuccess = true"
    >
      <template v-slot:body>
        <div class="col-md-12" v-if="message">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Trạng thái: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ message.status ?? 'chưa có gì???' }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Mã giao dịch: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <h6>{{ message.ticket ?? 'abcxyz' }}</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Tin nhắn: </label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <div v-html="message.message"></div>
                  </div>
                </div>
              </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="$router.push({name: 'user-my-ticket'})"
        >
          Xác nhận
        </button>
      </template>
    </modal-vue>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ModalVue from '../../../components/Modal.vue';
import { formatMoney} from '../../../helper';
import axios from 'axios';
import { ticket} from '../../../config'
import moment from 'moment';
const store = useStore();
const router = useRouter();
const props = defineProps({
  detail: {
    type: Object,
    default: function(){
      return null;
    }
  },
  total: [String, Number],
  quantity: [String, Number],
})
const emits = defineEmits(['close-modal']);
const name = ref('');
const phoneNumber = ref('');
const message = ref(null);
const startDate = ref(moment().format("YYYY-MM-DD"));
const showModalSuccess = ref(false);
const toggleCloseModal = () => emits('close-modal');

const check = async () => {
  let result = confirm('Xác nhận đăng kí gói tập?');
  if(result){
    await axios({
      method: 'POST',
      url: ticket.CHECK_EXISTS_TICKET,
      headers: { Authorization: store.state.token, Accept: "application/json" },
      data:{
        type_id: props.detail.id,
        name: name.value,
        phone_number: phoneNumber.value,
        quantity: props.quantity,
        cost: props.total,
        registration_date: startDate.value,
      }
    }).then( res =>{
      console.log(res);
      if(res.status == 201){
        swal(res.data.message , {
        buttons: {
          redirect: {
            text: "Gia hạn/Nâng cấp",
            value: "redirect",
            className: "swal-warning"
          },
          continue: {
            text: "Tiếp tục",
            value: "continue",
            className: "swal-danger"
          },
        },
        closeOnClickOutside: false,
      })
      .then((value) => {
        switch (value) {
          case "continue":
            register();
            break;
          case "redirect":
            router.push({name: 'user-my-ticket'});
            break;
            
          default:
            emits('close-modal');
        }
      });
      }else{
        register();
      }
      
      // showModalSuccess.value = true;
      // message.value = res.data;
    }).catch(err =>{
      console.log(err);
    })
  }
}

const register = async () => {
    await axios({
      method: 'POST',
      url: ticket.CRUD,
      headers: { Authorization: store.state.token, Accept: "application/json" },
      data:{
        type_id: props.detail.id,
        name: name.value,
        phone_number: phoneNumber.value,
        quantity: props.quantity,
        cost: props.total,
        registration_date: startDate.value,
      }
    }).then( res =>{
      console.log(res.data);
      showModalSuccess.value = true;
      message.value = res.data;
    }).catch(err =>{
      console.log(err);
    })
  }

</script>
<style>
  .swal-danger{
    background-color: rgb(245, 9, 9);
  }
  .swal-warning{
    background-color: rgb(255, 251, 0);
    color: #000;
  }
</style>