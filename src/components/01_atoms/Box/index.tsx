import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'
import Link from 'next/link'
import { Url } from '@/constants/url'

/** BoxProps Props */
export type BoxProps = WithChildren & { title }
/** Presenter Props */
export type PresenterProps = BoxProps & { classes }

/** Presenter Component */
const BoxPresenter: FC<PresenterProps> = ({
  children,
  title,
  classes,
  ...props
}) => (
  <>
    <Breadcrumbs aria-label="breadcrumb" {...classes.breadcrumbs}>
      <Link color="inherit" href={Url.TOP}>
        TOP
      </Link>
      <Typography component="span">{title}</Typography>
    </Breadcrumbs>
    <Box component="div" {...classes.box}>
      <Typography component="div" color="primary" {...classes.title}>
        {title}
      </Typography>
      {children}
    </Box>
  </>
)

/** Container Component */
const BoxContainer: React.FC<ContainerProps<BoxProps, PresenterProps>> = ({
  presenter,
  children,
  ...props
}) => {
  const classes = useStyles()
  return presenter({
    children,
    classes,
    ...props,
  })
}

export default connect<BoxProps, PresenterProps>(
  'Box',
  BoxPresenter,
  BoxContainer
)
