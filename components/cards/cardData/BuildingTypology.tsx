import { SVGIcon } from '@/components/SVGIcon';
import { BuildingTypologies, ElementData } from '@/lib/elements';
import residential from '/assets/icons/building-typology/residential.svg';
import commercial from '/assets/icons/building-typology/commercial.svg';
import industrial from '/assets/icons/building-typology/industrial.svg';
import mixedUse from '/assets/icons/building-typology/mixed-use.svg';
import { useTranslation } from 'react-i18next';
import { CardDetailLevel } from '@/lib/cardContent';
import { IconText } from './IconText';

export const BuildingTypology: React.FC<{
  element: ElementData;
  detailLevel: (typeof CardDetailLevel)[number];
  sizeClass?: string;
}> = ({ element, detailLevel, sizeClass }) => {
  const { t } = useTranslation('building-type');

  return detailLevel === 'content' ? (
    <IconText
      icon={<BuildingTypologyIcon buildingTypology={element.buildingTypology} sizeClass={sizeClass} />}
      text={t(element.buildingTypology)}
      sizeClass={sizeClass}
    />
  ) : (
    <BuildingTypologyIcon buildingTypology={element.buildingTypology} sizeClass={sizeClass} />
  );
};

const BuildingTypologyIcon: React.FC<{ buildingTypology: (typeof BuildingTypologies)[number]; sizeClass?: string }> = ({
  buildingTypology,
  sizeClass
}) => {
  switch (buildingTypology) {
    case 'residential':
      return <SVGIcon src={residential.src} className={sizeClass} />;
    case 'commercial':
      return <SVGIcon src={commercial.src} className={sizeClass} />;
    case 'industrial':
      return <SVGIcon src={industrial.src} className={sizeClass} />;
    case 'mixed-use':
      return <SVGIcon src={mixedUse.src} className={sizeClass} />;
  }
};
