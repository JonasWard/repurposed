import { BASE_HREF } from './config';

const deconstructHref = (href: string) => ({
  locale: href.replace(BASE_HREF !== '/' ? BASE_HREF + '/' : '/', '').split('/')[0],
  relevantPath: href
    .replace(BASE_HREF !== '/' ? BASE_HREF + '/' : '/', '')
    .split('/')
    .slice(1)
    .join('/')
});

export const navigateTo = (currentHref: string, newHref: string): string => {
  const { locale } = deconstructHref(currentHref);
  return (
    (BASE_HREF === '/' ? BASE_HREF : BASE_HREF + '/') + locale + (newHref.startsWith('/') ? newHref : '/' + newHref)
  );
};

export const changeLocale = (currentHref: string, newLocale: string): string => {
  const { relevantPath } = deconstructHref(currentHref);
  return (BASE_HREF === '/' ? BASE_HREF : BASE_HREF + '/') + newLocale + '/' + relevantPath;
};
