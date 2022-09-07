import HtmlSkeleton, {
  Context,
  HtmlSkeletonProps,
  Title,
} from '@/components/05_layouts/HtmlSkeleton'
import { connect } from '@/components/hoc'
import React, { useContext } from 'react'
import { ContainerProps } from 'types'
import { useStyles } from './styles'
import { Container, Typography } from '@material-ui/core'

/** ErrorTemplate Props */
export type ErrorTemplateProps = Omit<HtmlSkeletonProps, 'children'> & {
  main
  statusCode: string
}
/** Presenter Props */
export type PresenterProps = ErrorTemplateProps & { classes }

/** Presenter Component */
const ErrorTemplatePresenter: React.FC<PresenterProps> = ({
  statusCode,
  main,
  classes,
  ...props
}) => (
  <HtmlSkeleton>
    <Title>Error</Title>
    <Container className={classes.container}>
      <div>
        <Typography component="h1" variant="h5">
          {statusCode} エラーが発生しました。
        </Typography>
      </div>
    </Container>
  </HtmlSkeleton>
)

/** Container Component */
const ErrorTemplateContainer: React.FC<
  ContainerProps<ErrorTemplateProps, PresenterProps>
> = ({ presenter, main, ...props }) => {
  const classes = useStyles()
  return presenter({ classes, main, ...props })
}

/** ErrorTemplate */
export default connect<ErrorTemplateProps, PresenterProps>(
  'ErrorTemplate',
  ErrorTemplatePresenter,
  ErrorTemplateContainer
)
