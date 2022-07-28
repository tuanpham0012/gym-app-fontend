<template>
  <modal title="Lý do hủy" @close-modal="closeModal()">
    <template v-slot:body>
      <div class="" ref="html">
        <div class="row">
          <div class="col-12 d-flex flex-wrap">
            <div class="col-md-12">
              <span class="col-sm-12 col-form-label"
                  >Người nhận: <span>{{ order.order.receiver }}</span>
                </span>
            </div>
            <div class="col-md-12">
              <span class="col-sm-12 col-form-label"
                  >SDT: <span>{{ order.order.receiver_phone }}</span></span
                >
            </div>
            <div class="col-md-12">
                <span class="col-sm-12 col-form-label"
                  >ĐC nhận: <span>{{ order.order.address }}</span>
                </span>
            </div>
            <div class="col-md-12">
                             <span class="col-sm-12 col-form-label">Tổng: <span>{{ formatMoney(order.order.total) }}</span></span>

            </div>
            <div class="col-md-12">
              <span class="col-sm-12 col-form-label">Ngày đặt: <span>
                    {{ formatDateTime(order.order.created_at) }}
                  </span></span>
            </div>
            <div class="col-md-12">
              <span class="col-sm-12 col-form-label">Ghi chú: <span>{{ order.order.note }}</span></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Thông tin sản phẩm</h4>
                <form class="form-sample">
                  <div
                    class="cart"
                    v-if="order.order_detail && order.order_detail.length > 0"
                  >
                    <div class="table-responsive table-hover tb-cart">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th class="text-center">Tên</th>
                            <th>Giá</th>
                            <th>SL</th>
                            <th>TT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(order, index) in order.order_detail"
                            :key="index"
                            style="border-right: 1px solid black;"
                          >
                            <td style="border-right: 1px solid black;border-collapse: collapse;">{{ index + 1 }}</td>
                            <td style="border-right: 1px solid black;border-collapse: collapse;">{{ order.product.name }}</td>
                            <td style="border-right: 1px solid black;border-collapse: collapse;">{{ formatMoney(order.price) }}</td>
                            <td style="border-right: 1px solid black;border-collapse: collapse;">
                              {{ order.quantity }}
                            </td>
                            <td style="border-right: 1px solid black;border-collapse: collapse;">
                              {{ formatMoney(order.total) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-sm btn-danger"
        @click="printDownload()"
      >
        In
      </button>
      <button
        type="button"
        class="btn btn-sm btn-secondary"
        @click="closeModal()"
      >
        Hủy
      </button>
    </template>
  </modal>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { formatMoney, formatDateTime } from "../../../helper";
import Modal from "../../../components/Modal.vue";
const props = defineProps({
  order: {
    type: Object,
    default: function () {
      return null;
    },
  },
});
const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};

const html = ref(null);

// ref="html"
const printDownload = () => {
  let w = window.open();
  w.document.write(html.value.innerHTML);
  w.document.close();
  w.setTimeout(function () {
    w.print();
  }, 1000);
  // console.log(html.value.innerHTML);
};
</script>
<style lang=""></style>
