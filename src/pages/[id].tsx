import React, { FC } from 'react'
import ChatArea from '@/components/pages/Chat/ChatArea'
import Layout, {Title} from '@/components/05_layouts/HtmlSkeleton'

const Room: FC = () => {
  return (
    <Layout>
      <Title>チャットルーム</Title>
      <ChatArea />
    </Layout>
  )
}

export default Room
