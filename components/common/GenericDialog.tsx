// ** React Imports
import React, { Dispatch, SetStateAction } from 'react'

// ** MUI Imports
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { useTheme } from '@emotion/react'
import { X } from 'react-feather'
import { LoadingButton } from '@mui/lab'

interface FloGenericDialogProps {
  isOpen: boolean
  handleClose: Dispatch<SetStateAction<boolean>>
  handleJob?: () => Promise<void>
  jobButtonText?: string
  closeButtonText?: string
  content: JSX.Element
  referrer?: string
  title: string | JSX.Element
  subTitle?: string
  isLoading?: boolean
  width?: number
  primaryBtnEnabled?: boolean
  hideActionBar?: boolean
  closeButtonVariant?: 'text' | 'outlined' | 'contained'
  hideCloseIcon?: boolean
  contentCss?: any
  primaryBtnCss?: {}
  actionBtn?: JSX.Element
  footerTxt?: React.ReactNode
  jobButtonDisabled?: boolean
}

const FloGenericDialog: React.FC<FloGenericDialogProps> = ({
  isOpen,
  handleClose,
  handleJob,
  jobButtonText,
  closeButtonText,
  content,
  referrer = '',
  title,
  isLoading,
  width,
  primaryBtnEnabled = true,
  closeButtonVariant = 'text',
  hideCloseIcon = false,
  contentCss = { padding: '1rem 1rem' },
  primaryBtnCss,
  actionBtn,
  subTitle,
  footerTxt,
  jobButtonDisabled = false
}) => {
  const executeJob = () => {
    if (typeof handleJob === 'undefined') return
    handleJob()
  }
  const theme: any = useTheme()
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      PaperProps={{
        sx: {
          borderRadius: 4,
          gap: 4,
          minWidth: '440px',
          maxWidth: '600px',
          width: `${width}px`,
          border: '1px solid #E0E0E0',
          overflow: 'visible'
        }
      }}
    >
      <DialogTitle
        variant='body1'
        sx={{
          padding: '1rem 1rem 0rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          fontWeight: 600,
          fontSize: '16px',
          color: '#000'
        }}
      >
        <div className='flex flex-row items-start justify-between w-full'>
          {title}
          {!Boolean(hideCloseIcon) ? (
            <X
              style={{ color: '#6E6E6E', strokeWidth: '3px', opacity: '100%' }}
              size={20}
              className='cursor-pointer'
              onClick={() => {
                handleClose(false)
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <p className='text-xs text-[#949494] font-normal'> {subTitle}</p>
      </DialogTitle>
      <DialogContent sx={contentCss}>{content}</DialogContent>
      {primaryBtnEnabled ? (
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem !important',
            width: '100%',
            borderTop: '1px solid #F0F0F0'
          }}
        >
          <p className='text-sm text-left text-gray-dark'>{footerTxt}</p>
          <div className='absolute left-4'>{actionBtn ? actionBtn : <></>}</div>
          <div className='flex flex-row gap-2'>
            {closeButtonText ? (
              <Button
                onClick={() => handleClose(false)}
                variant={closeButtonVariant}
                size='small'
                color={'secondary'}
                sx={{ maxWidth: 100 }}
              >
                {closeButtonText}
              </Button>
            ) : (
              <></>
            )}
            {jobButtonText ? (
              <LoadingButton
                id={`${referrer}${referrer != '' ? '-' : ''}job-button`}
                onClick={executeJob}
                size='small'
                loadingPosition='end'
                loading={isLoading}
                variant='contained'
                color={'primary'}
                sx={{ fontSize: 14, width: 'fit-content', minWidth: '100px', ...primaryBtnCss }}
                disabled={jobButtonDisabled}
                className='disabled:text-gray-dark disabled:bg-coal-light disabled:border-none'
              >
                {jobButtonText}
              </LoadingButton>
            ) : (
              <></>
            )}
          </div>
        </DialogActions>
      ) : (
        <></>
      )}
    </Dialog>
  )
}

export default FloGenericDialog
