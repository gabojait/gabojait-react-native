import React from 'react'
import {CustomModalProps} from './context'

export default () => {
  const [modal, setModal] = React.useState(false)
  const [content, setContent] = React.useState<React.ReactNode>(null)
  const [title, setTitle] = React.useState<React.ReactNode>(null)
  const [modalProps, setModalProps] = React.useState<CustomModalProps>({
    animationType: undefined,
    justifying: undefined,
  })

  const show: ({
    title,
    content,
    modalProps,
  }: {
    title: React.ReactNode
    content: React.ReactNode
    modalProps: CustomModalProps
  }) => void = ({content, title, modalProps}) => {
    setModal(!modal)
    if (content) {
      setContent(content)
      setTitle(title)
      setModalProps(prevState => ({
        ...prevState,
        animationType: modalProps.animationType,
        justifying: modalProps.justifying,
      }))
    }
  }
  const hide = () => {
    setModal(modal)
    setContent(null)
  }

  return {modal, show, hide, title, content, modalProps}
}
