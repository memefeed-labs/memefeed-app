import { LoginModal, Web3ModalProvider } from '../components'

const Index = () => (
  <div className="min-h-screen bg-primary-white overflow-hidden relative">
    <div className="background"></div>
    <LoginModal />
  </div>
)

const Web3Index = () => (
  <Web3ModalProvider>
    <Index />
  </Web3ModalProvider>
)

export default Web3Index
