<template>
  <div id="app">
    <transition :name="'fade'">
    	<router-view class="view-transition"></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import '@/styles/pageTransition.css';
import '@/styles/layout.scss';

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
