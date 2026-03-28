import { Navigation } from '@/components/Navigation';
import { Elements } from '@/lib/elements';
import { Map } from '@/components/leaflet/LazyMap';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import { SVGIcon } from '@/components/SVGIcon';

import heart from '/assets/icons/heart.svg';
import home from '/assets/icons/home.svg';
import { CardRenderer } from '@/components/cards/CardRenderer';

export const AllElements = () => {
  return (
    <>
      <Navigation
        heading={'all-elements'}
        links={[
          { href: 'favorites', text: 'to-favorites', icon: <SVGIcon src={heart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> }
        ]}
        withoutTopMargin
      />
      <div className="w-full h-[100svh] grid grid-rows-[1fr_auto] overflow-visible max-w-standard-div">
        <div className="standard-padding w-full">
          <Map className="w-full h-[35svh] z-1" elements={Elements} />
        </div>
        <CardRenderer className="h-[65svh]" elements={Elements} />
      </div>
    </>
  );
};

export default AllElements;

const getStaticProps = makeStaticProps(['all-elements', 'common', 'building-type', 'element-type']);
export { getStaticPaths, getStaticProps };
