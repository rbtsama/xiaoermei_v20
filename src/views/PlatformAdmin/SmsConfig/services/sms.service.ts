/**
 * 短信配置 - Service
 */

import type { SmsTemplate, PaginationParams, PaginatedResult } from '../types/sms.types'
import { mockSmsTemplates } from './mocks/sms.mock'

// 已使用的模板ID集合（包含已删除的ID）
const usedTemplateIds = new Set<string>(mockSmsTemplates.map(t => t.templateId))

class SmsService {
  /**
   * 生成下一个短信模板ID（SMS0001格式）
   */
  private generateNextTemplateId(): string {
    let maxNum = 0

    // 从已使用的ID中找到最大编号
    usedTemplateIds.forEach(id => {
      const match = id.match(/^SMS(\d+)$/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) {
          maxNum = num
        }
      }
    })

    // 生成下一个ID
    const nextNum = maxNum + 1
    const nextId = `SMS${nextNum.toString().padStart(4, '0')}`
    usedTemplateIds.add(nextId)

    return nextId
  }
  /**
   * 获取短信模板列表
   */
  async getSmsTemplates(params: PaginationParams): Promise<PaginatedResult<SmsTemplate>> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300))

    const { page, pageSize } = params
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = mockSmsTemplates.slice(start, end)
    const total = mockSmsTemplates.length
    const totalPages = Math.ceil(total / pageSize)

    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  /**
   * 创建短信模板
   */
  async createSmsTemplate(template: Partial<SmsTemplate>): Promise<SmsTemplate> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const newTemplate: SmsTemplate = {
      templateId: this.generateNextTemplateId(),
      content: template.content || '',
      status: 'enabled',
      updatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '/')
    }

    mockSmsTemplates.unshift(newTemplate)
    return newTemplate
  }

  /**
   * 更新短信模板
   */
  async updateSmsTemplate(templateId: string, template: Partial<SmsTemplate>): Promise<SmsTemplate> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = mockSmsTemplates.findIndex(t => t.templateId === templateId)
    if (index === -1) {
      throw new Error('模板不存在')
    }

    mockSmsTemplates[index] = {
      ...mockSmsTemplates[index],
      ...template,
      updatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '/')
    }

    return mockSmsTemplates[index]
  }

  /**
   * 删除短信模板
   */
  async deleteSmsTemplate(templateId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = mockSmsTemplates.findIndex(t => t.templateId === templateId)
    if (index === -1) {
      throw new Error('模板不存在')
    }

    mockSmsTemplates.splice(index, 1)
  }

  /**
   * 切换短信模板状态
   */
  async toggleSmsTemplateStatus(templateId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const template = mockSmsTemplates.find(t => t.templateId === templateId)
    if (!template) {
      throw new Error('模板不存在')
    }

    template.status = template.status === 'enabled' ? 'disabled' : 'enabled'
    template.updatedAt = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '/')
  }
}

export default new SmsService()
