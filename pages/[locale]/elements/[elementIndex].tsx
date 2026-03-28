import { useRouter } from 'next/router';
import { getStaticPathsWithAdditionalParams, makeStaticProps } from '../../../lib/getStatic';
import { useTranslation } from 'react-i18next';
import { Elements } from '@/lib/elements';
import { Navigation } from '@/components/Navigation';
import { ElementContentCard } from '@/components/cards/ElementContentCard';
import { SVGIcon } from '@/components/SVGIcon';

import heart from '/assets/icons/heart.svg';
import burger from '/assets/icons/burger.svg';
import home from '/assets/icons/home.svg';

export const Element = () => {
  const { t } = useTranslation(['404', 'common', 'footer']);
  const router = useRouter();

  const { elementIndex } = router.query;
  const index = Number(elementIndex);

  return (
    <>
      <Navigation
        heading={'heading'}
        links={[
          { href: 'favorites', text: 'to-favorites', icon: <SVGIcon src={heart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> }
        ]}
      />
      <main className="w-[calc(min(100vw,1200px)-50px)] mx-auto">
        <div className="mt-[65px] w-[calc(min(100vw,1200px)-50px)]">
          {Elements[index] && <ElementContentCard element={Elements[index]} />}
        </div>
      </main>
    </>
  );
};

export default Element;

const getStaticProps = makeStaticProps(['common', 'footer', 'building-type', 'element-type']);
const getStaticPaths = getStaticPathsWithAdditionalParams(
  Elements.map((_, index) => ({ elementIndex: index.toString() }))
);

export { getStaticPaths, getStaticProps };
