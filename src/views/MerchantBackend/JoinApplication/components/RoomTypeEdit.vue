<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="1000px"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
    class="room-edit-modal"
  >
    <div class="form-container">
      <a-form-model
        :model="localData"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
      >
        <!-- 基础信息分类 -->
        <div class="section-title">基础信息</div>

        <!-- 房型名称 -->
        <a-form-model-item label="房型名称" required>
          <a-input
            v-model="localData.roomTypeName"
            placeholder="山景大床房"
            :maxLength="20"
          />
          <div class="field-hint">房型的名称展示</div>
        </a-form-model-item>

        <!-- 该房型数量 -->
        <a-form-model-item label="该房型数量" required>
          <a-input-number
            v-model="localData.roomCount"
            :min="1"
            :max="100"
            :precision="0"
            placeholder="2"
            style="width: 100%"
          />
          <div class="field-hint">该房型的房间总数</div>
        </a-form-model-item>

        <!-- 房型特色 -->
        <a-form-model-item label="房型特色">
          <div class="feature-tags">
            <a-tag
              v-for="(feature, index) in localData.roomFeatures"
              :key="index"
              closable
              @close="handleRemoveFeature(index)"
              class="feature-tag"
            >
              {{ feature }}
            </a-tag>
            <a-input
              v-if="featureInputVisible"
              ref="featureInput"
              v-model="featureInputValue"
              type="text"
              size="small"
              :maxLength="7"
              placeholder="最多7个字"
              @blur="handleFeatureInputConfirm"
              @keyup.enter="handleFeatureInputConfirm"
              class="feature-input"
            />
            <a-tag
              v-else
              @click="showFeatureInput"
              class="add-feature-tag"
            >
              <a-icon type="plus" /> 添加特色
            </a-tag>
          </div>
          <div class="field-hint">点击添加房型特色标签，最多7个字</div>
        </a-form-model-item>

        <!-- 房型说明 -->
        <a-form-model-item label="房型说明">
          <a-textarea
            v-model="localData.roomDescription"
            placeholder="介绍房型特色、优势等"
            :rows="3"
            :maxLength="200"
          />
          <div class="field-hint">介绍房型特色、优势等，最多200字</div>
        </a-form-model-item>

        <!-- 房型图片 -->
        <a-form-model-item label="房型图片" required>
          <image-upload
            v-model="localData.images"
            :multiple="true"
            :maxCount="10"
            :maxSize="10"
          />
          <div class="field-hint">展示房间内部照片，包括床、卫浴、窗景等，建议比例3:2，最多10张，最少1张，支持jpg、png格式</div>
        </a-form-model-item>

        <!-- 楼层 -->
        <a-form-model-item label="楼层">
          <a-input
            v-model="localData.floor"
            placeholder="多个楼层用逗号分隔，如2,3,4；地下室用负数，如-1,-2"
            :maxLength="50"
          />
          <div class="field-hint">房型所在楼层，多个楼层用逗号分隔；地下室用负数表示（-1为地下一层）</div>
        </a-form-model-item>

        <!-- 房间面积 -->
        <a-form-model-item label="房间面积（㎡）" required>
          <a-input-number
            v-model="localData.area"
            :min="1"
            :max="500"
            :precision="0"
            placeholder="35"
            style="width: 100%"
          />
          <div class="field-hint">房间的实际面积</div>
        </a-form-model-item>

        <!-- 是否有窗 -->
        <a-form-model-item label="是否有窗" required>
          <a-radio-group v-model="localData.hasWindow">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <!-- 是否禁烟 -->
        <a-form-model-item label="是否禁烟" required>
          <a-radio-group v-model="localData.nonSmoking">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <!-- 携带宠物 -->
        <a-form-model-item label="携带宠物" required>
          <a-radio-group v-model="localData.petsAllowed">
            <a-radio :value="false">不允许</a-radio>
            <a-radio :value="true">允许</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <!-- 可住人数 -->
        <a-form-model-item label="可住人数" required>
          <a-input-number
            v-model="localData.capacity"
            :min="1"
            :max="20"
            :precision="0"
            placeholder="2"
            style="width: 200px"
          />
          <div class="field-hint">该房型最多可入住人数</div>
        </a-form-model-item>

        <!-- 允许加客 -->
        <a-form-model-item label="允许加客">
          <a-radio-group v-model="localData.allowExtraGuest">
            <a-radio :value="AllowExtraGuest.NOT_ALLOWED">不允许</a-radio>
            <a-radio :value="AllowExtraGuest.ALLOWED">允许</a-radio>
          </a-radio-group>
          <div class="field-hint">是否允许在基础人数外加人</div>
        </a-form-model-item>

        <!-- 加客配置（条件显示） -->
        <template v-if="localData.allowExtraGuest === AllowExtraGuest.ALLOWED">
          <!-- 最多可加人数 -->
          <a-form-model-item label="最多可加人数" required>
            <a-input-number
              v-model="localData.maxExtraGuests"
              :min="1"
              :max="10"
              :precision="0"
              placeholder="1"
              style="width: 200px"
            />
            <div class="field-hint">最多可加人数</div>
          </a-form-model-item>

          <!-- 加客费用 -->
          <a-form-model-item label="加客费用（元/人）" required>
            <a-input-number
              v-model="localData.extraGuestFee"
              :min="0"
              :precision="0"
              placeholder="200"
              style="width: 200px"
            />
            <div class="field-hint">每增加一人的费用</div>
          </a-form-model-item>
        </template>

        <!-- 房间布局 -->
        <a-form-model-item label="房间布局" required>
          <a-row :gutter="12" type="flex" align="middle">
            <a-col flex="none"><span>客厅</span></a-col>
            <a-col flex="100px">
              <a-input-number v-model="localData.roomLayout.livingRooms" :min="0" :precision="0" placeholder="0" style="width: 100%" />
            </a-col>
            <a-col flex="none"><span>间，卫生间</span></a-col>
            <a-col flex="100px">
              <a-input-number v-model="localData.roomLayout.bathrooms" :min="0" :precision="0" placeholder="1" style="width: 100%" />
            </a-col>
            <a-col flex="none"><span>间，卧室</span></a-col>
            <a-col flex="100px">
              <a-input-number v-model="localData.roomLayout.bedrooms" :min="1" :precision="0" placeholder="1" style="width: 100%" @change="handleBedroomsChange" />
            </a-col>
            <a-col flex="none"><span>间</span></a-col>
          </a-row>
          <div class="field-hint">配置房间的客厅、卫生间、卧室数量</div>
        </a-form-model-item>

        <!-- 床型配置（动态生成） -->
        <template v-if="localData.roomLayout.bedrooms > 0">
          <a-form-model-item label="床型配置" class="bed-config-wrapper">
            <div
              v-for="(bedroom, idx) in localData.roomLayout.bedroomConfigs"
              :key="idx"
              class="bedroom-config"
            >
              <div class="bedroom-header">
                <span class="bedroom-label">卧室{{ idx + 1 }}：</span>
                <span>床数量</span>
                <a-input-number
                  v-model="bedroom.bedCount"
                  :min="1"
                  :precision="0"
                  placeholder="1"
                  style="width: 80px; margin: 0 8px;"
                  @change="handleBedCountChange(idx)"
                />
                <span>张</span>
              </div>

              <div class="beds-list">
                <div
                  v-for="(bed, bedIdx) in bedroom.beds"
                  :key="bedIdx"
                  class="bed-item"
                >
                  <span class="bed-label">床{{ bedIdx + 1 }}：</span>
                  <span>床型</span>
                  <a-select v-model="bed.type" placeholder="常规大床/单人床" style="width: 160px; margin: 0 8px;">
                    <a-select-option v-for="t in bedTypeOptions" :key="t" :value="t">{{ t }}</a-select-option>
                  </a-select>
                  <span>，床宽</span>
                  <a-select v-model="bed.width" style="width: 100px; margin: 0 8px;">
                    <a-select-option v-for="w in bedWidthOptions" :key="w" :value="w">{{ w }}m</a-select-option>
                  </a-select>
                  <span>× 床长</span>
                  <a-select v-model="bed.length" style="width: 100px; margin: 0 8px;">
                    <a-select-option v-for="l in bedLengthOptions" :key="l" :value="l">{{ l }}m</a-select-option>
                  </a-select>
                </div>
              </div>
            </div>
          </a-form-model-item>
        </template>

        <!-- 房型设施分类 -->
        <div class="section-title section-spacing">房型设施</div>

        <!-- 房型设施 -->
        <a-form-model-item>
          <div class="facilities-grid">
            <div class="facility-item">
              <div class="facility-label">客房设施 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.roomFacilities" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in ROOM_FACILITIES" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">客房布局和家具 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.roomLayout" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in ROOM_LAYOUT_FURNITURE" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">卫浴设施 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.bathroom" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in BATHROOM_FACILITIES" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">洗浴用品 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.toiletries" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in TOILETRIES" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">床上用品</div>
              <a-checkbox-group v-model="localData.facilities.bedding" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in BEDDING" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">便利设施</div>
              <a-checkbox-group v-model="localData.facilities.convenience" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in CONVENIENCE_FACILITIES" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">媒体科技</div>
              <a-checkbox-group v-model="localData.facilities.mediaTech" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in MEDIA_TECH" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">食品饮品</div>
              <a-checkbox-group v-model="localData.facilities.foodDrink" style="width: 100%">
                <a-row :gutter="[16, 12]">
                <a-col :span="6" v-for="item in FOOD_DRINK" :key="item">
                    <a-checkbox :value="item" class="grid-checkbox">{{ item }}</a-checkbox>
                  </a-col>
              </a-row>
              </a-checkbox-group>
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>

      <!-- 操作按钮 -->
      <div class="modal-footer">
        <a-button size="large" @click="handleCancel">取消</a-button>
        <a-button size="large" @click="handleSave">保存房型</a-button>
        <a-button type="primary" size="large" @click="handleSaveAndContinue">保存并继续添加</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, reactive, computed, watch, ref } from '@vue/composition-api'
import ImageUpload from '@/components/StoreDeployment/ImageUpload.vue'
import {
  AllowExtraGuest,
  ROOM_FACILITIES,
  ROOM_LAYOUT_FURNITURE,
  BATHROOM_FACILITIES,
  TOILETRIES,
  BEDDING,
  CONVENIENCE_FACILITIES,
  MEDIA_TECH,
  FOOD_DRINK
} from '@/types/storeDeployment'

/**
 * 房型编辑弹窗
 *
 * 功能：
 * - 添加/编辑房型信息
 * - 分为基础信息和房型设施两个分类
 * - 支持多层嵌套配置（房间布局→卧室→床型）
 * - 房型特色使用动态标签（可增删，最多7字）
 */
export default defineComponent({
  name: 'RoomTypeEdit',
  components: {
    ImageUpload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roomType: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit, root }) {
    // 床型选项
    const bedTypeOptions = [
      '常规大床/单人床',
      '圆床',
      '榻榻米',
      '上下铺',
      '其他'
    ]

    // 床宽度选项
    const bedWidthOptions = []
    for (let i = 8; i <= 24; i++) {
      bedWidthOptions.push((i / 10).toFixed(1))
    }

    // 床长度选项
    const bedLengthOptions = []
    for (let i = 16; i <= 24; i++) {
      bedLengthOptions.push((i / 10).toFixed(1))
    }

    // 本地数据
    const localData = reactive({
      id: '',
      roomTypeName: '',
      roomCount: 1,
      roomFeatures: [],
      roomDescription: '',
      images: [],
      floor: '',
      area: 0,
      hasWindow: true,
      nonSmoking: true,
      petsAllowed: false,
      capacity: 2,
      allowExtraGuest: AllowExtraGuest.NOT_ALLOWED,
      maxExtraGuests: 0,
      extraGuestFee: 0,
      roomLayout: {
        livingRooms: 0,
        bathrooms: 1,
        bedrooms: 1,
        bedroomConfigs: [
          {
            bedroomIndex: 1,
            bedCount: 1,
            beds: [{ bedIndex: 1, type: '常规大床/单人床', width: '1.8', length: '2.0' }]
          }
        ]
      },
      facilities: {
        roomFacilities: [],
        roomLayout: [],
        bathroom: [],
        toiletries: [],
        bedding: [],
        convenience: [],
        mediaTech: [],
        foodDrink: []
      }
    })

    const title = computed(() => {
      return props.roomType ? `编辑房型：${props.roomType.roomTypeName}` : '添加房型'
    })

    // 房型特色标签管理
    const featureInputVisible = ref(false)
    const featureInputValue = ref('')
    const featureInput = ref(null)

    const showFeatureInput = () => {
      featureInputVisible.value = true
      root.$nextTick(() => {
        featureInput.value?.$el?.focus()
      })
    }

    const handleFeatureInputConfirm = () => {
      const inputValue = featureInputValue.value.trim()
      if (inputValue && inputValue.length <= 7) {
        if (!localData.roomFeatures.includes(inputValue)) {
          localData.roomFeatures.push(inputValue)
        } else {
          root.$message.warning('该特色已存在')
        }
      } else if (inputValue.length > 7) {
        root.$message.error('特色标签最多7个字')
      }
      featureInputVisible.value = false
      featureInputValue.value = ''
    }

    const handleRemoveFeature = (index) => {
      localData.roomFeatures.splice(index, 1)
    }

    // 处理卧室数量变化
    const handleBedroomsChange = () => {
      const bedroomCount = localData.roomLayout.bedrooms
      const currentCount = localData.roomLayout.bedroomConfigs.length

      if (bedroomCount > currentCount) {
        for (let i = currentCount; i < bedroomCount; i++) {
          localData.roomLayout.bedroomConfigs.push({
            bedroomIndex: i + 1,
            bedCount: 1,
            beds: [{ bedIndex: 1, type: '常规大床/单人床', width: '1.8', length: '2.0' }]
          })
        }
      } else if (bedroomCount < currentCount) {
        localData.roomLayout.bedroomConfigs.splice(bedroomCount)
      }
    }

    // 处理床数量变化
    const handleBedCountChange = (bedroomIdx) => {
      const bedroom = localData.roomLayout.bedroomConfigs[bedroomIdx]
      const bedCount = bedroom.bedCount
      const currentCount = bedroom.beds.length

      if (bedCount > currentCount) {
        for (let i = currentCount; i < bedCount; i++) {
          bedroom.beds.push({ bedIndex: i + 1, type: '常规大床/单人床', width: '1.8', length: '2.0' })
        }
      } else if (bedCount < currentCount) {
        bedroom.beds.splice(bedCount)
      }
    }

    // 监听props变化
    watch(
      () => props.roomType,
      (newRoomType) => {
        if (newRoomType) {
          Object.assign(localData, newRoomType)
        } else {
          // 重置
          localData.id = `room_${Date.now()}`
          localData.roomTypeName = ''
          localData.roomCount = 1
          localData.roomFeatures = []
          localData.roomDescription = ''
          localData.images = []
          localData.floor = ''
          localData.area = 0
          localData.hasWindow = true
          localData.nonSmoking = true
          localData.petsAllowed = false
          localData.capacity = 2
          localData.allowExtraGuest = AllowExtraGuest.NOT_ALLOWED
          localData.maxExtraGuests = 0
          localData.extraGuestFee = 0
          localData.roomLayout = {
            livingRooms: 0,
            bathrooms: 1,
            bedrooms: 1,
            bedroomConfigs: [
              { bedroomIndex: 1, bedCount: 1, beds: [{ bedIndex: 1, width: '1.8', length: '2.0' }] }
            ]
          }
          localData.facilities = {
            roomFacilities: [],
            roomLayout: [],
            bathroom: [],
            toiletries: [],
            bedding: [],
            convenience: [],
            mediaTech: [],
            foodDrink: []
          }
        }
      },
      { immediate: true }
    )

    const handleCancel = () => {
      emit('cancel')
    }

    const handleSave = () => {
      // 校验
      if (!localData.roomTypeName) {
        root.$message.error('请填写房型名称')
        return
      }
      if (!localData.roomCount || localData.roomCount < 1) {
        root.$message.error('请填写房型数量')
        return
      }
      if (!localData.area || localData.area < 1) {
        root.$message.error('请填写房间面积')
        return
      }
      if (!localData.capacity || localData.capacity < 1) {
        root.$message.error('请填写可住人数')
        return
      }
      if (localData.images.length === 0) {
        root.$message.error('请至少上传1张房型图片')
        return
      }
      if (localData.facilities.roomFacilities.length === 0) {
        root.$message.error('客房设施至少选择1项')
        return
      }
      if (localData.facilities.roomLayout.length === 0) {
        root.$message.error('客房布局和家具至少选择1项')
        return
      }
      if (localData.facilities.bathroom.length === 0) {
        root.$message.error('卫浴设施至少选择1项')
        return
      }
      if (localData.facilities.toiletries.length === 0) {
        root.$message.error('洗浴用品至少选择1项')
        return
      }

      emit('save', { ...localData })
      root.$message.success('房型保存成功')
    }

    const handleSaveAndContinue = () => {
      handleSave()
    }

    return {
      localData,
      title,
      featureInputVisible,
      featureInputValue,
      featureInput,
      showFeatureInput,
      handleFeatureInputConfirm,
      handleRemoveFeature,
      bedTypeOptions,
      bedWidthOptions,
      bedLengthOptions,
      handleBedroomsChange,
      handleBedCountChange,
      AllowExtraGuest,
      ROOM_FACILITIES,
      ROOM_LAYOUT_FURNITURE,
      BATHROOM_FACILITIES,
      TOILETRIES,
      BEDDING,
      CONVENIENCE_FACILITIES,
      MEDIA_TECH,
      FOOD_DRINK,
      handleCancel,
      handleSave,
      handleSaveAndContinue
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.room-edit-modal {
  :deep(.ant-modal-body) {
    max-height: 70vh;
    overflow-y: auto;
    padding: 0;
  }
}

.form-container {
  padding: 24px;
}

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid @border-primary;

  &.section-spacing {
    margin-top: 32px;
  }
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.bed-config-wrapper {
  :deep(.ant-form-item-control) {
    line-height: 1;
  }
}

.bedroom-config {
  padding: 16px;
  margin-bottom: 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;

  &:last-child {
    margin-bottom: 0;
  }
}

.bedroom-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.bedroom-label {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-right: 12px;
}

.beds-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 12px;
}

.bed-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border: 1px solid @border-primary;
  border-radius: @border-radius-sm;
}

.bed-label {
  color: @text-secondary;
  margin-right: 8px;
}

.facilities-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.facility-item {
  .facility-label {
    font-size: @font-size-sm;
    font-weight: @font-weight-semibold;  // 600 加粗
    color: @text-primary;
    margin-bottom: 12px;
  }
}

// 使用Row/Col布局的checkbox样式
:deep(.grid-checkbox) {
  margin: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 12px;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  background: @bg-primary;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: @font-size-sm;
  color: @text-primary;

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

.required {
  color: @error-color;
  margin-left: 2px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid @border-primary;
}

:deep(.ant-form-item) {
  margin-bottom: 24px;

  .ant-form-item-label {
    text-align: left;
    font-weight: 400;           // 正常字重，不加粗
    color: rgba(0,0,0,0.9);    // 黑色

    label {
      &::after {
        content: '';
      }
    }
  }
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: @border-radius-base;
  border-color: @border-primary;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus,
  &-focused {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

:deep(.ant-input-number) {
  width: 100%;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.feature-tag {
  font-size: @font-size-sm;
  padding: 4px 10px;
  margin: 0;
  border-radius: @border-radius-sm;
  cursor: default;
}

.add-feature-tag {
  font-size: @font-size-sm;
  padding: 4px 10px;
  margin: 0;
  border: 1px dashed @border-primary;
  background: @bg-secondary;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: @brand-primary;
    color: @brand-primary;
  }
}

.feature-input {
  width: 120px;
  height: 28px;
}
</style>
