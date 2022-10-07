import React, { FC, useContext, useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Room } from '@/services/room'
import * as _ from 'lodash'

/** RoomListProps Props */
export type RoomListProps = WithChildren & { openRoomRegistModal }
/** Presenter Props */
export type PresenterProps = RoomListProps & {
  main
  classes
  page
  setPage
  pageCount
  allItems
  displayNum
  displayedItems
  setDisplayedItems
  selectRoom
  setRoomList
}

/** Presenter Component */
const RoomListPresenter: FC<PresenterProps> = ({
  main,
  classes,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  openRoomRegistModal,
  ...props
}) => (
  <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer style={{ maxHeight: 530 }}>
        {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F2F2' }}>
              <TableCell align="center">名称</TableCell>
              <TableCell align="center">説明</TableCell>
              <TableCell align="center">作成日</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(
              _.slice(
                main.room.rooms,
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ),
              (e: Room) => (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.description}</TableCell>
                  <TableCell align="center">{e.createdAt}</TableCell>
                  <TableCell align="center">
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          startIcon={<DoneIcon />}
                          onClick={() => {
                            main.room.setRoomId(e.id)
                          }}
                        >
                          選択
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            openRoomRegistModal(e)
                          }}
                        >
                          変更
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          startIcon={<DeleteIcon />}
                          onClick={async () => {
                            if (confirm('削除します。よろしいですか？'))
                              main.room.deleteRoom(e.id)
                          }}
                        >
                          削除
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={main.room.rooms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </>
)

/** Container Component */
const RoomListContainer: React.FC<
  ContainerProps<RoomListProps, PresenterProps>
> = ({ presenter, children, openRoomRegistModal, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(3)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    main.room.readRooms()
  }, [])

  return presenter({
    children,
    main,
    classes,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    openRoomRegistModal,
    ...props,
  })
}

export default connect<RoomListProps, PresenterProps>(
  'RoomList',
  RoomListPresenter,
  RoomListContainer
)
