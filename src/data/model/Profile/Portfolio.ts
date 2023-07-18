export type PortfolioType = 'L' | 'F';
export const PortfolioType = {
  Url: 'L',
  File: 'F',
} as { [key: string]: PortfolioType };

export default interface Portfolio {
  name?: string;
  portfolioId?: number;
  portfolioType?: PortfolioType;
  url?: string;
}
