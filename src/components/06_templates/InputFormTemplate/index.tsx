import Grid from '@material-ui/core/Grid'
import Circles from '@/components/01_atoms/Circles'
import InputFormName from '@/components/03_molecules/InputFormName'
import InputFormRoom from '@/components/03_molecules/InputFormRoom'
import React, { useEffect, FC, useContext } from 'react'
import { useRouter } from 'next/router'
import DeviceSettingModal from '@/components/04_organisms/DeviceSettingModal'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** InputFormTemplateProps Props */
export type InputFormTemplateProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormTemplateProps & { classes }

/** Presenter Component */
const InputFormTemplatePresenter: FC<PresenterProps> = ({
  main,
  classes,
  ...props
}) => (
  <>
    <div className="area">
      <Circles>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <InputFormName />
            <InputFormRoom />
          </Grid>
        </Grid>
        <DeviceSettingModal />
      </Circles>
    </div>
  </>
)

/** Container Component */
const InputFormTemplateContainer: React.FC<
  ContainerProps<InputFormTemplateProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  const main = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (main.self.name && main.room.roomId) {
      router.push(main.room.roomId)
    }
  }, [main.self.name, main.room.roomId])
  return presenter({ children, main, classes, ...props })
}

export default connect<InputFormTemplateProps, PresenterProps>(
  'InputFormTemplate',
  InputFormTemplatePresenter,
  InputFormTemplateContainer
)
