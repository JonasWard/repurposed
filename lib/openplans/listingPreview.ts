import type { PlanVectorPayload } from '@opengeometry/openplans';
import type {
  DoorMaterial as ListingDoorMaterial,
  DoorType as ListingDoorType,
  FormData,
  ListingType,
  WindowType as ListingWindowType,
} from '@/components/listing-form/Shared';
import type { ListingData } from '@/lib/elements';

export type WallPreviewMaterial = 'BRICK' | 'WOOD' | 'OTHER';

export type ListingPreviewSpec = WindowPreviewSpec | DoorPreviewSpec | WallPreviewSpec;

export interface WindowPreviewSpec {
  kind: 'window';
  listingType: 'window';
  labelName: string;
  windowType: ListingWindowType;
  windowWidth: number;
  frameThickness: number;
}

export interface DoorPreviewSpec {
  kind: 'door';
  listingType: 'door';
  labelName: string;
  doorType: ListingDoorType;
  doorMaterial: ListingDoorMaterial;
  glazed: boolean;
  doorWidth: number;
  doorHeight: number;
  frameThickness: number;
}

export interface WallPreviewSpec {
  kind: 'wall';
  listingType: Exclude<ListingType, 'window' | 'door'>;
  labelName: string;
  wallMaterial: WallPreviewMaterial;
  wallColor: number;
  wallThickness: number;
  wallHeight: number;
  points: Array<{ x: number; y: number; z: number }>;
}

export interface ListingDrawingSet {
  top: PlanVectorPayload;
  front: PlanVectorPayload;
  isometric: PlanVectorPayload;
}

const DEFAULT_LABELS: Record<ListingType, string> = {
  bricks: 'Brick Wall',
  wood: 'Timber Element',
  window: 'Window',
  tile: 'Tile Panel',
  door: 'Door',
};

const BRICK_COLORS: Record<'red' | 'yellow' | 'brown', number> = {
  red: 0xb55239,
  yellow: 0xd4b260,
  brown: 0x7f5539,
};

const TILE_COLORS: Record<'red' | 'yellow' | 'blue' | 'white' | 'brown' | 'green', number> = {
  red: 0xc45b4d,
  yellow: 0xd9b54a,
  blue: 0x5b89b7,
  white: 0xdedede,
  brown: 0x8a6242,
  green: 0x6d8f5d,
};

const WOOD_COLORS: Record<'cedar' | 'oak' | 'pine' | 'douglas fir' | 'spruce', number> = {
  cedar: 0x8b5e3c,
  oak: 0xa8794e,
  pine: 0xd1b075,
  'douglas fir': 0x9f6f4b,
  spruce: 0xc2a36b,
};

const mmToMeters = (value: number) => value / 1000;

const buildWallPoints = (length: number) => [
  { x: -length / 2, y: 0, z: 0 },
  { x: length / 2, y: 0, z: 0 },
];

const buildLabel = (name: string, selectedType: ListingType) => name.trim() || DEFAULT_LABELS[selectedType];

const buildWindowPreviewSpec = ({
  name,
  widthMm,
  frameThicknessMm,
  windowType,
}: {
  name: string;
  widthMm: number;
  frameThicknessMm: number;
  windowType: ListingWindowType;
}): WindowPreviewSpec => ({
  kind: 'window',
  listingType: 'window',
  labelName: buildLabel(name, 'window'),
  windowType,
  windowWidth: mmToMeters(widthMm),
  frameThickness: mmToMeters(frameThicknessMm),
});

const buildDoorPreviewSpec = ({
  name,
  widthMm,
  heightMm,
  frameThicknessMm,
  doorType,
  doorMaterial,
  glazed,
}: {
  name: string;
  widthMm: number;
  heightMm: number;
  frameThicknessMm: number;
  doorType: ListingDoorType;
  doorMaterial: ListingDoorMaterial;
  glazed: boolean;
}): DoorPreviewSpec => ({
  kind: 'door',
  listingType: 'door',
  labelName: buildLabel(name, 'door'),
  doorType,
  doorMaterial,
  glazed,
  doorWidth: mmToMeters(widthMm),
  doorHeight: mmToMeters(heightMm),
  frameThickness: mmToMeters(frameThicknessMm),
});

const buildWallPreviewSpec = ({
  name,
  listingType,
  lengthMm,
  heightMm,
  thicknessMm,
  wallMaterial,
  wallColor,
}: {
  name: string;
  listingType: Exclude<ListingType, 'window' | 'door'>;
  lengthMm: number;
  heightMm: number;
  thicknessMm: number;
  wallMaterial: WallPreviewMaterial;
  wallColor: number;
}): WallPreviewSpec => {
  const wallLength = Math.max(mmToMeters(lengthMm), 0.05);
  const wallHeight = Math.max(mmToMeters(heightMm), 0.05);
  const wallThickness = Math.max(mmToMeters(thicknessMm), 0.01);

  return {
    kind: 'wall',
    listingType,
    labelName: buildLabel(name, listingType),
    wallMaterial,
    wallColor,
    wallThickness,
    wallHeight,
    points: buildWallPoints(wallLength),
  };
};

export const buildListingPreviewSpecFromForm = (
  form: FormData,
  selectedType: ListingType,
): ListingPreviewSpec => {
  switch (selectedType) {
    case 'window':
      return buildWindowPreviewSpec({
        name: form.name,
        widthMm: form.win_width,
        frameThicknessMm: form.frameThickness,
        windowType: form.windowType,
      });
    case 'door':
      return buildDoorPreviewSpec({
        name: form.name,
        widthMm: form.d_width,
        heightMm: form.d_height,
        frameThicknessMm: form.d_frameThickness,
        doorType: form.doorType,
        doorMaterial: form.doorMaterial,
        glazed: form.doorGlazed,
      });
    case 'bricks':
      return buildWallPreviewSpec({
        name: form.name,
        listingType: 'bricks',
        lengthMm: form.b_length,
        heightMm: form.b_height,
        thicknessMm: form.b_width,
        wallMaterial: 'BRICK',
        wallColor: BRICK_COLORS[form.brickColour],
      });
    case 'wood':
      return buildWallPreviewSpec({
        name: form.name,
        listingType: 'wood',
        lengthMm: form.w_length,
        heightMm: form.w_height,
        thicknessMm: form.w_width,
        wallMaterial: 'WOOD',
        wallColor: WOOD_COLORS[form.woodType],
      });
    case 'tile':
      return buildWallPreviewSpec({
        name: form.name,
        listingType: 'tile',
        lengthMm: form.t_length,
        heightMm: form.t_width,
        thicknessMm: form.thickness,
        wallMaterial: 'OTHER',
        wallColor: TILE_COLORS[form.tileColour],
      });
  }
};

export const buildListingPreviewSpecFromListing = (listing: ListingData): ListingPreviewSpec => {
  switch (listing.type) {
    case 'window':
      return buildWindowPreviewSpec({
        name: listing.name,
        widthMm: listing.geometry.width,
        frameThicknessMm: listing.geometry.frameThickness,
        windowType: listing.windowType,
      });
    case 'door':
      return buildDoorPreviewSpec({
        name: listing.name,
        widthMm: listing.geometry.width,
        heightMm: listing.geometry.height,
        frameThicknessMm: listing.geometry.frameThickness,
        doorType: listing.doorType,
        doorMaterial: listing.material,
        glazed: listing.glazed,
      });
    case 'bricks':
      return buildWallPreviewSpec({
        name: listing.name,
        listingType: 'bricks',
        lengthMm: listing.geometry.length,
        heightMm: listing.geometry.height,
        thicknessMm: listing.geometry.width,
        wallMaterial: 'BRICK',
        wallColor: BRICK_COLORS[listing.colour],
      });
    case 'wood':
      return buildWallPreviewSpec({
        name: listing.name,
        listingType: 'wood',
        lengthMm: listing.geometry.length,
        heightMm: listing.geometry.height,
        thicknessMm: listing.geometry.width,
        wallMaterial: 'WOOD',
        wallColor: WOOD_COLORS[listing.woodType],
      });
    case 'tile':
      return buildWallPreviewSpec({
        name: listing.name,
        listingType: 'tile',
        lengthMm: listing.geometry.length,
        heightMm: listing.geometry.width,
        thicknessMm: listing.geometry.thickness,
        wallMaterial: 'OTHER',
        wallColor: TILE_COLORS[listing.colour],
      });
  }
};
