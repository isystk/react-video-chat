import * as React from 'react'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { FC } from 'react'
import { connect } from '@/components/hoc'

/** ChanelInfoProps Props */
export type ChanelInfoProps = WithChildren & { main }
/** Presenter Props */
export type PresenterProps = ChanelInfoProps & { classes }

/** Presenter Component */
const ChanelInfoPresenter: FC<PresenterProps> = ({
  main,
  classes,
  id,
  name,
  type,
  photo,
  detail,
  ...props
}) => (
  <>
    <div className="me_block">
      <div className="myHeadPhoto">
        <img src={photo} alt="" />
      </div>
      <div className="myName">{name}</div>
      <div className="myTitle">{detail}</div>
      <div className="myVideo">
        {'other' === type ? (
          <a href="#" onClick={() => main.video.sendRequestCall(id)}>
            <VideocamIcon />
          </a>
        ) : (
          <VideocamOffIcon />
        )}
      </div>
    </div>
  </>
)

/** Container Component */
const ChanelInfoContainer: React.FC<
  ContainerProps<ChanelInfoProps, PresenterProps>
> = ({ presenter, children, main, ...props }) => {
  const classes = useStyles()

  if (_.size(main.chanels) === 0) return <></>

  const { id, name, type, photo, detail } = main.chanels[main.selectChanelId]
  return presenter({
    children,
    main,
    classes,
    id,
    name,
    type,
    photo,
    detail,
    ...props,
  })
}

export default connect<ChanelInfoProps, PresenterProps>(
  'ChanelInfo',
  ChanelInfoPresenter,
  ChanelInfoContainer
)
