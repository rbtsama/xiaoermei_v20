<template>
  <div class="tab4-container">
    <!-- 门店展示 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店展示</span>
      </template>

      <div class="upload-list">
        <!-- 门店logo -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">门店logo <span class="required">*</span></span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/门店logo.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议尺寸1:1，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.images.logo"
              :multiple="false"
              :maxSize="5"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 门店主页首图 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">门店主页首图 <span class="required">*</span></span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/门店主页首图.png')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议比例2:3，最多5张，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.images.homePageImages"
              :multiple="true"
              :maxCount="5"
              :maxSize="10"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 列表页封面 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">列表页封面 <span class="required">*</span></span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/列表封面.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议比例4:3，宽度>1000px，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.images.listCover"
              :multiple="false"
              :maxSize="10"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 房型图 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">房型图 <span class="required">*</span></span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/房型图.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议比例3:2，最多10张，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.images.roomImages"
              :multiple="true"
              :maxCount="10"
              :maxSize="10"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 旅游交通图 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">旅游交通图 <span class="required">*</span></span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/旅游交通图.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">标注门店位置及周边交通、景点，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.images.travelMap"
              :multiple="false"
              :maxSize="10"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 小程序分享图 -->
        <div v-if="localData.images.listCover" class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">小程序分享图（自动生成）</span>
            </div>
            <div class="upload-hint">由列表页封面自动生成，比例5:4</div>
          </div>
          <div class="upload-action">
            <div class="auto-generated-preview">
              <img :src="localData.images.listCover" alt="预览" />
            </div>
          </div>
        </div>

        <!-- 视频封面 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">视频封面</span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/视频封面.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议比例16:9，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.videos.videoCover"
              :multiple="false"
              :maxSize="5"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 最新情报 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">最新情报</span>
              <a-button type="link" size="small" @click="handlePreviewExample('/examples/最新情报.jpg')" class="example-link">
                <a-icon type="picture" />
                图片实例
              </a-button>
            </div>
            <div class="upload-hint">建议竖版长图，宽度750px左右，支持jpg、png格式</div>
          </div>
          <div class="upload-action">
            <image-upload
              v-model="localData.videos.latestNews"
              :multiple="false"
              :maxSize="10"
              :disabled="isLocked"
              @change="handleChange"
            />
          </div>
        </div>

        <!-- 门店视频 -->
        <div class="upload-row">
          <div class="upload-info">
            <div class="upload-header">
              <span class="upload-label">门店视频</span>
            </div>
            <div class="upload-hint">建议比例16:9，大小不超过100MB，支持mp4、mov、avi格式</div>
          </div>
          <div class="upload-action">
            <div class="video-upload-area">
              <a-upload
                :file-list="videoFileList"
                :before-upload="handleVideoUpload"
                :remove="handleVideoRemove"
                :disabled="isLocked"
                accept="video/mp4,video/quicktime,video/x-msvideo"
              >
                <a-button v-if="!localData.videos.video" :disabled="isLocked">
                  <a-icon type="upload" /> 上传视频
                </a-button>
              </a-upload>
            </div>
          </div>
        </div>
      </div>
    </a-card>

    <!-- 示例图片预览弹窗 -->
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="previewVisible = false"
      width="800px"
      centered
    >
      <img :src="previewImage" style="width: 100%" alt="示例图片" />
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch, ref } from '@vue/composition-api'
import ImageUpload from '@/components/StoreDeployment/ImageUpload.vue'
import { uploadVideo } from '@/api/storeDeployment'

export default defineComponent({
  name: 'Tab4StoreDisplay',
  components: {
    ImageUpload
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    isLocked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root }) {
    // 本地数据
    const localData = reactive({
      images: {
        ...props.formData.storeDisplay.images,
        roomImages: props.formData.storeDisplay.images?.roomImages || []
      },
      videos: { ...props.formData.storeDisplay.videos }
    })

    // 示例图片预览
    const previewVisible = ref(false)
    const previewImage = ref('')

    // 视频文件列表
    const videoFileList = computed(() => {
      if (localData.videos.video) {
        return [{
          uid: '-1',
          name: '门店视频',
          status: 'done',
          url: localData.videos.video
        }]
      }
      return []
    })

    // 监听props变化
    watch(
      () => props.formData.storeDisplay,
      (newData) => {
        localData.images = { ...newData.images }
        localData.videos = { ...newData.videos }
      },
      { deep: true }
    )

    // 视频上传
    const handleVideoUpload = async (file) => {
      const isVideo = file.type.startsWith('video/')
      if (!isVideo) {
        root.$message.error('只能上传视频文件！')
        return false
      }

      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        root.$message.error('视频大小不能超过100MB！')
        return false
      }

      try {
        const result = await uploadVideo(file)
        localData.videos.video = result.url
        handleChange()
        root.$message.success('视频上传成功')
      } catch (error) {
        root.$message.error('视频上传失败')
        console.error(error)
      }

      return false
    }

    // 视频删除
    const handleVideoRemove = () => {
      localData.videos.video = ''
      localData.videos.videoCover = ''
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        storeDisplay: {
          ...props.formData.storeDisplay,
          images: localData.images,
          videos: localData.videos
        }
      })
    }

    // 查看示例图片
    const handlePreviewExample = (imagePath) => {
      previewImage.value = imagePath
      previewVisible.value = true
    }

    return {
      localData,
      videoFileList,
      previewVisible,
      previewImage,
      handleVideoUpload,
      handleVideoRemove,
      handleChange,
      handlePreviewExample
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab4-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.upload-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-primary;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.upload-info {
  flex: 0 0 300px;
}

.upload-action {
  flex: 1;
}

.upload-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.upload-label {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;  // 600 加粗
  color: @text-primary;
}

.upload-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;  // 与field-hint统一
}

.example-link {
  padding: 0 8px;
  font-size: @font-size-sm;
  color: @brand-primary;
  height: auto;
  line-height: 1;

  &:hover {
    color: @brand-primary-hover;
  }

  :deep(.anticon) {
    font-size: @font-size-sm;
  }
}

.required {
  color: @error-color;
  margin-left: 2px;
}

.auto-generated-preview {
  width: 150px;
  height: 150px;
  border-radius: @border-radius-base;
  overflow: hidden;
  border: 1px solid @border-primary;
  background: @bg-secondary;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
}

.video-upload-area {
  :deep(.ant-upload-list-item) {
    border-radius: @border-radius-base;
  }
}

:deep(.ant-divider) {
  margin: 24px 0;
}
</style>
