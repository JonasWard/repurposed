import type {
  Door,
  DoorOptions,
  OpenPlans as OpenPlansInstance,
  PlanProjectionCamera,
  WallOptions,
  Wall,
  WindowOptions,
  Window,
} from '@opengeometry/openplans';
import type {
  DoorPreviewSpec,
  ListingDrawingSet,
  ListingPreviewSpec,
  WallPreviewSpec,
  WindowPreviewSpec,
} from '@/lib/openplans/listingPreview';

export type PreviewViewerMode = 'plan' | 'model';

type OpenPlansModule = typeof import('@opengeometry/openplans');
type PreviewElement = Wall | Window | Door;
type OpenPlansGridCarrier = {
  openThree?: {
    toggleGrid: (show: boolean) => void;
  };
};

let modulePromise: Promise<OpenPlansModule> | null = null;

const DEFAULT_PLACEMENT = {
  position: [0, 0, 0] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
  scale: [1, 1, 1] as [number, number, number],
};

export const loadOpenPlansModule = () => {
  modulePromise ??= import('@opengeometry/openplans');
  return modulePromise;
};

export const togglePreviewGrid = (openPlans: OpenPlansInstance, show: boolean) => {
  (openPlans as unknown as OpenPlansGridCarrier).openThree?.toggleGrid(show);
};

const isWindowElement = (element: PreviewElement): element is Window => 'windowWidth' in element;

const isDoorElement = (element: PreviewElement): element is Door => 'panelWidth' in element;

const isWallElement = (element: PreviewElement): element is Wall => 'wallThickness' in element;

const matchesPreviewSpec = (element: PreviewElement, spec: ListingPreviewSpec) =>
  (spec.kind === 'window' && isWindowElement(element)) ||
  (spec.kind === 'door' && isDoorElement(element)) ||
  (spec.kind === 'wall' && isWallElement(element));

const mapWindowType = (_openPlansModule: OpenPlansModule, windowType: WindowPreviewSpec['windowType']) => {
  switch (windowType) {
    case 'fixed':
      return 'FIXED' as WindowOptions['windowType'];
    case 'sliding':
      return 'SLIDING' as WindowOptions['windowType'];
    case 'awning':
      return 'AWNING' as WindowOptions['windowType'];
    case 'casement':
    default:
      return 'CASEMENT' as WindowOptions['windowType'];
  }
};

const mapWallMaterial = (openPlansModule: OpenPlansModule, material: WallPreviewSpec['wallMaterial']) => {
  switch (material) {
    case 'BRICK':
      return openPlansModule.WallMaterial.BRICK;
    case 'WOOD':
      return openPlansModule.WallMaterial.WOOD;
    case 'OTHER':
    default:
      return openPlansModule.WallMaterial.OTHER;
  }
};

const mapDoorType = (
  doorType: DoorPreviewSpec['doorType'],
  glazed: boolean,
) => {
  switch (doorType) {
    case 'sliding':
      return 'SLIDING' as DoorOptions['doorType'];
    case 'french':
      return 'DOUBLEDOOR' as DoorOptions['doorType'];
    case 'interior':
      return glazed
        ? 'GLASS' as DoorOptions['doorType']
        : 'WOOD' as DoorOptions['doorType'];
    case 'exterior':
    default:
      return glazed
        ? 'GLASS' as DoorOptions['doorType']
        : 'OTHER' as DoorOptions['doorType'];
  }
};

const mapDoorMaterial = (
  openPlansModule: OpenPlansModule,
  material: DoorPreviewSpec['doorMaterial'],
  glazed: boolean,
) => {
  if (glazed) {
    return openPlansModule.DoorMaterialType.GLASS as DoorOptions['panelMaterial'];
  }

  switch (material) {
    case 'wood':
      return openPlansModule.DoorMaterialType.WOOD as DoorOptions['panelMaterial'];
    case 'steel':
    case 'aluminum':
      return openPlansModule.DoorMaterialType.METAL as DoorOptions['panelMaterial'];
    case 'upvc':
    default:
      return openPlansModule.DoorMaterialType.OTHER as DoorOptions['panelMaterial'];
  }
};

const getDoorPanelColor = (spec: DoorPreviewSpec) => {
  if (spec.glazed) {
    return 0xa8c8d8;
  }

  switch (spec.doorMaterial) {
    case 'wood':
      return 0x8b5e3c;
    case 'steel':
      return 0x7b8794;
    case 'aluminum':
      return 0xb8c0c8;
    case 'upvc':
    default:
      return 0xd9dde3;
  }
};

const buildWallConfig = (openPlansModule: OpenPlansModule, spec: WallPreviewSpec): WallOptions => ({
  labelName: spec.labelName,
  type: 'WALL' as WallOptions['type'],
  points: spec.points,
  wallColor: spec.wallColor,
  wallThickness: spec.wallThickness,
  wallHeight: spec.wallHeight,
  wallMaterial: mapWallMaterial(openPlansModule, spec.wallMaterial),
  placement: DEFAULT_PLACEMENT,
});

const updateWindowElement = (
  openPlansModule: OpenPlansModule,
  element: Window,
  spec: WindowPreviewSpec,
) => {
  const current = element.getOPConfig();

  element.setOPConfig({
    ...current,
    labelName: spec.labelName,
    windowType: mapWindowType(openPlansModule, spec.windowType),
    frameColor: 0x000000,
    windowDimensions: {
      ...current.windowDimensions,
      width: spec.windowWidth,
      // Keep the glass depth aligned with the frame so the panel does not overhang.
      thickness: spec.frameThickness,
    },
    frameDimensions: {
      ...current.frameDimensions,
      width: spec.frameThickness,
      thickness: spec.frameThickness,
    },
  });
};

const updateDoorElement = (
  openPlansModule: OpenPlansModule,
  element: Door,
  spec: DoorPreviewSpec,
) => {
  const current = element.getOPConfig();

  element.setOPConfig({
    ...current,
    labelName: spec.labelName,
    doorType: mapDoorType(spec.doorType, spec.glazed),
    panelMaterial: mapDoorMaterial(openPlansModule, spec.doorMaterial, spec.glazed),
    doorHeight: spec.doorHeight,
    frameColor: 0x000000,
    doorColor: getDoorPanelColor(spec),
    panelDimensions: {
      ...current.panelDimensions,
      width: spec.doorWidth,
      thickness: spec.frameThickness,
    },
    frameDimensions: {
      ...current.frameDimensions,
      width: spec.frameThickness,
      thickness: spec.frameThickness,
    },
  });
};

const createPreviewElement = (
  openPlansModule: OpenPlansModule,
  openPlans: OpenPlansInstance,
  spec: ListingPreviewSpec,
): PreviewElement => {
  if (spec.kind === 'window') {
    const element = openPlans.window();
    updateWindowElement(openPlansModule, element, spec);
    return element;
  }

  if (spec.kind === 'door') {
    const element = openPlans.door();
    updateDoorElement(openPlansModule, element, spec);
    return element;
  }

  return openPlans.wall(buildWallConfig(openPlansModule, spec));
};

const updatePreviewElement = (
  openPlansModule: OpenPlansModule,
  element: PreviewElement,
  spec: ListingPreviewSpec,
): PreviewElement => {
  if (spec.kind === 'window' && isWindowElement(element)) {
    updateWindowElement(openPlansModule, element, spec);
    return element;
  }

  if (spec.kind === 'door' && isDoorElement(element)) {
    updateDoorElement(openPlansModule, element, spec);
    return element;
  }

  if (spec.kind === 'wall' && isWallElement(element)) {
    element.setOPConfig(buildWallConfig(openPlansModule, spec));
    return element;
  }

  return element;
};

export const removePreviewElement = (element: PreviewElement | null) => {
  if (!element) return null;
  element.removeFromParent();
  return null;
};

export const syncPreviewElement = (
  openPlansModule: OpenPlansModule,
  openPlans: OpenPlansInstance,
  currentElement: PreviewElement | null,
  spec: ListingPreviewSpec | null,
) => {
  if (!spec) {
    return removePreviewElement(currentElement);
  }

  if (!currentElement || !matchesPreviewSpec(currentElement, spec)) {
    removePreviewElement(currentElement);
    return createPreviewElement(openPlansModule, openPlans, spec);
  }

  return updatePreviewElement(openPlansModule, currentElement, spec);
};

export const applyViewerMode = (
  openPlansModule: OpenPlansModule,
  openPlans: OpenPlansInstance,
  element: PreviewElement | null,
  mode: PreviewViewerMode,
) => {
  openPlans.CameraMode = mode === 'plan' ? openPlansModule.CameraMode.Plan : openPlansModule.CameraMode.Model;

  if (!element) return;

  if (mode === 'plan') {
    element.profileView = true;
    element.modelView = false;
    return;
  }

  element.profileView = false;
  element.modelView = true;
};

export const fitPreviewElement = (openPlans: OpenPlansInstance, element: PreviewElement | null) => {
  if (!element) return;
  openPlans.fitToView([element]);
};

const getElementMetrics = (element: PreviewElement) => {
  if (isWindowElement(element)) {
    const width = Math.max(element.windowWidth, 0.5);
    const height = Math.max(element.windowHeight, 0.5);
    const sillHeight = Math.max(element.sillHeight, 0);
    const depth = Math.max(element.windowThickness, 0.1);

    return {
      centerX: 0,
      centerZ: 0,
      width,
      height,
      depth,
      targetY: sillHeight + height / 2,
    };
  }

  if (isDoorElement(element)) {
    const width = Math.max(element.panelWidth, 0.5);
    const height = Math.max(element.doorHeight, 0.5);
    const depth = Math.max(Math.max(element.panelThickness, element.frameThickness), 0.1);

    return {
      centerX: 0,
      centerZ: 0,
      width,
      height,
      depth,
      targetY: height / 2,
    };
  }

  const config = element.getOPConfig();
  const xs = config.points.map((point) => point.x);
  const zs = config.points.map((point) => point.z);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);

  return {
    centerX: (minX + maxX) / 2,
    centerZ: (minZ + maxZ) / 2,
    width: Math.max(maxX - minX, 0.5),
    height: Math.max(element.wallHeight, 0.5),
    depth: Math.max(Math.max(maxZ - minZ, element.wallThickness), 0.1),
    targetY: element.wallHeight / 2,
  };
};

const buildProjectionCamera = (
  element: PreviewElement,
  view: 'front' | 'isometric',
): PlanProjectionCamera => {
  const metrics = getElementMetrics(element);
  const span = Math.max(metrics.width, metrics.height, metrics.depth, 1);
  const distance = Math.max(span * 4, 6);

  if (view === 'front') {
    return {
      position: {
        x: metrics.centerX,
        y: metrics.targetY,
        z: metrics.centerZ + distance,
      },
      target: {
        x: metrics.centerX,
        y: metrics.targetY,
        z: metrics.centerZ,
      },
      up: { x: 0, y: 1, z: 0 },
      near: 0.1,
      projection_mode: 'Orthographic',
    };
  }

  return {
    position: {
      x: metrics.centerX + distance,
      y: metrics.targetY + distance * 0.75,
      z: metrics.centerZ + distance,
    },
    target: {
      x: metrics.centerX,
      y: metrics.targetY,
      z: metrics.centerZ,
    },
    up: { x: 0, y: 1, z: 0 },
    near: 0.1,
    projection_mode: 'Orthographic',
  };
};

const createHiddenHost = () => {
  const host = document.createElement('div');
  Object.assign(host.style, {
    width: '640px',
    height: '480px',
    position: 'fixed',
    inset: '0 auto auto 0',
    opacity: '0',
    pointerEvents: 'none',
    zIndex: '-1',
  });
  document.body.appendChild(host);
  return host;
};

export const generateListingDrawingSet = async (spec: ListingPreviewSpec): Promise<ListingDrawingSet> => {
  const openPlansModule = await loadOpenPlansModule();
  const host = createHiddenHost();
  const openPlans = new openPlansModule.OpenPlans(host);
  let element: PreviewElement | null = null;

  try {
    await openPlans.setupOpenGeometry();
    togglePreviewGrid(openPlans, false);
    element = syncPreviewElement(openPlansModule, openPlans, null, spec);
    if (!element) {
      throw new Error('Failed to create OpenPlans preview element for PDF export.');
    }
    applyViewerMode(openPlansModule, openPlans, element, 'plan');

    const generator = new openPlansModule.PlanPDFGenerator();
    const top = generator.generate({
      elements: [element],
      view: 'top',
    });

    applyViewerMode(openPlansModule, openPlans, element, 'model');

    return {
      top,
      front: generator.generate({
        elements: [element],
        view: 'isometric',
        camera: buildProjectionCamera(element, 'front'),
      }),
      isometric: generator.generate({
        elements: [element],
        view: 'isometric',
        camera: buildProjectionCamera(element, 'isometric'),
      }),
    };
  } finally {
    removePreviewElement(element);
    host.remove();
  }
};
