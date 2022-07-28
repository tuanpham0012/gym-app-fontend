<template>
  <div>
    <modal title="Đổi mật khẩu" @close-modal="toggleCloseModal()">
      <template v-slot:body>
        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Mật khẩu: </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <input
                        type="password"
                        class="form-control"
                        name="password-old"
                        v-model="oldPassword"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"
                      >Mật khẩu mới:
                    </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        v-model="password"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"
                      >Xác nhận mật khẩu:
                    </label>
                    <div class="col-sm-9 d-flex align-items-center">
                      <input
                        type="password"
                        class="form-control"
                        name="password_confirmation"
                        v-model="password_confirmation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-sm btn-success" @click="changePassword()">
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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Modal from "../../../components/Modal.vue";
import { user } from "../../../config";
import axios from "axios";

const emits = defineEmits(["close", "update"]);

const store = useStore();
const router = useRouter();

const oldPassword = ref("");
const password = ref("");
const password_confirmation = ref("");

const toggleCloseModal = () => emits("close");

const changePassword = async () => {
  let result = confirm("Xác nhận đổi mật khẩu");
  if (result) {
    await axios({
      url: user.USER_CHANGE_PASSWORD,
      method: "POST",
      headers: { Authorization: store.state.token, Accept: "application/json" },
      data: {
        oldPassword: oldPassword.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      },
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        store.commit("setToken", null);
        store.commit("setUserInfo", null);
        router.push({
          name: "login-user",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
<style scoped></style>
