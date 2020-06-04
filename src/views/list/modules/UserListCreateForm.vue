<template>
  <a-modal
    title="新增房间"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.orderId" name="orderId"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.userId" name="userId"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.name" name="name"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-date-picker v-model="queryParam.signTime" name="signTime"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-date-picker v-model="queryParam.leaveTime" name="leaveTime"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.roomId" name="roomId"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.cost" name="cost"/>
      </a-form-item>
      <a-form-item
        label=""
        class="stepFormText">
        <a-input v-model="queryParam.coupon" name="coupon"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { UserListInsert } from '../../../api/manage'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this),
      queryParam:{

      }
    }
  },
  methods: {
    showModal(){
      this.visible=true
    },
    handleSubmit (queryParam) {
      this.queryParam=queryParam
      UserListInsert(queryParam).then(res=>{
        console.log(res)
        this.getData()
        this.handleCancel()
      })
    },
    handleCancel () {
      this.visible = false
    },
  }
}
</script>
