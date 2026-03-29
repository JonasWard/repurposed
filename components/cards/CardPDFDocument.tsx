/**
 * CardPDFDocument — @react-pdf/renderer layout for a single listing card.
 *
 * Usage (generate a Blob then hand it to PDFRenderer):
 *
 *   import { pdf } from '@react-pdf/renderer';
 *   import { CardPDFDocument } from './CardPDFDocument';
 *
 *   const blob = await pdf(<CardPDFDocument element={listing} />).toBlob();
 *   const url  = URL.createObjectURL(blob);
 */

import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import type { ListingData } from '@/lib/elements';

// ── Styles ────────────────────────────────────────────────────────────────────

const palette = {
  black: '#111111',
  midGrey: '#6b7280',
  lightGrey: '#e5e7eb',
  hairline: '#f3f4f6',
  white: '#ffffff',
  accent: '#1c1c1c'
};

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: palette.black,
    backgroundColor: palette.white,
    padding: 36,
    flexDirection: 'column',
    gap: 0
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: `1 solid ${palette.lightGrey}`
  },
  brand: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 1, color: palette.accent },
  headerRight: { fontSize: 7, color: palette.midGrey, textAlign: 'right' },

  // Hero
  hero: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  image: { width: 200, height: 160, objectFit: 'cover', backgroundColor: palette.hairline },
  imagePlaceholder: {
    width: 200,
    height: 160,
    backgroundColor: palette.hairline,
    justifyContent: 'center',
    alignItems: 'center'
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
    letterSpacing: 0.5
  },

  // Section
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: palette.midGrey,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottom: `0.5 solid ${palette.lightGrey}`
  },

  // Key-value grid
  kvGrid: { flexDirection: 'column', gap: 3 },
  kvRow: { flexDirection: 'row', gap: 4 },
  kvKey: { width: 100, color: palette.midGrey, fontSize: 8 },
  kvVal: { flex: 1, fontSize: 8, fontFamily: 'Helvetica-Bold' },

  // Footer
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
  footerText: { fontSize: 6.5, color: palette.midGrey }
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={s.kvRow}>
    <Text style={s.kvKey}>{label}</Text>
    <Text style={s.kvVal}>{value}</Text>
  </View>
);

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
        { label: 'Glazed', value: element.glazed ? 'Yes' : 'No' }
      ];
    case 'wood':
      return [
        { label: 'Wood type', value: element.woodType },
        { label: 'Structural', value: element.use.structural ? 'Yes' : 'No' },
        { label: 'Outside use', value: element.use.outsideUse ? 'Yes' : 'No' }
      ];
    case 'window':
      return [
        { label: 'Window type', value: element.windowType },
        { label: 'Frame wood', value: element.woodType }
      ];
    case 'tile':
      return [
        { label: 'Tile type', value: element.tileType },
        { label: 'Colour', value: element.colour }
      ];
  }
}

// ── Document ──────────────────────────────────────────────────────────────────

export const CardPDFDocument: React.FC<{ element: ListingData; qrDataUrl?: string }> = ({ element, qrDataUrl }) => {
  const specific = typeSpecificRows(element);

  return (
    <Document title={element.name} author="Repurposed Marketplace" subject={`${element.type} listing`}>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.brand}>REPURPOSED</Text>
          <Text style={s.headerRight}>
            {`Listing ID: ${element._id}\nExported: ${new Date().toLocaleDateString('en-GB')}`}
          </Text>
        </View>

        {/* Hero */}
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

        {/* Dimensions */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Dimensions</Text>
          <View style={s.kvGrid}>
            <Row label="Measurements" value={formatDimensions(element)} />
          </View>
        </View>

        {/* Type-specific */}
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

        {/* Location */}
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

        {/* Footer */}
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
    </Document>
  );
};
