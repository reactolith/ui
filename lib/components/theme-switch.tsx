import * as React from "react"
import { Menu } from "@base-ui/react/menu"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "./theme-provider"

const triggerClassName =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground size-9 cursor-pointer relative"

const itemClassName =
  "focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"

export default function ThemeSwitch() {
  const { setTheme } = useTheme()

  return (
    <Menu.Root>
      <Menu.Trigger className={triggerClassName}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className="isolate z-50 outline-none"
          align="end"
          side="bottom"
          sideOffset={4}
        >
          <Menu.Popup className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-md p-1 shadow-md ring-1 duration-100 z-50 origin-(--transform-origin) overflow-hidden outline-none">
            <Menu.Item className={itemClassName} onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Menu.Item>
            <Menu.Item className={itemClassName} onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Menu.Item>
            <Menu.Item className={itemClassName} onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
