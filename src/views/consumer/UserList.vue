<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单编号">
              <a-input v-model="queryParam.roomId" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input v-model="queryParam.name" />
            </a-form-item>
          </a-col>
          <!--          <template v-if="advanced">-->
          <!--            <a-col :md="10" :sm="24">-->
          <!--              <a-form-item label="住宿时间">-->
          <!--                <a-date-picker v-model="queryParam.signTime" style="width: 100%" placeholder="请输入更新日期" />-->
          <!--              </a-form-item>-->
          <!--            </a-col>-->
          <!--            <a-col :md="10" :sm="24">-->
          <!--              <a-form-item label="退宿时间">-->
          <!--                <a-date-picker v-model="queryParam.leaveTime" style="width: 100%" placeholder="请输入更新日期" />-->
          <!--              </a-form-item>-->
          <!--            </a-col>-->
          <!--          </template>-->
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="handleSumbit(queryParam)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button @click="showModal" class="new-btn" type="primary">
        新建记录
        <a-icon type="plus" />
      </a-button>
      <a-modal
        title="新增记录"
        :visible="visible"
        @ok="handleInsert(queryParam1)"
        @cancel="handleCancel"
      >
        <a-form :form="form">
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.orderId" name="orderId" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.userId" name="userId" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.name" name="name" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-date-picker v-model="queryParam1.signTime" name="signTime" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-date-picker v-model="queryParam1.leaveTime" name="leaveTime" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.roomId" name="roomId" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.cost" name="cost" />
          </a-form-item>
          <a-form-item label class="stepFormText">
            <a-input v-model="queryParam1.coupon" name="coupon" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button> -->
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-icon type="delete" />删除
          </a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2">
            <a-icon type="lock" />锁定
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <a-table
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      rowKey="orderId"
      :dataSource="loadData"
    >
      <span slot="status" slot-scope="status">
        <a-tag
          :color="status === 0 ? 'volcano' : (status === 1 ? 'green' : 'geekblue')"
        >{{status === 0 ? '已取消' : (status === 1 ? '进行中' : '已过期')}}</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">详情</a>
        </template>
      </span>
    </a-table>

    <!--    <create-form ref="createModal" @ok="handleOk" />-->
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import { getRoleList, getOrderList, getUserList } from '@/api/manage'
import { UserListInsert, userSearch } from '../../api/manage'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      visible: false,
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {},
      queryParam1: {},
      // signTime:'',
      // leaveTime:'',
      // 表头
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderId'
        },
        // {
        //   title: '房间类型',
        //   dataIndex: 'roomType',
        //   scopedSlots: { customRender: 'roomType' }
        // },
        // {
        //   title: '押金金额',
        //   dataIndex: 'preFee',
        //   sorter: true,
        //   needTotal: true,
        //   customRender: text => text + ' RMB'
        // },
        {
          title: '用户姓名',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '房间号',
          dataIndex: 'roomId',
          sorter: true
        },
        {
          title: '住宿时间',
          dataIndex: 'signTime',
          sorter: true,
          customRender: val => {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
          }
        },

        {
          title: '退房时间',
          dataIndex: 'leaveTime',
          sorter: true,
          customRender: val => {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '优惠金额',
          dataIndex: 'coupon',
          sorter: true
        },
        {
          title: '总额',
          dataIndex: 'cost',
          sorter: true
        },
        // {
        //   title: '生成时间',
        //   dataIndex: 'reserveTime',
        //   sorter: true
        // },
        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   scopedSlots: { customRender: 'status' }
        // },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      pagination: {
        pageSize: 10,
        defaultPageSize: 10,
        defaultCurrent: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '40']
      },
      loading: true,
      // 加载数据方法 必须为 Promise 对象
      loadData: [],
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    this.vueTable()
    // this.tableOption()
    // getRoleList({ t: new Date() })
  },
  methods: {
    handleEdit(record) {
      console.log(record.orderId)
      this.$router.push({
        path: '/consumer/UserDetail',
        query: {
          orderId: record.orderId
        }
      })
    },
    showModal() {
      this.visible = true
    },
    handleInsert(queryParam1) {
      this.queryParam1 = queryParam1
      UserListInsert({
        orderId: queryParam1.orderId,
        userId: queryParam1.userId,
        name: queryParam1.name,
        signTime: queryParam1.signTime,
        leaveTime: queryParam1.leaveTime,
        roomId: queryParam1.roomId,
        cost: queryParam1.cost,
        coupon: queryParam1.coupon
      }).then(res => {
        console.log(res)
        this.vueTable()
        this.handleCancel()
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleSumbit(queryParam) {
      this.queryParam = queryParam
      userSearch({ roomId: queryParam.roomId, name: queryParam.name })
        .then(res => {
          console.log(res)
          this.loadData = res.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = []
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    vueTable() {
      getUserList()
        .then(res => {
          console.log(res)
          this.loadData = res.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },

    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
