const parsableTypes = ['circle', 'line', 'polygon', 'rect', 'path'] as const;
export type ParsableType = (typeof parsableTypes)[number];
