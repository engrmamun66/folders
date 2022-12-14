<template>
  <!-- Vertically centered modal -->
  <div
    class="modal fade "
    :class="{ show: show }"
    :style="show ? 'display: block' : 'display: none'"
  >
    <div class="modal-dialog" :class="[top ? '' : 'modal-dialog-centered']">
      <div @click="$event.stopPropagation()" class="modal-content">
        <div class="modal-header">
        <!-- Slot[header] -->
         <slot name="header" >
            <h6 class="modal-title" id="exampleModalCenterTitle">My title</h6>
            <button type="button" class="btn-close" aria-label="Close"><i class="la la-close"></i></button>
         </slot>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <!-- Slot[yesno] -->
          <slot name="yesno">
            <button type="button" class="btn btn-success px-4 me-2">Yes</button>
            <button type="button" class="btn btn-danger px-4">No</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    default: false,
    type: Boolean,
    required: true,
  },
  top: {
    default: false,
    type: Boolean,
    required: true,
  },
});
let commonState = useCommonState();
</script>

<style scoped>
.modal {
  background-color: rgb(0 0 0 / 59%);
}
.modal-dialog {
  width: 360px;
}
.modal.show .modal-content{
    animation: mymove 0.3s;
}
@keyframes mymove {
  from {top: -100px; opacity: 0; scale: 0.5;}
  to {top: 0px; opacity: 1; scale: 1}
}
</style>