<template>
  <sidebar>
    <div class="join-application-page">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">入驻申请</h1>
        <p class="page-desc">请填写真实信息，我们将在3个工作日内完成审核</p>
      </div>

      <form @submit.prevent="handleSubmit" class="application-form">
        <!-- 账号设置 - 主账号 -->
        <a-card class="form-card" :bordered="false">
          <template slot="title">
            <span class="card-title">主账号</span>
          </template>
          <div class="form-section">
            <a-row :gutter="16">
              <a-col :span="12">
                <div class="form-item">
                  <label class="form-label">
                    手机号 <span class="required">*</span>
                  </label>
                  <a-input
                    v-model="formData.adminPhone"
                    type="tel"
                    placeholder="请输入手机号"
                    class="form-input"
                  />
                </div>
              </a-col>
              <a-col :span="12">
                <div class="form-item">
                  <label class="form-label">
                    姓名 <span class="required">*</span>
                  </label>
                  <a-input
                    v-model="formData.adminName"
                    placeholder="请输入姓名"
                    class="form-input"
                  />
                </div>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <!-- 账号设置 - 运营人员 -->
        <a-card class="form-card" :bordered="false">
          <template slot="title">
            <span class="card-title">运营人员</span>
          </template>
          <div class="form-section">
            <div class="form-item">
              <label class="form-label">是否有专业OTA运营人员</label>
              <div class="choice-group">
                <button
                  type="button"
                  @click="formData.hasOTASpecialist = false"
                  :class="['choice-btn', { active: formData.hasOTASpecialist === false }]"
                >
                  无
                </button>
                <button
                  type="button"
                  @click="formData.hasOTASpecialist = true"
                  :class="['choice-btn', { active: formData.hasOTASpecialist === true }]"
                >
                  有专业运营人员
                </button>
              </div>
            </div>

            <transition name="slide-fade">
              <a-row v-if="formData.hasOTASpecialist" :gutter="16" class="expand-section">
                <a-col :span="12">
                  <div class="form-item">
                    <label class="form-label">
                      运营人员姓名 <span class="required">*</span>
                    </label>
                    <a-input
                      v-model="formData.otaContactName"
                      placeholder="请输入运营人员姓名"
                      class="form-input"
                    />
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="form-item">
                    <label class="form-label">
                      运营人员手机号 <span class="required">*</span>
                    </label>
                    <a-input
                      v-model="formData.otaContactPhone"
                      type="tel"
                      placeholder="请输入手机号"
                      class="form-input"
                    />
                  </div>
                </a-col>
              </a-row>
            </transition>
          </div>
        </a-card>

        <!-- 门店基本信息 -->
        <a-card class="form-card" :bordered="false">
          <template slot="title">
            <span class="card-title">门店基本信息</span>
          </template>
          <div class="form-section">
            <a-row :gutter="16">
              <a-col :span="14">
                <div class="form-item">
                  <label class="form-label">
                    门店名称 <span class="required">*</span>
                  </label>
                  <a-input
                    v-model="formData.storeName"
                    placeholder="请输入门店名称"
                    class="form-input"
                  />
                </div>
              </a-col>
              <a-col :span="10">
                <div class="form-item">
                  <label class="form-label">
                    店铺类型 <span class="required">*</span>
                  </label>
                  <div class="tag-group">
                    <button
                      v-for="(label, value) in storeTypeLabels"
                      :key="value"
                      type="button"
                      @click="formData.storeType = value"
                      :class="['tag-btn', { active: formData.storeType === value }]"
                    >
                      {{ label }}
                    </button>
                  </div>
                </div>
              </a-col>
            </a-row>

            <div class="form-item">
              <label class="form-label">
                详细地址 <span class="required">*</span>
              </label>
              <a-input
                v-model="formData.storeAddress"
                placeholder="请输入详细地址（省/市/区/街道/门牌号）"
                class="form-input"
              />
            </div>

            <div class="form-item">
              <label class="form-label">
                门店介绍 <span class="required">*</span>
              </label>
              <a-textarea
                v-model="formData.storeDescription"
                placeholder="请介绍您的门店特色、位置优势、周边环境等（至少50字）"
                :rows="4"
                :maxLength="1000"
                class="form-textarea"
              />
              <div class="char-count">
                {{ (formData.storeDescription || '').length }}/1000
              </div>
            </div>
          </div>
        </a-card>

        <!-- 平台运营情况 -->
        <a-card class="form-card" :bordered="false">
          <template slot="title">
            <span class="card-title">平台运营情况</span>
          </template>
          <div class="form-section">
            <!-- 已上线的平台 -->
            <div class="form-item">
              <label class="form-label">已上线的平台</label>
              <div class="checkbox-grid">
                <label
                  v-for="(label, value) in otaPlatformLabels"
                  :key="value"
                  class="checkbox-item"
                >
                  <a-checkbox
                    :checked="formData.onlinePlatforms.includes(value)"
                    @change="togglePlatform('onlinePlatforms', value)"
                  />
                  <span>{{ label }}</span>
                </label>
              </div>
            </div>

            <!-- 携程星否特惠 -->
            <div class="form-item">
              <label class="checkbox-item checkbox-single">
                <a-checkbox v-model="formData.hasCtripSpecialOffer" />
                <span>携程星否特惠</span>
              </label>
            </div>

            <!-- 希望代运营的平台 -->
            <div class="form-item">
              <label class="form-label">希望代运营的平台</label>
              <div class="checkbox-grid">
                <label
                  v-for="(label, value) in otaPlatformLabels"
                  :key="value"
                  class="checkbox-item"
                >
                  <a-checkbox
                    :checked="formData.interestedPlatforms.includes(value)"
                    @change="togglePlatform('interestedPlatforms', value)"
                  />
                  <span>{{ label }}</span>
                </label>
              </div>
            </div>

            <!-- OTA困境 -->
            <div class="form-item">
              <label class="form-label">目前遇到的困境（可多选）</label>
              <div class="checkbox-grid">
                <label
                  v-for="(label, value) in otaChallengeLabels"
                  :key="value"
                  class="checkbox-item"
                >
                  <a-checkbox
                    :checked="formData.otaChallenges.includes(value)"
                    @change="toggleChallenge(value)"
                  />
                  <span>{{ label }}</span>
                </label>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 房型图片上传 -->
        <a-card class="form-card" :bordered="false">
          <template slot="title">
            <div class="card-title-bar">
              <span class="card-title">房型图片</span>
              <a-button
                type="dashed"
                size="small"
                @click="addRoomType"
                class="add-btn"
              >
                <a-icon type="plus" />
                添加房型
              </a-button>
            </div>
          </template>
          <div class="form-section">
            <div
              v-for="(roomType, index) in roomTypes"
              :key="index"
              class="room-type-item"
            >
              <div class="room-type-header">
                <span class="room-type-label">房型 {{ index + 1 }}</span>
                <a-input
                  v-model="roomType.roomTypeName"
                  placeholder="例如：单人间 / 双人大床房 / 家庭套房"
                  class="room-type-input"
                />
                <a-button
                  v-if="roomTypes.length > 1"
                  type="link"
                  size="small"
                  danger
                  @click="removeRoomType(index)"
                  class="remove-btn"
                >
                  <a-icon type="delete" />
                </a-button>
              </div>

              <!-- 图片上传区域 -->
              <div
                @dragover.prevent="dragIndex = index"
                @dragleave="dragIndex = null"
                @drop.prevent="handleDrop($event, index)"
                :class="['upload-area', { dragging: dragIndex === index }]"
              >
                <a-icon type="cloud-upload" class="upload-icon" />
                <p class="upload-text">拖拽图片到此处，或点击上传</p>
                <p class="upload-hint">支持 JPG、PNG 格式，建议尺寸 1200x800</p>
                <a-button type="primary" size="small" class="upload-btn" ghost>
                  选择图片
                </a-button>
              </div>

              <!-- 图片预览 -->
              <div v-if="roomType.images.length > 0" class="image-preview-grid">
                <div
                  v-for="(img, imgIndex) in roomType.images"
                  :key="imgIndex"
                  class="image-preview-item"
                >
                  <img
                    :src="img"
                    :alt="`房型${index + 1}-图片${imgIndex + 1}`"
                    class="preview-image"
                  />
                  <button
                    type="button"
                    @click="removeImage(index, imgIndex)"
                    class="remove-image-btn"
                  >
                    <a-icon type="close" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 提交按钮 -->
        <div class="submit-bar">
          <a-button class="submit-btn" size="large">
            保存草稿
          </a-button>
          <a-button
            type="primary"
            :loading="isSubmitting"
            html-type="submit"
            size="large"
            class="submit-btn"
          >
            {{ isSubmitting ? '提交中...' : '提交申请' }}
          </a-button>
        </div>
      </form>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import JoinApplicationService from './services/joinApplication.service'
import {
  StoreTypeLabels,
  OTAPlatformLabels,
  OTAChallengeLabels,
} from './types/joinApplication.types'

export default defineComponent({
  name: 'JoinApplicationPage',
  components: {
    Sidebar
  },
  setup(props, { root }) {
    // 表单数据
    const formData = ref({
      adminPhone: '',
      adminName: '',
      storeName: '',
      storeType: undefined,
      bookingPlatform: '',
      storeAddress: '',
      storeDescription: '',
      hasOTASpecialist: false,
      otaContactName: '',
      otaContactPhone: '',
      onlinePlatforms: [],
      hasCtripSpecialOffer: false,
      interestedPlatforms: [],
      otaChallenges: [],
      roomTypeImages: [],
    })

    // 房型图片管理
    const roomTypes = ref([
      { roomTypeName: '', images: [] }
    ])

    // 图片拖拽状态
    const dragIndex = ref(null)

    // 提交状态
    const isSubmitting = ref(false)

    // 添加房型
    const addRoomType = () => {
      roomTypes.value.push({ roomTypeName: '', images: [] })
    }

    // 移除房型
    const removeRoomType = (index) => {
      if (roomTypes.value.length > 1) {
        roomTypes.value = roomTypes.value.filter((_, i) => i !== index)
      }
    }

    // 处理图片拖拽上传
    const handleDrop = (event, index) => {
      dragIndex.value = null
      const files = Array.from(event.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      )

      if (files.length > 0) {
        const newImages = files.map(file => URL.createObjectURL(file))
        roomTypes.value[index].images = [...roomTypes.value[index].images, ...newImages]
      }
    }

    // 移除图片
    const removeImage = (roomIndex, imageIndex) => {
      roomTypes.value[roomIndex].images = roomTypes.value[roomIndex].images.filter(
        (_, i) => i !== imageIndex
      )
    }

    // 切换平台选择
    const togglePlatform = (field, platform) => {
      const current = formData.value[field] || []
      if (current.includes(platform)) {
        formData.value[field] = current.filter(p => p !== platform)
      } else {
        formData.value[field] = [...current, platform]
      }
    }

    // 切换困境选择
    const toggleChallenge = (challenge) => {
      const current = formData.value.otaChallenges || []
      if (current.includes(challenge)) {
        formData.value.otaChallenges = current.filter(c => c !== challenge)
      } else {
        formData.value.otaChallenges = [...current, challenge]
      }
    }

    // 提交表单
    const handleSubmit = async () => {
      try {
        isSubmitting.value = true
        const submitData = {
          ...formData.value,
          roomTypeImages: roomTypes.value,
        }
        await JoinApplicationService.submitApplication(submitData)
        root.$message.success('入驻申请已提交！')
      } catch (error) {
        root.$message.error('提交失败，请重试')
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      roomTypes,
      dragIndex,
      isSubmitting,
      storeTypeLabels: StoreTypeLabels,
      otaPlatformLabels: OTAPlatformLabels,
      otaChallengeLabels: OTAChallengeLabels,
      addRoomType,
      removeRoomType,
      handleDrop,
      removeImage,
      togglePlatform,
      toggleChallenge,
      handleSubmit,
    }
  }
})
</script>

<style scoped lang="less">
.join-application-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 0 0 8px 0;
  }

  .page-desc {
    font-size: 14px;
    color: #666666;
    margin: 0;
  }
}

.application-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 卡片样式
.form-card {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  :deep(.ant-card-head) {
    padding: 16px 24px;
    border-bottom: 1px solid #f1f5f9;
  }

  :deep(.ant-card-body) {
    padding: 24px;
  }
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
}

.card-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.add-btn {
  height: 28px;
  padding: 0 12px;
  font-size: 13px;
  color: #3b82f6;
  border-color: #3b82f6;

  &:hover {
    color: #2563eb;
    border-color: #2563eb;
  }
}

// 表单区域
.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);

  .required {
    color: #ef4444;
    margin-left: 2px;
  }
}

// 输入框样式
.form-input {
  height: 36px;

  :deep(.ant-input) {
    height: 36px;
    border-radius: 6px;
    border-color: #cbd5e1;
    font-size: 14px;

    &:hover {
      border-color: #94a3b8;
    }

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #b1b1b1;
    }
  }
}

.form-textarea {
  :deep(.ant-input) {
    border-radius: 6px;
    border-color: #cbd5e1;
    font-size: 14px;

    &:hover {
      border-color: #94a3b8;
    }

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #b1b1b1;
    }
  }
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #b1b1b1;
  margin-top: -4px;
}

// 选择按钮组
.choice-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.choice-btn {
  height: 40px;
  padding: 0 20px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: #f0f7ff;
  }

  &.active {
    border-color: #3b82f6;
    background: #3b82f6;
    color: #ffffff;
  }
}

// 标签按钮组
.tag-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-btn {
  height: 32px;
  padding: 0 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.9);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: #f0f7ff;
  }

  &.active {
    border-color: #3b82f6;
    background: #3b82f6;
    color: #ffffff;
  }
}

// 复选框网格
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: #f0f7ff;
  }

  span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    user-select: none;
  }
}

.checkbox-single {
  width: fit-content;
  min-width: 200px;
}

// 展开动画
.expand-section {
  margin-top: 16px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

// 房型图片
.room-type-item {
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fafafa;

  & + & {
    margin-top: 16px;
  }
}

.room-type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.room-type-label {
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  white-space: nowrap;
}

.room-type-input {
  flex: 1;

  :deep(.ant-input) {
    height: 32px;
    border-radius: 6px;
    border-color: #cbd5e1;
    background: #ffffff;
    font-size: 14px;

    &::placeholder {
      color: #b1b1b1;
    }
  }
}

.remove-btn {
  padding: 0 8px;
  color: #ef4444;

  &:hover {
    color: #dc2626;
  }
}

// 上传区域
.upload-area {
  padding: 40px 20px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  text-align: center;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    background: #f0f7ff;
  }

  &.dragging {
    border-color: #3b82f6;
    background: #dbeafe;
  }
}

.upload-icon {
  font-size: 48px;
  color: #cbd5e1;
  margin-bottom: 12px;
}

.upload-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 12px;
  color: #b1b1b1;
  margin: 0 0 16px 0;
}

.upload-btn {
  height: 32px;
  padding: 0 24px;
  font-size: 13px;
}

// 图片预览
.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.image-preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  background: #f1f5f9;

  &:hover .remove-image-btn {
    opacity: 1;
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  color: #ffffff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ef4444;
  }
}

// 提交按钮栏
.submit-bar {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}

.submit-btn {
  height: 40px;
  padding: 0 32px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
}
</style>
