/**
 * 场景设计服务
 */

import type { Scenario } from '../types/scenario.types'
import { ScenarioType } from '../types/scenario.types'
import { mockScenarios } from './mocks'

class ScenarioService {
  private scenarios = [...mockScenarios]

  /**
   * 获取所有场景列表
   */
  async getAll(): Promise<Scenario[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.scenarios]
  }

  /**
   * 根据ID获取场景详情
   */
  async getById(id: string): Promise<Scenario | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.scenarios.find((s) => s.id === id) || null
  }

  /**
   * 根据类型获取场景
   */
  async getByType(type: ScenarioType): Promise<Scenario | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.scenarios.find((s) => s.type === type) || null
  }
}

export default new ScenarioService()
