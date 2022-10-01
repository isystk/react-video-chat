import Grid from '@material-ui/core/Grid'
import Circles from '@/components/01_atoms/Circles'
import InputFormName from '@/components/03_molecules/InputFormName'
import SelectRoom from '@/components/03_molecules/SelectRoom'
import React, { useEffect, FC, useState } from 'react'
import { useRouter } from 'next/router'
import DeviceSettingModal from '@/components/04_organisms/DeviceSettingModal'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import HtmlSkeleton, { Title } from '@/components/05_layouts/HtmlSkeleton'

/** InputFormTemplateProps Props */
export type InputFormTemplateProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormTemplateProps & { classes }

/** Presenter Component */
const InputFormTemplatePresenter: FC<PresenterProps> = ({
  main,
  classes,
  windowHeight,
  appStyle,
  ...props
}) => (
  <HtmlSkeleton>
    <Title>ログイン</Title>
    <div style={appStyle(windowHeight)}>
      <Circles>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <InputFormName />
            {/*<InputFormRoom />*/}
            <SelectRoom />
          </Grid>
        </Grid>
        <DeviceSettingModal />
      </Circles>
    </div>
  </HtmlSkeleton>
)

/** Container Component */
const InputFormTemplateContainer: React.FC<
  ContainerProps<InputFormTemplateProps, PresenterProps>
> = ({ presenter, children, main, ...props }) => {
  const classes = useStyles()
  const router = useRouter()
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (main.self.name && main.room.roomId) {
      router.push(main.room.roomId)
    }
  }, [main.self.name, main.room.roomId])

  const appStyle = (vh) => {
    return {
      height: vh - 64,
    }
  }
  return presenter({
    children,
    main,
    classes,
    windowHeight,
    appStyle,
    ...props,
  })
}

export default connect<InputFormTemplateProps, PresenterProps>(
  'InputFormTemplate',
  InputFormTemplatePresenter,
  InputFormTemplateContainer
)
