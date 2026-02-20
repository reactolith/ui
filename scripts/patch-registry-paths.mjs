#!/usr/bin/env node

/**
 * Post-build script: rewrites `path` fields in public/r/*.json so the
 * shadcn CLI installs files at the correct alias-relative paths:
 *   registry/default/app/button/button.tsx  →  components/app/button/button.tsx
 *   registry/default/lib/render-element.tsx →  lib/render-element.tsx
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = "public/r";
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

let patched = 0;

for (const file of files) {
  const filePath = join(dir, file);
  const item = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = false;

  for (const f of item.files ?? []) {
    if (f.path?.startsWith("registry/default/app/")) {
      f.path = f.path.replace("registry/default/app/", "components/app/");
      changed = true;
    } else if (f.path?.startsWith("registry/default/lib/")) {
      f.path = f.path.replace("registry/default/lib/", "lib/");
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(filePath, JSON.stringify(item, null, 2) + "\n");
    patched++;
  }
}

console.log(`✔ Patched paths in ${patched} registry files.`);
