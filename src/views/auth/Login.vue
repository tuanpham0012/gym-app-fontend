<template lang="">
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="auth-form-transparent text-left p-3">
              <div class="m-auto text-center" :class="{ 'hidden' : !loading}">
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
              <div class="brand-logo">
                <img src="../../assets/public/images/Logo.png" alt="logo">
              </div>
              <div class="text-center">
                <h4>Chào mừng trở lại!</h4>
                <h6 class="font-weight-light">Rất vui được gặp lại bạn!</h6>
              </div>
              
              <form class="pt-3">
                <div class="form-group">
                  <label for="username">Tên đăng nhập</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" id="username" v-model="account.username" placeholder="Tên đăng nhập">
                  </div>
                </div>
                <div class="form-group">
                  <label for="password">Mật khẩu</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-lock-outline text-primary"></i>
                      </span>
                    </div>
                    <input type="password" class="form-control form-control-lg border-left-0" id="password" v-model="account.password" placeholder="Mật khẩu">                        
                  </div>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  
                </div>
                <div class="my-3">
                  <button type="button" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" @click="login()">Đăng nhập</button>
                </div>
                <div class="mb-2 d-flex">
                  <button type="button" class="btn btn-info auth-form-btn flex-grow mr-1">
                    <i class="mdi mdi-facebook mr-2"></i>
                    Facebook
                  </button>
                  <button type="button" class="btn btn-danger auth-form-btn flex-grow ml-1">
                    <i class="mdi mdi-google mr-2"></i>
                    Google
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Chưa có tài khoản? <router-link :to="{name:'register-user'}" class="text-primary">Đăng kí ngay</router-link>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 login-half-bg d-flex flex-row">
            <p class="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2020  All rights reserved.</p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<script>
import { auth } from '../../config';
export default {
  data() {
    return {
      account: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    async login(){
      this.loading = true;
      await this.axios({
        method: 'post',
        url: auth.USER_LOGIN,
        headers:{
          'Accept': 'application/json',
        },
        data: this.account,
      }).then( res =>{
        console.log(res.data);
        const token = res.data.token_type + ' ' + res.data.token;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', 1);
        this.$store.commit('setToken', token);
        this.$store.commit('setUserInfo', res.data.user);
        this.$router.push({name:'user-home'})
      }).catch( err => {
        this.loading = false;
        console.log(err);
        alert(err.response.data.message)
      })
    }
  },
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
