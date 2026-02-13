import "./index.css";
import loadable from "@loadable/component";
import { App } from "reactolith";
import type { ComponentType } from "react";

new App(
    loadable(({ is }: { is: string }) => {
        const name = is.substring(3)
        return import(`@/registry/default/app/${name}/${name}.tsx`);
    }, {
        cacheKey: ({ is }: { is: string }) => is,
    }) as unknown as ComponentType<Record<string, unknown>>,
);
