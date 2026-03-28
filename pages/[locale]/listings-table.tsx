import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'convex/react';
import { useTranslation } from 'next-i18next';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, type ColDef, type RowClickedEvent, type GridReadyEvent } from 'ag-grid-community';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import type { ListingData } from '@/lib/elements';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { SVGIcon } from '@/components/SVGIcon';
import {
  type ListingType,
  type FormData,
  defaultForm,
  TYPE_ICONS,
  CommonFields,
  buildListingPayload,
  listingToForm,
} from '@/components/listing-form/Shared';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';

import home from '/assets/icons/home.svg';
import cart from '/assets/icons/shopping_cart.svg';

// ── Helpers ───────────────────────────────────────────────────────────────────

function geomVal(listing: ListingData, key: string): number | null {
  return key in listing.geometry ? (listing.geometry as Record<string, number>)[key] ?? null : null;
}

// ── Edit panel ────────────────────────────────────────────────────────────────

interface EditPanelProps {
  listing: ListingData;
  onClose: () => void;
  onSaved: () => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ listing, onClose, onSaved }) => {
  const { t } = useTranslation('listing-form');
  const updateListing = useMutation(api.listings.update);
  const removeListing = useMutation(api.listings.remove);

  const [form, setFormRaw] = useState<FormData>(() => listingToForm(listing));
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Re-initialise when the selected listing changes.
  useEffect(() => {
    setFormRaw(listingToForm(listing));
    setSaved(false);
    setConfirmDelete(false);
  }, [listing._id]);

  const set = useCallback((patch: Partial<FormData>) => setFormRaw((prev) => ({ ...prev, ...patch })), []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateListing({
        id: listing._id as Id<'listings'>,
        data: buildListingPayload(form, listing.type as ListingType),
      });
      setSaved(true);
      setTimeout(onSaved, 1200);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await removeListing({ id: listing._id as Id<'listings'> });
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  const selectedType = listing.type as ListingType;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <SVGIcon src={TYPE_ICONS[selectedType]} className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-800 capitalize">{selectedType}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600 text-sm truncate max-w-[200px]">{listing.name}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-xl leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="overflow-y-auto flex-1 pb-4">
        <CommonFields form={form} set={set} t={t} selectedType={selectedType} />
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3 border-t border-gray-200 bg-white flex flex-col gap-2">
        {saved ? (
          <div className="text-center text-sm font-medium text-green-600">✓ {t('save-changes')} saved</div>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting || !form.name}
            className="w-full py-2 text-sm font-semibold"
          >
            {submitting ? t('saving') : t('save-changes')}
          </Button>
        )}

        {confirmDelete ? (
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {deleting ? 'Deleting…' : 'Confirm delete'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleDelete}
            className="w-full py-2 text-sm font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          >
            Remove listing
          </button>
        )}
      </div>
    </div>
  );
};

// ── Column definitions ────────────────────────────────────────────────────────

const colDefs: ColDef<ListingData>[] = [
  {
    headerName: 'Name',
    field: 'name',
    flex: 2,
    minWidth: 140,
    filter: true,
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 100,
    filter: true,
  },
  {
    headerName: 'Colour',
    valueGetter: (p) => (p.data as Record<string, unknown>)?.colour ?? '—',
    width: 90,
    filter: true,
  },
  {
    headerName: 'Qty',
    field: 'quantity',
    width: 70,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'W (mm)',
    valueGetter: (p) => (p.data ? geomVal(p.data, 'width') : null),
    width: 90,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'H (mm)',
    valueGetter: (p) => (p.data ? geomVal(p.data, 'height') : null),
    width: 90,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'L (mm)',
    valueGetter: (p) => (p.data ? geomVal(p.data, 'length') : null),
    width: 90,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Damage',
    field: 'damage',
    width: 85,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Available',
    valueGetter: (p) =>
      p.data?.availableFrom ? new Date(p.data.availableFrom).toLocaleDateString() : '—',
    width: 110,
    filter: true,
  },
  {
    headerName: 'City',
    valueGetter: (p) => p.data?.location?.city ?? '—',
    flex: 1,
    minWidth: 90,
    filter: true,
  },
];

// ── Main page ─────────────────────────────────────────────────────────────────

const ListingsTable: React.FC = () => {
  const { t } = useTranslation(['common', 'listing-form']);
  const router = useRouter();

  const allListings = useQuery(api.listings.list);
  const listings: ListingData[] = (allListings as ListingData[] | undefined) ?? [];

  const [selectedListing, setSelectedListing] = useState<ListingData | null>(null);
  const gridRef = useRef<AgGridReact<ListingData>>(null);

  const panelOpen = selectedListing !== null;

  const onRowClicked = useCallback(
    (e: RowClickedEvent<ListingData>) => {
      if (!e.data) return;
      setSelectedListing((prev) => (prev?._id === e.data!._id ? null : e.data!));
    },
    [],
  );

  const handleClose = useCallback(() => {
    setSelectedListing(null);
    gridRef.current?.api?.deselectAll();
  }, []);

  const handleSaved = useCallback(() => {
    // Keep the panel open so the user can see the success state.
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
    }),
    [],
  );

  const onGridReady = useCallback((_e: GridReadyEvent) => {
    // auto-size columns once data arrives
  }, []);

  return (
    <>
      <Navigation
        heading={t('listings-table', { ns: 'common' })}
        links={[
          { href: 'all-elements', text: 'to-all-elements', icon: <SVGIcon src={cart.src} /> },
          { href: '/', text: 'back-to-home', icon: <SVGIcon src={home.src} /> },
        ]}
        withoutTopMargin
      />

      <div className="w-full flex flex-row h-[calc(100svh-4.5rem)] mt-[4.5rem] overflow-hidden">
        {/* AG Grid */}
        <div className={`flex flex-col transition-all duration-200 ${panelOpen ? 'w-[58%]' : 'w-full'}`}>
          <div className="flex-1 min-h-0">
            <AgGridReact<ListingData>
              ref={gridRef}
              theme={themeQuartz}
              rowData={listings}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              rowSelection="single"
              onRowClicked={onRowClicked}
              onGridReady={onGridReady}
              suppressCellFocus
              animateRows
              pagination
              paginationPageSize={50}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>

        {/* Edit panel */}
        {panelOpen && selectedListing && (
          <div className="w-[42%] border-l border-gray-200 flex flex-col bg-gray-50 overflow-hidden">
            <EditPanel
              listing={selectedListing}
              onClose={handleClose}
              onSaved={handleSaved}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListingsTable;

const getStaticProps = makeStaticProps(['listing-form', 'common']);
export { getStaticPaths, getStaticProps };
