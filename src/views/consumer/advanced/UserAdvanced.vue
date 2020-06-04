
<template>
  <page-view
    :title="'单号: ' + this.info.orderId"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="创建人">{{info.name}}</detail-list-item>
      <!-- <detail-list-item term="手机号">{{info.phoneNumber}}</detail-list-item> -->
      <detail-list-item term="入住时间">{{info.signTime}}</detail-list-item>
      <detail-list-item term="退宿时间">{{info.leaveTime}}</detail-list-item>
      <detail-list-item term="创建时间">{{format(info.onTime)}}</detail-list-item>
      <detail-list-item term="用餐券">{{info.coupon}}</detail-list-item>
      <detail-list-item term="消费金额">{{info.cost}}</detail-list-item>
      <!-- <detail-list-item term="关联单据">
        <a>12421</a>
      </detail-list-item> -->
      <!-- <detail-list-item term="生效日期">{{info.startTime}} ~ {{info.endTime}}</detail-list-item> -->
      <detail-list-item term="房间号">{{info.roomId}}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">订单金额</div>
        <div class="heading">¥ {{info.totalPrice}}</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button>
          <a-icon type="ellipsis" />
        </a-button>
      </a-button-group>
      <a-button type="primary">主操作</a-button>
    </template>

    <!-- <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step title="网上预定"></a-step>
        <a-step title="门店登记"></a-step>
        <a-step title="入住状态"></a-step>
        <a-step title="退房离开"></a-step>
      </a-steps>
    </a-card> -->

    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <detail-list>
        <detail-list-item term="用户姓名">{{info.name}}</detail-list-item>
        <detail-list-item term="会员卡号">32943898021309809423</detail-list-item>
        <detail-list-item term="身份证">3321944288191034921</detail-list-item>
        <detail-list-item term="联系方式">18112345678</detail-list-item>
        <detail-list-item term="联系地址">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
      <detail-list title="信息组">
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item></detail-list-item>
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item></detail-list-item>
      </detail-list>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="用户近半年消费记录">
      <div class="no-data">
        <a-icon type="frown-o" />暂无数据
      </div>
    </a-card>

    <!-- 操作 -->
    <!-- <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <a-table
        v-if="activeTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation1"
        :pagination="false"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </a-table>
      <a-table
        v-if="activeTabKey === '2'"
        :columns="operationColumns"
        :dataSource="operation2"
        :pagination="false"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </a-table>
      <a-table
        v-if="activeTabKey === '3'"
        :columns="operationColumns"
        :dataSource="operation3"
        :pagination="false"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </a-table> 
    </a-card> -->
  </page-view>
</template>

<script>
import moment from 'moment'
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { axios } from '../../../utils/request'
import { getFoodList, getUser, getUserList } from '../../../api/manage'

const DetailListItem = DetailList.Item
const statusMap = {
  0: '已取消',
  1: '进行中',
  2: '已过期'
}

export default {
  name: 'LiveAdvanced',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data() {
    return {
      statusMap: {
        0: {
          status: 'default',
          text: '已取消'
        },
        1: {
          status: 'processing',
          text: '进行中'
        },
        2: {
          status: 'error',
          text: '已过期'
        }
      },
      tabList: [
        {
          key: '1',
          tab: '操作日志一'
        },
        {
          key: '2',
          tab: '操作日志二'
        },
        {
          key: '3',
          tab: '操作日志三'
        }
      ],
      activeTabKey: '1',
      info: {},
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '执行结果',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation1: [
        {
          key: 'op1',
          type: '进入电梯刷脸',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '进入电梯刷脸',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '进入电梯刷脸',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '进入房间刷脸',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '餐厅就餐刷脸',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      operation2: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        }
      ],
      operation3: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
    }
  },
  created() {
    console.log('created')
    console.log(this.$route.query)
    this.getUserData()
  },

  methods: {
    getUserData() {
      getUser(this.$route.query)
      .then(res => {
          this.info = res.data
          console.log(res)
        })
    },
    format(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        agree: '成功',
        reject: '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter(type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {
  }
  .status-list {
    text-align: left;
  }
}
</style>
