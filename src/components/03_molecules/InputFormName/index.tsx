import TextField from '@material-ui/core/TextField'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import FormBox from '@/components/01_atoms/FormBox'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { Typography } from '@material-ui/core'

/** InputFormNameProps Props */
export type InputFormNameProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormNameProps & {
  main
  classes
  label
  name
  setName
  isComposed
  setIsComposed
  initializeLocalPeer
  disabled
}

/** Presenter Component */
const InputFormNamePresenter: FC<PresenterProps> = ({
  main,
  classes,
  label,
  name,
  setName,
  isComposed,
  setIsComposed,
  initializeLocalPeer,
  disabled,
  ...props
}) => (
  <>
    <Container component="main">
      <FormBox title="ログイン">
        <>
          <Typography component="h1" variant="h5">
            {label}を入力してください
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label={label}
            margin="normal"
            name="name"
            onChange={(e) => setName(e.target.value)}
            onCompositionEnd={() => setIsComposed(false)}
            onCompositionStart={() => setIsComposed(true)}
            onKeyDown={async (e) => {
              if (isComposed) return
              if (e.target.value === '') return
              if (e.key === 'Enter') await initializeLocalPeer(e)
            }}
            required
            value={name}
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            disabled={disabled}
            fullWidth
            onClick={async (e) => await initializeLocalPeer(e)}
            type="submit"
            variant="contained"
          >
            決定
          </Button>
        </>
      </FormBox>
    </Container>
  </>
)

/** Container Component */
const InputFormNameContainer: React.FC<
  ContainerProps<InputFormNameProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const label = 'あなたの名前'
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState('')
  const [isComposed, setIsComposed] = useState(false)

  useEffect(() => {
    const disabled = name === ''
    setDisabled(disabled)
  }, [name])

  const initializeLocalPeer = useCallback(
    async (e) => {
      e.persist()
      await main.setName(name)
      e.preventDefault()
    },
    [name, main]
  )

  if (main.self.name !== '') return <></>
  return presenter({
    children,
    main,
    classes,
    label,
    name,
    setName,
    isComposed,
    setIsComposed,
    initializeLocalPeer,
    disabled,
    ...props,
  })
}

export default connect<InputFormNameProps, PresenterProps>(
  'InputFormName',
  InputFormNamePresenter,
  InputFormNameContainer
)
