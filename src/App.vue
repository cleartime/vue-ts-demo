<template>
  <div id="app">
      <router-view />
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component({
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;
  padding-top: 61px;
}
img {
  vertical-align: bottom;
}
</style>
