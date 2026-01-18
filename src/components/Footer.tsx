import { useContext } from 'react';
import { SidebarContext } from '../App';

export function Footer() {
  const { isCollapsed } = useContext(SidebarContext);
  const sidebarWidth = isCollapsed ? '80px' : '256px';

  return (
    <footer 
      className="fixed bottom-0 right-0 border-t px-6 flex items-center justify-between z-20 transition-all duration-300"
      style={{
        height: 'var(--footer-height)',
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)',
        left: '0',
        paddingLeft: `calc(${sidebarWidth} + 24px)`,
      }}
    >
      <div className="flex items-center gap-6">
        <p className="text-xs sm:text-sm">
          © 2026 Lamlinks. All rights reserved.
        </p>
        <div className="hidden sm:flex items-center gap-4">
          <a 
            href="#" 
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-primary-hover)' }}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-primary-hover)' }}
          >
            Terms of Service
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-xs hidden sm:inline">Version 2.1.0</span>
        <div className="flex items-center gap-1">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: 'var(--color-success)' }}
          ></div>
          <span className="text-xs">All Systems Operational</span>
        </div>
      </div>

      {/* Vertical border that aligns with sidebar */}
      <div 
        className="hidden lg:block fixed bottom-0 top-0 w-px transition-all duration-300"
        style={{
          left: sidebarWidth,
          backgroundColor: 'var(--color-border)',
          height: 'var(--footer-height)',
          top: 'auto'
        }}
      />
    </footer>
  );
}
