import { Node } from "@/components/ai-elements/node"
import type { ComponentProps } from "react"

type NodeWrapperProps = Omit<ComponentProps<typeof Node>, "handles"> & {
  handles?: ComponentProps<typeof Node>["handles"]
}

const NodeWrapper = ({ handles = { target: false, source: false }, ...props }: NodeWrapperProps) => (
  <Node handles={handles} {...props} />
)

export default NodeWrapper
