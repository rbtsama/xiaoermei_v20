/**
 * 协议管理服务层
 */

import type { ContractTemplate, SigningRecord } from '../types/contract.types'
import { mockContractTemplates, mockSigningRecords } from './mocks/contract.mock'

class ContractService {
  private templates: ContractTemplate[] = [...mockContractTemplates]
  private signingRecords: SigningRecord[] = [...mockSigningRecords]

  /**
   * 获取所有协议模板
   */
  async getAllTemplates(): Promise<ContractTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...this.templates]
  }

  /**
   * 获取所有签约记录
   */
  async getAllSigningRecords(): Promise<SigningRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...this.signingRecords]
  }
}

export default new ContractService()
