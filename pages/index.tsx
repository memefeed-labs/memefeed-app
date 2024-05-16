import { Footer, Navbar } from '../components'
import { AuthWrapper } from '../contexts'
import { Feed } from '../sections'

const MainPage = () => (
  <div className="min-h-screen bg-primary-white overflow-hidden relative">
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Feed />
      <Footer />
    </div>
  </div>
)

const AuthenticatedMainPage = AuthWrapper(MainPage)

export default AuthenticatedMainPage
