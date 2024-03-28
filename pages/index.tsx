import { Footer, Navbar } from '../components'
import { View } from '../sections'

const Index = () => (
  <div className="bg-primary-white overflow-hidden relative" style={{ minHeight: '100vh' }}>
    <div className={'background'} />
    <Navbar />
    <View />
    <Footer />
  </div>
)

export default Index
