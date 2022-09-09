import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'

/** CirclesProps Props */
export type CirclesProps = WithChildren
/** Presenter Props */
export type PresenterProps = CirclesProps & { classes; getLiPos }

/** Presenter Component */
const CirclesPresenter: FC<PresenterProps> = ({
  children,
  classes,
  getLiPos,
  ...props
}) => (
  <>
    <ul className={classes.circles}>
      <li className={classes.circlesLi} style={getLiPos(0)}></li>
      <li className={classes.circlesLi} style={getLiPos(1)}></li>
      <li className={classes.circlesLi} style={getLiPos(2)}></li>
      <li className={classes.circlesLi} style={getLiPos(3)}></li>
      <li className={classes.circlesLi} style={getLiPos(4)}></li>
      <li className={classes.circlesLi} style={getLiPos(5)}></li>
      <li className={classes.circlesLi} style={getLiPos(6)}></li>
      <li className={classes.circlesLi} style={getLiPos(7)}></li>
      <li className={classes.circlesLi} style={getLiPos(8)}></li>
      <li className={classes.circlesLi} style={getLiPos(9)}></li>
      {children}
    </ul>
  </>
)

/** Container Component */
const CirclesContainer: React.FC<
  ContainerProps<CirclesProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()

  const getLiPos = (index) =>
    [
      { left: '25%', width: '80px', height: '80px', animationDelay: '0s' },
      {
        left: '10%',
        width: '20px',
        height: '20px',
        animationDelay: '2s',
        animationDuration: '12s',
      },
      { left: '70%', width: '20px', height: '20px', animationDelay: '4s' },
      {
        left: '40%',
        width: '60px',
        height: '60px',
        animationDelay: '0s',
        animationDuration: '18s',
      },
      { left: '65%', width: '20px', height: '20px', animationDelay: '0s' },
      { left: '75%', width: '110px', height: '110px', animationDelay: '3s' },
      { left: '35%', width: '150px', height: '150px', animationDelay: '7s' },
      {
        left: '50%',
        width: '25px',
        height: '25px',
        animationDelay: '15s',
        animationDuration: '45s',
      },
      {
        left: '20%',
        width: '15px',
        height: '15px',
        animationDelay: '2s',
        animationDuration: '35s',
      },
      {
        left: '85%',
        width: '150px',
        height: '150px',
        animationDelay: '0s',
        animationDuration: '11s',
      },
    ][index]

  return presenter({
    children,
    classes,
    getLiPos,
    ...props,
  })
}

export default connect<CirclesProps, PresenterProps>(
  'Circles',
  CirclesPresenter,
  CirclesContainer
)
