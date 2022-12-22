<template>
  <!-- USECASE :: <image-preview v-if="commonState.showImagePreviewer" :imageUrls="imageUrls" :index="index" /> -->
  <teleport v-if="commonState.showImagePreviewer" to="body">
    <div class="image-previewer">
      <div style="display:none">
        <img v-for="(url, i) in imageUrls" :key="i" :src="url" alt="">
      </div>
      <div
        @click="commonState.showImagePreviewer = false"
        class="image-container"
      >
        <img
          ref="_img"
          @click="$event.stopPropagation()"
          @touchstart="slideImageByTouch($event)"
          @touchmove="slideImageByTouch($event)"
          @touchend="slideImageByTouch($event)"
          :src="url"
          :class="{
            [getChangingClass]: changingImage,
            [getChangedClass]: changedImage,
          }"
          alt=""
          :style="'scale:' + scale + ';' + (movingTouch ? getMovingStyles : '')"
        />
        <p class="text-white-50" style="padding-bottom: 5rem !important;text-align:left;"> {{ url ? decodeURI(url).split('/').at(-1) : '' }} </p>
      </div>
      <div v-if="imageUrls.length > 1" class="prev-next-area">
        <span
          class="btn-prev-next btn-prev"
          @click="prev($event)"
          :style="count > 0 ? 'opacity:1' : 'opacity:0.2;'"
        >
          <i class="las la-angle-left"></i>
        </span>
        <span
          class="btn-prev-next btn-next"
          @click="next($event)"
          :style="imageUrls.length - 1 > count ? 'opacity:1' : 'opacity:0.2'"
        >
          <i class="las la-angle-right"></i>
        </span>
      </div>
    </div>
  </teleport>
</template>

<script setup>
let props = defineProps({ imageUrls: Array, index:{type:Number, default: 0} });
let commonState = useCommonState("common");

let count = ref(0);
let scale = ref(1);

let url = computed(() => {
  if (count.value > -1 && count.value <= props.imageUrls.length - 1) {
    return props.imageUrls[count.value];
  }
});

let changingImage = ref(false);
let changedImage = ref(true);
let movingTouch = ref(false);

let getChangingClass = ref('changing-image')
let getChangedClass = ref('changed-image')
let getMovingStyles = ref('touch-moving')

function next(event = false) {
  if (event) event.stopPropagation();
  if (count.value <= props.imageUrls.length - 2) {
    getChangingClass.value = 'changing-image-next'
    getChangedClass.value = 'changed-image-next'
    changingImage.value = true;
    changedImage.value = false;
    setTimeout(() => {
      count.value++;
      changingImage.value = false;
      changedImage.value = true;
    }, 200);
  }
}
function prev(event = false) {
  if (event) event.stopPropagation();
  if (count.value > 0) {
    getChangingClass.value = 'changing-image-prev'
    getChangedClass.value = 'changed-image-prev'
    changingImage.value = true;
    changedImage.value = false;
    setTimeout(() => {
      count.value--;
      changingImage.value = false;
      changedImage.value = true;
    }, 200);
  }
}
onMounted(() => {
  let imgPrev = document.querySelector(".image-previewer");
  document.removeEventListener("keydown", imgPrev);
  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowLeft") prev();
    if (event.code == "ArrowRight") next();
    if (event.code == "NumpadAdd" || event.code == "Equal") scale.value += 0.2;
    if (event.code == "NumpadSubtract" || event.code == "Minus")
      scale.value > 0.4 ? (scale.value -= 0.2) : "";
    if (event.code == "Numpad0" || event.code == "Digit0") scale.value = 1;
  });
});
const clientX_start = ref(0)
const clientX_end = ref(0)
const translateX = ref(0)
function slideImageByTouch(event) {
    if (event.type == 'touchstart')
      clientX_start.value = event.changedTouches[0].clientX

    if (event.type == 'touchend') {
      movingTouch.value = false
      getMovingStyles.value = 'opacity:1;translateX(0px)'
      translateX.value = 0

      clientX_end.value = event.changedTouches[0].clientX
        let movedPixel = clientX_end.value - clientX_start.value
        if (clientX_end.value > clientX_start.value && movedPixel >= 50) prev()
        else if (clientX_end.value < clientX_start.value && movedPixel <= 50) next()
    }
    if (event.type == 'touchmove'){
      movingTouch.value = true
      let currentX = event.changedTouches[0].clientX
      let opacity = '0.5'
      let step = 5
      // For Next
      if(clientX_start.value < currentX){
        translateX.value += step 
        getMovingStyles.value = `opacity:${opacity};transform: translateX(${translateX.value}px);`
      }
      // For Prev
      if(clientX_start.value > currentX){
        translateX.value -= step
        getMovingStyles.value = `opacity:${opacity};transform: translateX(${translateX.value}px);`
      } 
    }
}


count.value = props.index
</script>

<style scoped>
.image-previewer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.664);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(5);
  z-index: 99;
}
.image-previewer .prev-next-area {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.image-previewer .prev-next-area .btn-prev-next {
  display: flex;
  background-color: #00eb441a;
  align-items: center;
}
.image-previewer .prev-next-area .btn-prev {
  justify-content: flex-start;
  border-left: none;
  pointer-events: all;
}
.image-previewer .prev-next-area .btn-next {
  justify-content: flex-end;
  border-right: none;
  pointer-events: all;
}

.image-previewer .prev-next-area i {
  font-size: 3rem;
  cursor: pointer;
  padding: 55px 40px;
  color: var(--fontcolor-primary);
}
.image-previewer .image-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center
}
.image-previewer img {
  object-fit: contain;
  margin: auto;
}
/* -------------------------------------------------------------------------- */
/*                                Desktop size                                */
/* -------------------------------------------------------------------------- */
@media only screen and (min-width: 701px) {
  .image-previewer img {
    height: 300px;
    width: auto;
  }
}
/* -------------------------------------------------------------------------- */
/*                                 Mobile Size                                */
/* -------------------------------------------------------------------------- */
@media only screen and (max-width: 700px) {
  .image-previewer img {
    width: calc(100% - 40px);
    height: auto;
  }
  .image-previewer .prev-next-area {
    align-items: flex-end;
  }
  .image-previewer .prev-next-area .btn-prev-next {
    width: 50%;
    padding: 20px;
  }
  .image-previewer .prev-next-area .btn-prev-next:first-child{
    width: 50%;
    padding: 20px;
    border-right: 1px solid black !important;
  }
  .image-previewer .prev-next-area .btn-prev-next i {
    text-align: center;
    font-size: 2rem;
    color: white;
    padding: 0;
  }
}
/* -------------------------------------------------------------------------- */
/*                              Animation For Next                             */
/* -------------------------------------------------------------------------- */
.changing-image-next {
  display: block;
  opacity: 0;
  animation-name: changing-image-next;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}
@keyframes changing-image-next {
  from {
    opacity: 1;
    transform: translateX(0rem);
  }
  to {
    opacity: 0;
    transform: translateX(-25rem);
  }
}
.changed-image-next {
  display: block;
  animation-name: changed-image-next;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}
@keyframes changed-image-next {
  from {
    opacity: 1;
    transform: translateX(25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0rem);
  }
}
/* -------------------------------------------------------------------------- */
/*                              Animation For Prev                             */
/* -------------------------------------------------------------------------- */
.changing-image-prev {
  display: block;
  opacity: 0;
  animation-name: changing-image-prev;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}
@keyframes changing-image-prev {
  from {
    opacity: 1;
    transform: translateX(0rem);
  }
  to {
    opacity: 0;
    transform: translateX(25rem);
  }
}
.changed-image-prev {
  display: block;
  animation-name: changed-image-prev;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}
@keyframes changed-image-prev {
  from {
    opacity: 1;
    transform: translateX(-25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0rem);
  }
}
</style>