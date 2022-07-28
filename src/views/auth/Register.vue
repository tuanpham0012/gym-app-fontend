<template lang="">
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div
            class="col-lg-6 d-flex align-items-center justify-content-center"
          >
            <div class="auth-form-transparent text-left p-3">
              <div class="brand-logo">
                <img src="../../images/logo-dark.svg" alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">
                Join us today! It takes only few steps
              </h6>
              <form class="pt-3">
                <div class="form-group">
                  <label>Tên tài khoản</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control form-control-lg border-left-0"
                      v-model="account.username"
                      placeholder="Tên tài khoản"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Họ Tên</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i
                          class="mdi mdi-account-card-details text-primary"
                        ></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control form-control-lg border-left-0"
                      id="name"
                      v-model="account.name"
                      placeholder="Họ tên"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="mdi mdi-email-outline text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      class="form-control form-control-lg border-left-0"
                      id="email"
                      v-model="account.email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="password">Mật khẩu</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="mdi mdi-lock-outline text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      class="form-control form-control-lg border-left-0"
                      id="password"
                      v-model="account.password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Nhập lại mật khẩu</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span
                        class="input-group-text bg-transparent border-right-0"
                      >
                        <i class="mdi mdi-lock-outline text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      class="form-control form-control-lg border-left-0"
                      id="confirmPassword"
                      v-model="account.confirmPassword"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input
                        type="checkbox"
                        class="form-check-input text-danger" />Tôi đồng ý với
                      tất cả các Điều khoản &amp; Điều kiện<i
                        class="input-helper"
                      ></i
                    ></label>
                  </div>
                </div>
                <div class="mt-3">
                  <button
                    class="btn btn-block btn-primary btn-lg font-weight-medium"
                    @click="register()"
                    type="button"
                  >
                    ĐĂNG KÍ
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Đã có tài khoản?
                  <router-link :to="{ name: 'login-user' }" class="text-primary"
                    >Đăng nhập</router-link
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 register-half-bg d-flex flex-row">
            <p
              class="text-white font-weight-medium text-center flex-grow align-self-end"
            >
              Copyright &copy; 2020 All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<script>
import { auth } from "../../config";
export default {
  data() {
    return {
      account: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async register() {
      await this.axios({
        method: "post",
        url: auth.USER_REGISTER,
        data: this.account,
      })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          const token = res.data.token_type + " " + res.data.token;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", 1);
          this.$store.commit("setToken", token);
          this.$store.commit("setUserInfo", res.data.user);
          this.$router.push({ name: "user-home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped></style>
