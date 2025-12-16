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
        :wrapper-col="{ span: 19 }"
      >
        <!-- 房型名称 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item label="房型名称" required>
              <a-input
                v-model="localData.roomTypeName"
                placeholder="山景大床房"
                :maxLength="20"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="该房型数量" required>
              <a-input-number
                v-model="localData.roomCount"
                :min="1"
                :max="100"
                :precision="0"
                placeholder="2"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <!-- 房型特色 -->
        <a-form-model-item label="房型特色">
          <a-checkbox-group v-model="localData.roomFeatures">
            <a-checkbox value="有浴缸">有浴缸</a-checkbox>
            <a-checkbox value="有家庭套房">有家庭套房</a-checkbox>
            <a-checkbox value="可加床">可加床</a-checkbox>
            <a-checkbox value="可拆分为双床">可拆分为双床</a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>

        <!-- 房型说明 -->
        <a-form-model-item label="房型说明">
          <a-textarea
            v-model="localData.roomDescription"
            placeholder="介绍房型特色、优势等"
            :rows="3"
            :maxLength="200"
          />
        </a-form-model-item>

        <!-- 房型图片 -->
        <a-form-model-item label="房型图片" required>
          <p class="field-hint">展示房间内部照片，包括床、卫浴、窗景等，建议比例3:2，最多10张，最少1张，支持jpg、png格式</p>
          <image-upload
            v-model="localData.images"
            :multiple="true"
            :maxCount="10"
            :maxSize="10"
          />
        </a-form-model-item>

        <!-- 楼层、面积 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item label="楼层">
              <a-input
                v-model="localData.floor"
                placeholder="多个楼层用逗号分隔，如2,3,4"
                :maxLength="50"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间面积（㎡）" required>
              <a-input-number
                v-model="localData.area"
                :min="1"
                :max="500"
                :precision="0"
                placeholder="35"
                style="width: 100%"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

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
        </a-form-model-item>

        <!-- 允许加客 -->
        <a-form-model-item label="允许加客">
          <a-radio-group v-model="localData.allowExtraGuest">
            <a-radio :value="AllowExtraGuest.NOT_ALLOWED">不允许</a-radio>
            <a-radio :value="AllowExtraGuest.ALLOWED">允许</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <!-- 加客配置（条件显示） -->
        <template v-if="localData.allowExtraGuest === AllowExtraGuest.ALLOWED">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="最多可加人数" required>
                <a-input-number
                  v-model="localData.maxExtraGuests"
                  :min="1"
                  :max="10"
                  :precision="0"
                  placeholder="1"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="加客费用（元/人）" required>
                <a-input-number
                  v-model="localData.extraGuestFee"
                  :min="0"
                  :precision="0"
                  placeholder="200"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
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
        </a-form-model-item>

        <!-- 床型配置（动态生成） -->
        <template v-if="localData.roomLayout.bedrooms > 0">
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
                <span>宽</span>
                <a-select v-model="bed.width" style="width: 100px; margin: 0 8px;">
                  <a-select-option v-for="w in bedWidthOptions" :key="w" :value="w">{{ w }}m</a-select-option>
                </a-select>
                <span>× 长</span>
                <a-select v-model="bed.length" style="width: 100px; margin: 0 8px;">
                  <a-select-option v-for="l in bedLengthOptions" :key="l" :value="l">{{ l }}m</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </template>

        <!-- 房型设施 -->
        <a-form-model-item label="房型设施" required>
          <div class="facilities-grid">
            <div class="facility-item">
              <div class="facility-label">客房设施 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.roomFacilities" class="checkbox-grid">
                <a-checkbox v-for="item in ROOM_FACILITIES" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">客房布局和家具 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.roomLayout" class="checkbox-grid">
                <a-checkbox v-for="item in ROOM_LAYOUT_FURNITURE" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">卫浴设施 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.bathroom" class="checkbox-grid">
                <a-checkbox v-for="item in BATHROOM_FACILITIES" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">洗浴用品 <span class="required">*</span></div>
              <a-checkbox-group v-model="localData.facilities.toiletries" class="checkbox-grid">
                <a-checkbox v-for="item in TOILETRIES" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">床上用品</div>
              <a-checkbox-group v-model="localData.facilities.bedding" class="checkbox-grid">
                <a-checkbox v-for="item in BEDDING" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">便利设施</div>
              <a-checkbox-group v-model="localData.facilities.convenience" class="checkbox-grid">
                <a-checkbox v-for="item in CONVENIENCE_FACILITIES" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">媒体科技</div>
              <a-checkbox-group v-model="localData.facilities.mediaTech" class="checkbox-grid">
                <a-checkbox v-for="item in MEDIA_TECH" :key="item" :value="item">{{ item }}</a-checkbox>
              </a-checkbox-group>
            </div>

            <div class="facility-item">
              <div class="facility-label">食品饮品</div>
              <a-checkbox-group v-model="localData.facilities.foodDrink" class="checkbox-grid">
                <a-checkbox v-for="item in FOOD_DRINK" :key="item" :value="item">{{ item }}</a-checkbox>
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
            beds: [{ bedIndex: 1, width: '1.8', length: '2.0' }]
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

    // 处理卧室数量变化
    const handleBedroomsChange = () => {
      const bedroomCount = localData.roomLayout.bedrooms
      const currentCount = localData.roomLayout.bedroomConfigs.length

      if (bedroomCount > currentCount) {
        for (let i = currentCount; i < bedroomCount; i++) {
          localData.roomLayout.bedroomConfigs.push({
            bedroomIndex: i + 1,
            bedCount: 1,
            beds: [{ bedIndex: 1, width: '1.8', length: '2.0' }]
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
          bedroom.beds.push({ bedIndex: i + 1, width: '1.8', length: '2.0' })
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

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-bottom: 12px;
  line-height: 1.6;
}

.bedroom-config {
  padding: 16px;
  margin-bottom: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
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
    font-weight: @font-weight-medium;
    color: @text-primary;
    margin-bottom: 12px;
  }
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
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
  margin-bottom: 20px;
}
</style>
