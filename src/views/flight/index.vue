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

@Component({})
export default class Flight extends Vue {
  private uid = '';
  private reportConfig = {
    bookId: '订单号',
    username: '预订人姓名',
    company: '公司',
    department: '部门',
    bookTime: '预订时间',
    bookStatus: '订单状态',
    costCenter: '成本中心',
    airCompany: '航司',
    flightNo: '航班号',
    startCity: '出发城市',
    endCity: '到达城市',
    startTime: '起飞时间',
    endTime: '到达时间',
    passengerName: '乘机人姓名',
    bookHistory: '旅客订座记录',
    passengerPaperType: '乘机人证件类型',
    paperNo: '证件号码',
    ticketNo: '票号',
    flightType: '航程类型',
    supplierId: '服务商公司ID',
    supplierAbbr: '服务商简称',
    supplierBookId: '服务商订单号',
    bookSource: '订单来源',
    amount: '订单总价',
    shippingFee: '配送费',
    costType: '出行类型',
    payType: '支付方式',
    linkmanName: '联系人姓名',
    linkmanTel: '联系人手机号',
    shippingType: '配送方式',
    shippingAdd: '配送地址',
    tripApplyId: '出差申请单号',
    rebookTicketNo: '改签后票号',
    rebookStartCity: '改签起飞城市',
    rebookEndCity: '改签到达城市',
    rebookStartTime: '改签起飞时间',
    rebookEndTime: '改签到达时间',
    rebookSeatLevel: '改签后舱位等级',
    rebookSeatNo: '改签舱位',
    rebookFlightNo: '改签航班',
    rebookCompany: '改签航司',
    rebookDetail: '改签原因详情',
    rebookPassenger: '改签乘客姓名',
    rebookDate: '改签时间',
    rebookServiceFee: '改签服务费',
    rebookCost: '改签总费用',
    refundSubmitter: '退票乘客姓名',
    refundApplyDate: '退票申请提交时间',
    refundServiceFee: '退票服务费',
    refundAmount: '退票费总计',
    realRefundAmount: '应退票款总计',
    refundReason: '退票原因描述',
    ticketStatus: '机票使用状态',
    insuranceNum: '保险数量',
    insuranceMonovalent: '保险单价',
    insuranceStatus: '保单状态',
    insuranceType: '保险类型',
  };
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
