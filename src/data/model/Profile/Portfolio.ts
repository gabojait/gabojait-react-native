export type PortfolioType = 'LINK' | 'FILE';
export const PortfolioType = {
  Url: 'LINK',
  File: 'FILE',
} as { [key: string]: PortfolioType };

export default interface Portfolio {
  portfolioId?: number;
  createdAt?: string;
  media: PortfolioType;
  portfolioName?: string;
  portfolioUrl: string;
  updatedAt?: string;
}
