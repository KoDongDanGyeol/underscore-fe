import { FieldValues } from "react-hook-form"
import FormGuideMain, { FormGuideMainProps } from "@/components/form/FormGuide/Main"

export interface TypeFormGuide extends FieldValues {
  name: string
  email: string
  description?: string
}

export type { FormGuideMainProps }

export default Object.assign(FormGuideMain, {
  //
})
