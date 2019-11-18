<template>
  <div class="homeMain">
    <g-header></g-header>

    <div style="flex:1; flex-direction: row; display: flex; overflow: hidden;">
      <div class="side-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical"
          router
          ref="mu"
          v-show="menuLoaded"
        >
          <template v-for="(item,index) in menu">
            <el-submenu :index="index+''" v-if="item.type=='subMenu'" :key="'menu-'+index">
              <template slot="title">
                <i :class="'el-icon-'+(item.icon||item.name)"></i>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="(childitem,childindex) in item.children">
                <el-submenu
                  :index="index+'-'+childindex"
                  v-if="childitem.type=='subMenu'"
                  :key="'menu-'+index+'-'+childindex"
                  style="padding-left:0px;"
                >
                  <template slot="title">
                    <span style="padding-left:12px;">{{ childitem.title }}</span>
                  </template>
                  <template v-for="(childitem4,childindex4) in childitem.children">
                    <el-submenu
                      :index="index+'-'+childindex+'-'+childindex4"
                      v-if="childitem4.type=='subMenu'"
                      :key="'menu-'+index+'-'+childindex+'-'+childindex4"
                      style="padding-left:0px;"
                    >
                      <template slot="title">
                        <span style="padding-left:12px;">{{ childitem4.title }}</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item
                          v-for="(subchilditem4,subchildindex4) in childitem4.children"
                          :index="subchilditem4.path"
                          :key="'menu-'+index+'-'+childindex+'-'+childindex4+'-'+subchildindex4"
                          style="padding-left:80px"
                        >{{ subchilditem4.title }}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item
                      :index="childitem4.path"
                      :key="'menu-'+index+'-'+childindex+'-'+childindex4"
                      style="padding-left: 65px"
                      v-else
                    >{{ childitem4.title }}</el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item
                  :index="childitem.path"
                  :key="'menu-'+index+'-'+childindex"
                  style="padding-left: 52px"
                  v-else
                >{{ childitem.title }}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-if="item.type=='menu'" :index="item.path" :key="'menu-'+index">
              <i :class="'el-icon-'+(item.icon||item.name)"><i class="iconimg" /></i>
              <span slot="title">{{ item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>

      <div class="container" style="flex:1; position: relative;">
        <router-view :menuData="subMenu"></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Header from '../components/header/header.vue';
import _getSubmenuData from  '../utils/getSubmenuData';
import { menulist } from '../lib/menu';
import { Menu } from "@/types/menu";

@Component({
  components: {
    gHeader: Header,
  },
})
export default class Home extends Vue {
  private menu: Menu[] = menulist;
  private menuLoaded = false;
  private activeIndex = location.hash.slice(1);
  private subMenu: any[] = [];
  created(): void {
    this.menuLoaded = true;
    this.subMenu = _getSubmenuData(null, this.menu, true , true);
    this.subMenu = _getSubmenuData(null, this.menu, true, null);
  };
}
</script>
<style lang="scss">
.common-submenu {
  display: -webkit-flex;
  display: flex;
  .submenu-right {
    flex: 1;
  }
  .name{
    font-size:24px;
    font-weight:600;
    color:#666;
    letter-spacing:2px;
    padding-bottom:15px;
    padding-left:10px;
  }
}
.homeMain {
  flex: 1;
  flex-direction: column;

  .el-dialog {
    .el-dialog__header {
      padding: 16px 20px;
      background-color: #0295ff;
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__close {
        color: #fff;
      }
    }
  }

  .side-menu {
    width: 260px;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    // margin-top: -1px;

    .el-menu-item-group__title {
      padding: 0;
    }
    .el-menu {
      background-color: transparent;
    }
    .el-submenu .el-menu {
      background-color: transparent;
    }
    .el-submenu__title:hover {
      background-color: transparent;
    }
    .el-submenu,
    .el-menu-item {
      // color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      transition: none;
    }
    .el-submenu .el-menu-item {
      // color: rgba(255, 255, 255, 0.4);
      border: none;
    }
    .iconimg2 {
      display: none;
    }
    .el-menu-item.is-active {
      background-color: rgb(245, 245, 245);
      color: #315791;
      .iconimg {
        display: none;
      }
      .iconimg2 {
        display: inline;
      }
    }
    .el-menu-item:hover {
      outline: 0;
      background-color: transparent;
      // color: #fff;
    }
    .el-menu-item:focus .el-menu-item:before,
    .el-menu-item:hover .el-menu-item:before {
      display: inline-block;
      content: "";
      background: #000;
      width: 5px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .el-menu-item.is-active:hover {
      background-color: #fff;
      color: #315791;
    }

    .el-menu-item.is-active:before {
      display: inline-block;
      content: "";
      background: rgb(0, 83, 190);
      width: 5px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .container {
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    color: #333;
    margin-left: 10px;
    .loading-custom {
      font-size: 30px;
      position: fixed;
      left: 260px;
      .el-loading-spinner {
        top: 35%;
        left: 0%;
      }
    }
    .common-content {
      padding: 0 5px 0 0;
      //margin-top: 30px;
      //background:#f6f6f6
    }
  }
}
</style>
