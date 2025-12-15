/**
 * 短信配置 - Mock 数据
 */

import type { SmsTemplate } from '../../types/sms.types'

/**
 * Mock 短信模板列表
 */
export const mockSmsTemplates: SmsTemplate[] = [
  {
    templateId: 'SMS0001',
    content: '【小而美民宿】验证码：${code}，您正在进行身份验证，5分钟内有效，请勿泄露。',
    status: 'enabled',
    updatedAt: '2025/01/10 10:00:00',
  },
  {
    templateId: 'SMS0002',
    content: '【小而美民宿】尊敬的${name}，您的订单${orderNo}已确认，入住时间：${checkInDate}，房型：${roomType}。',
    status: 'enabled',
    updatedAt: '2025/01/11 14:30:00',
  },
  {
    templateId: 'SMS0003',
    content: '【小而美民宿】${name}，您的订单${orderNo}支付成功，金额：${amount}元。感谢您的支持！',
    status: 'enabled',
    updatedAt: '2025/01/12 09:15:00',
  },
  {
    templateId: 'SMS0004',
    content: '【小而美民宿】亲爱的${name}，您有一张优惠券即将过期，有效期至${expireDate}，请尽快使用。',
    status: 'enabled',
    updatedAt: '2025/01/13 16:20:00',
  },
  {
    templateId: 'SMS0005',
    content: '【小而美民宿】${name}，您的退款申请已通过，退款金额${amount}元将在3-5个工作日内退回原支付账户。',
    status: 'disabled',
    updatedAt: '2025/01/14 11:45:00',
  },
  {
    templateId: 'SMS0006',
    content: '【小而美民宿】尊敬的会员${name}，您的VIP等级已升级至${vipLevel}，专属权益已开启。',
    status: 'enabled',
    updatedAt: '2025/01/15 08:30:00',
  },
  {
    templateId: 'SMS0007',
    content: '【小而美民宿】${name}，您预订的${roomType}即将入住，入住时间：${checkInDate}，期待您的光临！',
    status: 'enabled',
    updatedAt: '2025/01/16 15:10:00',
  },
  {
    templateId: 'SMS0008',
    content: '【小而美民宿】${name}，感谢您的入住！订单${orderNo}已完成，欢迎再次光临。',
    status: 'enabled',
    updatedAt: '2025/01/17 10:25:00',
  },
  {
    templateId: 'SMS0009',
    content: '【小而美民宿】${name}，您的积分${points}已到账，当前总积分：${totalPoints}。',
    status: 'disabled',
    updatedAt: '2025/01/18 13:40:00',
  },
]
