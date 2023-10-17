<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validateTrigger="bind">
			<uni-forms-item name="content" label="留言内容/回复内容" required>
				<uni-easyinput v-model="formData.content" trim="right" />
			</uni-forms-item>
			<uni-forms-item name="imgs" label="图片列表">
				<uni-file-picker file-mediatype="image" :limit="6" return-type="array" v-model="formData.imgs" />
			</uni-forms-item>
			<uni-forms-item name="is_reply" label="是否是回复类型">
				<switch @change="binddata('is_reply', $event.detail.value)" :checked="formData.is_reply" />
			</uni-forms-item>
			<uni-forms-item name="feedback_id" label="被回复留言ID">
				<uni-easyinput v-model="formData.feedback_id" />
			</uni-forms-item>
			<uni-forms-item name="contact" label="联系人">
				<uni-easyinput v-model="formData.contact" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="联系电话">
				<uni-easyinput v-model="formData.mobile" trim="both" />
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
	import {
		validator
	} from '../../js_sdk/validator/uni-feedback-admin.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'opendb-feedback';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"content": "",
					"imgs": [],
					"is_reply": null,
					"feedback_id": "",
					"contact": "",
					"mobile": ""
				},
				formOptions: {},
				rules: {
					...getValidator(["content", "imgs", "is_reply", "feedback_id", "contact", "mobile"])
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
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
