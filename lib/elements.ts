import { Doc } from "@/convex/_generated/dataModel";

export type ListingData = Doc<"listings">;

export const ListingCategories = ["constructionMaterials", "buildingMaterials"] as const;
export const ListingTypes = ["bricks", "wood", "window", "tile", "door"] as const;
