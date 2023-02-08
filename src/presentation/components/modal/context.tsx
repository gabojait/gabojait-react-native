import React from 'react'
import useModal from './useModal'
import CustomModal from './Modal'

type ModalContextType = {
  content: React.ReactNode
  show: ({title, content}: {title: React.ReactNode; content: React.ReactNode}) => void
  hide: () => void
  title: React.ReactNode
  modal: boolean
}

let ModalContext: React.Context<ModalContextType | undefined>
const {Provider} = (ModalContext = React.createContext<ModalContextType | undefined>({
  content: <></>,
  show: () => {},
  hide: () => {},
  title: <></>,
  modal: false,
}))

const ModalProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {modal, show, hide, title, content} = useModal()
  return (
    <Provider value={{modal, show, hide, title, content}}>
      <CustomModal />
      {children}
    </Provider>
  )
}

export {ModalContext, ModalProvider}
