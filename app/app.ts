import "./index.css";
import loadable from "@loadable/component";
import { App } from "reactolith";
import type { ComponentType } from "react";

const modules = import.meta.glob("@/registry/default/app/**/*.tsx");

new App(
    loadable(({ is }: { is: string }) => {
        const name = is.substring(3)
        const match = Object.keys(modules).find(key => key.endsWith(`/${name}.tsx`));
        if (!match) throw new Error(`Component not found: ${is}`);
        return modules[match]() as Promise<{ default: ComponentType }>;
    }, {
        cacheKey: ({ is }: { is: string }) => is,
    }) as unknown as ComponentType<Record<string, unknown>>,
);
