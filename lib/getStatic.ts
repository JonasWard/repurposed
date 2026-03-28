import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../next-i18next.config';

export const getI18nPaths = (additionalParams?: Record<string, any>[]) =>
  (additionalParams ?? [{}])
    .map((param) =>
      i18nextConfig.i18n.locales.map((lng) => ({
        params: {
          locale: lng,
          ...param
        }
      }))
    )
    .flat();

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
});

export const getStaticPathsWithAdditionalParams =
  (additionalParams: Record<string, any>[] = []) =>
  () => ({
    fallback: false,
    paths: getI18nPaths(additionalParams)
  });

export const getI18nProps = async (ctx: any, ns = ['common']) => {
  const locale = ctx?.params?.locale || i18nextConfig.i18n.defaultLocale;
  let props = {
    ...(await serverSideTranslations(locale, ns))
  };
  return props;
};

export const makeStaticProps =
  (ns: string[] = []) =>
  async (ctx: any) => ({
    props: await getI18nProps(ctx, ns)
  });
