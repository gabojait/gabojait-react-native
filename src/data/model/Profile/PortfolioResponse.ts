export type PortfolioType = 'L' | 'F'
export const PortfolioType = {
  Url: 'L',
  File: 'F',
} as {[key: string]: PortfolioType}

export default interface PortfolioResponse {
  createdAt: string
  media: string
  portfolioId: number
  portfolioName: string
  portfolioUrl: string
  updatedAt: string
}
