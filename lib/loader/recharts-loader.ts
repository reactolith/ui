import { ExternalLoader } from "./component-loader"

const RECHARTS_COMPONENTS = [
  "area-chart", "area", "bar-chart", "bar", "cartesian-grid", "cell",
  "label-list", "line-chart", "line", "pie-chart", "pie",
  "polar-angle-axis", "polar-grid", "polar-radius-axis",
  "radar-chart", "radar", "radial-bar-chart", "radial-bar",
  "x-axis", "y-axis",
]

export function createRechartsLoader(): ExternalLoader {
  return new ExternalLoader({
    prefix: "ui-",
    components: RECHARTS_COMPONENTS,
    importFn: () => import("recharts"),
  })
}
