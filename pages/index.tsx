import { Footer, Navbar } from '../components'
import { RoomProvider } from '../clients/hooks'
import { Feed } from '../sections'

const Index = () => (
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

export default Index
