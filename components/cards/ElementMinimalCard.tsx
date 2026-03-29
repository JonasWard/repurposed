import Link from '../Link';
import { ICardContentProps } from '@/lib/cardContent';
import { ElementDataContent } from './ElementDataContent';
import { LikeButton } from './cardData/LikeButton';

export const ElementMinimalCard: React.FC<ICardContentProps & { highlighted?: boolean }> = ({ element, highlighted }) => {
  return (
    <Link
      href={`/elements?id=${element._id}`}
      data-listing-id={element._id}
      className={`element-card minimal h-[calc(min(250px,60svh))] overflow-clip shadow-xl ${highlighted ? 'highlighted' : ''}`}
    >
      <div className="relative w-full h-[calc(100%-2.5rem)]">
        <img src={element.imageUrl ?? ''} alt={element.name} className="w-full h-full object-cover" />
      </div>
      <div className="font-bold grid grid-cols-[1fr_auto] items-center h-[2.5rem] w-full shadow-none py-1 px-2">
        <LikeButton element={element} detailLevel="minimal" />
        <ElementDataContent element={element} detailLevel="minimal" />
      </div>
    </Link>
  );
};
