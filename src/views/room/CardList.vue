<template>
  <div class="card-list" ref="content">
    <a-list rowKey="id" :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}" :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.roomId === undefined">
          <a-button @click="testFun()" class="new-btn" type="dashed">
            <a-icon type="plus" />新增房间
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ item.roomId }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="'https://tvax1.sinaimg.cn/large/006nIlf0ly1gctol0wk14j30rm0gy419.jpg'" size="large" />
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
              <a @click="testFun()">查看记录</a>
              <a @click="testFun()">语音通话</a>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getRoomList } from '../../api/manage'
var dataSource = []

export default {
  name: 'CardList',
  data() {
    return {
      description:
        '段落示意：蚂蚁酒店服务设计平台 优秀的界面体验，无缝接入蚂蚁生态， 提供跨越设计与开发的酒店体验解决方案。',
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
      dataSource
    }
  },
  created() {
    this.getData()
  },
  methods: {
    testFun() {
      this.$message.info('持续开发中！')
    },
    getData() {
      getRoomList({ hotelId: '37030301' }).then(res => {
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
