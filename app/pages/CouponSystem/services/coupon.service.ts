import type { CouponConfig } from '../types/coupon.types'
import { mockCouponConfigs } from './mocks'

class CouponService {
  private coupons: CouponConfig[] = [...mockCouponConfigs]

  async getAllCoupons(): Promise<CouponConfig[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return [...this.coupons]
  }
}

export default new CouponService()
