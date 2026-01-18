import { X, RefreshCw, CheckCircle, AlertCircle, Calendar, Clock, TrendingUp, FileText, Bell } from 'lucide-react';
import { useEffect } from 'react';

type JobStatus = 'running' | 'completed' | 'error' | 'scheduled' | 'paused' | 'early' | 'late';
type JobPriority = 'critical' | 'high' | 'medium' | 'low';

interface Job {
  id: string;
  job: string;
  bandingLine: string;
  owner: string;
  schedule: string;
  frequency: string;
  note: string;
  cutoff: string;
  estDur: string;
  estComp: string;
  lastCheckIn: string;
  priority: JobPriority;
  lastLogMessage: string;
  alerts: string;
  notes: string;
  status: JobStatus;
  progress: number;
}

interface ModernPanelProps {
  job: Job;
  onClose: () => void;
}

export function AdvancedJobTableModernPanel({ job, onClose }: ModernPanelProps) {
  // Prevent body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'running': return 'var(--color-primary)';
      case 'completed': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'scheduled': return 'var(--color-text-secondary)';
      case 'paused': return 'var(--color-warning)';
      case 'early': return 'var(--color-accent)';
      case 'late': return '#F97316';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getPriorityColor = (priority: JobPriority) => {
    switch (priority) {
      case 'critical': return 'var(--color-error)';
      case 'high': return 'var(--color-warning)';
      case 'medium': return 'var(--color-primary)';
      case 'low': return 'var(--color-text-secondary)';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-3xl z-50 overflow-hidden"
        style={{
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        <style>
          {`
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}
        </style>
        
        <div 
          className="h-full overflow-y-auto"
          style={{
            backgroundColor: 'var(--color-bg)',
            boxShadow: '-12px 0 48px rgba(0, 0, 0, 0.2)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modern Header with Gradient */}
          <div 
            className="sticky top-0 z-10 px-8 py-6 border-b"
            style={{
              background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)`,
              borderColor: 'transparent'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 style={{ 
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'var(--font-weight-bold)',
                    marginBottom: 0
                  }}>
                    {job.job}
                  </h2>
                  <span 
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {job.priority} Priority
                  </span>
                </div>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 'var(--text-body)',
                  marginBottom: '12px'
                }}>
                  {job.bandingLine} • Owner: {job.owner}
                </p>
                
                {/* Status and Progress */}
                <div className="flex items-center gap-4">
                  <span 
                    className="px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: getStatusColor(job.status),
                      textTransform: 'capitalize'
                    }}
                  >
                    {job.status === 'running' && <RefreshCw className="w-4 h-4 animate-spin" />}
                    {job.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                    {job.status === 'error' && <AlertCircle className="w-4 h-4" />}
                    {job.status}
                  </span>
                  
                  {job.progress > 0 && (
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          Progress
                        </span>
                        <span style={{ 
                          color: 'white',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}>
                          {job.progress}%
                        </span>
                      </div>
                      <div 
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${job.progress}%`,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-all ml-4"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="p-8 space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Schedule
                  </p>
                </div>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: '1.4'
                }}>
                  {job.schedule || 'Not scheduled'}
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Frequency
                  </p>
                </div>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {job.frequency}
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Est. Dur.
                  </p>
                </div>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {job.estDur || 'N/A'}
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Check In
                  </p>
                </div>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {job.lastCheckIn || 'N/A'}
                </p>
              </div>
            </div>

            {/* Messages Section */}
            {(job.lastLogMessage || job.alerts) && (
              <div className="space-y-4">
                {job.lastLogMessage && (
                  <div 
                    className="p-5 rounded-xl border-l-4"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${getStatusColor('running')}15`,
                          color: 'var(--color-primary)'
                        }}
                      >
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p style={{ 
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-semibold)',
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Last Log Message
                        </p>
                        <p style={{ 
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-body)',
                          lineHeight: '1.6'
                        }}>
                          {job.lastLogMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {job.alerts && (
                  <div 
                    className="p-5 rounded-xl border-l-4"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-warning)',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${getStatusColor('paused')}15`,
                          color: 'var(--color-warning)'
                        }}
                      >
                        <Bell className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p style={{ 
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-semibold)',
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Active Alerts
                        </p>
                        <p style={{ 
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-body)',
                          lineHeight: '1.6'
                        }}>
                          {job.alerts}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* All Details Section */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
              }}
            >
              <h3 style={{ 
                color: 'var(--color-text-primary)',
                fontSize: '1.125rem',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: '20px'
              }}>
                Complete Job Details
              </h3>
              
              <div className="space-y-4">
                {Object.entries(job).map(([key, value]) => {
                  if (key === 'id' || key === 'status' || key === 'progress' || key === 'lastLogMessage' || key === 'alerts') return null;
                  return (
                    <div 
                      key={key}
                      className="pb-4 border-b last:border-b-0"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <p style={{ 
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p style={{ 
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-body)',
                        lineHeight: '1.6',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        {value?.toString() || '-'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}