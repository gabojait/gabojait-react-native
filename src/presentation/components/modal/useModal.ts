import React from 'react'

export default () => {
  const [modal, setModal] = React.useState(false)
  const [content, setContent] = React.useState<React.ReactNode>(null)
  const [title, setTitle] = React.useState<React.ReactNode>(null)


  const show: (content: React.ReactNode, title: React.ReactNode) => void = (content, title) => {
    setModal(!modal)
    if (content) {
      setContent(content)
      setTitle(title)
    }
  }
  const hide = () => {
    setModal(modal)
    setContent(null)
  }

  return {modal, show, hide, title, content}
}
