import Grid from '@material-ui/core/Grid'
import InputFormName from './InputFormName'
import InputFormRoom from './InputFormRoom'
import React, { useEffect, VFC } from 'react'
import Main from '@/services/main'
import { useRouter } from 'next/router'
import DeviceSetting from '@/components/widgets/DeviceSetting'

type Props = {
  main: Main
}

const InputForms: VFC<Props> = ({ main }) => {
  const router = useRouter()

  useEffect(() => {
    if (main.self.name && main.room.roomId) {
      router.push(main.room.roomId)
    }
  }, [main.self.name, main.room.roomId])

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <InputFormName main={main} />
          <InputFormRoom main={main} />
        </Grid>
      </Grid>
      <DeviceSetting main={main} />
    </>
  )
}

export default InputForms
