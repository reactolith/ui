import "./index.css";
import loadable from "@loadable/component";
import { App } from "reactolith";
import type { ComponentType } from "react";
import {
    createCompositeLoader,
    createShadcnLoader,
    createAiElementsLoader,
    createOverridesLoader,
    createBuiltinLoader,
    type ModuleMap,
} from "../lib/loader";
import { createRechartsLoader } from "../lib/loader/recharts-loader";

const modules = import.meta.glob([
    "@/components/ui/*.tsx",
    "@/components/ai-elements/*.tsx",
    "@/app/overrides/*.tsx",
]) as unknown as ModuleMap;

const loaders = [
    createOverridesLoader(modules),
    createBuiltinLoader(),
    createAiElementsLoader(modules),
    createRechartsLoader(),
    createShadcnLoader(modules),
];

new App(
    loadable(
        createCompositeLoader(loaders),
        { cacheKey: ({ is }: { is: string }) => is },
    ) as unknown as ComponentType<Record<string, unknown>>,
);
