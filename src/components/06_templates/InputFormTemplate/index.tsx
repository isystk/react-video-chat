import Grid from '@material-ui/core/Grid'
import Circles from '@/components/01_atoms/Circles'
import InputFormName from '@/components/03_molecules/InputFormName'
import InputFormRoom from '@/components/03_molecules/InputFormRoom'
import React, { useEffect, FC, useContext } from 'react'
import { useRouter } from 'next/router'
import DeviceSetting from '@/components/04_organisms/DeviceSetting'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import {connect} from "@/components/hoc";

/** InputFormsProps Props */
export type InputFormsProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormsProps & { classes }

/** Presenter Component */
const InputFormsPresenter: FC<PresenterProps> = ({ main, classes, ...props }) => (
  <>
     <div className="area">
        <Circles>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <InputFormName main={main} />
              <InputFormRoom main={main} />
            </Grid>
          </Grid>
          <DeviceSetting main={main} />
        </Circles>
      </div>
  </>
)

/** Container Component */
const InputFormsContainer: React.FC< ContainerProps<InputFormsProps, PresenterProps> > = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  const main = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (main.self.name && main.room.roomId) {
      router.push(main.room.roomId)
    }
  }, [main.self.name, main.room.roomId])
  return presenter({ children, main, classes, ...props, })
}

export default connect<InputFormsProps, PresenterProps>(
  'InputForms',
  InputFormsPresenter,
  InputFormsContainer
)
