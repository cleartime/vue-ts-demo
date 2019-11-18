
<template>
  <div class="gheader">
    <div class="global-header">
      <div class="gl-header-left">
        <img src="../../assets/logo.png" style="margin: 10px 0 0 20px;" />
      </div>
      <div class="gl-header-right">
        <div class="gl-r-1" v-if="user && !user.singleSignOn && orgData && orgData.length">
          <span style="width: 1px; height:50px; vertical-align: middle; display: inline-block;"></span>
          <span
            class="gl-r-cname"
            :title="isEllipsis($store.state.orgData.name, 17)"
          >{{$store.state.orgData.name}}</span>
          <span class="gl-r-cbutton"  v-if="showTabCompany">切换公司</span>
        </div>
        <div class="gl-r-2">
          <div class="logout">
            <i class="el-icon-switch-button"></i>
          </div>
          <div class="user">
            <i class="el-icon-user usericon"></i>
            欢迎您，{{user.userName||''}}
            <i
              :class="optionFlag ? 'el-icon-caret-top' :'el-icon-caret-bottom' "
              class="bottomCaret"
            ></i>
            <div class="options" v-if="optionFlag">
              <span
                class="optionItem"
                v-for="(item,index) in options"
                :key="index"
              >{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
@Component({})
export default class Header extends Vue {
  private user = {};
  private dialogVisible = false;
  private submiting = false;
  private dialogData = {
    company: '',
    childOrgId: '',
  };
  private cacheDialogData = null;
  private cacheOrgData = null;
  private orgData = []; // 全部数据
  private forkOrgData = []; // 用于显示的数据
  private activeOrgData = [];
  private activeChild = {};
  private tabIndex = 0;
  private mdPwd = true;
  private bind = true;
  private unBind = true;
  private ifShowModify = false;
  private ifShowBind = false;
  private ifShowUnbind = false;
  private resetNum = 0;
  private optionFlag = false;
  private options = ['修改密码', '绑定手机', '解绑手机'];
  private showTabCompany = true;
}
</script>
<style lang="scss">
.gheader {
  .custom-dialog {
    width: 60%;
    .el-dialog__header {
      background: #2e4f8f;
      padding-top: 12px;
      padding-bottom: 12px;
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__headerbtn {
        top: 15px;
        .el-dialog__close {
          color: #fff;
          font-size: 20px;
          transition: all ease 0.2s;
          &:hover {
            transform: rotate(180deg) scale(1.1);
          }
        }
      }
    }
    .el-dialog__body {
      padding: 5px 25px 10px;

      .d-child-parent {
        .el-form-item {
          margin-bottom: 8px;
          margin-top: 10px;

          .el-radio-group {
            width: 100%;
          }
          .el-radio {
            width: 20%;
            margin-right: 0;
            padding-right: 10px;
            margin-bottom: 7px;
            margin-top: 3px;
            .el-radio__label {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: calc(100% - 20px);
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }
      .d-company {
        border-bottom: 1px solid #ccc;
        position: relative;
        margin-top: 10x;
        height: 45px;
        .search {
          width: 43%;
          height: 35px;
          line-height: 35px;
          position: absolute;
          left: 0;
          top: 0px;
          .btn {
            width: 80px;
            height: 100%;
            background: #2e4f8f;
            float: right;
            text-align: center;
            color: #fff;
            cursor: pointer;
            &:hover {
              color: #ccc;
            }
          }
          .searchinput {
            float: right;
            border: 1px solid #ccc;
            width: calc(100% - 80px);
            height: 100%;
            padding: 5px 10px;
          }
        }

        .el-form-item {
          margin-bottom: 0px;
          .el-radio-group {
            width: 100%;
            //overflow: hidden;
          }
          .el-radio {
            width: 20%;
            padding-right: 10px;
            margin-right: 0;
            float: left;
          }
          .el-radio.is-checked {
            border-bottom: 2px solid #2e4f8f;
            padding-bottom: 11px;
            margin-bottom: -12px;
          }
        }
      }
      .d-child-wrap {
        min-height: 300px;
        max-height: 380px;
        overflow: hidden;
        overflow-y: auto;
        position: relative;
        .noresult {
          text-align: center;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.4);
          padding: 34px 0;
          position: absolute;
          width: 100%;
        }
        .el-form-item {
          margin-bottom: 15px;
          .d-child {
            background: #fff;
            margin-top: 10px;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 5px;
            &:nth-last-child(1) {
              border: none;
            }
            .el-radio-group {
              width: 100%;
              overflow: hidden;
              .el-radio {
                margin-bottom: 10px;
                margin-right: 0;
                padding-right: 10px;
                width: 20%;
                float: left;
                .el-radio__label {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: calc(100% - 20px);
                  display: inline-block;
                  vertical-align: middle;
                  transition: all ease 0.3s;
                  &:hover {
                    color: #000;
                  }
                }
              }
              .is-checked {
                .el-radio__label {
                  &:hover {
                    color: #409eff;
                  }
                }
              }
            }
          }
        }
      }
      .d-buttonbox {
        text-align: center;
        margin-top: 10px;
        .el-button {
          padding: 10px 30px;
        }
        .el-button--info {
          background: #cad3d6;
          border-color: #cad3d6;
        }
        .el-button--primary {
          background: #2e4f8f;
          border-color: #2e4f8f;
        }
      }
    }
  }
  .global-header {
    // background: #2e4f8f;
    background-image: linear-gradient(90deg, #4da6fc 0%, #4582ff 100%);
    height: 50px;
    //line-height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .gl-header-left {
      width: 280px;
      img {
        height: 30px;
        vertical-align: middle;
      }
    }
    .gl-header-right {
      flex: 1;
      .gl-r-1 {
        float: left;
        color: #fff;
        margin-left: 25px;
        .gl-r-cname {
          background: #027cfb;
          padding: 5px 10px;
          border-radius: 15px;
          vertical-align: middle;
          display: inline-block;
          max-width: 260px;
          max-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .gl-r-cbutton {
          vertical-align: middle;
          text-decoration: underline;
          display: inline-block;
          margin-left: 15px;
          padding: 10px 0;
          cursor: pointer;
          &:hover {
            color: #ccc;
          }
        }
      }
      .gl-r-2 {
        float: right;
        color: #fff;
        .logout {
          // background: #294780;
          width: 50px;
          height: 50px;
          float: right;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          vertical-align: middle;
          cursor: pointer;
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
        .user {
          line-height: 50px;
          float: right;
          vertical-align: middle;
          margin-right: 10px;
          position: relative;
          .usericon {
            margin-right: 7px;
            font-size: 18px;
          }
          .options {
            position: absolute;
            top: 46px;
            right: -10px;
            width: 140px;
            margin-top: 1px;
            font-size: 14px;
            line-height: 30px;
            background-color: #4582ff;
            border-radius: 4px;
            padding: 0 1px;
            z-index: 999;
            .optionItem {
              cursor: pointer;
              display: inline-block;
              width: 100%;
              height: 35px;
              text-align: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.5);
              &:last-child {
                border-bottom: 0;
              }
            }
            .optionItem:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
