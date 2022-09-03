import HtmlSkeleton, { HtmlSkeletonProps, Title } from '@/components/05_layouts/HtmlSkeleton'
import { connect } from '@/components/hoc'
import React from 'react'
import { ContainerProps } from 'types'
import * as styles from './styles'
import {Container, Typography} from "@material-ui/core";

/** ErrorTemplate Props */
export type ErrorTemplateProps = Omit<HtmlSkeletonProps, 'children'>
/** Presenter Props */
export type PresenterProps = ErrorTemplateProps & { statusCode: string }

/** Presenter Component */
const ErrorTemplatePresenter: React.FC<PresenterProps> = ({statusCode}) => (
  <HtmlSkeleton>
    <Title>Error</Title>
    <Container {...styles.container}>
      <div>
        <Typography component="h1" variant="h5">
          {statusCode} エラーが発生しました。
        </Typography>
      </div>
    </Container>
  </HtmlSkeleton>
)

/** Container Component */
const ErrorTemplateContainer: React.FC<ContainerProps<ErrorTemplateProps, PresenterProps>> = ({
  presenter,
  ...props
}) => {
  return presenter({ ...props })
}

/** ErrorTemplate */
export default connect<ErrorTemplateProps, PresenterProps>(
  'ErrorTemplate',
  ErrorTemplatePresenter,
  ErrorTemplateContainer
)