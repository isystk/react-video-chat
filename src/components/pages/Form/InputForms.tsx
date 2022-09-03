import Grid from '@material-ui/core/Grid'
import InputFormName from './InputFormName'
import InputFormRoom from './InputFormRoom'
import React, { useEffect, FC, useContext } from 'react'
import { useRouter } from 'next/router'
import DeviceSetting from '@/components/widgets/DeviceSetting'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

const InputForms: FC = () => {
  const main = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (main.self.name && main.room.roomId) {
      router.push(main.room.roomId)
    }
  }, [main.self.name, main.room.roomId])

  return (
    <>
      <div className="area">
        <ul className="circles">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <InputFormName main={main} />
              <InputFormRoom main={main} />
            </Grid>
          </Grid>
          <DeviceSetting main={main} />
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  )
}

export default InputForms
