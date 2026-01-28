import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {/* Main content with left margin to account for sidebar */}
      <div className="ml-16 sm:ml-16 md:ml-20 lg:ml-64 xl:ml-70 2xl:ml-87.5 
                      min-h-screen transition-all duration-300
                      border-l border-[#333333]">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
