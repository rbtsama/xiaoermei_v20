/**
 * 协议管理 Mock 数据
 */

import type { ContractTemplate, SigningRecord } from '../../types/contract.types'
import { TemplateStatus } from '../../types/contract.types'

// ==================== 协议模板（3个版本） ====================

export const mockContractTemplates: ContractTemplate[] = [
  {
    templateId: 'TPL_001',
    contractType: '商家服务协议',
    version: 'V2.1',
    title: '小而美商家服务协议',
    content: `发布日期：2025年01月01日
生效日期：2025年01月01日

亲爱的商家，欢迎您使用小而美平台！

《小而美商家服务协议》（以下简称"本协议"）由您（以下简称"商家"）与杭州小而美信息技术服务有限公司（以下简称"小而美"）订立。

一、定义
1. 平台：指小而美运营的房源信息发布及预订平台
2. 商家：指在平台上发布房源的主体
3. 房客：指通过平台预订房源的用户

二、技术服务费
小而美将按照商家实收订单金额的5%作为平台技术服务费。

三、商家义务
1. 商家应确保房源合法、真实、安全
2. 商家应按时履行订单，提供承诺的服务
3. 商家不得刷单、虚假交易

四、违约责任
商家违反本协议的，小而美有权下架房源、暂停合作。

五、争议解决
本协议适用中国法律，争议提交小而美所在地法院诉讼解决。`,
    status: TemplateStatus.ACTIVE,
    effectiveDate: '01/01/25',
    createdAt: '12/25/24 10:00:00',
    createdBy: '法务-孙律师',
    updatedAt: '01/01/25 09:00:00',
    updatedBy: '法务-孙律师',
    usageCount: 3
  },
  {
    templateId: 'TPL_002',
    contractType: '商家服务协议',
    version: 'V2.0',
    title: '小而美商家服务协议',
    content: `发布日期：2024年07月01日
生效日期：2024年07月01日

《小而美商家服务协议》V2.0版本

一、定义
（V2.0版本内容，已停用）

二、技术服务费
平台技术服务费比例为4%（V2.0版本）

（后续内容省略...）`,
    status: TemplateStatus.INACTIVE,
    effectiveDate: '07/01/24',
    createdAt: '06/20/24 10:00:00',
    createdBy: '法务-孙律师',
    updatedAt: '12/31/24 23:59:59',
    updatedBy: '法务-孙律师',
    usageCount: 15
  },
  {
    templateId: 'TPL_003',
    contractType: '商家服务协议',
    version: 'V1.0',
    title: '小而美商家服务协议',
    content: `发布日期：2024年01月01日
生效日期：2024年01月01日

《小而美商家服务协议》V1.0版本（初始版本）

（内容省略...）`,
    status: TemplateStatus.INACTIVE,
    effectiveDate: '01/01/24',
    createdAt: '12/15/23 10:00:00',
    createdBy: '法务-孙律师',
    usageCount: 28
  }
]

// ==================== 签约记录（对应已签约的申请） ====================

export const mockSigningRecords: SigningRecord[] = [
  {
    recordId: 'SIGN_20250113001',
    applicationId: 'APP_20250113003',
    hotelName: '亚朵轻居·上海人民广场店',
    templateId: 'TPL_001',
    contractType: '商家服务协议',
    version: 'V2.1',
    signerName: '陈老板',
    signerPhone: '13734567890',
    signedAt: '01/13/25 15:30:00',
    signerIp: '192.168.1.88',
    contractSnapshot: mockContractTemplates[0].content,
    operatorName: 'BD-王五'
  }
]

// ==================== 协议类型列表 ====================

export const contractTypes = [
  '商家服务协议',
  '用户服务协议',
  '隐私政策',
  '退款政策'
]

// ==================== 状态标签 ====================

export const templateStatusLabels: Record<TemplateStatus, string> = {
  [TemplateStatus.DRAFT]: '草稿',
  [TemplateStatus.ACTIVE]: '生效中',
  [TemplateStatus.INACTIVE]: '已停用'
}
