import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { Typography } from '@material-ui/core'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'
import { APP_NAME } from '@/constants'

/** LogoProps Props */
export type LogoProps = WithChildren & { name }
/** Presenter Props */
export type PresenterProps = LogoProps & { classes }

/** Presenter Component */
const LogoPresenter: FC<PresenterProps> = ({ name, classes }) => (
  <>
    <Typography variant="h6" component="div">
      {name}
    </Typography>
  </>
)

/** Container Component */
const LogoContainer: React.FC<ContainerProps<LogoProps, PresenterProps>> = ({
  presenter,
  children,
  name,
  ...props
}) => {
  const classes = useStyles()
  if (!name) {
    name = APP_NAME
  }
  return presenter({
    children,
    classes,
    name,
    ...props,
  })
}

export default connect<LogoProps, PresenterProps>(
  'Logo',
  LogoPresenter,
  LogoContainer
)
