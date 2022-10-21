import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { Typography } from '@mui/material'
import { connect } from '@/components/hoc'
import * as styles from './styles'
import { APP_NAME } from '@/constants'

/** LogoProps Props */
export type LogoProps = WithChildren & { name }
/** Presenter Props */
export type PresenterProps = LogoProps

/** Presenter Component */
const LogoPresenter: FC<PresenterProps> = ({ name }) => (
  <>
    <Typography variant="h6" component="div" className={styles.logo}>
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
  if (!name) {
    name = APP_NAME
  }
  return presenter({
    children,
    name,
    ...props,
  })
}

export default connect<LogoProps, PresenterProps>(
  'Logo',
  LogoPresenter,
  LogoContainer
)
