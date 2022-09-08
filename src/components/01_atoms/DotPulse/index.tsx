import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'

/** DotPulseProps Props */
export type DotPulseProps = WithChildren
/** Presenter Props */
export type PresenterProps = DotPulseProps & { classes }

/** Presenter Component */
const DotPulsePresenter: FC<PresenterProps> = ({
  children,
  classes,
  ...props
}) => (
  <>
    <div className={classes.dotPulse}></div>
  </>
)

/** Container Component */
const DotPulseContainer: React.FC<
  ContainerProps<DotPulseProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  return presenter({
    children,
    classes,
    ...props,
  })
}

export default connect<DotPulseProps, PresenterProps>(
  'DotPulse',
  DotPulsePresenter,
  DotPulseContainer
)
