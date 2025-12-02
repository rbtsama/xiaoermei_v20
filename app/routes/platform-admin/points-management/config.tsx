/**
 * 平台后台 - 积分配置路由（基础规则、奖励服务、换购服务）
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsConfigPage from '~/pages/PlatformAdmin/PointsManagement/PointsConfigPage'
import ValueAddedServiceService from '~/pages/PlatformAdmin/PointsManagement/services/valueAddedService.service'

/**
 * Loader: 加载积分配置数据
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [baseRule, rewardServices, exchangeServices] = await Promise.all([
      ValueAddedServiceService.getBaseRule(),
      ValueAddedServiceService.getRewardServices(),
      ValueAddedServiceService.getExchangeServices(),
    ])

    return json({
      baseRule,
      rewardServices,
      exchangeServices,
      error: null,
    })
  } catch (error) {
    console.error('加载积分配置失败:', error)
    return json(
      {
        baseRule: null,
        rewardServices: [],
        exchangeServices: [],
        error: '加载积分配置失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理积分配置的所有操作
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('action') as string

  try {
    switch (actionType) {
      // ==================== 基础规则 ====================
      case 'update-base-rule': {
        const registerReward = parseInt(formData.get('registerReward') as string, 10)
        const inviterReward = parseInt(formData.get('inviterReward') as string, 10)
        const exchangeRate = parseInt(formData.get('exchangeRate') as string, 10)
        const maxDeductionRatio = parseInt(formData.get('maxDeductionRatio') as string, 10)
        const validityMonths = parseInt(formData.get('validityMonths') as string, 10)

        // 验证
        if (isNaN(registerReward) || registerReward < 0) {
          return json({ error: '注册奖励必须为非负整数' }, { status: 400 })
        }
        if (isNaN(inviterReward) || inviterReward < 0) {
          return json({ error: '邀请人奖励必须为非负整数' }, { status: 400 })
        }
        if (isNaN(exchangeRate) || exchangeRate < 1) {
          return json({ error: '积分兑换汇率必须大于0' }, { status: 400 })
        }
        if (isNaN(maxDeductionRatio) || maxDeductionRatio < 0 || maxDeductionRatio > 100) {
          return json({ error: '最大抵扣比例必须在0-100之间' }, { status: 400 })
        }
        if (isNaN(validityMonths) || validityMonths < 1) {
          return json({ error: '有效期必须大于0' }, { status: 400 })
        }

        // 构建VIP倍数
        const vipMultipliers: Record<string, number> = {}
        for (let i = 0; i <= 9; i++) {
          const key = `vip${i}`
          const value = parseFloat(formData.get(key) as string) || 1.0
          vipMultipliers[`VIP${i}`] = value
        }

        await ValueAddedServiceService.updateBaseRule(
          {
            registerReward,
            inviterReward,
            exchangeRate,
            maxDeductionRatio,
            validityMonths,
            vipMultipliers,
          },
          '兔子' // 操作人，后期可从session获取
        )

        return redirect('/platform-admin/points-management/config')
      }

      // ==================== 积分奖励服务 ====================
      case 'create-reward': {
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        await ValueAddedServiceService.createRewardService({
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsReward: pointsAmount,
          status: 'active',
        })

        return redirect('/platform-admin/points-management/config')
      }

      case 'update-reward': {
        const id = formData.get('id') as string
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        const result = await ValueAddedServiceService.updateRewardService(id, {
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsReward: pointsAmount,
        })

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      case 'delete-reward': {
        const id = formData.get('id') as string
        const success = await ValueAddedServiceService.deleteRewardService(id)

        if (!success) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      case 'toggle-reward': {
        const id = formData.get('id') as string
        const result = await ValueAddedServiceService.toggleRewardServiceStatus(id)

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      // ==================== 积分换购服务 ====================
      case 'create-exchange': {
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        await ValueAddedServiceService.createExchangeService({
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsCost: pointsAmount,
          status: 'active',
        })

        return redirect('/platform-admin/points-management/config')
      }

      case 'update-exchange': {
        const id = formData.get('id') as string
        const serviceName = formData.get('serviceName') as string
        const serviceDescription = formData.get('serviceDescription') as string
        const pointsAmount = parseInt(formData.get('pointsAmount') as string, 10)

        if (!serviceName || serviceName.trim().length === 0) {
          return json({ error: '服务内容不能为空' }, { status: 400 })
        }
        if (serviceName.length > 50) {
          return json({ error: '服务内容不能超过50字符' }, { status: 400 })
        }
        if (isNaN(pointsAmount) || pointsAmount < 1) {
          return json({ error: '积分数量必须为正整数' }, { status: 400 })
        }

        const result = await ValueAddedServiceService.updateExchangeService(id, {
          serviceName: serviceName.trim(),
          serviceDescription: serviceDescription?.trim() || '',
          pointsCost: pointsAmount,
        })

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      case 'delete-exchange': {
        const id = formData.get('id') as string
        const success = await ValueAddedServiceService.deleteExchangeService(id)

        if (!success) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      case 'toggle-exchange': {
        const id = formData.get('id') as string
        const result = await ValueAddedServiceService.toggleExchangeServiceStatus(id)

        if (!result) {
          return json({ error: '服务不存在' }, { status: 404 })
        }

        return redirect('/platform-admin/points-management/config')
      }

      case 'reorder-exchange': {
        const idsJson = formData.get('ids') as string
        const ids = JSON.parse(idsJson) as string[]

        if (!Array.isArray(ids) || ids.length === 0) {
          return json({ error: '无效的排序数据' }, { status: 400 })
        }

        await ValueAddedServiceService.reorderExchangeServices(ids)
        return redirect('/platform-admin/points-management/config')
      }

      default:
        return json({ error: '未知操作类型' }, { status: 400 })
    }
  } catch (error) {
    console.error('操作失败:', error)
    return json(
      { error: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    )
  }
}

/**
 * 路由组件
 */
export default function PointsConfigRoute() {
  const { baseRule, rewardServices, exchangeServices, error } = useLoaderData<typeof loader>()

  return (
    <PointsConfigPage
      baseRule={baseRule as any}
      rewardServices={rewardServices as any}
      exchangeServices={exchangeServices as any}
      error={error}
    />
  )
}
