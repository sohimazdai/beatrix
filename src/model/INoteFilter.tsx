export interface INoteFilter {
  tags?: number[],
  withComment?: boolean
  withTags?: boolean
  highGlucose?: boolean
  lowGlucose?: boolean
  normalGlucose?: boolean
}
