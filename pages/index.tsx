import { Footer, Navbar, Web3ModalProvider } from '../components'
import { RoomProvider, AuthWrapper } from '../contexts'
import { Feed } from '../sections'

const MainPage = () => (
  <div className="min-h-screen bg-primary-white overflow-hidden relative">
    <div className="max-w-6xl mx-auto">
      <RoomProvider>
        <Navbar />
        <Feed />
      </RoomProvider>
      <Footer />
    </div>
  </div>
)

const Index = AuthWrapper(MainPage)

const Web3Index = () => (
  <Web3ModalProvider>
    <Index />
  </Web3ModalProvider>
)

export default Web3Index
