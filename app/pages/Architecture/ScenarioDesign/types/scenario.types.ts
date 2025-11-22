/**
 * 场景设计类型定义
 */

/**
 * 场景类型
 */
export enum ScenarioType {
  USER_REGISTRATION = 'user_registration',
  MEMBER_LEVEL = 'member_level',
  INVITE_FRIEND = 'invite_friend',
  BROWSE_HOTEL = 'browse_hotel',
  ORDER_PAYMENT = 'order_payment',
  CHECKOUT_REWARD = 'checkout_reward',
  AGENT_ORDER = 'agent_order',
}

/**
 * 流程步骤
 */
export interface FlowStep {
  id: string
  title: string
  description: string
  system: '平台后台' | '商户端' | 'C端'
  details: string[]
}

/**
 * 场景信息
 */
export interface Scenario {
  id: string
  type: ScenarioType
  title: string
  description: string
  flowSteps: FlowStep[]
  keyPoints: string[]
}
