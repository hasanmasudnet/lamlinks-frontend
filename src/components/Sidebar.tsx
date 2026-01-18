import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Link2, 
  Bell, 
  Monitor, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  BookOpen,
  FileText,
  Activity,
  PlayCircle,
  Square,
  History,
  FileWarning,
  TrendingUp,
  Shield,
  Sliders
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface MenuItem {
  icon: any;
  label: string;
  active?: boolean;
  children?: MenuItem[];
}

export function Sidebar({ isOpen, onCollapsedChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['dashboard']));

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const toggleSection = (sectionLabel: string) => {
    if (isCollapsed) return;
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionLabel)) {
        newSet.delete(sectionLabel);
      } else {
        newSet.add(sectionLabel);
      }
      return newSet;
    });
  };

  const menuItems: MenuItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      active: true,
      children: [
        { icon: Activity, label: 'Job Oversight' },
        { icon: Monitor, label: 'System Health' },
        { icon: Bell, label: 'Alerts & Notifications' },
      ]
    },
    {
      icon: Briefcase,
      label: 'Jobs',
      children: [
        { icon: FileText, label: 'All Jobs' },
        { icon: CheckCircle, label: 'Active Jobs' },
        { icon: Clock, label: 'Inactive Jobs' },
        { icon: FileWarning, label: 'Obsolete Jobs' },
        { icon: Settings, label: 'Job Setup' },
        { icon: Sliders, label: 'Job Parameters' },
        { icon: AlertCircle, label: 'Job Alerting' },
        { icon: Users, label: 'Associated Accounts' },
      ]
    },
    {
      icon: Calendar,
      label: 'Schedules',
      children: [
        { icon: FileText, label: 'Schedule Library' },
        { icon: CheckCircle, label: 'Active Schedules' },
        { icon: Clock, label: 'Inactive Schedules' },
        { icon: PlayCircle, label: 'Create Schedule' },
        { icon: Activity, label: 'Run As Often As Possible (AOAP)' },
        { icon: Users, label: 'Manual Schedule' },
        { icon: Calendar, label: 'Day / Date Schedules' },
        { icon: Settings, label: 'Schedule Options' },
        { icon: Clock, label: 'Cycle Options' },
        { icon: Clock, label: 'Repeat Options' },
        { icon: Square, label: 'Days Off' },
        { icon: BarChart3, label: 'Max Runs' },
        { icon: AlertCircle, label: 'Failure Rules' },
      ]
    },
    {
      icon: Link2,
      label: 'Job ↔ Schedule Linking',
      children: [
        { icon: Link2, label: 'Link Job to Schedule' },
        { icon: Briefcase, label: 'Linked Jobs View' },
        { icon: Calendar, label: 'Linked Schedules View' },
        { icon: FileWarning, label: 'Orphaned Jobs' },
        { icon: AlertCircle, label: 'Overwrite / Purge Warnings' },
      ]
    },
    {
      icon: Bell,
      label: 'Alerts',
      children: [
        { icon: LayoutDashboard, label: 'Alert Dashboard' },
        { icon: History, label: 'Alert History' },
        { icon: CheckCircle, label: 'Alert Acknowledgements' },
        { icon: Square, label: 'Pause / Resume Alerts' },
      ]
    },
    {
      icon: Monitor,
      label: 'Monitoring & Logs',
      children: [
        { icon: Activity, label: 'Live Job Status' },
        { icon: History, label: 'Execution History' },
        { icon: FileWarning, label: 'Error Logs' },
        { icon: FileText, label: 'System Logs' },
        { icon: PlayCircle, label: 'Restart / Stop Job' },
      ]
    },
    {
      icon: BarChart3,
      label: 'Reports',
      children: [
        { icon: TrendingUp, label: 'Job Performance' },
        { icon: Calendar, label: 'Schedule Performance' },
        { icon: Bell, label: 'Alert Reports' },
        { icon: BarChart3, label: 'SLA / Threshold Reports' },
      ]
    },
    {
      icon: Settings,
      label: 'Administration',
      children: [
        { icon: Users, label: 'Users & Accounts' },
        { icon: Shield, label: 'Roles' },
        { icon: Bell, label: 'Notification Preferences' },
        { icon: BookOpen, label: 'Dictionaries & Rules' },
        { icon: Sliders, label: 'Job Priority & Health Dictionary' },
        { icon: Settings, label: 'Status Color Rules' },
        { icon: Settings, label: 'System Settings' },
        { icon: Sliders, label: 'Defaults' },
        { icon: Shield, label: 'Global Rules' },
      ]
    },
  ];

  const sidebarWidth = isCollapsed ? '80px' : '256px';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          style={{ top: 'var(--header-height)' }}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 z-40 transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          top: 'var(--header-height)',
          width: sidebarWidth,
          height: 'calc(100vh - var(--header-height))',
          backgroundColor: 'var(--sidebar-bg)',
          borderRight: `1px solid var(--sidebar-border)`,
          overflow: 'visible'
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-6 z-50 items-center justify-center w-6 h-6 rounded-full border transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-primary)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-text-on-primary)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              e.currentTarget.style.color = 'var(--color-primary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>
              {`
                nav::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isExpanded = expandedSections.has(item.label.toLowerCase());
              const hasChildren = item.children && item.children.length > 0;
              
              return (
                <div key={index} className="space-y-1">
                  {/* Main Menu Item */}
                  <div
                    className="flex items-center group relative"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (hasChildren && !isCollapsed) {
                          toggleSection(item.label.toLowerCase());
                        }
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 w-full relative"
                      style={{
                        backgroundColor: item.active ? 'var(--color-table-header-bg)' : 'transparent',
                        color: item.active ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        borderRadius: 'var(--radius-md)',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!item.active) {
                          e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!item.active) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <Icon 
                        className="w-5 h-5 flex-shrink-0 transition-all duration-300" 
                        style={{
                          color: item.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'
                        }}
                      />
                      <span 
                        className="transition-all duration-300 whitespace-nowrap flex-1"
                        style={{
                          opacity: isCollapsed ? 0 : 1,
                          width: isCollapsed ? 0 : 'auto',
                          overflow: 'hidden',
                          fontWeight: item.active ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                          fontSize: 'var(--text-body)'
                        }}
                      >
                        {item.label}
                      </span>

                      {/* Chevron for expandable items */}
                      {hasChildren && !isCollapsed && (
                        <ChevronDown
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                          style={{
                            color: 'var(--color-text-secondary)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        />
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div 
                          className="absolute left-full ml-2 px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap"
                          style={{
                            backgroundColor: 'var(--color-text-primary)',
                            color: 'var(--color-surface)',
                            fontSize: 'var(--text-caption)',
                            fontWeight: 'var(--font-weight-medium)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transform: 'translateX(-8px)',
                            borderRadius: 'var(--radius-md)',
                            zIndex: 9999
                          }}
                        >
                          {item.label}
                          <div 
                            className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
                            style={{
                              borderTop: '4px solid transparent',
                              borderBottom: '4px solid transparent',
                              borderRight: '4px solid var(--color-text-primary)'
                            }}
                          />
                        </div>
                      )}

                      {/* Active indicator */}
                      {item.active && (
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r transition-all duration-300"
                          style={{
                            height: isCollapsed ? '70%' : '50%',
                            backgroundColor: 'var(--color-primary)'
                          }}
                        />
                      )}
                    </a>
                  </div>

                  {/* Sub-items */}
                  {hasChildren && !isCollapsed && isExpanded && (
                    <div className="ml-6 space-y-1 border-l" style={{ borderColor: 'var(--color-border)', paddingLeft: '12px' }}>
                      {item.children?.map((child, childIndex) => {
                        const ChildIcon = child.icon;
                        return (
                          <a
                            key={childIndex}
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 group relative"
                            style={{
                              color: 'var(--color-text-secondary)',
                              fontSize: 'var(--text-caption)',
                              borderRadius: 'var(--radius-sm)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                              e.currentTarget.style.color = 'var(--color-text-primary)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'var(--color-text-secondary)';
                            }}
                          >
                            <ChildIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="whitespace-nowrap">{child.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
      
      {/* Spacer for desktop to push content */}
      <div 
        className="hidden lg:block transition-all duration-300"
        style={{ width: sidebarWidth }}
      />
    </>
  );
}