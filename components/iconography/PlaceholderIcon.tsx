import { useTranslation } from 'react-i18next';

export const PlaceholderIcon: React.FC<{ sizeClass?: string }> = ({ sizeClass }) => {
  const { t } = useTranslation('common');

  return (
    <p
      className={`flex items-center justify-center bg-repurposed text-sm text-white border-2 border-red-500 px-2 ${sizeClass}`}
    >
      {t('placeholder')}
    </p>
  );
};
