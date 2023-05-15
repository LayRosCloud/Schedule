<template>
  <div @click="hide()" v-if="displayButton && $props.isVisible" class="side-closer"></div>
    <aside :class="$props.isVisible ? 'show': ''">
      <h1 class="menu">меню</h1>
    </aside>
</template>

<script>
export default {
  mounted() {
    this.displayButton = window.innerWidth < 768;
  },
  data(){
    return{
      displayButton: false,
      isClosed: false
    }
  },
  props:{
    isVisible: {
      type: Boolean,
      required: true,
    }
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods:{
    myEventHandler(e) {
      this.displayButton = window.innerWidth < 768;
      if(window.innerWidth <= 768 && !this.isClosed){
        this.$emit('hide', false)
        this.isClosed = true;
      }
      else if(window.innerWidth > 768){
        this.isClosed = false;
      }
    },
    hide(){
      this.$emit('hide', false)
    }
  }
}
</script>

<style scoped>
  aside{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 0;
    overflow: hidden;
    background: #004f39;
    color: #131313;
    transition: 0.2s ease-out;
  }
  .menu{
    text-align: center;
    font-size: 48px;
    color: #d3d3d3;
    margin: 0;
  }
  .menu::after{
    content: '';
    display: block;
    padding-top: 3px;
    opacity: 0.8;
    background: #d3d3d3;
    margin-right: 10px;
    margin-left: 10px;
    height: 1px;
    border-radius: 10px;
  }
  .show{
    width: 40vh;
  }
  @media (max-width: 768px) {
    aside{
      position: absolute;
    }
  }
  .side-closer{
    background: black;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.3;
  }
  .menu{
    text-transform: uppercase;
  }
</style>