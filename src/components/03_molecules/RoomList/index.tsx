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
  TableRow,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
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
  pageCount,
  allItems,
  displayNum,
  displayedItems,
  setDisplayedItems,
  openRoomRegistModal,
  ...props
}) => (
  <>
    <TableContainer component={Paper} style={{ marginBottom: 30 }}>
      {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#F2F2F2' }}>
            <TableCell align="center">名称</TableCell>
            <TableCell align="center">説明</TableCell>
            <TableCell align="center">作成日</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(displayedItems, (e: Room) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
      count={pageCount}
      page={page}
      variant="outlined"
      color="primary"
      size="small"
      onChange={(_event, index) => {
        //ページ移動時にページ番号を更新
        setPage(index)
        //ページ移動時に表示データを書き換える
        setDisplayedItems(
          allItems.slice((index - 1) * displayNum, index * displayNum)
        )
      }}
    />
  </>
)

/** Container Component */
const RoomListContainer: React.FC<
  ContainerProps<RoomListProps, PresenterProps>
> = ({ presenter, children, openRoomRegistModal, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const [page, setPage] = useState(1) //ページ番号
  const [pageCount, setPageCount] = useState<number>() //ページ数
  const [allItems, setAllItems] = useState<Room[]>([]) //全データ
  const [displayedItems, setDisplayedItems] = useState<Room[]>([]) //表示データ
  const displayNum = 10 //1ページあたりの項目数

  useEffect(() => {
    main.room.readRooms()
  }, [])

  useEffect(() => {
    if (main.room.rooms.length === 0) return
    setAllItems(main.room.rooms)
    //ページカウントの計算（今回は3項目/ページなので4ページ）
    setPageCount(Math.ceil(main.room.rooms.length / displayNum))
    //表示データを抽出
    setDisplayedItems(
      main.room.rooms.slice((page - 1) * displayNum, page * displayNum)
    )
  }, [main.room.rooms])

  return presenter({
    children,
    main,
    classes,
    page,
    setPage,
    pageCount,
    allItems,
    displayNum,
    displayedItems,
    setDisplayedItems,
    openRoomRegistModal,
    ...props,
  })
}

export default connect<RoomListProps, PresenterProps>(
  'RoomList',
  RoomListPresenter,
  RoomListContainer
)
