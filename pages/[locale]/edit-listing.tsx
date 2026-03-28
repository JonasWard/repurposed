import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'convex/react';
import { useTranslation } from 'next-i18next';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { SVGIcon } from '@/components/SVGIcon';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import {
  type ListingType,
  type FormData,
  defaultForm,
  TYPE_ICONS,
  CommonFields,
  buildListingPayload,
  listingToForm,
} from '@/components/listing-form/Shared';

import home from '/assets/icons/home.svg';
import cart from '/assets/icons/shopping_cart.svg';

// ── Success screen ────────────────────────────────────────────────────────────

const SuccessScreen: React.FC<{ listingId: string; t: (k: string) => string }> = ({ listingId, t }) => (
  <div className="flex flex-col items-center gap-6 py-16">
    <div className="text-5xl">✓</div>
    <h2 className="text-2xl font-bold">{t('edit-success-title')}</h2>
    <p className="text-gray-600">{t('edit-success-message')}</p>
    <div className="flex flex-row gap-4">
      <Button href={`/elements?id=${listingId}`}>{t('back-to-listing')}</Button>
      <Button href="/all-elements">{t('view-all')}</Button>
    </div>
  </div>
);

// ── Main page ────────────────────────────────────────────────────────────────

const EditListing: React.FC = () => {
  const { t } = useTranslation('listing-form');
  const router = useRouter();
  const updateListing = useMutation(api.listings.update);

  const rawId = router.isReady ? router.query.id : undefined;
  const listingId = typeof rawId === 'string' ? (rawId as Id<'listings'>) : undefined;

  const listing = useQuery(api.listings.getById, listingId ? { id: listingId } : 'skip');

  const [form, setFormRaw] = useState<FormData>(defaultForm);
  const [initialised, setInitialised] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Pre-populate form once the listing loads (only once).
  useEffect(() => {
    if (listing && !initialised) {
      setFormRaw(listingToForm(listing));
      setInitialised(true);
    }
  }, [listing, initialised]);

  const set = (patch: Partial<FormData>) => setFormRaw((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async () => {
    if (!listingId || !listing) return;
    setSubmitting(true);
    try {
      await updateListing({
        id: listingId,
        data: buildListingPayload(form, listing.type as ListingType),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = !router.isReady || (listingId !== undefined && listing === undefined);
  const selectedType = listing?.type as ListingType | undefined;

  return (
    <>
      <Navigation
        heading={t('edit-page-title')}
        links={[
          { href: 'all-elements', text: 'to-all-elements', icon: <SVGIcon src={cart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> },
        ]}
        withoutTopMargin
      />

      <main className="w-full max-w-standard-div mx-auto px-4 pb-16 pt-20">
        {isLoading && (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading…</div>
        )}

        {!isLoading && !listing && listingId && (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Listing not found.</div>
        )}

        {!isLoading && listing && !done && selectedType && initialised && (
          <>
            <div className="flex flex-row items-center gap-3 max-w-2xl mx-auto mt-6">
              <button
                onClick={() => router.back()}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ← {t('back')}
              </button>
              <div className="flex flex-row items-center gap-2">
                <SVGIcon src={TYPE_ICONS[selectedType]} className="h-6 w-6" />
                <h3 className="capitalize">{selectedType}</h3>
              </div>
            </div>

            <CommonFields form={form} set={set} t={t} selectedType={selectedType} />

            <div className="max-w-2xl mx-auto mt-6">
              <Button
                onClick={handleSubmit}
                disabled={submitting || !form.name}
                className="w-full py-3 text-base font-semibold"
              >
                {submitting ? t('saving') : t('save-changes')}
              </Button>
            </div>
          </>
        )}

        {done && listingId && <SuccessScreen listingId={listingId} t={t} />}
      </main>
    </>
  );
};

export default EditListing;

const getStaticProps = makeStaticProps(['listing-form', 'common']);
export { getStaticPaths, getStaticProps };
