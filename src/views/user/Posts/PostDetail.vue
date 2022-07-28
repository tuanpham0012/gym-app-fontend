<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="card" v-if="article">
        <div class="card-body">
          <div class="post-header">
            <div class="post-header-user">
              <!-- ../assets/public/images/user.jpg -->
              <img
                :src="imageLink(article.user.avatar)"
                alt="Admin"
                class="rounded-circle-small"
              />
              <div class="post-user">
                <span
                  ><span class="name">{{ article.user.name }}</span></span
                >
                <span class="time">{{
                  countDownTime(article.created_at)
                }}</span>
              </div>
            </div>

            <button type="button" class="btn btn-link">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
          </div>
          <div class="post-content">
            <div class="post-text" v-html="article.content"></div>
            <!-- <div class="post-image img-03" :class="{'post-image': article.images.length == 1,
              'img-02': article.images.length == 2,
              'img-03': article.images.length == 3,
              'img-04': article.images.length >= 4,
              }">
            <img v-for="(item, index) in article.images" :src="imageLink(item.url)" :key="index" alt="" />
        </div> -->
            <div
              v-if="article.images.length > 0"
              class="d-flex justify-content-between align-items-center mt-2 mb-2 img-border post-image"
              transition-duration="3s"
              item-selector=".item"
              fit-width="true"
              stamp=".stamp"
            >
              <img
                v-masonry-tile
                v-for="(item, index) in article.images"
                :src="imageLink(item.url)"
                :key="index"
                alt=""
              />
            </div>
          </div>
          <div class="post-react">
            <span class="count"
              ><i class="mdi mdi-thumb-up"></i> {{ article.reacts_count }}</span
            >
            <span class="count" @click="toggleShowComment()"
              ><i class="mdi mdi-comment-multiple-outline"></i>
              {{ article.comments_count }} <span>Bình luận</span></span
            >
          </div>
          <hr />
          <div class="post-action">
            <button
              type="button"
              :class="{ 'text-primary': article.liked }"
              :disabled="sendReact"
              @click="react()"
            >
              <i class="mdi mdi-thumb-up"></i> Like
            </button>
            <button type="button" @click="toggleShowComment()">
              <i class="mdi mdi-comment-multiple-outline"></i> Comment
            </button>
          </div>
          <div class="comments">
            <div class="input-comment">
              <img :src="imageLink(store.state.userInfo.avatar)" alt="" />
              <div class="ip-comment">
                <QuillEditor
                  theme="bubble"
                  v-model:content="comment"
                  placeholder="Viết bình luận..."
                  contentType="text"
                />
              </div>
              <button
                type="button"
                @click="sendComment()"
                :disabled="comment === ''"
                class="btn btn-sm btn-outline-primary ms-2"
              >
                Đăng
              </button>
            </div>
            <post-comment-vue
              :post_id="article.id"
              :comments_count="article.comments_count"
              :update="updateComment"
              @loadSuccess="updateComment = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";
import { countDownTime, imageLink } from "../../../helper";
import { posts } from "../../../config";
import PostCommentVue from "../../../components/PostComment.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

watch( route, () => {
  getArticle();
})

const article = ref(null);
const comment = ref("");
const updateComment = ref(false);
const showComment = ref(false);
const sendReact = ref(false);

const toggleShowComment = () => {
  showComment.value = !showComment.value;
};

const react = async () => {
  sendReact.value = true;
  await axios({
    method: "POST",
    url: posts.POST_REACTS,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      post_id: article.value.id,
    },
  })
    .then((res) => {
      sendReact.value = false;
      console.log(res.data);
      article.value.reacts_count = res.data.react_count;
      article.value.liked = res.data.liked;
    })
    .catch((err) => {
      sendReact.value = false;
      console.log(err);
    });
};

const sendComment = async () => {
  await axios({
    method: "POST",
    url: posts.POST_COMMENTS,
    headers: { Authorization: store.state.token, Accept: "application/json" },
    data: {
      post_id: article.value.id,
      comment: comment.value,
    },
  })
    .then((res) => {
      updateComment.value = true;
      console.log(res.data);
      comment.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeMount(() => {
  // Echo.channel('th_gym_fitness_database_chatroom')
  // .listen('NotificationPosted', (data) => {
  //     let message = data.message
  //     console.log(message);
  // })
});

const getArticle = async () => {
  await axios({
    method: "GET",
    url: posts.CRUD + route.params.id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
  })
    .then((res) => {
      article.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      router.push({
        name: 'user-error',
      })
    });
};

onBeforeMount(async () => {
  if (route.params.id) {
    await getArticle();
  }
});
</script>
<style scoped>
hr {
  margin-bottom: 0;
  margin-top: 0;
}
.card {
  border-radius: 12px;
  height: fit-content;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  width: 36rem;
}
.card-body {
  padding: 0.5rem 0;
}
</style>
