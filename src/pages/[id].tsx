import React, { FC } from 'react'
import ChatArea from '@/components/pages/Chat/ChatArea'
import Layout from '@/components/Layout'
import VideoArea from "@/components/pages/Video/VideoArea";

const Room: FC = () => {
  return (
    <Layout>
      <ChatArea />
      <VideoArea />
    </Layout>
  )
}

export default Room
