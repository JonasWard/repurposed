import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import { Button } from '@/components/Button';

const Homepage = () => {
  const { t } = useTranslation(['common', 'footer']);

  return (
    <div className="bg-repurposed-light h-[100svh] flex flex-col lg:justify-end lg:gap-30 justify-around items-center">
      <Header className="text-black" heading={'h1'} title={'title'} />
      <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
        <Button className="px-4" href={'/all-elements'}>
          {t('to-all-elements')}
        </Button>
        <Button className="px-4" href={'/tinder-slides'}>
          {t('to-element-swiping')}
        </Button>
        <Button className="px-4" href={'/area-composer'}>
          {t('to-area-composer')}
        </Button>
        <Button className="px-4" href={'/add-listing'}>
          {t('add-listing')}
        </Button>
        <Button className="px-4" href={'/favorites'}>
          {t('to-favorites')}
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;

const getStaticProps = makeStaticProps(['common', 'footer']);
export { getStaticPaths, getStaticProps };
