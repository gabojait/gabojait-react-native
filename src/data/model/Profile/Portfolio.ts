export type PortfolioType = 'link' | 'file';
export const PortfolioType = {
  Url: 'link',
  File: 'file',
} as { [key: string]: PortfolioType };

export default interface Portfolio {
  portfolioId?: number;
  new?: boolean;
  createdAt?: string,
  media: PortfolioType,
  portfolioName?: string,
  portfolioUrl: string,
  updatedAt?: string,
}
