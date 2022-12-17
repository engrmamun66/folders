<template>
  <div class="section-title leap-admin-subheader">
    <div class="d-flex align-items-center">
      <div class="mr-auto">
        <h3
          class="
            leap-admin-subheader__title leap-admin-subheader__title--separator
            border-0
          "
        >
          Report page
        </h3>
      </div>
    </div>
  </div>
  
  <button @click="isShow=true" class="btn btn-success me-2">
    Confirm Modal
  </button>

   <button @click="isGlobalShow=true" class="btn btn-success me-2">
    Global Modal
  </button>

  <ModalsConfirm @click="isShow=!isShow" :show="isShow" :top="false">
    <template v-slot:header>
         <h6 class="modal-title" id="exampleModalCenterTitle"> Confirm First </h6>
          <button @click="toggleConfirmModal()" type="button" class="btn-close" aria-label="Close"><i class="la la-close"></i></button>
    </template>
    <template v-slot:yesno>
      <button @click="toggleConfirmModal(); companyMethods().companyList()" type="button" class="btn btn-success px-4 me-2">Yes</button>
      <button @click="toggleConfirmModal()" type="button" class="btn btn-danger px-4">No</button>
    </template>
  </ModalsConfirm>

  <ModalsGlobal @click="isGlobalShow=!isGlobalShow" :show="isGlobalShow" :top="false" >
    <template v-slot:header>
         <h6 class="modal-title" id="exampleModalCenterTitle"> My global modal title </h6>
          <button @click="toggleGlobalModal();" type="button" class="btn-close" aria-label="Close"><i class="la la-close"></i></button>
    </template>
    <template v-slot:body>
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
    </template>
    <template v-slot:footer>
            <button @click="toggleGlobalModal();" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button  @click="toggleGlobalModal();" type="button" class="btn btn-primary">Understood</button>
    </template>
  </ModalsGlobal>
 
</template>

<script setup>
console.log(useAuthState())
definePageMeta({
  middleware: ["auth"],
});

let isShow = ref(false);
let isGlobalShow = ref(false);
function toggleConfirmModal() {
  isShow.value = ! isShow.value;
}
function toggleGlobalModal() {
  isGlobalShow.value = ! isGlobalShow.value;
}
function randomBetweenInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// throw createError({statusCode: 303, statusMessage: 'Something is wrong', message: 'Just Message'})

</script>