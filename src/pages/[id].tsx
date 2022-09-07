import React, { FC } from 'react'
import ChatTemplate, {
  ChatTemplateProps,
} from '@/components/06_templates/ChatTemplate'
import useAppRoot from '@/stores/useAppRoot'

const Room: FC = () => {
  const main = useAppRoot()
  if (!main) return <></>
  const props: ChatTemplateProps = { main }
  return <ChatTemplate {...props} />
}

export default Room
