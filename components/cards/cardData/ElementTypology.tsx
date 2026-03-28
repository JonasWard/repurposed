import { SVGIcon } from '@/components/SVGIcon';
import { ElementData, ElementTypologies } from '@/lib/elements';
import column from '/assets/icons/element-typology/column.svg';
import slabRoof from '/assets/icons/element-typology/slab-roof.svg';
import { useTranslation } from 'react-i18next';
import { CardDetailLevel } from '@/lib/cardContent';
import { IconText } from './IconText';

export const ElementTypology: React.FC<{
  element: ElementData;
  detailLevel: (typeof CardDetailLevel)[number];
  sizeClass?: string;
}> = ({ element, detailLevel, sizeClass }) => {
  const { t } = useTranslation('element-type');

  return detailLevel === 'content' ? (
    <IconText
      icon={<ElementTypologyIcon elementTypology={element.type} sizeClass={sizeClass} />}
      text={t(element.type)}
      sizeClass={sizeClass}
    />
  ) : (
    <ElementTypologyIcon elementTypology={element.type} sizeClass={sizeClass} />
  );
};

const ElementTypologyIcon: React.FC<{ elementTypology: (typeof ElementTypologies)[number]; sizeClass?: string }> = ({
  elementTypology,
  sizeClass
}) => {
  switch (elementTypology) {
    case 'column':
      return <SVGIcon src={column.src} className={sizeClass} />;
    case 'tt-slab':
    case 'hollow-core-slab':
    case 'slab-roof':
      return <SVGIcon src={slabRoof.src} className={sizeClass} />;
  }
};
