import HomePage from "@/components/home-page/home";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-[300px] h-[90vh] overflow-hidden sticky top-0 mr-2" style={{ borderRight: '1px solid #d2d2d2' }}>
        <Sidebar />
      </div>
      <div className="flex-1 h-[90vh] overflow-y-auto">
        <HomePage />
      </div>
    </div>
  );
}
