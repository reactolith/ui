import { AgentTool } from "@/components/ai-elements/agent"
import type { ComponentProps } from "react"

const defaultTool = { description: "Tool" }

type AgentToolWrapperProps = Omit<ComponentProps<typeof AgentTool>, "tool"> & {
  tool?: ComponentProps<typeof AgentTool>["tool"]
}

const AgentToolWrapper = ({ tool = defaultTool, ...props }: AgentToolWrapperProps) => (
  <AgentTool tool={tool} {...props} />
)

export default AgentToolWrapper
