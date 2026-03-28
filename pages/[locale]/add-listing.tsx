import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useTranslation } from 'next-i18next';
import { api } from '@/convex/_generated/api';
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
  TypeSelector,
  buildListingPayload,
} from '@/components/listing-form/Shared';

import home from '/assets/icons/home.svg';
import cart from '/assets/icons/shopping_cart.svg';

// ── Success screen ────────────────────────────────────────────────────────────

const SuccessScreen: React.FC<{ onAddAnother: () => void; t: (k: string) => string }> = ({ onAddAnother, t }) => (
  <div className="flex flex-col items-center gap-6 py-16">
    <div className="text-5xl">✓</div>
    <h2 className="text-2xl font-bold">{t('success-title')}</h2>
    <p className="text-gray-600">{t('success-message')}</p>
    <div className="flex flex-row gap-4">
      <Button onClick={onAddAnother}>{t('add-another')}</Button>
      <Button href="/all-elements">{t('view-all')}</Button>
    </div>
  </div>
);

// ── Main page ────────────────────────────────────────────────────────────────

const AddListing: React.FC = () => {
  const { t } = useTranslation('listing-form');
  const createListing = useMutation(api.listings.create);

  const [step, setStep] = useState<'type-select' | 'form' | 'success'>('type-select');
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  const [form, setFormRaw] = useState<FormData>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const set = (patch: Partial<FormData>) => setFormRaw((prev) => ({ ...prev, ...patch }));

  const handleSelectType = (type: ListingType) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleSubmit = async () => {
    if (!selectedType) return;
    setSubmitting(true);
    try {
      await createListing({ data: buildListingPayload(form, selectedType) });
      setStep('success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation
        heading={t('page-title')}
        links={[
          { href: 'all-elements', text: 'to-all-elements', icon: <SVGIcon src={cart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> },
        ]}
        withoutTopMargin
      />

      <main className="w-full max-w-standard-div mx-auto px-4 pb-16 pt-20">
        {step === 'type-select' && <TypeSelector onSelect={handleSelectType} t={t} />}

        {step === 'form' && selectedType && (
          <>
            <div className="flex flex-row items-center gap-3 max-w-2xl mx-auto mt-6">
              <button
                onClick={() => setStep('type-select')}
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
                {submitting ? t('submitting') : t('submit')}
              </Button>
            </div>
          </>
        )}

        {step === 'success' && (
          <SuccessScreen
            onAddAnother={() => {
              setFormRaw(defaultForm);
              setSelectedType(null);
              setStep('type-select');
            }}
            t={t}
          />
        )}
      </main>
    </>
  );
};

export default AddListing;

const getStaticProps = makeStaticProps(['listing-form', 'common']);
export { getStaticPaths, getStaticProps };
