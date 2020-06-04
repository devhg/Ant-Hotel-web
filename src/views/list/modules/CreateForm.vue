<template>
  <a-modal
    title="新增房间"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        label="房间id"
        class="stepFormText">
        <a-input v-model="queryParam.roomId" name="roomId"/>
      </a-form-item>
      <a-form-item
        label="状态"
        class="stepFormText">
        <a-input v-model="roomStatus" name="roomStatus"/>
      </a-form-item>
      <a-form-item
        label="房间类型"
        class="stepFormText">
        <a-input v-model="roomType" name="roomType"/>
      </a-form-item>
      <a-form-item
        label="物品"
        class="stepFormText">
        <a-input v-model="things" name="things"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
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
    handleSubmit () {
      addRoom({roomId:this.roomId,roomStatus:this.roomStatus,roomType: this.roomType,things:this.things}).then(res=>{
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
