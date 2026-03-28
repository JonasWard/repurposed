import { CardDetailLevel, ICardDisplayProps } from '@/lib/cardContent';
import { useState } from 'react';
import { ElementContentCard } from './ElementContentCard';
import { ElementMinimalCard } from './ElementMinimalCard';
import { useTranslation } from 'react-i18next';

const DetailLevelSelector: React.FC<{
  className?: string;
  detailLevel: (typeof CardDetailLevel)[number];
  setDetailLevel: (detailLevel: (typeof CardDetailLevel)[number]) => void;
}> = ({ detailLevel, setDetailLevel, className }) => {
  const { t } = useTranslation('common');

  return (
    <span className={`flex flex-row gap-2 items-center ${className}`}>
      <label>{t('detail-level')}</label>:
      {CardDetailLevel.map((dL) => (
        <div className="flex flex-row gap-2 items-center">
          <input
            onChange={() => setDetailLevel(detailLevel === 'content' ? 'minimal' : 'content')}
            checked={detailLevel === dL}
            type="radio"
            key={dL}
            value={dL}
          />
          <label htmlFor={dL}>{t(dL)}</label>
        </div>
      ))}
    </span>
  );
};

export const CardRenderer: React.FC<ICardDisplayProps> = ({ detailLevel, elements, className }) => {
  const [localDetailLevel, setLocalDetailLevel] = useState<(typeof CardDetailLevel)[number]>(detailLevel ?? 'minimal');

  return (
    <div className={`${className} overlfow-y-none grid grid-rows-[auto_1fr] w-full`}>
      <div className="w-full bg-background z-1 pt-1">
        <DetailLevelSelector
          className="card-grid-padding"
          detailLevel={localDetailLevel}
          setDetailLevel={setLocalDetailLevel}
        />
        <div className="h-0">
          <div className="h-5 w-full bg-linear-to-b from-background to-transparent" />
        </div>
      </div>

      <div className="w-full overflow-y-auto">
        <div className="h-5" />
        <div className="w-full">
          <div className={`element-card-grid card-grid-padding ${localDetailLevel}`}>
            {elements.map((element) =>
              localDetailLevel === 'minimal' ? (
                <ElementMinimalCard key={element.id} element={element} />
              ) : (
                <ElementContentCard key={element.id} element={element} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
