import "./index.css";
import loadable from "@loadable/component";
import { App } from "reactolith";
import type { ComponentType } from "react";
import { createComponentLoader } from "./loader";

const modules = import.meta.glob([
    "@/components/ui/*.tsx",
    "@/components/ai-elements/*.tsx",
    "@/registry/default/app/**/*.tsx",
]);

new App(
    loadable(
        createComponentLoader(modules),
        { cacheKey: ({ is }: { is: string }) => is },
    ) as unknown as ComponentType<Record<string, unknown>>,
);
