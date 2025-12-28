<template>
  <a-modal
    :visible="visible"
    :width="900"
    :footer="null"
    :maskClosable="false"
    @cancel="handleClose"
    class="first-time-guide-dialog"
  >
    <template slot="title">
      <div class="dialog-title">
        <a-icon type="file-text" class="title-icon" />
        <span>欢迎入驻平台！请提前准备以下材料后开始填写。</span>
      </div>
    </template>

    <div class="guide-content">

      <!-- 材料清单 -->
      <div class="materials-section">
        <!-- 1. 证件资料 -->
        <div class="material-card">
          <div class="card-header">
            <a-icon type="safety-certificate" class="header-icon cert-icon" />
            <span class="card-title">证件资料</span>
          </div>
          <div class="card-content">
            <div class="material-list">
              <div class="material-item">
                <span class="item-number">1</span>
                <div class="item-content">
                  <span class="item-title">营业执照扫描件/照片</span>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">2</span>
                <div class="item-content">
                  <span class="item-title">法人身份证正反面照片</span>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">3</span>
                <div class="item-content">
                  <span class="item-title">特种行业许可证（如有）</span>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">4</span>
                <div class="item-content">
                  <div class="item-title-wrapper">
                    <span class="item-title">收款账户信息</span>
                  </div>
                </div>
              </div>
              <div class="material-sub-item">
                <div class="sub-item-label">公司：</div>
                <div class="sub-item-content">对公账户信息（银行卡号、开户行、开户名）</div>
              </div>
              <div class="material-sub-item">
                <div class="sub-item-label">个体工商户：</div>
                <div class="sub-item-content">法人个人银行卡信息（银行卡号、开户行、开户名）</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. 门店基本信息 -->
        <div class="material-card">
          <div class="card-header">
            <a-icon type="shop" class="header-icon store-icon" />
            <span class="card-title">门店基本信息</span>
          </div>
          <div class="card-content">
            <div class="material-list">
              <div class="material-item">
                <span class="item-number">1</span>
                <div class="item-content">
                  <span class="item-title">门店名称、详细地址、联系电话</span>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">2</span>
                <div class="item-content">
                  <span class="item-title">PMS系统信息（如：订单来了门店编号）</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 图片素材 -->
        <div class="material-card">
          <div class="card-header">
            <a-icon type="picture" class="header-icon image-icon" />
            <span class="card-title">图片素材</span>
          </div>
          <div class="card-content">
            <div class="material-list">
              <div class="material-item">
                <span class="item-number">1</span>
                <div class="item-content">
                  <span class="item-title">门店Logo（1:1，jpg/png格式）</span>
                  <a-button type="link" size="small" @click="handlePreviewExample('logo')" class="example-btn">
                    <a-icon type="picture" />查看示例
                  </a-button>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">2</span>
                <div class="item-content">
                  <span class="item-title">门店主页首图（2:3比例，最多5张）</span>
                  <a-button type="link" size="small" @click="handlePreviewExample('home-page')" class="example-btn">
                    <a-icon type="picture" />查看示例
                  </a-button>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">3</span>
                <div class="item-content">
                  <span class="item-title">列表页封面（4:3比例，宽度>1000px）</span>
                  <a-button type="link" size="small" @click="handlePreviewExample('list-cover')" class="example-btn">
                    <a-icon type="picture" />查看示例
                  </a-button>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">4</span>
                <div class="item-content">
                  <span class="item-title">旅游交通图、门店视频（如有）</span>
                  <a-button type="link" size="small" @click="handlePreviewExample('travel-map')" class="example-btn">
                    <a-icon type="picture" />查看示例
                  </a-button>
                </div>
              </div>
              <div class="material-item">
                <span class="item-number">5</span>
                <div class="item-content">
                  <span class="item-title">房型图片（每个房型3-5张）</span>
                  <a-button type="link" size="small" @click="handlePreviewExample('room-images')" class="example-btn">
                    <a-icon type="picture" />查看示例
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 底部操作按钮 -->
      <div class="dialog-footer">
        <a-button type="primary" size="large" @click="handleStart" class="start-btn">
          <a-icon type="check-circle" />
          我准备好了，开始填写
        </a-button>
      </div>
    </div>

    <!-- 示例预览弹窗 -->
    <a-modal
      :visible="previewVisible"
      :footer="null"
      :width="600"
      @cancel="previewVisible = false"
      class="example-preview-modal"
    >
      <template slot="title">
        <span>{{ previewTitle }}</span>
      </template>
      <div class="preview-content">
        <img v-if="previewType === 'image'" :src="previewUrl" alt="示例图片" class="preview-image" />
        <div v-else class="preview-text" v-html="previewContent"></div>
      </div>
    </a-modal>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'FirstTimeGuideDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const previewVisible = ref(false)
    const previewTitle = ref('')
    const previewType = ref('image') // 'image' | 'text'
    const previewUrl = ref('')
    const previewContent = ref('')

    // 示例数据映射
    const exampleData = {
      'license': {
        title: '营业执照示例',
        type: 'image',
        url: '/examples/营业执照示例.jpg',
        content: ''
      },
      'id-card': {
        title: '身份证示例',
        type: 'image',
        url: '/examples/身份证示例.jpg',
        content: ''
      },
      'special-license': {
        title: '特种行业许可证示例',
        type: 'image',
        url: '/examples/特种许可证示例.jpg',
        content: ''
      },
      'logo': {
        title: '门店Logo示例',
        type: 'image',
        url: '/examples/门店logo.jpg',
        content: ''
      },
      'home-page': {
        title: '门店主页首图示例',
        type: 'image',
        url: '/examples/门店主页首图.png',
        content: ''
      },
      'list-cover': {
        title: '列表页封面示例',
        type: 'image',
        url: '/examples/列表封面.jpg',
        content: ''
      },
      'travel-map': {
        title: '旅游交通图示例',
        type: 'image',
        url: '/examples/旅游交通图.jpg',
        content: ''
      },
      'room-images': {
        title: '房型图片示例',
        type: 'image',
        url: '/examples/房型图片示例.png',
        content: ''
      },
      'store-info': {
        title: '门店信息示例',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 12px;"><strong>门店名称：</strong>原乡芦茨</p>
          <p style="margin-bottom: 12px;"><strong>详细地址：</strong>浙江省杭州市桐庐县芦茨村石舍路128号</p>
          <p style="margin-bottom: 12px;"><strong>预订电话：</strong>13575481983</p>
          <p style="margin-bottom: 12px;"><strong>预订微信：</strong>lucun_hotel</p>
        `
      },
      'pms-info': {
        title: 'PMS系统说明',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 12px;"><strong>订单来了：</strong>需要提供门店编号，例如：69808093</p>
          <p style="margin-bottom: 12px;"><strong>其他系统：</strong>请联系平台客服对接</p>
        `
      },
      'facilities': {
        title: '门店设施分类',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 8px;"><strong>交通服务：</strong>免费停车场、机场接送、火车站接送等</p>
          <p style="margin-bottom: 8px;"><strong>清洁服务：</strong>每日客房清洁、洗衣服务、干洗服务等</p>
          <p style="margin-bottom: 8px;"><strong>安全安保：</strong>24小时监控、门禁系统、保险箱等</p>
          <p style="margin-bottom: 8px;"><strong>公共区域：</strong>大堂、餐厅、休息区、会议室等</p>
        `
      },
      'check-in-policy': {
        title: '入住政策示例',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 12px;"><strong>办理入住时间：</strong>14:30（入住日当天下午2:30开始办理）</p>
          <p style="margin-bottom: 12px;"><strong>最晚退房时间：</strong>12:00（离店日中午12点前退房）</p>
          <p style="margin-bottom: 12px;"><strong>最晚预订时间：</strong>14:30（入住日当天下午2:30前完成预订）</p>
        `
      },
      'policies': {
        title: '政策示例',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 8px;"><strong>取消政策：</strong>入住前3天免费取消，3天内取消收取首晚房费</p>
          <p style="margin-bottom: 8px;"><strong>儿童政策：</strong>1.2米以下儿童免费，1.2-1.5米儿童加收早餐费</p>
          <p style="margin-bottom: 8px;"><strong>宠物政策：</strong>允许携带宠物，需提前告知并支付清洁费</p>
        `
      },
      'room-basic': {
        title: '房型基本信息示例',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 12px;"><strong>房型名称：</strong>豪华大床房</p>
          <p style="margin-bottom: 12px;"><strong>房型面积：</strong>35㎡</p>
          <p style="margin-bottom: 12px;"><strong>床型：</strong>1.8米大床</p>
          <p style="margin-bottom: 12px;"><strong>楼层：</strong>3-5层</p>
          <p style="margin-bottom: 12px;"><strong>可住人数：</strong>2人</p>
        `
      },
      'room-facilities': {
        title: '房型设施分类',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 8px;"><strong>卫浴设施：</strong>独立卫浴、淋浴、浴缸、吹风机等</p>
          <p style="margin-bottom: 8px;"><strong>家用电器：</strong>电视、空调、冰箱、电热水壶等</p>
          <p style="margin-bottom: 8px;"><strong>洗漱用品：</strong>毛巾、牙刷、牙膏、洗发水、沐浴露等</p>
          <p style="margin-bottom: 8px;"><strong>其他设施：</strong>保险箱、衣柜、书桌、WIFI等</p>
        `
      },
      'payment-info': {
        title: '结算信息说明',
        type: 'text',
        url: '',
        content: `
          <p style="margin-bottom: 12px;"><strong>收款账户：</strong>需要提供银行卡号、开户行、开户名</p>
          <p style="margin-bottom: 12px;"><strong>结算周期：</strong>通常为月结或周结，具体由平台协商确定</p>
          <p style="margin-bottom: 12px;"><strong>发票信息：</strong>如需开具发票，请准备好开票信息</p>
        `
      }
    }

    // 预览图片示例
    const handlePreviewExample = (type) => {
      const data = exampleData[type]
      if (data) {
        previewTitle.value = data.title
        previewType.value = data.type
        previewUrl.value = data.url
        previewContent.value = data.content
        previewVisible.value = true
      }
    }

    // 预览信息示例
    const handlePreviewInfo = (type) => {
      const data = exampleData[type]
      if (data) {
        previewTitle.value = data.title
        previewType.value = data.type
        previewUrl.value = data.url
        previewContent.value = data.content
        previewVisible.value = true
      }
    }

    // 关闭弹窗
    const handleClose = () => {
      emit('close')
    }

    // 开始填写
    const handleStart = () => {
      emit('start')
    }

    return {
      previewVisible,
      previewTitle,
      previewType,
      previewUrl,
      previewContent,
      handlePreviewExample,
      handlePreviewInfo,
      handleClose,
      handleStart
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.first-time-guide-dialog {
  :deep(.ant-modal-header) {
    border-bottom: 1px solid @border-primary;
    padding: 20px 24px;
  }

  :deep(.ant-modal-body) {
    padding: 0;
    max-height: 70vh;
    overflow-y: auto;
  }

  :deep(.ant-modal-close-x) {
    width: 56px;
    height: 56px;
    line-height: 56px;
  }
}

.dialog-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;

  .title-icon {
    font-size: 20px;
    color: @brand-primary;
  }
}

.guide-content {
  padding: 24px;
}

.materials-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.material-card {
  border: 1px solid @border-primary;
  border-radius: @border-radius-lg;
  background: @bg-primary;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: @shadow-sm;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;

    .header-icon {
      font-size: 18px;
    }

    .cert-icon {
      color: #f59e0b;
    }

    .store-icon {
      color: #3b82f6;
    }

    .image-icon {
      color: #10b981;
    }

    .policy-icon {
      color: #8b5cf6;
    }

    .room-icon {
      color: #ec4899;
    }

    .payment-icon {
      color: #06b6d4;
    }

    .card-title {
      font-size: @font-size-base;
      font-weight: @font-weight-semibold;
      color: @text-primary;
    }
  }

  .card-content {
    padding: 16px 20px;
  }
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.material-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .item-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    background: @brand-primary;
    color: @bg-primary;
    border-radius: 50%;
    font-size: 12px;
    font-weight: @font-weight-semibold;
    margin-top: 2px;
  }

  .item-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .item-title {
      flex: 1;
      font-size: @font-size-base;
      color: @text-primary;
      line-height: 1.6;
    }

    .example-btn {
      padding: 0;
      height: auto;
      font-size: @font-size-sm;
      color: @brand-primary;
      flex-shrink: 0;

      &:hover {
        color: @brand-primary-hover;
      }

      .anticon {
        margin-right: 4px;
      }
    }
  }
}

.material-sub-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-left: 32px;
  margin-top: 8px;
  padding-left: 12px;
  border-left: 2px solid @border-primary;

  .sub-item-label {
    font-size: @font-size-sm;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .sub-item-content {
    font-size: @font-size-sm;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid @border-primary;

  .start-btn {
    height: 40px;
    padding: 0 32px;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    border-radius: @border-radius-base;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

    &:hover {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
  }
}

// 示例预览弹窗
.example-preview-modal {
  :deep(.ant-modal-body) {
    padding: 24px;
  }

  .preview-content {
    .preview-image {
      width: 100%;
      border-radius: @border-radius-base;
    }

    .preview-text {
      font-size: @font-size-base;
      color: @text-primary;
      line-height: 1.8;
    }
  }
}
</style>
