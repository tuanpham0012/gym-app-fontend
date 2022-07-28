<template lang="">
  <div class="d-flex justify-content-center m-3" v-if="comments == null && comments_count > 0 ">
    <div class="spinner-border text-info" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div v-if="comments" class="note" v-for="(comment, index) in comments" :key="index">
      <img :src="imageLink(comment.user.avatar)" alt="" />
      <div class="note-card">
        <div class="note-title">
          <p class="note-name">{{ comment.user.name }}</p>
          <span class="note-time">{{ countDownTime(comment.created_at) }}</span>
        </div>
        <div class="note-content">
          <div v-html="comment.comment"></div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)" class="ms-4 mb-3" v-if="listComment && total <= listComment.length" @click="viewMoreComment()">Xem thêm bình luận</a>
  </div>
  
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { countDownTime, imageLink } from "../helper";
import { posts } from "../config";

const props = defineProps({
  post_id: {
    type: [String, Number],
  },
  comments_count: {
    type: Number,
  },
  update:{
    type: Boolean,
  }
});
const emits = defineEmits(['loadSuccess'])
const store = useStore();
const listComment = ref(null);
const comments = ref(null);
const total = ref(10);

const viewMoreComment = () =>{
  total.value = total.value + 5;
  console.log(total.value);
}

watch(() => props.update, (newValue, oldValue) => {
      if(newValue){
        getComments();
      }
    });

watch(listComment, () => {
  comments.value = listComment.value.slice(0, total.value);
})
watch(total, () => {
  comments.value = listComment.value.slice(0, total.value);
})
const getComments = async () => {
  await axios({
    method: "GET",
    url: posts.POST_COMMENTS + props.post_id,
    headers: { Authorization: store.state.token, Accept: "application/json" },
  })
    .then((res) => {
      listComment.value = res.data;
      emits('loadSuccess');
    })
    .catch((err) => {
      console.log(err);
      z
    });
};

onBeforeMount(async () => {
  if (props.post_id) {
    await getComments();
  }
  Echo.channel('th_gym_fitness_database_newcomment')
    .listen('UpdateCommentPosted', (data) => {
        console.log(data);
        if(data.post_id == props.post_id){
          console.log(data.post_id);
          getComments();
        }
    })
});
</script>
<style lang=""></style>
