<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="content" label="留言内容/回复内容" required>
        <textarea @input="binddata('content', $event.detail.value)" class="uni-textarea-border" v-model="formData.content" trim="right"></textarea>
      </uni-forms-item>
      <uni-forms-item name="imgs" label="图片列表">
        <uni-file-picker file-mediatype="image" :limit="6" return-type="array" v-model="formData.imgs"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="is_reply" label="是否是回复类型">
        <switch @change="binddata('is_reply', $event.detail.value)" :checked="formData.is_reply"></switch>
      </uni-forms-item>
      <uni-forms-item name="feedback_id" label="被回复留言ID">
        <uni-easyinput v-model="formData.feedback_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="contact" label="联系人">
        <uni-easyinput v-model="formData.contact" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="mobile" label="联系电话">
        <uni-easyinput v-model="formData.mobile" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-feedback.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'opendb-feedback';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "content": "",
        "imgs": [],
        "is_reply": null,
        "feedback_id": "",
        "contact": "",
        "mobile": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("content,imgs,is_reply,feedback_id,contact,mobile").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>
