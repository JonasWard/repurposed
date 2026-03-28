import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { navigateTo } from '@/lib/getCorrectHref';
import Link from 'next/link';

const LinkComponent: React.FC<{
  children: ReactNode;
  tooltip?: string;
  skipLocaleHandling?: boolean;
  href: string;
  className?: string;
}> = ({ href, className, ...props }) => {
  const router = useRouter();
  return <Link className={(className ?? '') + ' cursor-pointer'} href={navigateTo(router.asPath, href)} {...props} />;
};

export default LinkComponent;
