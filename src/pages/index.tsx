import React, { FC } from 'react'
import HtmlSkeleton, { Title } from '@/components/05_layouts/HtmlSkeleton'
import InputForms from '@/components/04_organisms/InputForms'

const Index: FC = () => {
  return (
    <HtmlSkeleton>
      <Title>ログイン</Title>
      <InputForms />
    </HtmlSkeleton>
  )
}

export default Index
