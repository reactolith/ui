#!/usr/bin/env npx tsx
/**
 * Generate web-types.json from loader configurations.
 *
 * Scans component directories with ts-morph, extracts props from exported
 * React components, and enriches with additional attributes from loader
 * behavior/wrapper metadata.
 *
 * Usage:
 *   npx tsx scripts/generate-web-types.ts [--out web-types.json]
 */

import { Project, Node, type SourceFile, type Type } from "ts-morph"
import * as fs from "fs"
import * as path from "path"

// Import loader metadata for additional attributes
import {
  linkable, linkableClose, closeClick,
  commandLinkable, sidebarLinkable,
  comboboxProvider,
  type WebTypeAttribute,
} from "../lib/loader/behaviors"

// ---------------------------------------------------------------------------
// Loader configs for web-types generation
// ---------------------------------------------------------------------------

interface WebTypesLoaderConfig {
  /** Directory to scan (relative to project root) */
  dir: string
  /** Tag name prefix */
  prefix: string
  /** Additional attributes per component (from behaviors/wrappers) */
  additionalAttributes?: Record<string, WebTypeAttribute[]>
}

// Build additional attributes map from behavior definitions
function buildAdditionalAttributes(
  behaviors: Record<string, { additionalAttributes?: WebTypeAttribute[] }>,
  wrappers: Record<string, { additionalAttributes?: WebTypeAttribute[] }>,
): Record<string, WebTypeAttribute[]> {
  const result: Record<string, WebTypeAttribute[]> = {}
  for (const [name, def] of Object.entries(behaviors)) {
    if (def.additionalAttributes?.length) result[name] = def.additionalAttributes
  }
  for (const [name, def] of Object.entries(wrappers)) {
    if (def.additionalAttributes?.length) result[name] = def.additionalAttributes
  }
  return result
}

const SHADCN_ADDITIONAL = buildAdditionalAttributes(
  {
    "button": linkable,
    "accordion-trigger": linkable,
    "toggle": linkable,
    "toggle-group-item": linkable,
    "dropdown-menu-item": linkableClose,
    "context-menu-item": linkableClose,
    "menubar-item": linkableClose,
    "navigation-menu-link": linkableClose,
    "breadcrumb-link": linkableClose,
    "tabs-trigger": linkableClose,
    "pagination-link": closeClick,
    "pagination-next": closeClick,
    "pagination-previous": closeClick,
  },
  {
    "command-item": commandLinkable,
    "sidebar-menu-button": sidebarLinkable,
    "combobox": comboboxProvider,
  },
)

const LOADER_CONFIGS: WebTypesLoaderConfig[] = [
  { dir: "components/ui", prefix: "ui-", additionalAttributes: SHADCN_ADDITIONAL },
  { dir: "components/ai-elements", prefix: "ui-ai-" },
]

// ---------------------------------------------------------------------------
// File scanning
// ---------------------------------------------------------------------------

function findComponentFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findComponentFiles(fullPath))
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      results.push(fullPath)
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Type utilities
// ---------------------------------------------------------------------------

function cleanTypeText(text: string): string {
  return text.replace(/import\([^)]+\)\./g, "").replace(/\s+/g, " ").trim()
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

function isJsxReturnType(type: Type): boolean {
  const text = type.getText()
  return (
    text.includes("Element") ||
    text.includes("ReactNode") ||
    text.includes("ReactElement") ||
    text.includes("JSX") ||
    text === "null" ||
    text.includes("| null")
  )
}

function isSlotType(typeText: string): boolean {
  const slotPatterns = ["ReactNode", "ReactElement", "JSX.Element"]
  const isSlot = slotPatterns.some(p => typeText.includes(p))
  const isFunction = typeText.includes("=>") || typeText.includes("EventHandler") || typeText.includes("Handler<")
  return isSlot && !isFunction
}

function getPropertyDescription(prop: any): string | undefined {
  const declarations = prop.getDeclarations()
  for (const decl of declarations) {
    const jsDocs = decl.getJsDocs?.()
    if (jsDocs && jsDocs.length > 0) {
      return jsDocs[0].getDescription?.()?.trim()
    }
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Props extraction
// ---------------------------------------------------------------------------

interface PropsInfo {
  type: Type | null
  node: any
}

interface ComponentInfo {
  name: string
  propsType: Type | null
  propsNode: any
  sourceFile: SourceFile
}

function extractPropsFromFunction(func: any): PropsInfo | null {
  const returnType = func.getReturnType()
  if (!isJsxReturnType(returnType)) return null
  const params = func.getParameters()
  if (params.length === 0) return { type: null, node: func }
  return { type: params[0].getType(), node: params[0] }
}

function extractPropsFromArrowFunction(func: any): PropsInfo | null {
  const returnType = func.getReturnType()
  if (!isJsxReturnType(returnType)) return null
  const params = func.getParameters()
  if (params.length === 0) return { type: null, node: func }
  return { type: params[0].getType(), node: params[0] }
}

function extractPropsFromFunctionExpression(func: any): PropsInfo | null {
  const returnType = func.getReturnType()
  if (!isJsxReturnType(returnType)) return null
  const params = func.getParameters()
  if (params.length === 0) return { type: null, node: func }
  return { type: params[0].getType(), node: params[0] }
}

function extractPropsFromDeclaration(decl: any): PropsInfo | null {
  if (Node.isFunctionDeclaration(decl)) return extractPropsFromFunction(decl)

  if (Node.isVariableDeclaration(decl)) {
    const initializer = decl.getInitializer()
    if (initializer && Node.isArrowFunction(initializer)) return extractPropsFromArrowFunction(initializer)
    if (initializer && Node.isFunctionExpression(initializer)) return extractPropsFromFunctionExpression(initializer)

    if (initializer && Node.isCallExpression(initializer)) {
      for (const arg of initializer.getArguments()) {
        if (Node.isArrowFunction(arg)) return extractPropsFromArrowFunction(arg)
        if (Node.isFunctionExpression(arg)) return extractPropsFromFunctionExpression(arg)
      }
    }

    if (initializer && (Node.isPropertyAccessExpression(initializer) || Node.isIdentifier(initializer))) {
      const varType = decl.getType()
      const callSignatures = varType.getCallSignatures()
      if (callSignatures.length > 0) {
        const sig = callSignatures[0]
        const params = sig.getParameters()
        if (params.length > 0) {
          const paramType = params[0].getTypeAtLocation(decl)
          if (isJsxReturnType(sig.getReturnType())) return { type: paramType, node: decl }
        } else if (isJsxReturnType(sig.getReturnType())) {
          return { type: null, node: decl }
        }
      }
    }
  }

  if (Node.isExportAssignment(decl)) {
    const expr = decl.getExpression?.()
    if (expr) {
      if (Node.isArrowFunction(expr)) return extractPropsFromArrowFunction(expr)
      if (Node.isFunctionExpression(expr)) return extractPropsFromFunctionExpression(expr)
    }
  }

  return null
}

function resolveImportedComponent(importDecl: any, exportName: string): PropsInfo | null {
  try {
    const resolvedModule = importDecl.getModuleSpecifierSourceFile()
    if (!resolvedModule) return null

    if (exportName === "default") {
      const defaultExport = resolvedModule.getDefaultExportSymbol()
      if (defaultExport) {
        for (const decl of defaultExport.getDeclarations()) {
          const info = extractPropsFromDeclaration(decl)
          if (info) return info
        }
      }
    } else {
      const exported = resolvedModule.getExportedDeclarations()
      const decls = exported.get(exportName)
      if (decls) {
        for (const decl of decls) {
          const info = extractPropsFromDeclaration(decl)
          if (info) return info
        }
      }
    }
  } catch {
    // Module resolution failed for external modules
  }
  return null
}

function resolveIdentifierToProps(identifier: any, sourceFile: SourceFile): PropsInfo | null {
  const identifierName = identifier.getText()

  const localVar = sourceFile.getVariableDeclaration(identifierName)
  if (localVar) return extractPropsFromDeclaration(localVar)

  const localFunc = sourceFile.getFunction(identifierName)
  if (localFunc) return extractPropsFromDeclaration(localFunc)

  const identifierType = identifier.getType()
  const callSignatures = identifierType.getCallSignatures()
  if (callSignatures.length > 0) {
    const sig = callSignatures[0]
    const params = sig.getParameters()
    if (params.length > 0) {
      const paramType = params[0].getTypeAtLocation(identifier)
      if (isJsxReturnType(sig.getReturnType())) return { type: paramType, node: identifier }
    } else if (isJsxReturnType(sig.getReturnType())) {
      return { type: null, node: identifier }
    }
  }

  for (const importDecl of sourceFile.getImportDeclarations()) {
    for (const namedImport of importDecl.getNamedImports()) {
      const importedName = namedImport.getAliasNode()?.getText() || namedImport.getName()
      if (importedName === identifierName) return resolveImportedComponent(importDecl, namedImport.getName())
    }
    const defaultImport = importDecl.getDefaultImport()
    if (defaultImport?.getText() === identifierName) return resolveImportedComponent(importDecl, "default")
  }

  return null
}

// ---------------------------------------------------------------------------
// Component extraction strategies
// ---------------------------------------------------------------------------

function extractFromExportedPropsTypes(sourceFile: SourceFile): ComponentInfo[] {
  const results: ComponentInfo[] = []
  const exported = sourceFile.getExportedDeclarations()
  for (const [name, decls] of exported) {
    if (!name.endsWith("Props")) continue
    const decl = decls[0]
    if (!decl) continue
    const type = (decl as any).getType?.()
    if (!type) continue
    results.push({
      name: name.substring(0, name.length - 5),
      propsType: type,
      propsNode: decl,
      sourceFile,
    })
  }
  return results
}

function extractFromComponentFunctions(sourceFile: SourceFile): ComponentInfo[] {
  const results: ComponentInfo[] = []
  const exported = sourceFile.getExportedDeclarations()

  for (const [name, decls] of exported) {
    if (name.endsWith("Props") || !/^[A-Z]/.test(name)) continue
    const decl = decls[0]
    if (!decl) continue
    const propsInfo = extractPropsFromDeclaration(decl)
    if (propsInfo) {
      results.push({ name, propsType: propsInfo.type, propsNode: propsInfo.node, sourceFile })
    }
  }

  const defaultExport = sourceFile.getDefaultExportSymbol()
  if (defaultExport) {
    for (const decl of defaultExport.getDeclarations()) {
      let propsInfo = extractPropsFromDeclaration(decl)
      if (!propsInfo && Node.isExportAssignment(decl)) {
        const expr = (decl as any).getExpression?.()
        if (expr && Node.isIdentifier(expr)) {
          propsInfo = resolveIdentifierToProps(expr, sourceFile)
        }
      }
      if (propsInfo) {
        const fileName = path.basename(sourceFile.getFilePath(), path.extname(sourceFile.getFilePath()))
        const componentName = fileName.split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("")
        results.push({ name: componentName, propsType: propsInfo.type, propsNode: propsInfo.node, sourceFile })
      }
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Attribute & slot extraction
// ---------------------------------------------------------------------------

function extractAttributesAndSlots(type: Type | null, contextNode: any): { attributes: any[]; slots: any[] } {
  const attributes: any[] = []
  const slots: any[] = []

  if (!type) return { attributes, slots }

  type.getProperties().forEach(prop => {
    const propName = prop.getName()
    if (["key", "ref"].includes(propName)) return

    const propType = prop.getTypeAtLocation(contextNode)
    const typeText = cleanTypeText(propType.getText())
    const description = getPropertyDescription(prop)
    const required = !prop.isOptional()

    if (isSlotType(typeText)) {
      slots.push({
        name: propName === "children" ? "default" : propName,
        description: description || `Content for the ${propName === "children" ? "default" : propName} slot`,
      })
      return
    }

    if (propName === "children") return

    const attr: any = {
      name: toKebabCase(propName),
      description: description || undefined,
      required,
    }

    if (typeText === "boolean" || typeText === "boolean | undefined") {
      attr.value = { kind: "no-value", type: "boolean" }
    } else if (typeText.includes("|")) {
      const values = typeText.split("|").map(v => v.trim()).filter(v => v !== "undefined" && v !== "null")
      const stringLiterals = values.filter(v => /^["'].*["']$/.test(v))
      const primitives = ["boolean", "string", "number", "object", "any", "unknown", "never"]

      if (stringLiterals.length === values.length && values.length > 0) {
        attr.value = { kind: "plain", type: typeText }
        attr.values = stringLiterals.map(v => ({ name: v.replace(/['"]/g, "") }))
      } else if (values.every(v => primitives.includes(v)) || values.some(v => v.includes("=>"))) {
        attr.value = { kind: "expression", type: typeText }
      } else {
        attr.value = { kind: "plain", type: typeText }
      }
    } else {
      attr.value = { kind: "plain", type: typeText }
    }

    attributes.push(attr)
  })

  return { attributes, slots }
}

// ---------------------------------------------------------------------------
// Main generation
// ---------------------------------------------------------------------------

function detectTsconfig(): string {
  if (fs.existsSync("./tsconfig.app.json")) return "./tsconfig.app.json"
  return "./tsconfig.json"
}

function generateForLoader(config: WebTypesLoaderConfig, project: Project): any[] {
  const componentsDir = path.resolve(config.dir)
  if (!fs.existsSync(componentsDir)) {
    console.warn(`Warning: directory not found: ${componentsDir}`)
    return []
  }

  const files = findComponentFiles(componentsDir)
  const elements: any[] = []

  for (const filePath of files) {
    const sourceFile = project.addSourceFileAtPath(filePath)
    if (!sourceFile) continue

    const propsFromTypes = extractFromExportedPropsTypes(sourceFile)
    const propsFromComponents = extractFromComponentFunctions(sourceFile)

    const componentMap = new Map<string, ComponentInfo>()
    propsFromComponents.forEach(info => componentMap.set(info.name, info))
    propsFromTypes.forEach(info => componentMap.set(info.name, info))

    componentMap.forEach(info => {
      if (info.propsType === undefined) return  // skip entries without resolved type info

      const { attributes, slots } = extractAttributesAndSlots(info.propsType, info.propsNode || info.sourceFile)
      const tagName = config.prefix + info.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
      const kebabName = info.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

      // Merge additional attributes from loader behaviors/wrappers
      const additional = config.additionalAttributes?.[kebabName]
      if (additional) {
        for (const attr of additional) {
          // Only add if not already present
          if (!attributes.some((a: any) => a.name === attr.name)) {
            attributes.push(attr)
          }
        }
      }

      const element: any = { name: tagName, description: `${info.name} component`, attributes }
      if (slots.length > 0) element.slots = slots
      elements.push(element)
    })
  }

  return elements
}

function main() {
  const args = process.argv.slice(2)
  let outFile = "web-types.json"

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--out" || args[i] === "-o") && args[i + 1]) {
      outFile = args[i + 1]
      i++
    }
  }

  console.log("Generating web-types...")

  const project = new Project({ tsConfigFilePath: detectTsconfig() })
  const allElements: any[] = []

  for (const config of LOADER_CONFIGS) {
    console.log(`  Processing ${config.dir} (prefix: ${config.prefix})...`)
    const elements = generateForLoader(config, project)
    console.log(`    Found ${elements.length} components`)
    allElements.push(...elements)
  }

  allElements.sort((a, b) => a.name.localeCompare(b.name))

  const webTypes = {
    $schema: "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    name: "reactolith-components",
    version: "1.0.0",
    "js-types-syntax": "typescript",
    "description-markup": "markdown",
    contributions: {
      html: {
        elements: allElements,
      },
    },
  }

  fs.writeFileSync(outFile, JSON.stringify(webTypes, null, 2))
  console.log(`Written ${allElements.length} components to ${outFile}`)
}

main()
