import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// ---------------------------------------------------------------------------
// Theme Switch (embedded)
// ---------------------------------------------------------------------------

type Theme = "light" | "dark" | "system"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

function ThemeSwitch() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) ?? "system"
  })

  const handleChange = React.useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }, [])

  React.useEffect(() => applyTheme(theme), [theme])

  React.useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => applyTheme("system")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" />}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ---------------------------------------------------------------------------
// Navigation Data
// ---------------------------------------------------------------------------

const navGroups = [
  {
    label: "Getting Started",
    items: [
      { name: "Introduction", slug: "introduction", path: "docs/introduction.html" },
      { name: "Installation", slug: "installation", path: "docs/installation.html" },
      { name: "Usage", slug: "usage", path: "docs/usage.html" },
    ],
  },
  {
    label: "Layout",
    items: [
      { name: "Aspect Ratio", slug: "aspect-ratio" },
      { name: "Card", slug: "card" },
      { name: "Resizable", slug: "resizable" },
      { name: "Scroll Area", slug: "scroll-area" },
      { name: "Separator", slug: "separator" },
      { name: "Direction Provider", slug: "direction-provider" },
    ],
  },
  {
    label: "Forms",
    items: [
      { name: "Button", slug: "button" },
      { name: "Button Group", slug: "button-group" },
      { name: "Calendar", slug: "calendar" },
      { name: "Checkbox", slug: "checkbox" },
      { name: "Combobox", slug: "combobox" },
      { name: "Field", slug: "field" },
      { name: "Input", slug: "input" },
      { name: "Input Group", slug: "input-group" },
      { name: "Input OTP", slug: "input-otp" },
      { name: "Label", slug: "label" },
      { name: "Native Select", slug: "native-select" },
      { name: "Radio Group", slug: "radio-group" },
      { name: "Select", slug: "select" },
      { name: "Slider", slug: "slider" },
      { name: "Switch", slug: "switch" },
      { name: "Textarea", slug: "textarea" },
      { name: "Toggle", slug: "toggle" },
      { name: "Toggle Group", slug: "toggle-group" },
    ],
  },
  {
    label: "Data Display",
    items: [
      { name: "Accordion", slug: "accordion" },
      { name: "Avatar", slug: "avatar" },
      { name: "Badge", slug: "badge" },
      { name: "Carousel", slug: "carousel" },
      { name: "Chart", slug: "chart" },
      { name: "Collapsible", slug: "collapsible" },
      { name: "Item", slug: "item" },
      { name: "Kbd", slug: "kbd" },
      { name: "Table", slug: "table" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Alert", slug: "alert" },
      { name: "Empty", slug: "empty" },
      { name: "Progress", slug: "progress" },
      { name: "Skeleton", slug: "skeleton" },
      { name: "Sonner", slug: "sonner" },
      { name: "Spinner", slug: "spinner" },
    ],
  },
  {
    label: "Overlay",
    items: [
      { name: "Alert Dialog", slug: "alert-dialog" },
      { name: "Context Menu", slug: "context-menu" },
      { name: "Dialog", slug: "dialog" },
      { name: "Drawer", slug: "drawer" },
      { name: "Dropdown Menu", slug: "dropdown-menu" },
      { name: "Hover Card", slug: "hover-card" },
      { name: "Popover", slug: "popover" },
      { name: "Sheet", slug: "sheet" },
      { name: "Tooltip", slug: "tooltip" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { name: "Breadcrumb", slug: "breadcrumb" },
      { name: "Command", slug: "command" },
      { name: "Menubar", slug: "menubar" },
      { name: "Navigation Menu", slug: "navigation-menu" },
      { name: "Pagination", slug: "pagination" },
      { name: "Sidebar", slug: "sidebar" },
      { name: "Tabs", slug: "tabs" },
    ],
  },
]

function getHref(base: string, item: { slug: string; path?: string }) {
  if (item.path) return `${base}/${item.path}`
  return `${base}/docs/components/${item.slug}.html`
}

// ---------------------------------------------------------------------------
// Docs Layout
// ---------------------------------------------------------------------------

function DocsLayout({
  page,
  base,
  children,
}: {
  page?: string
  base?: string
  children?: React.ReactNode
}) {
  const b = base ?? "."

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <a
            href={`${b}/index.html`}
            className="text-lg font-bold tracking-tight"
          >
            Reactolith UI
          </a>
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                      <SidebarMenuButton
                        isActive={page === item.slug}
                        render={<a href={getHref(b, item)} />}
                        size="sm"
                      >
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-14 items-center gap-2 px-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <nav className="flex items-center gap-2">
              <a
                href="https://github.com/reactolith/ui"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <ThemeSwitch />
            </nav>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DocsLayout
