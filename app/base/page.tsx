import HomePage from '@/components/home-page/home'
import Sidebar from '@/components/sidebar'

export default function Page() {
  return (
    <div className="flex">
      <div className="flex-3">
        <Sidebar />
      </div>
      <div className="flex-1">
        <HomePage />
      </div>
    </div>
  )
}
