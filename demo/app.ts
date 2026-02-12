import { App } from "react-htx"
import loadable from "@loadable/component"

const component = loadable(
  async ({ is }: { is: string }) => {
    const name = is.substring(3) // removes "ui-" prefix
    return import(`../registry/new-york/reactolith/${name}/${name}.tsx`)
  },
  {
    cacheKey: ({ is }) => is,
    resolveComponent: (mod) => mod.default || mod[Object.keys(mod)[0]],
  }
)

new App(component)
