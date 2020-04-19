<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户姓名">
              <a-input v-model="queryParam.id" placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="住宿状态">
              <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="更新日期">
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
          <a-divider type="vertical" />
          <a
            target="_blank"
            :href="'http://221.2.177.95:50196/welcome?orderId=' + record.orderId"
          >入住登记</a>
        </template>
      </span>
    </a-table>

    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import { getRoleList, getServiceList, test, getOrderList } from '@/api/manage'

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
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderId'
        },
        {
          title: '姓名',
          dataIndex: 'uname'
        },
        {
          title: '房间类型',
          dataIndex: 'roomType',
          scopedSlots: { customRender: 'roomType' }
        },
        {
          title: '押金金额',
          dataIndex: 'preFee',
          sorter: true,
          needTotal: true,
          customRender: text => text + ' RMB'
        },
        {
          title: '住宿时间',
          dataIndex: 'startTime',
          sorter: true,
          customRender: val => {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '退房时间',
          dataIndex: 'endTime',
          sorter: true,
          customRender: val => {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '生成时间',
          dataIndex: 'reserveTime',
          sorter: true,
          customRender: val => {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
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
  },
  methods: {
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
      getOrderList()
        .then(res => {
          console.log(res)
          this.loadData = res.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleEdit(record) {
      this.$router.push({
        path: '/order/liveDetail',
        query: {
          orderId: record.orderId
        }
      })
    },
    handleSub(record) {
      console.log(record)
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
