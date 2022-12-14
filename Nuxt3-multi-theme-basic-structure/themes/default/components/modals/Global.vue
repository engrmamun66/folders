<template>
  <!-- Vertically centered modal -->
    <div    
        class="modal fade "
        :class="{ show: show }"
        :style="show ? 'display: block' : 'display: none'"
    >
        <div class="modal-dialog  modal-dialog-scrollable" :class="[top ? '' : 'modal-dialog-centered']">
            <div @click="$event.stopPropagation()" class="modal-content">
                    <div class="modal-header">
                        <slot name="header" />
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <slot name="body" />
                    </div>
                    <div class="modal-footer">
                        <slot name="footer" />
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
    top:{
        default: false,
        type: Boolean,
        required: true
    },
})
let commonState = useCommonState()

</script>

<style scoped>
.modal {
    background-color: rgb(0 0 0 / 59%);
}
.modal.show .modal-content{
    animation: mymove 0.3s;
}
@keyframes mymove {
  from {top: -100px; opacity: 0; scale: 0.5;}
  to {top: 0px; opacity: 1; scale: 1}
}
</style>