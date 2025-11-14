/**
 * 酒店管理服务层
 */

import type {
  JoinApplication,
  PartnerHotel,
  JoinApplicationQuery,
  PartnerHotelQuery,
  UpdateFollowUpRequest,
  UpdatePartnerHotelRequest
} from '../types/hotel.types'
import { FollowUpStatus, HotelStatus } from '../types/hotel.types'
import { mockJoinApplications, mockPartnerHotels } from './mocks'

class HotelService {
  private joinApplications: JoinApplication[] = [...mockJoinApplications]
  private partnerHotels: PartnerHotel[] = [...mockPartnerHotels]

  // ==================== 加盟申请 ====================

  /**
   * 获取加盟申请列表
   */
  async getJoinApplications(query?: JoinApplicationQuery): Promise<JoinApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 500))

    let filtered = [...this.joinApplications]

    if (query?.followUpStatus) {
      filtered = filtered.filter(app => app.followUpStatus === query.followUpStatus)
    }

    if (query?.keyword) {
      filtered = filtered.filter(app =>
        app.hotelName.toLowerCase().includes(query.keyword!.toLowerCase())
      )
    }

    return filtered
  }

  /**
   * 更新跟进状态和备注
   */
  async updateFollowUp(request: UpdateFollowUpRequest): Promise<JoinApplication> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.joinApplications.findIndex(app => app.applicationId === request.applicationId)
    if (index === -1) throw new Error('申请不存在')

    this.joinApplications[index] = {
      ...this.joinApplications[index],
      followUpStatus: request.followUpStatus,
      followUpNotes: request.followUpNotes,
      lastFollowUpAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      lastFollowUpBy: request.operatorName
    }

    return { ...this.joinApplications[index] }
  }

  // ==================== 合作酒店 ====================

  /**
   * 获取合作酒店列表
   */
  async getPartnerHotels(query?: PartnerHotelQuery): Promise<PartnerHotel[]> {
    await new Promise(resolve => setTimeout(resolve, 500))

    let filtered = [...this.partnerHotels]

    // 按开通时间筛选
    if (query?.activatedStart || query?.activatedEnd) {
      // 简化处理，实际应该解析日期比较
      filtered = filtered.filter(hotel => {
        // 这里简化处理，实际需要日期比较逻辑
        return true
      })
    }

    // 按省份筛选
    if (query?.province && query.province !== '全部') {
      filtered = filtered.filter(hotel => hotel.province === query.province)
    }

    // 按城市筛选
    if (query?.city) {
      filtered = filtered.filter(hotel => hotel.city === query.city)
    }

    // 按区县筛选
    if (query?.district) {
      filtered = filtered.filter(hotel => hotel.district === query.district)
    }

    // 按酒店名称模糊搜索
    if (query?.keyword) {
      filtered = filtered.filter(hotel =>
        hotel.hotelName.toLowerCase().includes(query.keyword!.toLowerCase())
      )
    }

    // 按状态筛选
    if (query?.status) {
      filtered = filtered.filter(hotel => hotel.status === query.status)
    }

    return filtered
  }

  /**
   * 更新合作酒店信息
   */
  async updatePartnerHotel(request: UpdatePartnerHotelRequest): Promise<PartnerHotel> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.partnerHotels.findIndex(hotel => hotel.hotelId === request.hotelId)
    if (index === -1) throw new Error('酒店不存在')

    this.partnerHotels[index] = {
      ...this.partnerHotels[index],
      adminAccount: request.adminAccount || this.partnerHotels[index].adminAccount,
      commissionRate: request.commissionRate !== undefined ? request.commissionRate : this.partnerHotels[index].commissionRate,
      shengfutongId: request.shengfutongId || this.partnerHotels[index].shengfutongId,
      status: request.status || this.partnerHotels[index].status,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: request.operatorName
    }

    return { ...this.partnerHotels[index] }
  }

  /**
   * 删除合作酒店
   */
  async deletePartnerHotel(hotelId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.partnerHotels.findIndex(hotel => hotel.hotelId === hotelId)
    if (index === -1) throw new Error('酒店不存在')

    this.partnerHotels.splice(index, 1)
  }
}

export default new HotelService()
