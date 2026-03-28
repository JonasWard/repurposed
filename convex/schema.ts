import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const location = v.object({
  lat: v.number(),
  lng: v.number(),
  city: v.string(),
  zipCode: v.string(),
  country: v.string(),
  address: v.string(),
});

const woodType = v.union(
  v.literal("cedar"),
  v.literal("oak"),
  v.literal("pine"),
  v.literal("douglas fir"),
  v.literal("spruce"),
);

const damage = v.number(); // 1–5

export default defineSchema({
  listings: defineTable(
    v.union(
      // ── Construction Materials ────────────────────────────────────────────

      v.object({
        category: v.literal("constructionMaterials"),
        type: v.literal("bricks"),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        geometry: v.object({
          width: v.number(),  // mm
          height: v.number(), // mm
          length: v.number(), // mm
        }),
        usedOutside: v.boolean(),
        glazed: v.boolean(),
        damage,
        colour: v.union(v.literal("red"), v.literal("yellow"), v.literal("brown")),
        availableFrom: v.number(), // timestamp
        quantity: v.number(),
        location: v.optional(location),
      }),

      v.object({
        category: v.literal("constructionMaterials"),
        type: v.literal("wood"),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        geometry: v.object({
          width: v.number(),  // mm
          height: v.number(), // mm
          length: v.number(), // mm
        }),
        use: v.object({
          structural: v.boolean(),
          outsideUse: v.boolean(),
        }),
        woodType,
        damage,
        availableFrom: v.number(), // timestamp
        quantity: v.number(),
        location: v.optional(location),
      }),

      // ── Building Materials ────────────────────────────────────────────────

      v.object({
        category: v.literal("buildingMaterials"),
        type: v.literal("window"),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        geometry: v.object({
          width: v.number(),          // mm
          frameThickness: v.number(), // mm
        }),
        woodType,
        availableFrom: v.number(), // timestamp
        damage,
        windowType: v.union(
          v.literal("fixed"),
          v.literal("sliding"),
          v.literal("casement"),
          v.literal("awning"),
        ),
        quantity: v.number(),
        location: v.optional(location),
      }),

      v.object({
        category: v.literal("buildingMaterials"),
        type: v.literal("tile"),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id("_storage")),
        geometry: v.object({
          width: v.number(),     // mm
          length: v.number(),    // mm
          thickness: v.number(), // mm
        }),
        tileType: v.union(
          v.literal("ceramic"),
          v.literal("slate"),
          v.literal("terracota"),
        ),
        colour: v.union(
          v.literal("red"),
          v.literal("yellow"),
          v.literal("blue"),
          v.literal("white"),
          v.literal("brown"),
          v.literal("green"),
        ),
        damage,
        availableFrom: v.number(), // timestamp
        quantity: v.number(),
        location: v.optional(location),
      }),
    ),
  )
    .index("by_category", ["category"])
    .index("by_type", ["type"]),
});
