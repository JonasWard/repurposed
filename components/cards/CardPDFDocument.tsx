import {
  Document,
  Image,
  Line as SvgLine,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import type { ListingData } from '@/lib/elements';
import type { ListingDrawingSet } from '@/lib/openplans/listingPreview';

const palette = {
  black: '#111111',
  midGrey: '#6b7280',
  lightGrey: '#e5e7eb',
  hairline: '#f3f4f6',
  white: '#ffffff',
  accent: '#1c1c1c',
};

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: palette.black,
    backgroundColor: palette.white,
    padding: 36,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: `1 solid ${palette.lightGrey}`,
  },
  brand: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 1, color: palette.accent },
  headerRight: { fontSize: 7, color: palette.midGrey, textAlign: 'right' },
  hero: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  image: { width: 200, height: 160, objectFit: 'cover', backgroundColor: palette.hairline },
  imagePlaceholder: {
    width: 200,
    height: 160,
    backgroundColor: palette.hairline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: { fontSize: 7, color: palette.midGrey },
  heroRight: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start', gap: 6 },
  title: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: palette.black },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accent,
    color: palette.white,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: palette.midGrey,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottom: `0.5 solid ${palette.lightGrey}`,
  },
  kvGrid: { flexDirection: 'column', gap: 3 },
  kvRow: { flexDirection: 'row', gap: 4 },
  kvKey: { width: 100, color: palette.midGrey, fontSize: 8 },
  kvVal: { flex: 1, fontSize: 8, fontFamily: 'Helvetica-Bold' },
  footer: {
    marginTop: 'auto',
    paddingTop: 8,
    borderTop: `0.5 solid ${palette.lightGrey}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLeft: { flexDirection: 'column', gap: 2, justifyContent: 'flex-end' },
  qr: { width: 52, height: 52 },
  qrLabel: { fontSize: 6, color: palette.midGrey, textAlign: 'center', marginTop: 2 },
  footerText: { fontSize: 6.5, color: palette.midGrey },
  technicalPage: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: palette.black,
    backgroundColor: palette.white,
    padding: 36,
    flexDirection: 'column',
  },
  technicalLead: {
    fontSize: 8,
    color: palette.midGrey,
    marginBottom: 14,
    lineHeight: 1.4,
  },
  technicalAttribution: {
    fontSize: 7,
    color: palette.midGrey,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  drawingPanel: {
    border: `1 solid ${palette.lightGrey}`,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    backgroundColor: palette.white,
  },
  drawingTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: palette.midGrey,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  drawingSvg: {
    width: '100%',
    height: 170,
  },
  drawingHint: {
    marginTop: 6,
    fontSize: 6.5,
    color: palette.midGrey,
  },
});

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={s.kvRow}>
    <Text style={s.kvKey}>{label}</Text>
    <Text style={s.kvVal}>{value}</Text>
  </View>
);

const DRAWING_CANVAS_WIDTH = 520;
const DRAWING_CANVAS_HEIGHT = 170;
const DRAWING_PADDING = 12;

const getDrawingLayout = (payload: ListingDrawingSet[keyof ListingDrawingSet]) => {
  const width = Math.max(payload.bounds.width, 0.001);
  const height = Math.max(payload.bounds.height, 0.001);
  const drawableWidth = DRAWING_CANVAS_WIDTH - DRAWING_PADDING * 2;
  const drawableHeight = DRAWING_CANVAS_HEIGHT - DRAWING_PADDING * 2;
  const scale = Math.min(drawableWidth / width, drawableHeight / height);
  const offsetX = (DRAWING_CANVAS_WIDTH - width * scale) / 2;
  const offsetY = (DRAWING_CANVAS_HEIGHT - height * scale) / 2;

  return { scale, offsetX, offsetY };
};

const DrawingPanel: React.FC<{
  title: string;
  payload: ListingDrawingSet[keyof ListingDrawingSet];
}> = ({ title, payload }) => {
  const { scale, offsetX, offsetY } = getDrawingLayout(payload);

  return (
    <View style={s.drawingPanel}>
      <Text style={s.drawingTitle}>{title}</Text>
      <Svg
        style={s.drawingSvg}
        viewBox={`0 0 ${DRAWING_CANVAS_WIDTH} ${DRAWING_CANVAS_HEIGHT}`}
        preserveAspectRatio="none"
      >
        {payload.lines.map((line, index) => {
          const strokeWidth = line.stroke_width !== undefined
            ? Math.max(0.15, Math.min(1.2, line.stroke_width * scale * 0.05))
            : 0.25;

          return (
            <SvgLine
              key={`${title}-${index}`}
              x1={offsetX + (line.start.x - payload.bounds.min.x) * scale}
              y1={offsetY + (payload.bounds.max.y - line.start.y) * scale}
              x2={offsetX + (line.end.x - payload.bounds.min.x) * scale}
              y2={offsetY + (payload.bounds.max.y - line.end.y) * scale}
              stroke={palette.black}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </Svg>
      <Text style={s.drawingHint}>{`${payload.lines.length} vector segments · ${payload.units}`}</Text>
    </View>
  );
};

function formatDate(ts?: number) {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDamage(d: number) {
  return `${d} / 5`;
}

function formatDimensions(element: ListingData): string {
  const g = element.geometry as Record<string, number>;
  const parts: string[] = [];
  if ('width' in g) parts.push(`W ${g.width} mm`);
  if ('height' in g) parts.push(`H ${g.height} mm`);
  if ('length' in g) parts.push(`L ${g.length} mm`);
  if ('frameThickness' in g) parts.push(`Frame ${g.frameThickness} mm`);
  if ('thickness' in g) parts.push(`T ${g.thickness} mm`);
  return parts.join('  ·  ') || '—';
}

function typeSpecificRows(element: ListingData): { label: string; value: string }[] {
  switch (element.type) {
    case 'bricks':
      return [
        { label: 'Colour', value: element.colour },
        { label: 'Used outside', value: element.usedOutside ? 'Yes' : 'No' },
        { label: 'Glazed', value: element.glazed ? 'Yes' : 'No' },
      ];
    case 'wood':
      return [
        { label: 'Wood type', value: element.woodType },
        { label: 'Structural', value: element.use.structural ? 'Yes' : 'No' },
        { label: 'Outside use', value: element.use.outsideUse ? 'Yes' : 'No' },
      ];
    case 'window':
      return [
        { label: 'Window type', value: element.windowType },
        { label: 'Frame wood', value: element.woodType },
      ];
    case 'tile':
      return [
        { label: 'Tile type', value: element.tileType },
        { label: 'Colour', value: element.colour },
      ];
    case 'door':
      return [
        { label: 'Door type', value: element.doorType },
        { label: 'Material', value: element.material },
        { label: 'Glazed', value: element.glazed ? 'Yes' : 'No' }
      ];
  }
}

export const CardPDFDocument: React.FC<{
  element: ListingData;
  qrDataUrl?: string;
  technicalDrawings?: ListingDrawingSet;
}> = ({ element, qrDataUrl, technicalDrawings }) => {
  const specific = typeSpecificRows(element);

  return (
    <Document title={element.name} author="Repurposed Marketplace" subject={`${element.type} listing`}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.brand}>REPURPOSED</Text>
          <Text style={s.headerRight}>
            {`Listing ID: ${element._id}\nExported: ${new Date().toLocaleDateString('en-GB')}`}
          </Text>
        </View>

        <View style={s.hero}>
          {element.imageUrl ? (
            <Image src={element.imageUrl} style={s.image} />
          ) : (
            <View style={s.imagePlaceholder}>
              <Text style={s.imagePlaceholderText}>No image</Text>
            </View>
          )}

          <View style={s.heroRight}>
            <Text style={s.typeBadge}>{element.type}</Text>
            <Text style={s.title}>{element.name}</Text>

            <View style={s.kvGrid}>
              <Row label="Quantity" value={`${element.quantity} units`} />
              <Row label="Damage" value={formatDamage(element.damage)} />
              <Row label="Available from" value={formatDate(element.availableFrom)} />
              <Row label="Category" value={element.category} />
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Dimensions</Text>
          <View style={s.kvGrid}>
            <Row label="Measurements" value={formatDimensions(element)} />
          </View>
        </View>

        {specific.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Properties</Text>
            <View style={s.kvGrid}>
              {specific.map(({ label, value }) => (
                <Row key={label} label={label} value={value} />
              ))}
            </View>
          </View>
        )}

        {element.location && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Location</Text>
            <View style={s.kvGrid}>
              <Row label="Address" value={element.location.address || '—'} />
              <Row label="City" value={element.location.city} />
              <Row label="ZIP" value={element.location.zipCode} />
              <Row label="Country" value={element.location.country} />
            </View>
          </View>
        )}

        <View style={s.footer}>
          <View style={s.footerLeft}>
            <Text style={s.footerText}>repurposed.jonasward.ch</Text>
            <Text style={s.footerText}>This document is for informational purposes only.</Text>
          </View>
          {qrDataUrl && (
            <View>
              <Image src={qrDataUrl} style={s.qr} />
              <Text style={s.qrLabel}>Scan to view listing</Text>
            </View>
          )}
        </View>
      </Page>

      {technicalDrawings && (
        <Page size="A4" style={s.technicalPage}>
          <View style={s.header}>
            <Text style={s.brand}>REPURPOSED TECHNICAL SHEET</Text>
            <Text style={s.headerRight}>{`${element.name}\n${element.type.toUpperCase()}`}</Text>
          </View>

          <Text style={s.technicalLead}>
            Top, front, and isometric vectors are generated directly from the OpenPlans element configuration used in
            the live preview.
          </Text>
          <Text style={s.technicalAttribution}>Autodrawings provided by OpenPlans.</Text>

          <DrawingPanel title="Top View" payload={technicalDrawings.top} />
          <DrawingPanel title="Front View" payload={technicalDrawings.front} />
          <DrawingPanel title="Isometric View" payload={technicalDrawings.isometric} />
        </Page>
      )}
    </Document>
  );
};
