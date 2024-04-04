import { Footer, Navbar } from '../components'
import { RoomProvider } from '../clients/hooks'
import { Feed } from '../sections'

const Index = () => (
  <div className="bg-primary-white overflow-hidden relative" style={{ minHeight: '100vh' }}>
    <div className="max-w-6xl mx-auto">
      <RoomProvider>
        <Navbar />
        <Feed />
      </RoomProvider>
      <Footer />
    </div>
  </div>
)

export default Index
