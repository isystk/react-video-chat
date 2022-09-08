import React, { FC } from 'react'
import { ContainerProps, WithChildren } from 'types'
import { Box, Breadcrumbs, Grid, Typography } from '@material-ui/core'
import { connect } from '@/components/hoc'
import { useStyles } from './styles'
import Link from 'next/link'
import { Url } from '@/constants/url'
import Container from '@/components/05_layouts/HtmlSkeleton/Title'

/** FormBoxProps Props */
export type FormBoxProps = WithChildren & { title }
/** Presenter Props */
export type PresenterProps = FormBoxProps & { classes }

/** Presenter Component */
const FormBoxPresenter: FC<PresenterProps> = ({
  children,
  title,
  classes,
  ...props
}) => (
  <>
    <Box component="div" className={classes.box}>
      <Typography component="div" className={classes.title}>
        {title}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href={Url.TOP}>
          TOP
        </Link>
        <Typography component="span" color="primary">
          {title}
        </Typography>
      </Breadcrumbs>
      <form className={classes.form} noValidate>
        {children}
      </form>
    </Box>
  </>
)

/** Container Component */
const FormBoxContainer: React.FC<
  ContainerProps<FormBoxProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  return presenter({
    children,
    classes,
    ...props,
  })
}

export default connect<FormBoxProps, PresenterProps>(
  'FormBox',
  FormBoxPresenter,
  FormBoxContainer
)
