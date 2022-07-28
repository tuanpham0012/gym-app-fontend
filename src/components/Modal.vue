<template lang="">
  <div
    class="modal fade show"
    tabindex="-1"
    aria-modal="true"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" 
        :class="{ 'modal-xl' : props.size == 'large',
                  'modal-lg' : props.size == 'medium',
                  'modal-sm' : props.size == 'small',}">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">
            {{ props.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close()"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  size: String,
  title: String,
});


const emit = defineEmits(["close-modal"]);

function close() {
  emit("close-modal");
}

</script>
<style scoped>
.modal{
    background-color: #6c757db2!important;
    display: block;
}
</style>
