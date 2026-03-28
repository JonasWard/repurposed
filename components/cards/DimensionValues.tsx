import { ElementData } from '@/lib/elements';
import { SVGIcon } from '../SVGIcon';
import length from '/assets/icons/length.svg';
import axii from '/assets/icons/axii.svg';
import { CardDetailLevel } from '@/lib/cardContent';

export const DimensionValues: React.FC<{
  element: ElementData;
  sizeClass?: string;
  detailLevel: (typeof CardDetailLevel)[number];
}> = ({ element, sizeClass, detailLevel }) => {
  const spanClass = `flex flex-row ${detailLevel === 'content' ? 'gap-2' : 'gap-[0.175rem]'} items-center`;

  return (
    <div className={`flex flex-col gap-1`}>
      <span className={spanClass}>
        <SVGIcon src={axii.src} className={sizeClass} />
        <span className={sizeClass}>
          {element.dimensions[0].toFixed(0)}x{element.dimensions[1].toFixed(0)}
        </span>
      </span>
      <span className={spanClass}>
        <SVGIcon src={length.src} className={sizeClass} />
        <span className={sizeClass}>{element.dimensions[2].toFixed(0)}</span>
      </span>
    </div>
  );
};
