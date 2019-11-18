<template>
  <div class="report-flight">
    <div class="over">
      <div class="flex-row">
        <div class="option-block">
          <div class="block-name">起飞时间：</div>
          <el-date-picker
            v-model="takeoffDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="option-block">
          <div class="block-name">预订时段：</div>
          <el-date-picker
            v-model="bookDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="option-block">
          <div class="block-name">出票时间：</div>
          <el-date-picker
            v-model="issueDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="flex-row" v-if="bgUser">
        <div class="option-block">
          <div class="block-name">公司：</div>
          <el-select v-model="companyId" filterable placeholder="查询公司" class="cp-select">
            <el-option
              v-for="item in companyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <company-search @sendCorpId="getCorpId" :placeholder="'查询公司'" class="cp-select"></company-search> -->
        </div>
      </div>
      <div class="flex-row">
        <div class="option-block">
          <div class="block-name">模板选择：</div>
          <el-radio-group v-model="pickedTemplateIndexUI" style="display: flex;align-items: center">
            <el-radio :label="-1">普通下载</el-radio>
            <el-radio v-for="(item, index) in templates" :key="item.id" :label="index">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="add-temp" @click="Evt_showConfigDialog(false)">+&nbsp;新增模板</div>
      </div>
    </div>
    <div class="under">
      <div class="flex-row">
        <div class="option-block">
          <div class="block-name">选项：</div>
          <div
            class="block-text"
          >{{pickedTemplateIndexUI!==-1 ? templates[pickedTemplateIndexUI].name : '普通下载'}}</div>
          <div v-if="pickedTemplateIndexUI!==-1" class="block-text execute-btn">编辑模板</div>
          <div
            v-if="pickedTemplateIndexUI===-1&&checkedConfigs.length"
            class="block-text execute-btn"
          >新增当前为模板</div>
          <div v-if="pickedTemplateIndexUI!==-1" class="block-text execute-btn">删除模板</div>
        </div>
      </div>
      <div class="check-block">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedConfigs">
          <el-checkbox
            style="width: 120px;margin-right: 30px;"
            v-for="(item, key) of reportConfig"
            :label="key"
            :key="key"
          >{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" class="download-btn">报表下载</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { flightReportConfig } from './const';

@Component({})
export default class flight extends Vue {
  private uid = '';
  private reportConfig = flightReportConfig;
  private templates = [];
  private companyOptions = [];

  private companyId = '';
  private bookDate = '';
  private issueDate = '';
  private takeoffDate = '';

  private pickedTemplateIndexUI = -1;
  private pickedTemplateIndex = -1;
  private checkAll = false;
  private checkedConfigs = [];
  private normalConfigsTemp = [];
  private isIndeterminate = true;

  private configDialogVisible = false;
  private isEdit = false;
  private dialogCheckAll = false;
  private dialogIsIndeterminate = true;
  private dialogCheckedConfigs = [];
  private dialogTemplateName = '';

  private tipDialogVisible = false;
  private isDeleteTypeTipDialog = false;

  private confirmLock = false;
  private bgUser = true;
}
</script>

<style lang="scss" scoped>
.report-flight {
  margin: 0 16px;
  .over {
    border-bottom: 1px dashed #cccccc;
  }
  .flex-row {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .add-temp {
    width: 100px;
    border: 1px dashed rgb(2, 149, 255);
    background-color: #fff;
    outline: none;
    color: rgb(2, 149, 255);
    margin: 15px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    height: 40px;
  }

  .option-block {
    display: flex;
    flex-direction: row;
    margin: 10px 20px 10px 0px;

    .block-name {
      line-height: 40px;
      height: 43px;
      text-align: right;
      width: 70px;
      margin-right: 7px;
    }
    .block-text {
      line-height: 40px;
      height: 43px;
      text-align: right;
      margin-right: 7px;
    }
    .execute-btn {
      margin-left: 15px;
      color: rgb(2, 149, 255);
      cursor: pointer;
    }
  }

  .check-block {
    margin-left: 78px;
  }

  .download-btn {
    margin-top: 20px;
    margin-left: 78px;
  }
  .dialog-block {
    .option-block {
      display: flex;
      flex-direction: row;
      margin: 10px 20px 10px 0px;
    }
    .block-name {
      display: inline-block;
      line-height: 40px;
      height: 43px;
      text-align: right;
      width: 70px;
      margin-right: 7px;
    }
    .check-block {
      margin-left: 0px;
    }
  }
}

.cp-select {
  width: 350px;
}
</style>
