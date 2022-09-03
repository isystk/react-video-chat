import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import {
  Typography,
} from '@material-ui/core'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'

/** LogoProps Props */
export type LogoProps = WithChildren
/** Presenter Props */
export type PresenterProps = LogoProps & { main; }

/** Presenter Component */
const LogoPresenter: FC<PresenterProps> = ({
  main,
  DEAULT_TITLE,
}) => (
  <>
    <Typography variant="h6" component="div">
      {main.room.name || DEAULT_TITLE}
    </Typography>
  </>
)

/** Container Component */
const LogoContainer: React.FC<
  ContainerProps<LogoProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  const DEAULT_TITLE = process.env.APP_NAME
  return presenter({
    children,
    classes,
    DEAULT_TITLE,
    ...props
  })
}

export default connect<LogoProps, PresenterProps>(
  'Logo',
  LogoPresenter,
  LogoContainer
)
