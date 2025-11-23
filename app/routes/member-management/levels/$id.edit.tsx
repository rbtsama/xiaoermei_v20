import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useActionData } from "@remix-run/react"
import MemberLevelForm from "~/pages/MemberManagement/MemberLevels/components/MemberLevelForm"
import MemberLevelsService from "~/pages/MemberManagement/MemberLevels/services/memberLevels.service"
import type { MemberLevel } from "~/pages/MemberManagement/MemberLevels/types/memberLevels.types"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response("Not Found", { status: 404 })
  }

  try {
    const level = await MemberLevelsService.getLevelById(id)

    if (!level) {
      throw new Response("Not Found", { status: 404 })
    }

    return json({ level, error: null })
  } catch (error) {
    return json({ level: null, error: "加载会员等级失败" }, { status: 500 })
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params

  if (!id) {
    return json({ errors: { general: "缺少等级ID" } }, { status: 400 })
  }

  const formData = await request.formData()

  const levelName = formData.get("levelName") as string
  const upgradeCondition = formData.get("upgradeCondition") as string
  const levelBenefits = formData.get("levelBenefits") as string
  const validityPeriod = formData.get("validityPeriod") as string
  const requiredNights = Number(formData.get("requiredNights"))
  const requiredAmount = Number(formData.get("requiredAmount"))
  const discountRangeMin = Number(formData.get("discountRangeMin"))
  const discountRangeMax = Number(formData.get("discountRangeMax"))
  const discountPercentage = Number(formData.get("discountPercentage"))
  const pointsEarnRatio = Number(formData.get("pointsEarnRatio"))
  const upgradeGiftSets = Number(formData.get("upgradeGiftSets"))
  const status = formData.get("status") as 'active' | 'inactive'

  // 验证
  const errors: Record<string, string> = {}

  if (!levelName || levelName.trim().length === 0) {
    errors.levelName = "等级名称不能为空"
  }

  if (discountPercentage < discountRangeMin || discountPercentage > discountRangeMax) {
    errors.general = `当前折扣(${discountPercentage}%)必须在折扣范围(${discountRangeMin}% ~ ${discountRangeMax}%)内`
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 })
  }

  try {
    await MemberLevelsService.updateLevel(id, {
      levelName,
      upgradeCondition,
      levelBenefits,
      validityPeriod,
      requiredNights,
      requiredAmount,
      discountRangeMin,
      discountRangeMax,
      discountPercentage,
      pointsEarnRatio,
      upgradeGiftSets,
      status,
      updatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '-')
    })

    return redirect("/member-management/levels")
  } catch (error) {
    return json({ errors: { general: "保存失败，请稍后重试" } }, { status: 500 })
  }
}

export default function EditMemberLevelRoute() {
  const { level } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  if (!level) {
    return (
      <div className="p-6">
        <div className="text-destructive">等级不存在</div>
      </div>
    )
  }

  return <MemberLevelForm level={level as MemberLevel} errors={actionData?.errors} />
}
