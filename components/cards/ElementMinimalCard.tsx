import Link from '../Link';
import { ICardContentProps } from '@/lib/cardContent';
import { ElementDataContent } from './ElementDataContent';
import { LikeButton } from './cardData/LikeButton';

export const ElementMinimalCard: React.FC<ICardContentProps> = ({ element }) => {
  return (
    <Link
      href={`/elements?id=${element._id}`}
      className={`element-card minimal h-[calc(min(250px,60svh))] overflow-clip shadow-xl`}
    >
      <div className="relative w-full h-[calc(100%-2.5rem)]">
        <img src={element.imageUrl ?? ''} alt={element.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <span className="text-gray-600 text-2xl font-bold">Demo</span>
        </div>
      </div>
      <div className="font-bold grid grid-cols-[1fr_auto] items-center h-[2.5rem] w-full shadow-none py-1 px-2">
        <LikeButton element={element} detailLevel="minimal" />
        <ElementDataContent element={element} detailLevel="minimal" />
      </div>
    </Link>
  );
};
