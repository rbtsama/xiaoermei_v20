<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="1200px"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
    class="room-edit-modal"
  >
    <div class="room-edit-container">
      <!-- 基本信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">基本信息</span>
        </template>

        <a-form-model
          :model="localData"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
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

          <a-form-model-item label="房型说明">
            <a-textarea
              v-model="localData.roomDescription"
              placeholder="介绍房型特色、优势等"
              :rows="3"
              :maxLength="200"
            />
          </a-form-model-item>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="楼层" required>
                <a-checkbox-group v-model="localData.floors" class="floor-checkboxes">
                  <a-checkbox v-for="floor in [1,2,3,4,5,6,7,8,9,10]" :key="floor" :value="String(floor)">
                    {{ floor }}楼
                  </a-checkbox>
                </a-checkbox-group>
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

          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-model-item label="是否有窗" required>
                <a-radio-group v-model="localData.hasWindow">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>

            <a-col :span="8">
              <a-form-model-item label="是否禁烟" required>
                <a-radio-group v-model="localData.nonSmoking">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>

            <a-col :span="8">
              <a-form-model-item label="携带宠物" required>
                <a-radio-group v-model="localData.petsAllowed">
                  <a-radio :value="false">不允许</a-radio>
                  <a-radio :value="true">允许</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="可住人数" required>
                <a-input-number
                  v-model="localData.capacity"
                  :min="1"
                  :max="20"
                  :precision="0"
                  placeholder="2"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-form-model-item label="允许加客">
            <a-radio-group v-model="localData.allowExtraGuest">
              <a-radio :value="AllowExtraGuest.NOT_ALLOWED">不允许</a-radio>
              <a-radio :value="AllowExtraGuest.ALLOWED">允许</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-row v-if="localData.allowExtraGuest === AllowExtraGuest.ALLOWED" :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="最多可加人数" required>
                <a-input-number
                  v-model="localData.maxExtraGuests"
                  :min="1"
                  :max="10"
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
                  :precision="2"
                  placeholder="200"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <!-- 房间布局 -->
          <a-form-model-item label="房间布局" required>
            <a-row :gutter="12" type="flex" align="middle">
              <a-col flex="none">
                <span>客厅</span>
              </a-col>
              <a-col flex="100px">
                <a-input-number
                  v-model="localData.roomLayout.livingRooms"
                  :min="0"
                  :precision="0"
                  placeholder="0"
                  style="width: 100%"
                />
              </a-col>
              <a-col flex="none">
                <span>间，卫生间</span>
              </a-col>
              <a-col flex="100px">
                <a-input-number
                  v-model="localData.roomLayout.bathrooms"
                  :min="0"
                  :precision="0"
                  placeholder="1"
                  style="width: 100%"
                />
              </a-col>
              <a-col flex="none">
                <span>间，卧室</span>
              </a-col>
              <a-col flex="100px">
                <a-input-number
                  v-model="localData.roomLayout.bedrooms"
                  :min="1"
                  :precision="0"
                  placeholder="1"
                  style="width: 100%"
                  @change="handleBedroomsChange"
                />
              </a-col>
              <a-col flex="none">
                <span>间</span>
              </a-col>
            </a-row>
          </a-form-model-item>

          <!-- 床型配置 -->
          <a-form-model-item v-if="localData.roomLayout.bedrooms > 0" label="床型配置" required>
            <div class="bedroom-configs">
              <div
                v-for="(bedroom, idx) in localData.roomLayout.bedroomConfigs"
                :key="idx"
                class="bedroom-config-item"
              >
                <div class="bedroom-header">
                  <span class="bedroom-title">卧室{{ idx + 1 }}</span>
                  <a-row :gutter="12" type="flex" align="middle">
                    <a-col flex="none">
                      <span>床数量：</span>
                    </a-col>
                    <a-col flex="100px">
                      <a-input-number
                        v-model="bedroom.bedCount"
                        :min="1"
                        :precision="0"
                        placeholder="1"
                        style="width: 100%"
                        @change="handleBedCountChange(idx)"
                      />
                    </a-col>
                    <a-col flex="none">
                      <span>张</span>
                    </a-col>
                  </a-row>
                </div>

                <div class="beds-config">
                  <div
                    v-for="(bed, bedIdx) in bedroom.beds"
                    :key="bedIdx"
                    class="bed-config-item"
                  >
                    <a-row :gutter="12" type="flex" align="middle">
                      <a-col flex="80px">
                        <span class="bed-label">床{{ bedIdx + 1 }}:</span>
                      </a-col>
                      <a-col flex="none">
                        <span>宽</span>
                      </a-col>
                      <a-col flex="120px">
                        <a-select
                          v-model="bed.width"
                          placeholder="1.8"
                          style="width: 100%"
                        >
                          <a-select-option v-for="w in bedWidthOptions" :key="w" :value="w">
                            {{ w }}m
                          </a-select-option>
                        </a-select>
                      </a-col>
                      <a-col flex="none">
                        <span>× 长</span>
                      </a-col>
                      <a-col flex="120px">
                        <a-select
                          v-model="bed.length"
                          placeholder="2.0"
                          style="width: 100%"
                        >
                          <a-select-option v-for="l in bedLengthOptions" :key="l" :value="l">
                            {{ l }}m
                          </a-select-option>
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                </div>
              </div>
            </div>
          </a-form-model-item>

          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-model-item label="是否有窗" required :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
                <a-radio-group v-model="localData.hasWindow">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>

            <a-col :span="8">
              <a-form-model-item label="是否禁烟" required :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
                <a-radio-group v-model="localData.nonSmoking">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>

            <a-col :span="8">
              <a-form-model-item label="是否可携带宠物" required :label-col="{ span: 13 }" :wrapper-col="{ span: 11 }">
                <a-radio-group v-model="localData.petsAllowed">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>

      <!-- 房型设施 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <div class="section-header">
            <span class="section-title">房型设施</span>
            <span class="selected-count">已选 {{ totalFacilitiesCount }} 项</span>
          </div>
        </template>

        <p class="section-hint">请勾选此房型配备的设施</p>

        <!-- 客房设施 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">客房设施<span class="required">*</span></span>
          </div>
          <a-checkbox-group v-model="localData.facilities.roomFacilities" class="checkbox-grid">
            <a-checkbox v-for="item in ROOM_FACILITIES" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 客房布局和家具 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">客房布局和家具<span class="required">*</span></span>
          </div>
          <a-checkbox-group v-model="localData.facilities.roomLayout" class="checkbox-grid">
            <a-checkbox v-for="item in ROOM_LAYOUT_FURNITURE" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 卫浴设施 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">卫浴设施<span class="required">*</span></span>
          </div>
          <a-checkbox-group v-model="localData.facilities.bathroom" class="checkbox-grid">
            <a-checkbox v-for="item in BATHROOM_FACILITIES" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 洗浴用品 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">洗浴用品<span class="required">*</span></span>
          </div>
          <a-checkbox-group v-model="localData.facilities.toiletries" class="checkbox-grid">
            <a-checkbox v-for="item in TOILETRIES" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 床上用品 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">床上用品</span>
          </div>
          <a-checkbox-group v-model="localData.facilities.bedding" class="checkbox-grid">
            <a-checkbox v-for="item in BEDDING" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 便利设施 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">便利设施</span>
          </div>
          <a-checkbox-group v-model="localData.facilities.convenience" class="checkbox-grid">
            <a-checkbox v-for="item in CONVENIENCE_FACILITIES" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 媒体科技 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">媒体科技</span>
          </div>
          <a-checkbox-group v-model="localData.facilities.mediaTech" class="checkbox-grid">
            <a-checkbox v-for="item in MEDIA_TECH" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <a-divider />

        <!-- 食品饮品 -->
        <div class="facility-category">
          <div class="category-header">
            <span class="category-title">食品饮品</span>
          </div>
          <a-checkbox-group v-model="localData.facilities.foodDrink" class="checkbox-grid">
            <a-checkbox v-for="item in FOOD_DRINK" :key="item" :value="item">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </a-card>

      <!-- 相关说明 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">相关说明</span>
        </template>

        <a-textarea
          v-model="localData.description"
          placeholder="补充说明此房型的特殊要求、限制条件等。例如：临江独立阳台，超开阔视野；房间禁烟，无电视；禁止携带烟花爆竹等易燃易爆物品进村；限住2位成人，超出收取200元/人，此房型可在沙发区域加床..."
          :rows="5"
          :maxLength="500"
        />
        <div class="char-count">{{ (localData.description || '').length }}/500</div>
      </a-card>

      <!-- 房型图片 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <div class="section-header">
            <span class="section-title">房型图片</span>
            <a-tag color="red" size="small">必填 ★</a-tag>
          </div>
        </template>

        <p class="section-hint">展示房间内部的照片，包括床、卫浴、窗景等角度，建议比例3:2，最多10张，最少1张</p>

        <image-upload
          v-model="localData.images"
          :multiple="true"
          :maxCount="10"
          :maxSize="10"
          ratio="3:2"
        />
      </a-card>

      <!-- 操作按钮 -->
      <div class="modal-footer">
        <a-button size="large" @click="handleCancel">
          取消
        </a-button>
        <a-button size="large" @click="handleSave">
          保存房型
        </a-button>
        <a-button type="primary" size="large" @click="handleSaveAndContinue">
          保存并继续添加
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, reactive, computed, watch } from '@vue/composition-api'
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
    // 床宽度选项（0.8-2.4m，步长0.1）
    const bedWidthOptions = []
    for (let i = 8; i <= 24; i++) {
      bedWidthOptions.push((i / 10).toFixed(1))
    }

    // 床长度选项（1.6-2.4m，步长0.1）
    const bedLengthOptions = []
    for (let i = 16; i <= 24; i++) {
      bedLengthOptions.push((i / 10).toFixed(1))
    }

    // 本地数据
    const localData = reactive({
      id: '',
      roomTypeName: '',
      roomDescription: '',
      roomCount: 1,
      floors: [],
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
            beds: [
              {
                bedIndex: 1,
                width: '1.8',
                length: '2.0'
              }
            ]
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
      },
      description: '',
      images: []
    })

    // 标题
    const title = computed(() => {
      return props.roomType ? `编辑房型：${props.roomType.roomTypeName}` : '添加房型'
    })

    // 已选设施总数
    const totalFacilitiesCount = computed(() => {
      return Object.values(localData.facilities).reduce(
        (sum, arr) => sum + arr.length,
        0
      )
    })

    // 处理卧室数量变化
    const handleBedroomsChange = () => {
      const bedroomCount = localData.roomLayout.bedrooms
      const currentCount = localData.roomLayout.bedroomConfigs.length

      if (bedroomCount > currentCount) {
        // 增加卧室
        for (let i = currentCount; i < bedroomCount; i++) {
          localData.roomLayout.bedroomConfigs.push({
            bedroomIndex: i + 1,
            bedCount: 1,
            beds: [
              {
                bedIndex: 1,
                width: '1.8',
                length: '2.0'
              }
            ]
          })
        }
      } else if (bedroomCount < currentCount) {
        // 减少卧室
        localData.roomLayout.bedroomConfigs.splice(bedroomCount)
      }
    }

    // 处理床数量变化
    const handleBedCountChange = (bedroomIdx) => {
      const bedroom = localData.roomLayout.bedroomConfigs[bedroomIdx]
      const bedCount = bedroom.bedCount
      const currentCount = bedroom.beds.length

      if (bedCount > currentCount) {
        // 增加床
        for (let i = currentCount; i < bedCount; i++) {
          bedroom.beds.push({
            bedIndex: i + 1,
            width: '1.8',
            length: '2.0'
          })
        }
      } else if (bedCount < currentCount) {
        // 减少床
        bedroom.beds.splice(bedCount)
      }
    }

    // 重置数据（定义在watch之前）
    const resetLocalData = () => {
      localData.id = `room_${Date.now()}`
      localData.roomTypeName = ''
      localData.roomDescription = ''
      localData.roomCount = 1
      localData.floors = []
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
          {
            bedroomIndex: 1,
            bedCount: 1,
            beds: [
              {
                bedIndex: 1,
                width: '1.8',
                length: '2.0'
              }
            ]
          }
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
      localData.description = ''
      localData.images = []
    }

    // 监听props变化
    watch(
      () => props.roomType,
      (newRoomType) => {
        if (newRoomType) {
          Object.assign(localData, newRoomType)
        } else {
          // 重置为空
          resetLocalData()
        }
      },
      { immediate: true }
    )

    // 取消
    const handleCancel = () => {
      root.$confirm({
        title: '确认取消',
        content: '确认取消编辑吗？未保存的修改将丢失。',
        onOk: () => {
          emit('cancel')
        }
      })
    }

    // 保存房型
    const handleSave = () => {
      // 校验必填项
      if (!localData.roomTypeName) {
        root.$message.error('请填写房型名称')
        return
      }
      if (!localData.roomCount || localData.roomCount < 1) {
        root.$message.error('请填写房型数量')
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

      // 检查必填设施
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

    // 保存并继续添加
    const handleSaveAndContinue = () => {
      // 校验并保存
      if (!localData.roomTypeName) {
        root.$message.error('请填写房型名称')
        return
      }
      if (!localData.roomCount || localData.roomCount < 1) {
        root.$message.error('请填写房型数量')
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

      emit('save', { ...localData })
      root.$message.success('房型保存成功')

      // 重置表单，继续添加
      resetLocalData()
    }

    return {
      localData,
      title,
      totalFacilitiesCount,
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

.room-edit-container {
  padding: 24px;
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
    padding: 12px 20px;
  }

  :deep(.ant-card-body) {
    padding: 24px 20px;
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.section-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.selected-count {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.section-hint {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-bottom: 16px;
  line-height: 1.6;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
}

.facility-category {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.category-title {
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.required {
  color: #ef4444;
  margin-left: 4px;
}

.floor-checkboxes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
  }
}

.bedroom-configs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bedroom-config-item {
  padding: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
}

.bedroom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.bedroom-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.beds-config {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bed-config-item {
  padding: 8px;
  background: @bg-primary;
  border-radius: @border-radius-sm;
}

.bed-label {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
    padding: 8px 10px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
    background: @bg-primary;
    transition: all 0.2s;
    font-size: @font-size-sm;
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

.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid @border-primary;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-divider) {
  margin: 20px 0;
}
</style>
