<template>
  <div class="main">
    <sidebar @hide="changeVisibility()" :is-visible="this.isVisible"></sidebar>
    <main>
    <header>
      <table>
        <tr>
          <td>
            <button class="burger-btn" @click="show()">
            <div class="burger__block">
              <div class="burger-line"></div>
              <div class="burger-line two"></div>
              <div class="burger-line"></div>
            </div>
          </button>
          </td>
          <td class="td-logo">
            <div class="block__logo">
              <a href="http://khsu.ru/">
                <img src="@/assets/img/logo.png"/>
              </a>
              <router-link to="/" class="logo">расписание</router-link>
            </div>
          </td>
        </tr>
      </table>

    </header>
      <h2>{{this.$route.name}}</h2>

    <router-view></router-view>

    <footer>
      <h2>Подвал</h2>
    </footer>
    </main>


  </div>

</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import {ref} from "vue";
export default {
  components: {Sidebar},
  mounted() {
  },
  data(){
    return{
      isVisible: localStorage.getItem('isVisible') === 'true',
    }
  },
  methods:{
    show(){
      this.changeVisibility(!this.isVisible)

    },
    changeVisibility(visible){
      this.isVisible = visible;

      localStorage.setItem('isVisible', this.isVisible)
    }
  },
  watch:{
  }

}
</script>

<style>
.burger__block{
  width: 96px;
  height: 96px;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 10px;
}
.burger-line{
  height: 20px;
  margin: 5px 0;
  width: 100%;
  background: #004f39;
  border-radius: 10px;
  transition: 0.2s ease;
}
.burger-btn{
  border-radius: 10px;
  border: 0;
  box-shadow: 0 0 10px #000;
  transition: 0.2s ease-out;
  cursor: pointer;
}
.two{
  width: 90%;
}
.burger-btn:hover .burger-line.two{
  width: 75%;
}

header{
  display: inline;
}
table{
  width: 100%;
}
tr{
  width: 100%;
}
.td-logo{
  width: 65%;
}
</style>