<template>
  <section v-if="CM.messages.length" class="global-toaster justify-content-end">
    <div class="inner-contents">
      <template v-for="(message, index) in CM.messages" :key="index">
        <p
          class="alert"
          :class="[
            message.type == 'success'
              ? 'alert-success'
              : message.type == 'error'
              ? 'alert-danger'
              : message.type == 'warning'
              ? 'alert-warning'
              : '',
            'animation_' + animation,
          ]"
        >
          <span class="message"> {{ message.message }} </span>
          <button
            @click="Common().closeToaster(index)"
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </p>
      </template>
    </div>
  </section>
</template>

<script setup>
let CM = useCommonState();
defineProps({
  animation: {
    default: "none", // accepts = 'none' | 'left' | 'right'
    required: true,
    type: String,
  },
});
</script>

<style scoped>
.global-toaster {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  padding: 15px;
  pointer-events: none;
}
.global-toaster .inner-contents {
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: right;
  direction: rtl;
}
.global-toaster .inner-contents p {
  pointer-events: all;
  text-align: right;
  width: max-content;
  direction: ltr;
}
.global-toaster .btn-close {
  padding: 0 0 0px 10px;
  width: 20px;
  height: 12px;
}
.btn-close:focus {
  box-shadow: none !important;
}

/* -------------------------------------------------------------------------- */
/*                              Animation classes                             */
/* -------------------------------------------------------------------------- */
.animation_left {
  animation: mymove_left 0.5s ease-in-out;
}
.animation_right {
  animation: mymove_right 0.5s ease-in-out;
}
@keyframes mymove_left {
  from {
    right: 100px;
    opacity: 0;
  }
  to {
    right: 0px;
    opacity: 1;
  }
}
@keyframes mymove_right {
  from {
    right: -100px;
    opacity: 0;
  }
  to {
    right: 0px;
    opacity: 1;
  }
}
</style>