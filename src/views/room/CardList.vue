<template>
  <div class="card-list" ref="content">
    <a-list rowKey="id" :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}" :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.roomId === undefined">
          <a-button @click="showModal" class="new-btn" type="dashed">
            <a-icon type="plus" />
          </a-button>
          <a-modal title="新增房间" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
            <a-form :form="form">
              <a-form-item label="房间id" class="stepFormText">
                <a-input v-model="roomId" name="roomId" />
              </a-form-item>
              <a-form-item label="状态" class="stepFormText">
                <a-input v-model="roomStatus" name="roomStatus" />
              </a-form-item>
              <a-form-item label="房间类型" class="stepFormText">
                <a-input v-model="roomType" name="roomType" />
              </a-form-item>
              <a-form-item label="物品" class="stepFormText">
                <a-input v-model="things" name="things" />
              </a-form-item>
            </a-form>
          </a-modal>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ item.roomId }}</a>
              <a-avatar
                class="card-avatar"
                slot="avatar"
                :src="'https://tvax1.sinaimg.cn/large/006nIlf0ly1gctol0wk14j30rm0gy419.jpg'"
                size="large"
              />
              <div class="meta-content" slot="description">
                <p>房型: {{ item.roomType }}</p>
                <p>
                  物品: {{item.things}}
                  <span v-if="item.roomStatus == -1">已入住</span>
                  <span v-else>无人入住</span>
                </p>
              </div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a
                @click="showUpdateModal(item.roomId,item.roomStatus,item.roomType,item.things)"
              >编辑房间</a>
              <a @click="handleDelete(item.roomId)">删除房间</a>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <a-modal title="修改房间" :visible="visible1" @ok="UpdateSubmit" @cancel="UpdateCancel">
      <a-form :form="form1">
        <a-form-item label="房间id" class="stepFormText">
          <a-input name="roomId" v-model="roomId" />
        </a-form-item>
        <a-form-item label="状态" class="stepFormText">
          <a-select style="width: 120px" v-model="roomStatus">
            <a-select-option value="0">0</a-select-option>
            <a-select-option value="1">1</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="房间类型" class="stepFormText">
          <a-input name="roomType" v-model="roomType" />
        </a-form-item>
        <a-form-item label="物品" class="stepFormText">
          <a-input name="things" v-model="things" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { deleteRoom, getRoomList, updateRoom } from '../../api/manage'
import { addRoom } from '../../api/manage'
var dataSource = []

export default {
  name: 'CardList',
  data() {
    return {
      description:
        '段落示意：蚂蚁酒店服务设计平台 优秀的界面体验，无缝接入蚂蚁生态， 提供跨越设计与开发的酒店体验解决方案。',
      visible: false,
      visible1: false,
      roomId: '',
      roomStatus: '',
      roomType: '',
      things: '',
      maskStyle: { backgroundColor: 'rgba(0,0,0,.45)' },
      queryParam: {},
      linkList: [
        {
          icon: 'rocket',
          href: '#',
          title: '快速开始',
          // 回调，可不写
          callback: () => {
            this.testFun()
            console.log("call['快速开始'] action")
          }
        },
        {
          icon: 'info-circle-o',
          href: '#',
          title: '产品简介',
          callback: () => {
            this.testFun()
            console.log("call['快速开始'] action")
          }
        },
        {
          icon: 'file-text',
          href: '#',
          title: '产品文档',
          callback: () => {
            this.testFun()
            console.log("call['快速开始'] action")
          }
        }
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleSubmit() {
      addRoom({ roomId: this.roomId, roomStatus: this.roomStatus, roomType: this.roomType, things: this.things }).then(
        res => {
          console.log(res)
          this.getData()
          this.handleCancel()
        }
      )
    },
    handleCancel() {
      this.visible = false
    },
    showUpdateModal(a, b, c, d) {
      this.roomId = a
      this.roomStatus = b
      this.roomType = c
      this.things = d
      this.visible1 = true
    },
    UpdateSubmit() {
      updateRoom({
        roomId: this.roomId,
        roomStatus: this.roomStatus,
        roomType: this.roomType,
        things: this.things
      }).then(res => {
        console.log(res)
        this.getData()
        this.UpdateCancel()
      })
    },
    UpdateCancel() {
      this.visible1 = false
    },
    handleDelete(roomId) {
      deleteRoom({ roomId: roomId }).then(res => {
        console.log(res)
        this.getData()
        this.$message.info('删除成功')
      })
    },
    testFun() {
      this.$message.info('开发中！')
    },
    getData() {
      getRoomList({ hotelId: '3703030' }).then(res => {
        // console.log(res)
        this.dataSource = res.data
        this.dataSource.unshift({})
        console.log(dataSource)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/components/index.less';

.card-list {
  /deep/ .ant-card-body:hover {
    .ant-card-meta-title > a {
      color: @primary-color;
    }
  }

  /deep/ .ant-card-meta-title {
    margin-bottom: 12px;

    & > a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  /deep/ .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
</style>
