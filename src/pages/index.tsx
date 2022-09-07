import React, { FC } from 'react'
import InputFormTemplate, {InputFormTemplateProps} from '@/components/06_templates/InputFormTemplate'
import useAppRoot from "@/stores/useAppRoot";

const Index: FC = () => {
  const main = useAppRoot()
  if (!main) return <></> 
  const props: InputFormTemplateProps = {main}
  return (
    <InputFormTemplate {...props} />
  )
}

export default Index
