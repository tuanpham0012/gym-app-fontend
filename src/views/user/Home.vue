<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <CreatePostModal v-if="showModalCreate" @update="refreshPosts" @close="showModalCreate = false" />
      <div class="row mt-3">
        <div class="col-xl-3 d-none flex-column d-xl-flex grid-margin stretch-card">
          <div class="row">
            <div class="col-sm-12 profile grid-margin stretch-card">
              <div class="card">
                <div class="card-body" v-if="detail">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img :src="imageLink(detail.avatar)" alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>{{ detail.name }}</h4>
                      <p class="text-secondary fs-6 fw-bold mb-1">
                        {{ detail.position_name }}
                      </p>
                      <div class="d-flex gap-3 mt-3">
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Lượt thích</span>
                        </div>
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Bài viết</span>
                        </div>
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Theo dõi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 top-hastag d-flex stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Top Chuyên mục</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- POSTS ARTICLE -->
        <div class="col-xl-6 col-lg-9 d-flex grid-margin stretch-card posts" ref="scrollComponent">
          <div class="row gap-2">
            <div class="card card-posts create-post">
              <div class="card-body">
                <div class="ip-post">
                  <img :src="imageLink(detail.avatar)" alt="Admin" class="rounded-circle-small" />
                  <button type="button" @click="showModalCreate = true">Chia sẻ trải nghiệm của bạn với chúng
                    tôi!</button>
                </div>
                <hr />
                <div class="d-flex text-danger align-content-center gap-4 ps-3 pe-3 fs-4 create-post-action">
                  <i class="icon-camera"></i>
                  <i class="icon-video"></i>
                </div>
              </div>
            </div>
            <div v-if="listPost.length > 0">
              <div class="article" v-for="(article, index) in listPost" :key="index">
                <PostVue :article="article"> </PostVue>
              </div>
              <div class="d-flex justify-content-center" v-if="current_page != page_size">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div v-else class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 d-none d-md-flex d-xl-none flex-column grid-margin stretch-card">
          <div class="row">
            <div class="col-sm-12 profile grid-margin stretch-card">
              <div class="card">
                <div class="card-body" v-if="detail">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img :src="imageLink(detail.avatar)" alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>{{ detail.name }}</h4>
                      <p class="text-secondary fs-6 fw-bold mb-1">
                        {{ detail.position_name }}
                      </p>
                      <div class="d-flex gap-3 mt-3">
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Lượt thích</span>
                        </div>
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Bài viết</span>
                        </div>
                        <div class="d-flex flex-column">
                          <h5>500</h5>
                          <span>Theo dõi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 top-hastag d-flex stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Top Chuyên mục</h4>
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
import { ref, computed, watch, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { imageLink } from "../../helper";
import PostVue from "../../components/Post.vue";
import CreatePostModal from "../../components/CreatePostModal.vue";

const store = useStore();
const detail = computed(() => store.state.userInfo ?? null);
const posts = computed(() => store.state.posts ?? null);
const listPost = ref([]);
const showModalCreate = ref(false);
const loading = ref(false);

const current_page = ref(1);
const page_size = ref(1);

watch(posts, () => {
  listPost.value.push(...posts.value.data);
  page_size.value = posts.value.last_page;
  loading.value = false;
})

watch(current_page, () => {
  if (current_page.value != 1)
    getData();
})
const scrollComponent = ref(null);

const handleScroll = () => {
  if (
    window.scrollY + window.innerHeight >=
    document.body.scrollHeight - 50
  ) {
    if (current_page.value == page_size.value || loading.value == true) return;
    loading.value = true;
    current_page.value = current_page.value + 1;
  }
}
const refreshPosts = () => {
  current_page.value = 1;
  listPost.value = [];
  getData();
}

const getData = () => {
  store.dispatch('getPosts', { token: store.state.token, page: current_page.value })
}

onBeforeMount(() => {
  getData();
  //  Echo.channel('chatroom')
  //   .listen('NotificationPosted', (data) => {
  //       let message = data.message;
  //       console.log(data);
  //   })
})

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})



// const handleScroll = (e) => {
//   let element = scrollComponent.value
//   if (element.getBoundingClientRect().bottom < window.innerHeight) {
//     console.log('ava');
//   }
// }
</script>
<style scoped>
.profile {
  height: fit-content;
}

.top-hastag {
  height: fit-content;
}
.card{
  width: 100%;
  max-width: 38rem;
  margin: 0 auto;
}
.rounded-circle {
  width: 10rem;
  height: 10rem;
  object-fit: cover;
}

.rounded-circle-small {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 100%;
  padding: 0;
}

.create-post {
  box-shadow: 2px 2px 4px rgb(204, 204, 204);
  height: fit-content;
  border-radius: 10px;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
}

.create-post-action i {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  text-align: center;
  line-height: 2.5rem;
}

.create-post-action i:hover {
  cursor: pointer;
  background-color: rgb(241, 241, 241);
}

.ip-post {
  display: flex;
  justify-content: space-between;
}

.ip-post button {
  width: 100%;
  border: 0;
  margin: 0 0.5rem;
  border-radius: 1.7rem;
  background-color: rgb(237, 241, 245);
  text-align: left;
  padding: 0 0.5rem;
  color: rgb(95, 95, 95);
  font-weight: 450;
}

.ip-post button:hover {
  background-color: rgb(225, 231, 238);
}

.content-wrapper {
  padding-top: 12px;
}

/* .posts{
  height: 90vh;
  overflow: auto;
} */
</style>
