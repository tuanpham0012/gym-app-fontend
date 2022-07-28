<template lang="">
  <modal-vue
    size="medium"
    title="Thông tin huấn luyện viên"
    v-if="coach"
    @close-modal="toggleCloseModal()"
  >
    <template v-slot:body>
      <div class="container h-100">
        <div class="col-12 row">
          <div class="col-lg-4 col-md-12 col-sm-12 me-2 img-avatar">
            <img :src="imageLink(coach.avatar)" />
          </div>
          <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="col-md-12">
              <div class="form-group row">
                <div class="col-sm-8 d-flex">
                  <h3 class="box-title mt-5">{{ coach.user.name }}</h3>
                </div>
              </div>
            </div>
            <div class="col-md-12 mb-4">
              <h6>{{ coach.coach_level.level }}</h6>
            </div>
            <div class="col-md-12 mb-4">
              <p class="fs-6">
                Kinh nghiệm: <span>{{ coach.experience }}</span>
              </p>
            </div>
            <div class="col-md-12">
              <p class="fs-6">
                Tính cách: <span>{{ coach.character }}</span>
              </p>
            </div>
            <div class="col-md-12">
              <p class="fs-6">
                Thời gian làm việc: <span>{{ coach.timeline }}</span>
              </p>
            </div>
            <div class="col-md-12">
              <p class="fs-6">
                Giới thiệu: <div class="m-1 p-1" v-html="coach.introduction"></div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-sm btn-warning"
        @click="showModalRegister = true"
      >
        Liên hệ tập thử miễn phí
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


<!-- Modal Đăng kí tập thử miễn phí -->

    <modal-vue
      title="Đăng kí tập thử miễn phí"
      @close-modal="showModalRegister = false"
      v-if="showModalRegister"
    >
      <template v-slot:body>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-12 col-form-label">Tên của bạn <span style="color: #e85c41;font-size: 150%;font-weight: normal;position: relative;top: 5px;">*</span>: </label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                v-model="info.name" />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-12 col-form-label">Email <span style="color: #e85c41;font-size: 150%;font-weight: normal;position: relative;top: 5px;">*</span>: </label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                v-model="info.email" />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-12 col-form-label">Số điện thoại <span style="color: #e85c41;font-size: 150%;font-weight: normal;position: relative;top: 5px;">*</span>: </label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                v-model="info.phone" />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group row">
            <label class="col-sm-12 col-form-label">Hãy cho chúng tôi biết về nhu cầu của bạn: </label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                v-model="info.demand" />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-sm btn-danger"
          @click="register()"
        >
          Đăng kí
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="showModalRegister = false"
        >
          Hủy
        </button>
      </template>
    </modal-vue>


</template>
<script setup>
import ModalVue from "../../../components/Modal.vue";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { formatDate, imageLink } from "../../../helper";
const props = defineProps({
  coach_id: {
    type: [String, Number],
  },
});
const emits = defineEmits(["close", "update"]);

const store = useStore();
const coach = computed(() => store.state.coach ?? null);
const showModalRegister = ref(false);
const info = ref({
    name: '',
    email: '',
    phone: '',
    demand: ''
})

const toggleCloseModal = () => emits("close");
const toggleUpdate = () => emits("update", coach.value.id);

const register = () => {
    if( info.value.name === '' ||  info.value.email === '' || info.value.phone === ''){
        alert('Vui lòng cung cấp đủ thông tin!!');
        return;
    }
    swal({
        title: "Đăng kí thành công!",
        text: "Yêu cầu của bạn đã được gửi, chúng tôi sẽ liên hệ với bạn sớm nhất qua email hoặc số điện thoại!!",
        icon: "success",
        button: "Xác nhận!",
    });
}

const getDetail = () =>
  store.dispatch("getUserCoach", {
    token: store.state.token,
    coach_id: props.coach_id,
  });

onBeforeMount(async () => {
  await getDetail();
});
</script>
<style scoped>
.img-avatar {
  padding: 3rem 0;
}
.img-avatar img {
  width: 100%;
  max-width: 20rem;
  object-fit: cover;
}
</style>
