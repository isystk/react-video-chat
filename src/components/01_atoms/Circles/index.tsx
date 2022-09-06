import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'

/** CirclesProps Props */
export type CirclesProps = WithChildren
/** Presenter Props */
export type PresenterProps = CirclesProps

/** Presenter Component */
const CirclesPresenter: FC<PresenterProps> = ({ children, ...props }) => (
  <>
    <ul className="circles">
      {children}
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
  </>
)

/** Container Component */
const CirclesContainer: React.FC<ContainerProps<CirclesProps, PresenterProps>> = ({
  presenter,
  children,
  ...props
}) => {
  const classes = useStyles()
  return presenter({
    children,
    classes,
    ...props,
  })
}

export default connect<CirclesProps, PresenterProps>(
  'Circles',
  CirclesPresenter,
  CirclesContainer
)
