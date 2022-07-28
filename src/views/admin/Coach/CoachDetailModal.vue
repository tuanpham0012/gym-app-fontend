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
                Ca làm: <span>{{ coach.timeline }}</span>
              </p>
            </div>
            <div class="col-md-12">
              <p class="fs-6">
                Giới thiệu: <span>{{ coach.introduction }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-sm btn-success"
        @click="toggleUpdate(coach.id)"
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

const toggleCloseModal = () => emits("close");
const toggleUpdate = () => emits("update", coach.value.id);

const getDetail = () =>
  store.dispatch("getCoach", {
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
