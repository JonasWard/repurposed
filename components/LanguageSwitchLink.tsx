import { useRouter } from 'next/router';
import i18nextConfig from '../next-i18next.config';
import { changeLocale } from '@/lib/getCorrectHref';

const LanguageSwitchLink: React.FC = () => {
  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <select
      className="border-[1px] border-gray-300 px-[2px]"
      value={currentLocale}
      onChange={(e) => {
        const locale = e.target.value;
        router.push(changeLocale(router.asPath, locale), undefined, { locale });
      }}
    >
      {i18nextConfig.i18n.locales.map((locale) => (
        <option style={{ fontSize: 'small' }} key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitchLink;
