<template lang="">
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3">Dịch vụ vé tập</h4>
              <div class="col-lg-12 d-flex justify-content-between flex-wrap" v-if="ticketTypes && ticketTypes.length > 0">
                <div class="col-lg-3 card-ticket" v-for="(item, index) in ticketTypes" :key="index">
                  <div class="single-price-plan">
                    <h4>{{ item.name}}</h4>
                    <div class="price-plan">
                      <span><h2 class="fw-bolder">{{ formatMoney(item.price)}}</h2> /Tháng</span>
                    </div>
                    
                    <p class="text-left p-3 mt-3 mb-5">
                      {{ item.description}}
                    </p>
                    <div class="btn-action">
                      <button type="button" class="btn btn-lg btn-warning fw-bold w-100 m-0" @click="viewDetail(item.id,item.name)">
                      CHI TIẾT
                    </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3">Dịch vụ huấn luyện viên</h4>
              <div class="col-lg-12 d-flex justify-content-between flex-wrap">
                <div class="col-lg-6 coach-image">
                  <img src="https://swequity.vn/wp-content/uploads/2018/03/1-4.png" alt=""/>
                </div>
                <div class="col-lg-6">
                  <p class="m-2 mt-3 fs-5 text-wrap">
                    Khi mua dịch vụ coach ở Swequity, bạn không chỉ mua thời
                    gian của họ, mà bạn còn mua cả kiến thức, kĩ năng, tâm trí,
                    sự quan tâm của coach dành cho bạn. Bạn sẽ có một người
                    coach thiết kế riêng cho bạn lộ trình tập luyện phù hợp
                    nhất, hướng dẫn bạn phương pháp tập đúng, thúc đẩy bạn mỗi
                    khi muốn lùi bước và chịu trách nhiệm trực tiếp cho kết quả
                    tốt lên của bạn.
                  </p>
                  <p class="m-2 mt-3 fs-5 text-wrap">
                    Tuy nhiên, chính vì chất lượng vượt trội nhưng số lượng lại
                    có hạn, nên dịch vụ coach của Swequity thường xuyên ở trong
                    tình trạng “cháy hàng”. Hãy đăng kí ngay để nhận được tư vấn
                    và tìm cho mình người cùng đồng hành trên hành trình biến
                    đổi bản thân!
                  </p>
                  <router-link class="btn btn-lg btn-warning mt-3 m-s-3 fs-5" :to="{name: 'user-coachs'}">
                    Tìm hiểu thêm
                  </router-link>
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
import {ref, computed, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import { formatMoney, slugify } from '../../../helper';

const store = useStore();
const router = useRouter();
const ticketTypes = computed(
  () => store.state.ticketTypes ?? null
)

const viewDetail = (id, name) =>{
  router.push({
    name: 'user-ticket-detail',
    params:{
      id: id,
      slug: slugify(name)
    }
  })
}

onBeforeMount(
  () => store.dispatch('getTicketTypes', store.state.token)
)
</script>
<style scoped>
.card-ticket {
  max-width: 19rem;
  min-width: 16rem;
  border-radius: 4px;
  margin: 0.5rem;
  text-align: center;
  padding: 1.5rem 1rem;
  position: relative;
  color: rgb(255, 255, 255);
  background: rgb(187, 187, 255);
  background: linear-gradient(
    5deg,
    rgba(187, 187, 255, 1) 0%,
    rgba(72, 127, 176, 1) 51%,
    rgba(29, 21, 124, 1) 100%
  );
}
.btn-action{
  position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
.price-plan {
  margin: 2rem 0 2rem;
}
.coach-image{
  padding: 0.5rem;
}
.coach-image img{
  max-width: 100%;
  object-fit: cover;
}
</style>
