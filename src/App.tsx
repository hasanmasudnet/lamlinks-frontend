import { useState, createContext, useContext } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AdvancedJobTable } from './components/AdvancedJobTable';

// Create context for sidebar state
export const SidebarContext = createContext<{ isCollapsed: boolean }>({ isCollapsed: false });

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed: sidebarCollapsed }}>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Main Layout with Sidebar */}
        <div className="flex" style={{ marginTop: 'var(--header-height)', minHeight: 'calc(100vh - var(--header-height))' }}>
          {/* Sidebar - includes spacer */}
          <Sidebar isOpen={sidebarOpen} onCollapsedChange={setSidebarCollapsed} />
          
          {/* Main Content */}
          <main 
            className="flex-1 w-full"
            style={{
              paddingBottom: 'calc(var(--footer-height) + 20px)',
              minWidth: 0
            }}
          >
            <div className="max-w-[1440px] mx-auto px-6 py-8">
              <AdvancedJobTable />
            </div>
          </main>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </SidebarContext.Provider>
  );
}
