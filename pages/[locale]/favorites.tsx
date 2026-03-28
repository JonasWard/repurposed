import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { ElementMinimalCard } from '@/components/cards/ElementMinimalCard';
import { useRepurposedStore } from '@/lib/store';
import { Navigation } from '@/components/Navigation';
import { ElementData, Elements } from '@/lib/elements';
import { SVGIcon } from '@/components/SVGIcon';

import cart from '/assets/icons/shopping_cart.svg';
import home from '/assets/icons/home.svg';
import { CardRenderer } from '@/components/cards/CardRenderer';
import { useMemo } from 'react';

const Favorites: React.FC = () => {
  const { t } = useTranslation(['common', 'footer']);
  const liked = useRepurposedStore((s) => s.liked);

  const elements = useMemo(
    () =>
      [...liked.values()]
        .map((index) => Elements.find((element) => element.id === index))
        .filter((element) => element) as ElementData[],
    [liked]
  );

  return (
    <>
      <Navigation
        heading={'heading'}
        links={[
          { href: 'all-elements', text: 'to-all-elements', icon: <SVGIcon src={cart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> }
        ]}
        withoutTopMargin
      />
      {elements.length ? (
        <div className="w-full h-[100svh] grid grid-rows-[1fr_auto] max-w-standard-div">
          <p className="mt-[75px] h-[25px]">{t('your-favorites')}</p>
          <CardRenderer className="h-[calc(100svh-100px)]" detailLevel="content" elements={elements} />
        </div>
      ) : (
        <p className="mt-[75px] h-[25px]">{t('no-favorites')}</p>
      )}
    </>
  );
};

export default Favorites;

const getStaticProps = makeStaticProps(['common', 'building-type', 'element-type']);
export { getStaticPaths, getStaticProps };
