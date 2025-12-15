<template>
  <div class="tab4-container">
    <!-- 门店展示 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店展示</span>
      </template>

      <div class="images-grid-3">
        <!-- 门店logo -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">门店logo</span>
            <a-tag color="red" size="small">必填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/门店logo.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">建议尺寸1:1</p>
          <image-upload
            v-model="localData.images.logo"
            :multiple="false"
            :maxSize="5"
            ratio="1:1"
            compact
            @change="handleChange"
          />
        </div>

        <!-- 门店主页首图 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">门店主页首图</span>
            <a-tag color="red" size="small">必填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/门店主页首图.png')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">建议图片比例2:3，最多5张</p>
          <image-upload
            v-model="localData.images.homePageImages"
            :multiple="true"
            :maxCount="5"
            :maxSize="10"
            ratio="2:3"
            compact
            @change="handleChange"
          />
        </div>

        <!-- 列表页封面 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">列表页封面</span>
            <a-tag color="red" size="small">必填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/列表封面.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">平台首页的门店列表封面，建议尺寸4:3，宽度大于1000px</p>
          <image-upload
            v-model="localData.images.listCover"
            :multiple="false"
            :maxSize="10"
            ratio="4:3"
            compact
            @change="handleChange"
          />
        </div>

        <!-- 房型图 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">房型图</span>
            <a-tag color="red" size="small">必填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/房型图.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">建议尺寸3:2，最多可上传10张</p>
          <image-upload
            v-model="localData.images.roomImages"
            :multiple="true"
            :maxCount="10"
            :maxSize="10"
            ratio="3:2"
            compact
            @change="handleChange"
          />
        </div>

        <!-- 旅游交通图 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">旅游交通图</span>
            <a-tag color="red" size="small">必填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/旅游交通图.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">标注门店位置及周边交通、景点的地图</p>
          <image-upload
            v-model="localData.images.travelMap"
            :multiple="false"
            :maxSize="10"
            compact
            @change="handleChange"
          />
        </div>

        <!-- 小程序分享图 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">小程序分享图</span>
            <a-tag color="blue" size="small">自动生成</a-tag>
          </div>
          <p class="upload-hint">上传列表页封面后自动生成，居中切5:4</p>
          <div v-if="localData.images.listCover" class="auto-generated-preview">
            <img :src="localData.images.listCover" alt="预览" />
          </div>
          <div v-else class="empty-preview">请先上传列表页封面</div>
        </div>

        <!-- 门店视频 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">门店视频</span>
            <a-tag color="blue" size="small">选填</a-tag>
          </div>
          <p class="upload-hint">请上传16:9大小不超过100MB格式为*.mp4 *.mov *.avi的文件</p>
          <div class="video-upload-area">
            <a-upload
              :file-list="videoFileList"
              :before-upload="handleVideoUpload"
              :remove="handleVideoRemove"
              accept="video/mp4,video/quicktime,video/x-msvideo"
            >
              <a-button v-if="!localData.videos.video">
                <a-icon type="upload" /> 上传视频
              </a-button>
            </a-upload>
          </div>
        </div>

        <!-- 视频封面 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">视频封面</span>
            <a-tag color="blue" size="small">选填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/视频封面.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">请上传16:9的图片</p>
          <image-upload
            v-model="localData.videos.videoCover"
            :multiple="false"
            :maxSize="5"
            ratio="16:9"
            @change="handleChange"
          />
        </div>

        <!-- 最新情报 -->
        <div class="image-upload-item">
          <div class="upload-label">
            <span class="label-text">最新情报</span>
            <a-tag color="blue" size="small">选填</a-tag>
            <a-button type="link" size="small" @click="handlePreviewExample('/examples/最新情报.jpg')" class="example-link">
              图片实例
            </a-button>
          </div>
          <p class="upload-hint">建议上传排版好的拼接长图文，整体介绍门店、最新活动和品牌故事，丰富门店首页内容</p>
          <image-upload
            v-model="localData.videos.latestNews"
            :multiple="false"
            :maxSize="10"
            @change="handleChange"
          />
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

.highlight-category {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-title {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
  margin-bottom: 16px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
    padding: 10px 12px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
    background: @bg-primary;
    transition: all 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.05);
    }

    &.ant-checkbox-wrapper-checked {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.08);
    }

    .ant-checkbox {
      top: 0;
    }
  }
}

.images-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.subsection-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid @bg-secondary;
}

.image-upload-item {
  // 每个上传项的容器
}

.image-upload-section {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
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

.label-text {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.upload-hint {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-bottom: 16px;
  line-height: 1.6;
}

.auto-generated-preview {
  width: 100%;
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

.empty-preview {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @text-secondary;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px dashed @border-primary;
  font-size: @font-size-sm;
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
