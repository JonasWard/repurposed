import { useTranslation } from 'react-i18next';
import { SVGIcon } from '@/components/SVGIcon';
import { Map } from '@/components/leaflet/LazyMap';
import cart from '/assets/icons/shopping_cart.svg';
import { ICardContentProps } from '@/lib/cardContent';
import { ElementData } from '@/lib/elements';
import { ElementDataContent } from './ElementDataContent';
import { Button } from '../Button';
import { LikeButton } from './cardData/LikeButton';

const EMAIL = 'info@jonasward.ch';
// create mailto with basic element data to info@jonasward.ch method
const getMailTo = (element: ElementData) => {
  return `mailto:${EMAIL}?subject=Element ${element.name} &body=I am interested in the element ${element.name} from ${element.type}. I would like to know more about the element and how to purchase it.`;
};

export const ElementContentCard: React.FC<ICardContentProps> = ({ element }) => {
  const { t } = useTranslation('common');

  return (
    <div className="element-card grid w-full grid-cols-[1fr] md:grid-cols-[1fr_1fr] flex-col items-center overflow-clip shadow-xl mx-auto gap-4">
      <div className="relative w-full h-[calc(min(50vh,20rem))] md:h-120">
        <img src={element.src} alt="lamp" className="w-full h-full object-cover" />
      </div>
      <div className="my-auto p-3 font-bold flex flex-col items-start justify-between w-full gap-4 shadow-none h-full">
        <h3 className="md:pt-4">{t(`element-type:${element.type}`)}</h3>
        <div className="grid w-full grid-cols-[1fr_auto] gap-5">
          <Map className="w-full h-50" elements={[element]} />
          <ElementDataContent element={element} detailLevel="content" />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-between w-full">
          <LikeButton element={element} detailLevel="content" />
          <Button href={getMailTo(element)} tooltip={'Demo Mode'} disabled dontLocalizedHref>
            <SVGIcon src={cart.src} className="h-4 my-auto" />
            {t('buy')}
          </Button>
        </div>
      </div>
    </div>
  );
};
