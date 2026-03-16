import { Attachment } from "@/components/ai-elements/attachments"
import type { ComponentProps } from "react"

const defaultData = { id: "default", type: "file" as const, mediaType: "application/octet-stream", filename: "file" }

type AttachmentWrapperProps = Omit<ComponentProps<typeof Attachment>, "data"> & {
  data?: ComponentProps<typeof Attachment>["data"]
}

const AttachmentWrapper = ({ data = defaultData, ...props }: AttachmentWrapperProps) => (
  <Attachment data={data} {...props} />
)

export default AttachmentWrapper
