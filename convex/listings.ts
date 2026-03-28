import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const locationV = v.optional(
  v.object({
    lat: v.number(),
    lng: v.number(),
    city: v.string(),
    zipCode: v.string(),
    country: v.string(),
    address: v.string(),
  }),
);

const woodTypeV = v.union(
  v.literal("cedar"),
  v.literal("oak"),
  v.literal("pine"),
  v.literal("douglas fir"),
  v.literal("spruce"),
);

const imageFields = {
  imageUrl: v.optional(v.string()),
  imageStorageId: v.optional(v.id("_storage")),
};

const bricksV = v.object({
  category: v.literal("constructionMaterials"),
  type: v.literal("bricks"),
  name: v.string(),
  ...imageFields,
  geometry: v.object({ width: v.number(), height: v.number(), length: v.number() }),
  usedOutside: v.boolean(),
  glazed: v.boolean(),
  damage: v.number(),
  colour: v.union(v.literal("red"), v.literal("yellow"), v.literal("brown")),
  availableFrom: v.number(),
  quantity: v.number(),
  location: locationV,
});

const woodV = v.object({
  category: v.literal("constructionMaterials"),
  type: v.literal("wood"),
  name: v.string(),
  ...imageFields,
  geometry: v.object({ width: v.number(), height: v.number(), length: v.number() }),
  use: v.object({ structural: v.boolean(), outsideUse: v.boolean() }),
  woodType: woodTypeV,
  damage: v.number(),
  availableFrom: v.number(),
  quantity: v.number(),
  location: locationV,
});

const windowV = v.object({
  category: v.literal("buildingMaterials"),
  type: v.literal("window"),
  name: v.string(),
  ...imageFields,
  geometry: v.object({ width: v.number(), frameThickness: v.number() }),
  woodType: woodTypeV,
  availableFrom: v.number(),
  damage: v.number(),
  windowType: v.union(
    v.literal("fixed"),
    v.literal("sliding"),
    v.literal("casement"),
    v.literal("awning"),
  ),
  quantity: v.number(),
  location: locationV,
});

const tileV = v.object({
  category: v.literal("buildingMaterials"),
  type: v.literal("tile"),
  name: v.string(),
  ...imageFields,
  geometry: v.object({ width: v.number(), length: v.number(), thickness: v.number() }),
  tileType: v.union(v.literal("ceramic"), v.literal("slate"), v.literal("terracota")),
  colour: v.union(
    v.literal("red"),
    v.literal("yellow"),
    v.literal("blue"),
    v.literal("white"),
    v.literal("brown"),
    v.literal("green"),
  ),
  damage: v.number(),
  availableFrom: v.number(),
  quantity: v.number(),
  location: locationV,
});

// Resolves imageStorageId → imageUrl so components always read from imageUrl.
async function resolveImage<T extends { imageStorageId?: string; imageUrl?: string }>(
  ctx: { storage: { getUrl: (id: string) => Promise<string | null> } },
  doc: T,
): Promise<T & { imageUrl: string | undefined }> {
  if (doc.imageStorageId) {
    const url = await ctx.storage.getUrl(doc.imageStorageId);
    return { ...doc, imageUrl: url ?? doc.imageUrl };
  }
  return doc as T & { imageUrl: string | undefined };
}

export const list = query({
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").collect();
    return Promise.all(listings.map((l) => resolveImage(ctx, l)));
  },
});

export const getById = query({
  args: { id: v.id("listings") },
  handler: async (ctx, { id }) => {
    const listing = await ctx.db.get(id);
    if (!listing) return null;
    return resolveImage(ctx, listing);
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => ctx.storage.generateUploadUrl(),
});

export const create = mutation({
  args: { data: v.union(bricksV, woodV, windowV, tileV) },
  handler: async (ctx, { data }) => ctx.db.insert("listings", data),
});

export const update = mutation({
  args: { id: v.id("listings"), data: v.union(bricksV, woodV, windowV, tileV) },
  handler: async (ctx, { id, data }) => {
    await ctx.db.replace(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
