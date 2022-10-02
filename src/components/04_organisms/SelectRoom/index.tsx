import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Grid, Container } from '@material-ui/core'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import Box from '@/components/01_atoms/Box'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import RoomList from '@/components/03_molecules/RoomList'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Room } from '@/services/room'
import RoomRegistModal from '@/components/04_organisms/RoomRegistModal'

/** SelectRoomProps Props */
export type SelectRoomProps = WithChildren
/** Presenter Props */
export type PresenterProps = SelectRoomProps & {
  main
  classes
  openRoomRegistModal
  selectRoom
  setSelectRoom
}

/** Presenter Component */
const SelectRoomPresenter: FC<PresenterProps> = ({
  main,
  classes,
  openRoomRegistModal,
  selectRoom,
  ...props
}) => (
  <>
    <Container component="main">
      <Box title="部屋の選択">
        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <Grid container justifyContent="space-between">
              <Grid item></Grid>
              <Grid item>
                <Button
                  color="primary"
                  type="button"
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={() => {
                    openRoomRegistModal(null)
                  }}
                >
                  新規登録
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RoomList openRoomRegistModal={openRoomRegistModal} />
          </Grid>
        </Grid>
      </Box>
    </Container>
    <RoomRegistModal room={selectRoom} />
  </>
)

/** Container Component */
const SelectRoomContainer: React.FC<
  ContainerProps<SelectRoomProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()
  const [selectRoom, setSelectRoom] = useState<Room | null>(null)

  if (main.self.name === '') return <></>
  if (main.room.name !== '') return <></>

  const openRoomRegistModal = (room) => {
    main.room.isOpen = true
    setSelectRoom(room)
    main.setAppRoot()
  }

  return presenter({
    children,
    main,
    classes,
    openRoomRegistModal,
    selectRoom,
    setSelectRoom,
    ...props,
  })
}

export default connect<SelectRoomProps, PresenterProps>(
  'SelectRoom',
  SelectRoomPresenter,
  SelectRoomContainer
)
