/**
 * 会员体系服务层
 */

import type { MemberLevel, MemberBenefit } from '../types/member.types'
import { mockMemberLevels, mockMemberBenefits } from './mocks'

class MemberService {
  private memberLevels: MemberLevel[] = [...mockMemberLevels]
  private memberBenefits: MemberBenefit[] = [...mockMemberBenefits]

  /**
   * 获取所有会员等级
   */
  async getAllLevels(): Promise<MemberLevel[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...this.memberLevels]
  }

  /**
   * 更新会员等级配置
   */
  async updateLevel(level: number, data: Partial<MemberLevel>): Promise<MemberLevel> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.memberLevels.findIndex(l => l.level === level)
    if (index === -1) throw new Error('等级不存在')

    this.memberLevels[index] = {
      ...this.memberLevels[index],
      ...data,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', '')
    }

    return { ...this.memberLevels[index] }
  }

  /**
   * 获取所有会员权益
   */
  async getAllBenefits(): Promise<MemberBenefit[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...this.memberBenefits]
  }
}

export default new MemberService()
