export type PortfolioType = 'L' | 'F'
export const PortfolioType = {
  Url: 'L',
  File: 'F',
} as {[key: string]: PortfolioType}

export default interface Portfolio {
  name: string
  portfolioId: string
  portfolioType: PortfolioType
  schemaVersion?: string
  url: string
}
