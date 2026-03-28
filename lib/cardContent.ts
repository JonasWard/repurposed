import { ElementData } from './elements';

export const CardDetailLevel = ['minimal', 'content'] as const;

export type ICardContentProps = {
  element: ElementData;
};

export type ICardDisplayProps = {
  elements: ElementData[];
  className?: string;
  detailLevel?: (typeof CardDetailLevel)[number];
};
