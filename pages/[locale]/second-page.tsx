import Link from '../../components/Link';

import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ReactNode } from 'react';

const SecondPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation(['second-page', 'common', 'footer']);

  return (
    <>
      <main>
        <Header heading={'h1'} title={'title'} />
        <Link href="/">
          <button type="button">{t('common:back-to-home')}</button>
        </Link>
        <p>{children}</p>
      </main>
      <Footer />
    </>
  );
};

export default SecondPage;

const getStaticProps = makeStaticProps(['second-page', 'common', 'footer']);
export { getStaticPaths, getStaticProps };

// // or if you want to merge the i18n props with other props...
// export { getStaticPaths };
// export const getStaticProps = async (ctx: any) => {
//   // some data fetched from anywhere...
//   const someOtherData = 'hello world';
//   return {
//     props: {
//       ...(await getI18nProps(ctx, ['second-page', 'common', 'footer'])),
//       someOtherData
//     }
//   };
// };
