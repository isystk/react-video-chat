import React, { FC } from 'react'
import ChatTemplate from '@/components/06_templates/ChatTemplate'
import Layout, { Title } from '@/components/05_layouts/HtmlSkeleton'

const Room: FC = () => {
  return (
    <Layout>
      <Title>チャットルーム</Title>
      <ChatTemplate />
    </Layout>
  )
}

export default Room
