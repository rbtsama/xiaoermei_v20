import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import MemberLevelForm from "~/pages/MemberManagement/MemberLevels/components/MemberLevelForm"
import MemberLevelsService from "~/pages/MemberManagement/MemberLevels/services/memberLevels.service"

export async function action({ request }: ActionFunctionArgs) {
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
    await MemberLevelsService.createLevel({
      isDefault: false,
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
      status
    })

    return redirect("/member-management/levels")
  } catch (error) {
    return json({ errors: { general: "创建失败，请稍后重试" } }, { status: 500 })
  }
}

export default function CreateMemberLevelRoute() {
  const actionData = useActionData<typeof action>()

  return <MemberLevelForm errors={actionData?.errors} />
}
