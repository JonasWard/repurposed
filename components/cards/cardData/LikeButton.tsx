import { useRepurposedStore } from '@/lib/store';
import brokenHeart from '/assets/icons/heart_broken.svg';
import heart from '/assets/icons/heart.svg';
import { SVGIcon } from '@/components/SVGIcon';
import { Button } from '@/components/Button';
import { ElementData } from '@/lib/elements';
import { CardDetailLevel } from '@/lib/cardContent';
import { useTranslation } from 'react-i18next';

export const LikeButton: React.FC<{ element: ElementData; detailLevel: (typeof CardDetailLevel)[number] }> = ({
  element,
  detailLevel
}) => {
  const { t } = useTranslation('common');

  const likedElements = useRepurposedStore((state) => state.liked);
  const isLiked = likedElements.has(element.id);

  const toggleLike = () => {
    if (isLiked) useRepurposedStore.getState().removeLiked(element.id);
    else useRepurposedStore.getState().addLiked(element.id);
  };

  return detailLevel === 'content' ? (
    <Button onClick={toggleLike}>
      <SVGIcon src={isLiked ? heart.src : brokenHeart.src} className="h-5 my-auto" />
      {t('favorites')}
    </Button>
  ) : (
    <SVGIcon
      onClick={toggleLike}
      src={isLiked ? heart.src : brokenHeart.src}
      className="h-5 my-auto cursor-pointer hover:scale-110 transition-all duration-300"
    />
  );
};
