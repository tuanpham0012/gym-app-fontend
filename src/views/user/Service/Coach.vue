<template lang="">
<coach-detail-modal
        :coach_id="coach_id"
        v-if="showDetail"
        @close="showDetail = false"
      />
  <div class="container">
    <div class="wpb_wrapper">
      <div class="vc_row wpb_row vc_inner vc_row-fluid">
        <div class="wpb_column vc_column_container vc_col-sm-5">
          <div class="vc_column-inner">
            <div class="wpb_wrapper">
              <div class="wpb_wrapper col-7 mb-4 mt-3">
                <h2 style="font-size: 36px">
                  Đội ngũ giàu kinh nghiệm với nền tảng kiến thức vững chãi
                </h2>
              </div>
              <span class="vc_sep_holder vc_sep_holder_l"
                ><span
                  style="
                    border-top: 3px solid;
                    display: block;
                    width: 9rem;
                    margin: 1rem;
                    border-color: #fecc09;
                  "
                  class="vc_sep_line"
                ></span
              ></span>
              <div class="col-12 row align-items-center coach-image">
                <div class="col-7">
                  <p style="text-align: justify; color: grey; font-size: 1rem">
                    Đội ngũ Coach của Swequity không chỉ là người làm dịch vụ,
                    họ còn là người anh em, người đồng đội, người thầy, người
                    huấn luyện của riêng bạn. Họ vừa thúc đẩy bạn vượt qua mọi
                    ranh giới, giới hạn của bản thân, vừa là chỗ dựa tinh thần
                    khi bạn cảm thấy mỏi mệt, muốn từ bỏ.
                  </p>
                  <p style="text-align: justify; color: grey; font-size: 1rem">
                    Chúng tôi kinh doanh dựa trên nền tảng tri thức, nên mỗi
                    người coach đều có bề dày kiến thức và kinh nghiệm. Không
                    chỉ hiểu biết sâu rộng về lĩnh vực sức khỏe, dinh dưỡng và
                    giải phẫu học về cơ và chuyển động của cơ thể người; họ còn
                    là những người đồng hành đầy trách nhiệm và năng lượng để
                    thúc đẩy hội viên vươn tới những giới hạn mới.
                  </p>
                  <p style="text-align: justify; color: grey; font-size: 1rem">
                    Hiểu được nhu cầu và thể trạng mỗi người một khác, không có
                    chương trình tập luyện nào phù hợp cho tất cả. Vì thế với
                    từng khách hàng, các coach đều có quá trình tìm hiểu, nghiên
                    cứu, phân tích tình trạng cơ thể một cách kỹ lưỡng, và thiết
                    kế ra chương trình tập luyện phù hợp dành riêng cho họ.
                  </p>
                </div>
                <!-- <div class="col-6">
                  <img
                    class="w-100"
                    src="https://swequity.vn/wp-content/uploads/2021/04/viber_image_2021-04-05_15-53-16.jpg"
                    alt=""
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vc_row wpb_row vc_inner vc_row-fluid">
        <div class="wpb_wrapper">
          <h2 style="font-size: 36px">
            Phương pháp đào tạo<br />
            Coach tại THF
          </h2>
        </div>
        <span class="vc_sep_holder vc_sep_holder_l"
          ><span
            style="
              border-top: 3px solid;
              display: block;
              width: 9rem;
              margin: 1rem;
              border-color: #fecc09;
            "
            class="vc_sep_line"
          ></span
        ></span>
      </div>
      <div class="col-12 row align-items-center">
        <div class="col-lg-6 col-sm-12">
          <div class="vc_single_image-wrapper vc_box_border_grey">
            <img
              class="w-100"
              src="https://swequity.vn/wp-content/uploads/2022/07/z3593420536027_9e581282bc9ecdb11405e023482d7bc6.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="wpb_wrapper">
            <div
              class="wpb_text_column wpb_content_element wpb_animate_when_almost_visible wpb_bounceInRight bounceInRight box__text__2 wpb_start_animation animated"
            >
              <div class="wpb_wrapper">
                <p style="text-align: justify; color: grey; font-size: 1rem">
                  Đội ngũ coach ở Swequity phải trải qua một chương trình đào
                  tạo 3 tháng bài bản và thực hiện những bài kiểm tra kiến thức
                  ngặt nghèo. Chỉ những người xuất sắc nhất mới được giữ lại và
                  trở thành coach chính thức ở Swequity.
                </p>
                <p style="text-align: justify; color: grey; font-size: 1rem">
                  Phương pháp đào tạo của chúng tôi chú trọng vào kiến thức
                  chuyên môn, kĩ năng sư phạm và kĩ năng tìm hiểu, phân tích,
                  chẩn đoán vấn đề cơ thể, để mỗi người coach đều đủ năng lực
                  thiết kế ra chương trình luyện tập mang lại hiệu quả cho khách
                  hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vc_empty_space" style="height: 50px">
        <span class="vc_empty_space_inner"></span>
      </div>
    </div>
    <div class="">
      <div class="wpb_wrapper">
        <h2 style="font-size: 36px">
          Danh sách<br />
          Coach tại THF
        </h2>
      </div>
      <span class="vc_sep_holder vc_sep_holder_l"
        ><span
          style="
            border-top: 3px solid;
            display: block;
            width: 9rem;
            margin: 1rem;
            border-color: #fecc09;
          "
          class="vc_sep_line"
        ></span
      ></span>
    </div>
    <div class="col-12 row">
      <div
        class="col-lg-12 d-flex justify-content-between flex-wrap"
        v-if="coachs && coachs.length > 0"
      >
        <div
          class="col-lg-4 mb-4"
          v-for="(item, index) in coachs"
          :key="index"
        >
          <div class="d-flex flex-column align-items-center" @click="showModalDetail(item.id)">
            <div class="price-plan">
              <img
                :src="imageLink(item.avatar)"
                class="coach-image-avatar"
                alt=""
              />
            </div>
            <div class="coach-info">
              <span class="coach-name">
                      {{ item.user.name}}
              </span>
              <span class="coach-level">
                      {{ item.coach_level.level}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { imageLink } from "../../../helper";
import CoachDetailModal from "./CoachDetailModal.vue";

const store = useStore();
const coachs = computed(() => store.state.coaches ?? null);
const coach_id = ref(-1);
const showDetail = ref(false);
const showModalDetail = (value) => {
  coach_id.value = value;
  showDetail.value = !showDetail.value;
};

onBeforeMount(async () => {
  await store.dispatch("getUserCoaches", store.state.token);
});
</script>
<style scoped>
.coach-image {
  background-image: url("../../../assets/public/images/coach-image-background.jpg");
  background-repeat: no-repeat, no-repeat;
  background-position: right, left;
  background-size: cover;
  padding: 4rem 0;
}
.coach-image-avatar {
  width: 18.875rem;
  height: 26rem;
  object-fit: cover;
}
.coach-info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.coach-info .coach-name{
  font-size: 1.3rem;
  font-weight: 600;
  font-family: Montserrat;
  color: rgb(0, 0, 0);
}
.coach-info .coach-level{
  font-size: 1rem;
}
</style>
