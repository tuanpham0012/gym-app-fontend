<template lang="">
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-xl-4 col-lg-5 col-md-6 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="m-auto text-center" :class="{ hidden: !loading }">
                <div class="spinner-grow text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div>
                  <span span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="brand-logo mb-4">
                <img src="../../assets/public/images/Logo.png" />
              </div>
              <h5>Chào mừng trở lại!</h5>
              <form class="pt-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleInputEmail1"
                    v-model="username"
                    placeholder="Username"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    id="exampleInputPassword1"
                    v-model="password"
                    placeholder="Password"
                  />
                </div>
                <div class="mt-3">
                  <button
                    type="button"
                    class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                    @click="login()"
                    :disabled="loading"
                  >
                    SIGN IN
                  </button>
                </div>
                <div
                  class="my-2 d-flex justify-content-between align-items-center"
                >
                  <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input text-danger">Nhớ tài khoản<i class="input-helper"></i></label>
                    </div>
                  <a href="#" class="auth-link text-blue ">Quên mật khẩu?</a>
                </div>
                <div class="mb-2">
                  <button
                    type="button"
                    class="btn btn-block btn-primary auth-form-btn"
                    :disabled="loading"
                  >
                    <i class="mdi mdi-facebook mr-2"></i>Connect using facebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { auth } from "../../config";

const store = useStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false)

const login = async () => {
  loading.value = true;
  await axios({
    method: "POST",
    url: auth.ADMIN_LOGIN,
    headers: {
      Accept: "application/json",
    },
    data: {
      username: username.value,
      password: password.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      const token = res.data.token_type + " " + res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", -999);
      store.commit("setToken", token);
      store.commit("setAdminInfo", res.data.info);
      router.push({ name: "admin-home" });
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
      loading.value = false;
    });
};
</script>
<style scoped>
.hidden{
  opacity: 0;
}
.brand-logo{
  text-align: center;
  margin: 1rem 0;
}
.brand-logo img{
  box-shadow: 4px 4px 8px rgb(95, 95, 95);
  background-color: rgb(0, 16, 235);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
</style>
