<template>
  <div>
    <div class="section-title leap-admin-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3
            class="leap-admin-subheader__title leap-admin-subheader__title--separator border-0"
          >
            Dashboard
          </h3>
        </div>
      </div>
    </div>

    <image-preview v-if="commonState.showImagePreviewer" :imageUrls="imageUrls" :index="index" />

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="leap-admin-content-wrapper">
          <div class="leap-admin-card">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Url</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(url, i) in imageUrls" :key="i">
                    <th scope="row"> {{ i+1 }} </th>
                    <td>
                        <img 
                          :src="url" 
                          @click="commonState.showImagePreviewer=true;index=i" 
                          alt="" 
                          class="img-fluid"
                          >
                    </td>
                    <td>
                      {{ url }}
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>

</div>
 

</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

let imageUrls = ref([
  'https://media.kitabghor.com/products/696/9578/81r0b1655377224uhlr30n_medium.jpg',
  'https://media.kitabghor.com/products/790/10384/izfnc1656927946gybe0ov_medium.jpg',
  'https://media.kitabghor.com/products/641/9190/cjarc1654269953bh45c3y_medium.jpg',
  'https://media.kitabghor.com/products/18/8463/i13yhphtb1r_1650259951_medium.jpg',
  'https://media.kitabghor.com/products/29/7008/rezq4wr_12bb84n_1574169752.jpg',
  ])

let commonState = useCommonState('common')
let index = ref(0)
</script>