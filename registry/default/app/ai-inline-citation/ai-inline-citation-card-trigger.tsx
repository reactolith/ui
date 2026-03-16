import { InlineCitationCardTrigger } from "@/components/ai-elements/inline-citation"
import type { ComponentProps } from "react"

type TriggerWrapperProps = Omit<ComponentProps<typeof InlineCitationCardTrigger>, "sources"> & {
  sources?: string[]
}

const TriggerWrapper = ({ sources = [], ...props }: TriggerWrapperProps) => (
  <InlineCitationCardTrigger sources={sources} {...props} />
)

export default TriggerWrapper
