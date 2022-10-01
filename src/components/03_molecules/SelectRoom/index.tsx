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
  Container,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import Box from '@/components/01_atoms/Box'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Room } from '@/services/room'
import * as _ from 'lodash'
import RoomRegistModal from '@/components/04_organisms/RoomRegistModal'

/** SelectRoomProps Props */
export type SelectRoomProps = WithChildren
/** Presenter Props */
export type PresenterProps = SelectRoomProps & {
  main
  classes
  page
  setPage
  pageCount
  allItems
  displayNum
  displayedItems
  setDisplayedItems
}

/** Presenter Component */
const SelectRoomPresenter: FC<PresenterProps> = ({
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
  selectRoom,
  setSelectRoom,
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
                    setSelectRoom(null)
                    openRoomRegistModal()
                  }}
                >
                  新規登録
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
                              startIcon={<EditIcon />}
                              onClick={() => {
                                setSelectRoom(e)
                                openRoomRegistModal()
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
                                  console.log('delete')
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
            <Grid item xs={12}>
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
            </Grid>
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

  const [page, setPage] = useState(1) //ページ番号
  const [pageCount, setPageCount] = useState<number>() //ページ数
  const [allItems, setAllItems] = useState<Room[]>([]) //全データ
  const [displayedItems, setDisplayedItems] = useState<Room[]>([]) //表示データ
  const displayNum = 3 //1ページあたりの項目数

  const [selectRoom, setSelectRoom] = useState<Room | null>(null)

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

  if (main.self.name === '') return <></>
  if (main.room.name !== '') return <></>

  const openRoomRegistModal = () => {
    main.room.isOpen = true
    main.setAppRoot()
  }

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
