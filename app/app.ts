import "./index.css";
import loadable from "@loadable/component";
import { App } from "reactolith";
import type { ComponentType } from "react";
import { createComponentLoader } from "./loader";

const uiModules = import.meta.glob("@/components/ui/*.tsx");
const aiModules = import.meta.glob("@/components/ai-elements/*.tsx");
const overrideModules = import.meta.glob("@/registry/default/app/**/*.tsx");

new App(
    loadable(
        createComponentLoader(uiModules, aiModules, overrideModules),
        { cacheKey: ({ is }: { is: string }) => is },
    ) as unknown as ComponentType<Record<string, unknown>>,
);
