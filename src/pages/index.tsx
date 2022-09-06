import React, { FC } from 'react'
import HtmlSkeleton, { Title } from '@/components/05_layouts/HtmlSkeleton'
import InputFormTemplate from '@/components/06_templates/InputFormTemplate'

const Index: FC = () => {
  return (
    <HtmlSkeleton>
      <Title>ログイン</Title>
      <InputFormTemplate />
    </HtmlSkeleton>
  )
}

export default Index
