import * as React from 'react'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { FC, useContext } from 'react'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** ChanelInfoProps Props */
export type ChanelInfoProps = WithChildren
/** Presenter Props */
export type PresenterProps = ChanelInfoProps & {
  sendRequestCall
  id
  name
  type
  photo
  detail
}

/** Presenter Component */
const ChanelInfoPresenter: FC<PresenterProps> = ({
  main,
  id,
  name,
  type,
  photo,
  detail,
  ...props
}) => (
  <>
    <div className={styles.meBlock}>
      <div className="head-photo">
        <img src={photo} alt="" />
      </div>
      <div className="name">{name}</div>
      <div className="title">{detail}</div>
      <div className="video">
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
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  if (_.size(main.chanels) === 0) return <></>
  const { id, name, type, photo, detail } = main.chanels[main.selectChanelId]
  return presenter({
    children,
    main,
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
