import { ListingData } from './elements';

export const CardDetailLevel = ['minimal', 'content'] as const;

export type ICardContentProps = {
  element: ListingData;
};

export type ICardDisplayProps = {
  elements: ListingData[];
  className?: string;
  detailLevel?: (typeof CardDetailLevel)[number];
};
