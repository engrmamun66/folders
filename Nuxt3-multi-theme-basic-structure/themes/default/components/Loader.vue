<template>
    <div class="loader_container">
      <span class="loader"></span>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* Absolute Center Spinner */
.loader_container {
  position: fixed;
  z-index: 999;  
  overflow: show;
  margin: auto;
  width:2rem;
  height:2rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.loader_container:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20,.8);
}
.loader {
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  /**width: 145px;*/
  /**height: 145px;*/
  color: #fff;
  color: var(--fontcolor-primary);
}
@media screen and (min-width: 701px){
  .loader{
    margin-left:-100px;margin-top:-5rem;
    width:145px;
    height:145px;
  }
}
@media screen and (max-width: 700px){
  .loader{
    margin-left:-30px;margin-top:-4rem;
    width:100px;
    height:100px;
  }
}
  .loader:before,
  .loader:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  .loader:after {
    color: var(--fontcolor-primary);
    color: #FF3D00;
    transform: rotateY(70deg);
    animation-delay: .4s;
  }

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@keyframes rotateccw {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes spin {
  0%,
  100% {
    box-shadow: .7em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: .7em .7em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 .7em 0 0px currentcolor;
  }
  37% {
    box-shadow: -.7em .7em 0 0 currentcolor;
  }
  50% {
    box-shadow: -.7em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -.7em -.7em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -.7em 0 0 currentcolor;
  }
  87% {
    box-shadow: .7em -.7em 0 0 currentcolor;
  }
}
   
</style>