import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { SVGIcon } from '@/components/SVGIcon';
import { ListingTypes } from '@/lib/elements';

import bricksIcon from '/assets/icons/element-typology/bricks.svg';
import woodIcon from '/assets/icons/element-typology/wood.svg';
import windowIcon from '/assets/icons/element-typology/window.svg';
import tileIcon from '/assets/icons/element-typology/tile.svg';

// ── Types ────────────────────────────────────────────────────────────────────

export type ListingType = (typeof ListingTypes)[number];
export type WoodType = 'cedar' | 'oak' | 'pine' | 'douglas fir' | 'spruce';
export type BrickColour = 'red' | 'yellow' | 'brown';
export type TileColour = 'red' | 'yellow' | 'blue' | 'white' | 'brown' | 'green';
export type TileType = 'ceramic' | 'slate' | 'terracota';
export type WindowType = 'fixed' | 'sliding' | 'casement' | 'awning';

export const WOOD_TYPES: WoodType[] = ['cedar', 'oak', 'pine', 'douglas fir', 'spruce'];
export const WINDOW_TYPES: WindowType[] = ['fixed', 'sliding', 'casement', 'awning'];
export const TILE_TYPES: TileType[] = ['ceramic', 'slate', 'terracota'];
export const BRICK_COLOURS: BrickColour[] = ['red', 'yellow', 'brown'];
export const TILE_COLOURS: TileColour[] = ['red', 'yellow', 'blue', 'white', 'brown', 'green'];

export const TYPE_ICONS: Record<ListingType, string> = {
  bricks: bricksIcon.src,
  wood: woodIcon.src,
  window: windowIcon.src,
  tile: tileIcon.src,
};

// ── Form state ───────────────────────────────────────────────────────────────

export type FormData = {
  name: string;
  imageStorageId: Id<'_storage'> | null;
  existingImageUrl: string | null;
  quantity: number;
  availableFrom: string;
  damage: number;
  hasLocation: boolean;
  lat: string;
  lng: string;
  city: string;
  zipCode: string;
  country: string;
  address: string;
  // bricks
  b_width: number;
  b_height: number;
  b_length: number;
  usedOutside: boolean;
  glazed: boolean;
  brickColour: BrickColour;
  // wood
  w_width: number;
  w_height: number;
  w_length: number;
  structural: boolean;
  outsideUse: boolean;
  woodType: WoodType;
  // window
  win_width: number;
  frameThickness: number;
  windowType: WindowType;
  winWoodType: WoodType;
  // tile
  t_width: number;
  t_length: number;
  thickness: number;
  tileType: TileType;
  tileColour: TileColour;
};

export const defaultForm: FormData = {
  name: '',
  imageStorageId: null,
  existingImageUrl: null,
  quantity: 10,
  availableFrom: new Date().toISOString().split('T')[0],
  damage: 1,
  hasLocation: false,
  lat: '',
  lng: '',
  city: '',
  zipCode: '',
  country: '',
  address: '',
  b_width: 75,
  b_height: 50,
  b_length: 240,
  usedOutside: false,
  glazed: false,
  brickColour: 'red',
  w_width: 100,
  w_height: 100,
  w_length: 2000,
  structural: false,
  outsideUse: false,
  woodType: 'oak',
  win_width: 1000,
  frameThickness: 50,
  windowType: 'casement',
  winWoodType: 'oak',
  t_width: 300,
  t_length: 300,
  thickness: 20,
  tileType: 'ceramic',
  tileColour: 'white',
};

// ── Shared field components ──────────────────────────────────────────────────

export const inputClass =
  'border border-gray-300 bg-white p-2 text-sm w-full focus:outline-none focus:border-gray-600 transition-colors';
export const selectClass = inputClass;

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({
  label,
  hint,
  children,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</label>
    {children}
    {hint && <span className="text-xs text-gray-400">{hint}</span>}
  </div>
);

export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <fieldset className="flex flex-col gap-4 border border-gray-200 p-4">
    <legend className="px-1 text-xs font-bold uppercase tracking-widest text-gray-500">{title}</legend>
    {children}
  </fieldset>
);

export const NumberInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}> = ({ value, onChange, min, max, step = 1 }) => (
  <input
    type="number"
    className={inputClass}
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);

export function SelectInput<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.charAt(0).toUpperCase() + o.slice(1)}
        </option>
      ))}
    </select>
  );
}

export const CheckboxInput: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex flex-row items-center gap-2 cursor-pointer text-sm">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4" />
    {label}
  </label>
);

// ── Image upload component ───────────────────────────────────────────────────

type UploadState = 'idle' | 'uploading' | 'done' | 'error';

export const ImageUpload: React.FC<{
  onUploaded: (storageId: Id<'_storage'>) => void;
  onCleared: () => void;
  t: (key: string) => string;
  currentImageUrl?: string;
}> = ({ onUploaded, onCleared, t, currentImageUrl }) => {
  const generateUploadUrl = useMutation(api.listings.generateUploadUrl);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>(currentImageUrl ? 'done' : 'idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl ?? null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadState('uploading');

    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const { storageId } = (await res.json()) as { storageId: Id<'_storage'> };
      onUploaded(storageId);
      setUploadState('done');
    } catch {
      setUploadState('error');
      setPreviewUrl(null);
      setFileName(null);
    }
  };

  const handleClear = () => {
    setUploadState('idle');
    setPreviewUrl(null);
    setFileName(null);
    onCleared();
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      {previewUrl ? (
        <div className="relative w-full h-48 border border-gray-300 overflow-hidden">
          <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
          {uploadState === 'uploading' && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">{t('uploading')}…</span>
            </div>
          )}
          {(uploadState === 'done') && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 bg-white border border-gray-300 px-2 py-1 text-xs shadow hover:bg-gray-50"
            >
              ✕ {t('remove-image')}
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-sm text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors cursor-pointer bg-white"
        >
          <span className="text-2xl">↑</span>
          <span>{t('upload-image')}</span>
          {fileName && <span className="text-xs text-gray-400">{fileName}</span>}
        </button>
      )}

      {uploadState === 'error' && (
        <span className="text-xs text-red-500">{t('upload-error')}</span>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

// ── Type-specific field sections ─────────────────────────────────────────────

export const BricksFields: React.FC<{ form: FormData; set: (patch: Partial<FormData>) => void; t: (k: string) => string }> = ({
  form,
  set,
  t,
}) => (
  <>
    <Section title={t('geometry')}>
      <div className="grid grid-cols-3 gap-3">
        <Field label={`${t('width')} (30–120)`}>
          <NumberInput value={form.b_width} min={30} max={120} onChange={(v) => set({ b_width: v })} />
        </Field>
        <Field label={`${t('height')} (15–250)`}>
          <NumberInput value={form.b_height} min={15} max={250} onChange={(v) => set({ b_height: v })} />
        </Field>
        <Field label={`${t('length')} (120–600)`}>
          <NumberInput value={form.b_length} min={120} max={600} onChange={(v) => set({ b_length: v })} />
        </Field>
      </div>
    </Section>
    <Section title={t('specifications')}>
      <Field label={t('colour')}>
        <SelectInput value={form.brickColour} options={BRICK_COLOURS} onChange={(v) => set({ brickColour: v })} />
      </Field>
      <CheckboxInput label={t('used-outside')} checked={form.usedOutside} onChange={(v) => set({ usedOutside: v })} />
      <CheckboxInput label={t('glazed')} checked={form.glazed} onChange={(v) => set({ glazed: v })} />
    </Section>
  </>
);

export const WoodFields: React.FC<{ form: FormData; set: (patch: Partial<FormData>) => void; t: (k: string) => string }> = ({
  form,
  set,
  t,
}) => (
  <>
    <Section title={t('geometry')}>
      <div className="grid grid-cols-3 gap-3">
        <Field label={`${t('width')} (50–5000)`}>
          <NumberInput value={form.w_width} min={50} max={5000} onChange={(v) => set({ w_width: v })} />
        </Field>
        <Field label={`${t('height')} (50–5000)`}>
          <NumberInput value={form.w_height} min={50} max={5000} onChange={(v) => set({ w_height: v })} />
        </Field>
        <Field label={`${t('length')} (100–5000)`}>
          <NumberInput value={form.w_length} min={100} max={5000} onChange={(v) => set({ w_length: v })} />
        </Field>
      </div>
    </Section>
    <Section title={t('specifications')}>
      <Field label={t('wood-type')}>
        <SelectInput value={form.woodType} options={WOOD_TYPES} onChange={(v) => set({ woodType: v })} />
      </Field>
      <CheckboxInput label={t('structural')} checked={form.structural} onChange={(v) => set({ structural: v })} />
      <CheckboxInput label={t('outside-use')} checked={form.outsideUse} onChange={(v) => set({ outsideUse: v })} />
    </Section>
  </>
);

export const WindowFields: React.FC<{ form: FormData; set: (patch: Partial<FormData>) => void; t: (k: string) => string }> = ({
  form,
  set,
  t,
}) => (
  <>
    <Section title={t('geometry')}>
      <div className="grid grid-cols-2 gap-3">
        <Field label={`${t('width')} (200–2000)`}>
          <NumberInput value={form.win_width} min={200} max={2000} onChange={(v) => set({ win_width: v })} />
        </Field>
        <Field label={`${t('frame-thickness')} (10–100)`}>
          <NumberInput value={form.frameThickness} min={10} max={100} step={0.5} onChange={(v) => set({ frameThickness: v })} />
        </Field>
      </div>
    </Section>
    <Section title={t('specifications')}>
      <Field label={t('window-type')}>
        <SelectInput value={form.windowType} options={WINDOW_TYPES} onChange={(v) => set({ windowType: v })} />
      </Field>
      <Field label={t('wood-type')}>
        <SelectInput value={form.winWoodType} options={WOOD_TYPES} onChange={(v) => set({ winWoodType: v })} />
      </Field>
    </Section>
  </>
);

export const TileFields: React.FC<{ form: FormData; set: (patch: Partial<FormData>) => void; t: (k: string) => string }> = ({
  form,
  set,
  t,
}) => (
  <>
    <Section title={t('geometry')}>
      <div className="grid grid-cols-3 gap-3">
        <Field label={`${t('width')} (200–2000)`}>
          <NumberInput value={form.t_width} min={200} max={2000} onChange={(v) => set({ t_width: v })} />
        </Field>
        <Field label={`${t('length')} (50–500)`}>
          <NumberInput value={form.t_length} min={50} max={500} onChange={(v) => set({ t_length: v })} />
        </Field>
        <Field label={`${t('thickness')} (10–50)`}>
          <NumberInput value={form.thickness} min={10} max={50} onChange={(v) => set({ thickness: v })} />
        </Field>
      </div>
    </Section>
    <Section title={t('specifications')}>
      <Field label={t('tile-type')}>
        <SelectInput value={form.tileType} options={TILE_TYPES} onChange={(v) => set({ tileType: v })} />
      </Field>
      <Field label={t('colour')}>
        <SelectInput value={form.tileColour} options={TILE_COLOURS} onChange={(v) => set({ tileColour: v })} />
      </Field>
    </Section>
  </>
);

// ── Type selector ────────────────────────────────────────────────────────────

export const TypeSelector: React.FC<{ onSelect: (t: ListingType) => void; t: (k: string) => string }> = ({
  onSelect,
  t,
}) => (
  <div className="flex flex-col gap-6 items-center w-full mt-8">
    <h2 className="text-2xl font-bold opacity-80">{t('select-type')}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
      {ListingTypes.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="element-card flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:bg-gray-50 transition-all bg-white"
        >
          <SVGIcon src={TYPE_ICONS[type]} className="h-10 w-10" />
          <span className="font-semibold capitalize">{type}</span>
        </button>
      ))}
    </div>
  </div>
);

// ── Common form body (shared between add and edit) ───────────────────────────

export const CommonFields: React.FC<{
  form: FormData;
  set: (patch: Partial<FormData>) => void;
  t: (k: string) => string;
  selectedType: ListingType;
}> = ({ form, set, t, selectedType }) => (
  <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-6">
    <Section title={t('basic-info')}>
      <Field label={t('name')}>
        <input
          type="text"
          className={inputClass}
          value={form.name}
          placeholder="e.g. Red clay bricks – lot of 500"
          onChange={(e) => set({ name: e.target.value })}
        />
      </Field>
      <Field label={t('image')}>
        <ImageUpload
          onUploaded={(storageId) => set({ imageStorageId: storageId, existingImageUrl: null })}
          onCleared={() => set({ imageStorageId: null, existingImageUrl: null })}
          t={t}
          currentImageUrl={form.existingImageUrl ?? undefined}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={`${t('quantity')} (1–1000)`}>
          <NumberInput value={form.quantity} min={1} max={1000} onChange={(v) => set({ quantity: v })} />
        </Field>
        <Field label={t('available-from')}>
          <input
            type="date"
            className={inputClass}
            value={form.availableFrom}
            onChange={(e) => set({ availableFrom: e.target.value })}
          />
        </Field>
      </div>
      <Field label={`${t('damage')} (1–5)`} hint={t('damage-hint')}>
        <div className="flex flex-row items-center gap-3">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={form.damage}
            onChange={(e) => set({ damage: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="w-5 text-center font-bold">{form.damage}</span>
        </div>
      </Field>
    </Section>

    {selectedType === 'bricks' && <BricksFields form={form} set={set} t={t} />}
    {selectedType === 'wood' && <WoodFields form={form} set={set} t={t} />}
    {selectedType === 'window' && <WindowFields form={form} set={set} t={t} />}
    {selectedType === 'tile' && <TileFields form={form} set={set} t={t} />}

    <Section title={t('location')}>
      <CheckboxInput
        label={t('add-location')}
        checked={form.hasLocation}
        onChange={(v) => set({ hasLocation: v })}
      />
      {form.hasLocation && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('latitude')}>
              <input
                type="number"
                className={inputClass}
                step="any"
                value={form.lat}
                onChange={(e) => set({ lat: e.target.value })}
              />
            </Field>
            <Field label={t('longitude')}>
              <input
                type="number"
                className={inputClass}
                step="any"
                value={form.lng}
                onChange={(e) => set({ lng: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('city')}>
              <input
                type="text"
                className={inputClass}
                value={form.city}
                onChange={(e) => set({ city: e.target.value })}
              />
            </Field>
            <Field label={t('zip-code')}>
              <input
                type="text"
                className={inputClass}
                value={form.zipCode}
                onChange={(e) => set({ zipCode: e.target.value })}
              />
            </Field>
          </div>
          <Field label={t('country')}>
            <input
              type="text"
              className={inputClass}
              value={form.country}
              onChange={(e) => set({ country: e.target.value })}
            />
          </Field>
          <Field label={t('address')}>
            <input
              type="text"
              className={inputClass}
              value={form.address}
              onChange={(e) => set({ address: e.target.value })}
            />
          </Field>
        </div>
      )}
    </Section>
  </div>
);

// ── Build listing payload from form state ─────────────────────────────────────

export function buildListingPayload(form: FormData, selectedType: ListingType) {
  const location =
    form.hasLocation && form.lat && form.lng
      ? {
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
          city: form.city,
          zipCode: form.zipCode,
          country: form.country,
          address: form.address,
        }
      : undefined;

  const availableFrom = form.availableFrom ? new Date(form.availableFrom).getTime() : Date.now();
  const imageStorageId = form.imageStorageId ?? undefined;
  const imageUrl = !imageStorageId && form.existingImageUrl ? form.existingImageUrl : undefined;

  const common = {
    name: form.name,
    imageStorageId,
    imageUrl,
    quantity: form.quantity,
    availableFrom,
    damage: form.damage,
    location,
  };

  switch (selectedType) {
    case 'bricks':
      return {
        ...common,
        category: 'constructionMaterials' as const,
        type: 'bricks' as const,
        geometry: { width: form.b_width, height: form.b_height, length: form.b_length },
        usedOutside: form.usedOutside,
        glazed: form.glazed,
        colour: form.brickColour,
      };
    case 'wood':
      return {
        ...common,
        category: 'constructionMaterials' as const,
        type: 'wood' as const,
        geometry: { width: form.w_width, height: form.w_height, length: form.w_length },
        use: { structural: form.structural, outsideUse: form.outsideUse },
        woodType: form.woodType,
      };
    case 'window':
      return {
        ...common,
        category: 'buildingMaterials' as const,
        type: 'window' as const,
        geometry: { width: form.win_width, frameThickness: form.frameThickness },
        woodType: form.winWoodType,
        windowType: form.windowType,
      };
    case 'tile':
      return {
        ...common,
        category: 'buildingMaterials' as const,
        type: 'tile' as const,
        geometry: { width: form.t_width, length: form.t_length, thickness: form.thickness },
        tileType: form.tileType,
        colour: form.tileColour,
      };
  }
}
