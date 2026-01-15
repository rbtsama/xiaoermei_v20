/**
 * 优惠券管理 - 服务层
 */

import type {
  Coupon,
  CouponFilterParams,
  SceneDistribution,
  CouponRecord,
  VipLevel,
  PaginationParams,
  PaginatedResult,
  CouponOperationLog,
  CouponOperationType,
} from '../types/coupon.types'
import {
  mockCoupons,
  mockSceneDistributions,
  mockCouponRecords,
  mockVipLevels,
  mockOperationLogs,
} from './mocks'

class CouponService {
  // 优惠券数据存储（深拷贝Mock数据避免污染原始数据）
  private coupons = [...mockCoupons]
  // 场景发放配置存储
  private sceneDistributions = [...mockSceneDistributions]
  // 优惠券发放记录存储
  private couponRecords = [...mockCouponRecords]
  // VIP等级数据存储
  private vipLevels = [...mockVipLevels]
  // 操作日志存储
  private operationLogs = [...mockOperationLogs]

  /**
   * 格式化当前时间为中文格式字符串
   * @returns {string} 格式化后的时间字符串，如 "2025/01/16 10:30:00"
   * @private
   */
  private formatNow(): string {
    return new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(',', '')
  }

  /**
   * 获取优惠券列表（按创建时间倒序，支持分页）
   * @param {PaginationParams} params - 分页参数（可选）
   * @returns {Promise<PaginatedResult<Coupon>>} 分页结果
   */
  async getCoupons(params?: PaginationParams): Promise<PaginatedResult<Coupon>> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 按创建时间倒序排列
    const sorted = [...this.coupons].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    }
  }

  /**
   * 根据ID获取单个优惠券
   * @param {string} id - 优惠券ID
   * @returns {Promise<Coupon | null>} 优惠券对象，不存在时返回null
   */
  async getCouponById(id: string): Promise<Coupon | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.coupons.find((c) => c.id === id) || null
  }

  /**
   * 创建优惠券
   * @param {Partial<Coupon>} data - 优惠券数据
   * @returns {Promise<Coupon>} 创建成功的优惠券对象
   * @throws {Error} 数据验证失败时抛出错误
   */
  async createCoupon(data: Partial<Coupon>): Promise<Coupon> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新的优惠券ID（基于现有最大ID+1）
    const lastId = this.coupons.length > 0
      ? Math.max(...this.coupons.map(c => parseInt(c.id.replace('cp', ''))))
      : 999
    const newId = `cp${lastId + 1}`

    // 构建新优惠券对象
    const newCoupon: Coupon = {
      id: newId,
      name: data.name || '',
      type: data.type || 'full_reduction',
      threshold: data.threshold,
      amount: data.amount,
      discount: data.discount,
      maxDiscount: data.maxDiscount,
      smsNotify: data.smsNotify !== undefined ? data.smsNotify : true, // 默认开启短信通知
      validDays: data.validDays,
      validDateRange: data.validDateRange,
      bookableDateRange: data.bookableDateRange, // 可订日期（限制入住日期）
      stock: data.stock !== undefined ? data.stock : 0, // 库存，默认0（不限制）
      usageRules: data.usageRules,
      remark: data.remark,
      platformRatio: data.platformRatio || 50,
      merchantRatio: data.merchantRatio || 50,
      status: 'disabled', // 新创建的优惠券默认为停用状态
      createdAt: this.formatNow(),
      createdBy: 'admin001', // TODO: 从当前登录用户获取
    }

    // 将新优惠券添加到列表开头（保证最新的在前面）
    this.coupons.unshift(newCoupon)

    // 记录创建操作日志
    this.logOperation('create', newCoupon)

    return newCoupon
  }

  /**
   * 更新优惠券信息
   * @param {string} id - 优惠券ID
   * @param {Partial<Coupon>} data - 要更新的字段（部分更新）
   * @returns {Promise<Coupon | null>} 更新后的优惠券对象，不存在时返回null
   */
  async updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | null> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.coupons.findIndex((c) => c.id === id)
    if (index === -1) return null

    // 保存旧数据用于生成变更日志
    const oldCoupon = { ...this.coupons[index] }

    // 合并更新数据（保留未修改的字段）
    this.coupons[index] = { ...this.coupons[index], ...data }

    // 记录编辑操作日志
    this.logOperation('edit', this.coupons[index], oldCoupon)

    return this.coupons[index]
  }

  /**
   * 切换优惠券状态（启用/停用）
   * @param {string} id - 优惠券ID
   * @returns {Promise<Coupon | null>} 更新后的优惠券对象，不存在时返回null
   */
  async toggleCouponStatus(id: string): Promise<Coupon | null> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.coupons.findIndex((c) => c.id === id)
    if (index === -1) return null

    // 切换状态：enabled ↔ disabled
    this.coupons[index].status = this.coupons[index].status === 'enabled' ? 'disabled' : 'enabled'
    return this.coupons[index]
  }

  /**
   * 删除优惠券
   * @param {string} id - 优惠券ID
   * @returns {Promise<boolean>} 删除是否成功
   * @throws {Error} 优惠券已有发放记录时不允许删除
   */
  async deleteCoupon(id: string): Promise<boolean> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const coupon = this.coupons.find((c) => c.id === id)
    if (!coupon) return false

    // 安全检查：有发放记录的优惠券不允许删除
    const hasRecords = this.couponRecords.some((r) => r.couponId === id)
    if (hasRecords) {
      throw new Error('该券已有发放记录，无法删除')
    }

    // 从列表中移除
    const index = this.coupons.findIndex((c) => c.id === id)
    this.coupons.splice(index, 1)
    return true
  }

  /**
   * 获取所有启用状态的优惠券（用于下拉选择）
   * @returns {Promise<Coupon[]>} 已启用的优惠券列表
   */
  async getEnabledCoupons(): Promise<Coupon[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.coupons.filter((c) => c.status === 'enabled')
  }

  /**
   * 获取所有场景发放配置
   * @returns {Promise<SceneDistribution[]>} 场景发放配置列表
   */
  async getSceneDistributions(): Promise<SceneDistribution[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.sceneDistributions]
  }

  /**
   * 更新场景发放配置
   * @param {string} id - 场景配置ID
   * @param {object} data - 更新数据（优惠券ID、每人限领次数、短信通知）
   * @returns {Promise<SceneDistribution | null>} 更新后的场景配置
   * @throws {Error} 优惠券不存在时抛出错误
   */
  async updateSceneDistribution(
    id: string,
    data: { couponId: string; limitPerUser: number; smsNotify: boolean }
  ): Promise<SceneDistribution | null> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 查找场景配置
    const index = this.sceneDistributions.findIndex((s) => s.id === id)
    if (index === -1) return null

    // 验证优惠券是否存在
    const coupon = this.coupons.find((c) => c.id === data.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    // 更新场景配置
    this.sceneDistributions[index].couponId = data.couponId
    this.sceneDistributions[index].couponName = coupon.name
    this.sceneDistributions[index].couponRemark = coupon.remark || null
    this.sceneDistributions[index].limitPerUser = data.limitPerUser
    this.sceneDistributions[index].smsNotify = data.smsNotify

    return this.sceneDistributions[index]
  }

  /**
   * 切换场景发放状态（启用/停用）
   * @param {string} id - 场景配置ID
   * @returns {Promise<SceneDistribution | null>} 更新后的场景配置，不存在时返回null
   * @throws {Error} 启用时如果未配置优惠券则抛出错误
   */
  async toggleSceneDistributionStatus(id: string): Promise<SceneDistribution | null> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.sceneDistributions.findIndex((s) => s.id === id)
    if (index === -1) return null

    // 安全检查：启用时必须先配置优惠券
    if (this.sceneDistributions[index].status === 'disabled' && !this.sceneDistributions[index].couponId) {
      throw new Error('请先配置优惠券')
    }

    // 切换状态：enabled ↔ disabled
    this.sceneDistributions[index].status = this.sceneDistributions[index].status === 'enabled' ? 'disabled' : 'enabled'

    return this.sceneDistributions[index]
  }

  /**
   * 手动发放优惠券（按手机号）
   * @param {object} params - 发放参数（手机号数组、优惠券ID、是否短信通知）
   * @returns {Promise<boolean>} 发放是否成功
   * @throws {Error} 优惠券不存在时抛出错误
   */
  async distributeByPhones(params: { phones: string[]; couponId: string; smsNotify: boolean }): Promise<boolean> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 验证优惠券是否存在
    const coupon = this.coupons.find((c) => c.id === params.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    const now = this.formatNow()

    // 根据手机号数量决定记录格式
    // 单个手机号：直接显示该手机号
    if (params.phones.length === 1) {
      this.couponRecords.unshift({
        couponId: params.couponId,
        couponType: coupon.type,
        couponName: coupon.name,
        distributionType: 'manual_phone',
        userPhone: params.phones[0],
        operatedAt: now,
        operatedBy: 'admin001', // TODO: 从当前登录用户获取
      })
    } else {
      // 多个手机号：userPhone显示"多手机号"，phones数组保存所有手机号
      this.couponRecords.unshift({
        couponId: params.couponId,
        couponType: coupon.type,
        couponName: coupon.name,
        distributionType: 'manual_phone',
        userPhone: '多手机号',
        phones: params.phones,
        operatedAt: now,
        operatedBy: 'admin001', // TODO: 从当前登录用户获取
      })
    }

    return true
  }

  /**
   * 获取所有VIP等级列表
   * @returns {Promise<VipLevel[]>} VIP等级列表
   */
  async getVipLevels(): Promise<VipLevel[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [...this.vipLevels]
  }

  /**
   * 手动发放优惠券（按VIP等级）
   * @param {object} params - 发放参数（VIP等级ID数组、优惠券ID、是否短信通知）
   * @returns {Promise<boolean>} 发放是否成功
   * @throws {Error} 优惠券不存在时抛出错误
   */
  async distributeByVipLevels(params: { vipLevelIds: string[]; couponId: string; smsNotify: boolean }): Promise<boolean> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 验证优惠券是否存在
    const coupon = this.coupons.find((c) => c.id === params.couponId)
    if (!coupon) throw new Error('优惠券不存在')

    // 创建发放记录（一条记录代表多个VIP等级的批量发放）
    // userPhone显示"多手机号"，vipLevels数组保存所有等级
    this.couponRecords.unshift({
      couponId: params.couponId,
      couponType: coupon.type,
      couponName: coupon.name,
      distributionType: 'manual_vip',
      userPhone: '多手机号',
      vipLevels: params.vipLevelIds,
      operatedAt: this.formatNow(),
      operatedBy: 'admin001', // TODO: 从当前登录用户获取
    })

    return true
  }

  /**
   * 获取优惠券发放记录（按操作时间倒序，支持分页）
   * @param {PaginationParams} params - 分页参数（可选）
   * @returns {Promise<PaginatedResult<CouponRecord>>} 分页结果
   */
  async getCouponRecords(params?: PaginationParams): Promise<PaginatedResult<CouponRecord>> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 按操作时间倒序排列（最新的在前面）
    const sorted = [...this.couponRecords].sort((a, b) => {
      return new Date(b.operatedAt).getTime() - new Date(a.operatedAt).getTime()
    })

    // 分页处理
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    }
  }

  /**
   * 获取优惠券操作记录（按操作时间倒序）
   * @returns {Promise<CouponOperationLog[]>} 操作记录列表
   */
  async getOperationLogs(): Promise<CouponOperationLog[]> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 按操作时间倒序排列（最新的在前面）
    return [...this.operationLogs].sort((a, b) => {
      return new Date(b.operatedAt).getTime() - new Date(a.operatedAt).getTime()
    })
  }

  /**
   * 记录操作日志（创建/编辑优惠券时自动调用）
   * @param {CouponOperationType} type - 操作类型（创建/编辑）
   * @param {Coupon} coupon - 当前优惠券数据
   * @param {Coupon} oldCoupon - 旧优惠券数据（编辑时需要）
   * @private
   */
  private logOperation(type: CouponOperationType, coupon: Coupon, oldCoupon?: Coupon) {
    let operationContent = ''

    if (type === 'create') {
      operationContent = '创建优惠券'
    } else {
      // 编辑操作：对比所有字段变更并生成变更描述
      const changes: string[] = []

      if (oldCoupon) {
        // 对比各个字段，记录变更内容
        if (oldCoupon.name !== coupon.name) {
          changes.push(`优惠券名称：${oldCoupon.name} → ${coupon.name}`)
        }
        if (oldCoupon.remark !== coupon.remark) {
          changes.push(`备注说明：${oldCoupon.remark || '无'} → ${coupon.remark || '无'}`)
        }
        if (oldCoupon.threshold !== coupon.threshold) {
          changes.push(`使用门槛：${oldCoupon.threshold}元 → ${coupon.threshold}元`)
        }
        if (oldCoupon.amount !== coupon.amount) {
          changes.push(`减免金额：${oldCoupon.amount}元 → ${coupon.amount}元`)
        }
        if (oldCoupon.discount !== coupon.discount) {
          changes.push(`折扣率：${oldCoupon.discount}% → ${coupon.discount}%`)
        }
        if (oldCoupon.maxDiscount !== coupon.maxDiscount) {
          changes.push(`最高优惠金额：${oldCoupon.maxDiscount}元 → ${coupon.maxDiscount}元`)
        }
        if (oldCoupon.platformRatio !== coupon.platformRatio) {
          changes.push(`平台承担比例：${oldCoupon.platformRatio}% → ${coupon.platformRatio}%`)
        }
        if (oldCoupon.validDays !== coupon.validDays) {
          const oldText = oldCoupon.validDays === 0 ? '永久' : `${oldCoupon.validDays}天`
          const newText = coupon.validDays === 0 ? '永久' : `${coupon.validDays}天`
          changes.push(`有效天数：${oldText} → ${newText}`)
        }
        if (oldCoupon.smsNotify !== coupon.smsNotify) {
          changes.push(`短信通知：${oldCoupon.smsNotify ? '是' : '否'} → ${coupon.smsNotify ? '是' : '否'}`)
        }
      }

      operationContent = changes.join('\n') || '无变更'
    }

    // 生成新的操作日志记录
    const newLog: CouponOperationLog = {
      id: `LOG${String(this.operationLogs.length + 1).padStart(3, '0')}`,
      couponId: coupon.id,
      operationType: type,
      operationContent,
      operatedAt: this.formatNow(),
      operatedBy: 'admin001', // TODO: 从当前登录用户获取
    }

    // 将新日志添加到列表开头
    this.operationLogs.unshift(newLog)
  }
}

export default new CouponService()
