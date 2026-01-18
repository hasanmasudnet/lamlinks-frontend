import { useState } from 'react';
import { Play, Pause, AlertCircle, CheckCircle, Clock, Filter, Download, Search, RefreshCw, Calendar, TrendingUp } from 'lucide-react';

type JobStatus = 'running' | 'completed' | 'error' | 'scheduled' | 'paused' | 'early' | 'late';
type JobPriority = 'critical' | 'high' | 'medium' | 'low';

interface Job {
  id: string;
  name: string;
  bandingLine: string;
  status: JobStatus;
  priority: JobPriority;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart: string | null;
  actualEnd: string | null;
  duration: string;
  estimatedDuration: string;
  progress: number;
  cutoffTime: string;
  linkedJobs: string[];
  lastRun: string;
  runCount: number;
  errorMessage?: string;
}

export function JobMonitoringDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const jobs: Job[] = [
    {
      id: 'JOB-2030-001',
      name: 'SAM.GOV Data Sync',
      bandingLine: 'Banding Line A',
      status: 'running',
      priority: 'critical',
      scheduledStart: '06:00:00 AM',
      scheduledEnd: '11:30:00 PM',
      actualStart: '06:00:15 AM',
      actualEnd: null,
      duration: '2h 15m',
      estimatedDuration: '3h 30m',
      progress: 65,
      cutoffTime: '11:30:00 PM',
      linkedJobs: ['Award Prep', 'Contract Processing'],
      lastRun: 'Jan 17, 2026',
      runCount: 1247
    },
    {
      id: 'JOB-2030-002',
      name: 'Federal Contract Extraction',
      bandingLine: 'Banding Line A',
      status: 'completed',
      priority: 'high',
      scheduledStart: '12:00:00 AM',
      scheduledEnd: '05:00:00 AM',
      actualStart: '12:00:03 AM',
      actualEnd: '04:45:22 AM',
      duration: '4h 45m',
      estimatedDuration: '5h 00m',
      progress: 100,
      cutoffTime: '05:00:00 AM',
      linkedJobs: ['Data Warehouse Load'],
      lastRun: 'Jan 18, 2026',
      runCount: 892
    },
    {
      id: 'JOB-2030-003',
      name: 'BMS Preparation & Validation',
      bandingLine: 'Banding Line B',
      status: 'error',
      priority: 'critical',
      scheduledStart: '08:00:00 PM',
      scheduledEnd: '02:00:00 AM',
      actualStart: '08:00:01 PM',
      actualEnd: '08:45:33 PM',
      duration: '45m',
      estimatedDuration: '6h 00m',
      progress: 12,
      cutoffTime: '02:00:00 AM',
      linkedJobs: ['ePDA Processing', 'Reconciliation'],
      lastRun: 'Jan 18, 2026',
      runCount: 456,
      errorMessage: 'Database connection timeout - retry scheduled'
    },
    {
      id: 'JOB-2030-004',
      name: 'WAWF Invoice Processing',
      bandingLine: 'Banding Line C',
      status: 'scheduled',
      priority: 'high',
      scheduledStart: '03:00:00 PM',
      scheduledEnd: '06:30:00 PM',
      actualStart: null,
      actualEnd: null,
      duration: '-',
      estimatedDuration: '3h 30m',
      progress: 0,
      cutoffTime: '06:30:00 PM',
      linkedJobs: ['Payment Gateway', 'Audit Trail'],
      lastRun: 'Jan 17, 2026',
      runCount: 678
    },
    {
      id: 'JOB-2030-005',
      name: 'Contract Award Notification',
      bandingLine: 'Banding Line A',
      status: 'early',
      priority: 'medium',
      scheduledStart: '09:00:00 AM',
      scheduledEnd: '12:00:00 PM',
      actualStart: '08:45:12 AM',
      actualEnd: '11:23:45 AM',
      duration: '2h 38m',
      estimatedDuration: '3h 00m',
      progress: 100,
      cutoffTime: '12:00:00 PM',
      linkedJobs: ['Email Service', 'Archive'],
      lastRun: 'Jan 18, 2026',
      runCount: 1534
    },
    {
      id: 'JOB-2030-006',
      name: 'NSN Catalog Update',
      bandingLine: 'Banding Line B',
      status: 'late',
      priority: 'high',
      scheduledStart: '01:00:00 AM',
      scheduledEnd: '04:00:00 AM',
      actualStart: '01:15:45 AM',
      actualEnd: null,
      duration: '4h 22m',
      estimatedDuration: '3h 00m',
      progress: 87,
      cutoffTime: '04:00:00 AM',
      linkedJobs: ['Inventory Sync'],
      lastRun: 'Jan 18, 2026',
      runCount: 329
    },
    {
      id: 'JOB-2030-007',
      name: 'Bid Matching Algorithm',
      bandingLine: 'Banding Line C',
      status: 'paused',
      priority: 'medium',
      scheduledStart: '10:00:00 AM',
      scheduledEnd: '02:00:00 PM',
      actualStart: '10:00:08 AM',
      actualEnd: null,
      duration: '1h 15m',
      estimatedDuration: '4h 00m',
      progress: 31,
      cutoffTime: '02:00:00 PM',
      linkedJobs: ['Opportunity Analysis'],
      lastRun: 'Jan 18, 2026',
      runCount: 892
    },
    {
      id: 'JOB-2030-008',
      name: 'Compliance Report Generation',
      bandingLine: 'Banding Line A',
      status: 'running',
      priority: 'low',
      scheduledStart: '07:00:00 AM',
      scheduledEnd: '09:00:00 AM',
      actualStart: '07:00:02 AM',
      actualEnd: null,
      duration: '1h 05m',
      estimatedDuration: '2h 00m',
      progress: 53,
      cutoffTime: '09:00:00 AM',
      linkedJobs: [],
      lastRun: 'Jan 18, 2026',
      runCount: 234
    }
  ];

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'running':
        return 'var(--color-primary)';
      case 'completed':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-error)';
      case 'scheduled':
        return 'var(--color-text-secondary)';
      case 'paused':
        return 'var(--color-warning)';
      case 'early':
        return 'var(--color-accent)';
      case 'late':
        return '#F97316';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusBg = (status: JobStatus) => {
    switch (status) {
      case 'running':
        return '#00336615';
      case 'completed':
        return '#16A34A15';
      case 'error':
        return '#DC262615';
      case 'scheduled':
        return '#4B556315';
      case 'paused':
        return '#F59E0B15';
      case 'early':
        return '#00A86B15';
      case 'late':
        return '#F9731615';
      default:
        return '#4B556315';
    }
  };

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'early':
        return <TrendingUp className="w-4 h-4" />;
      case 'late':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: JobPriority) => {
    switch (priority) {
      case 'critical':
        return 'var(--color-error)';
      case 'high':
        return 'var(--color-warning)';
      case 'medium':
        return 'var(--color-primary)';
      case 'low':
        return 'var(--color-text-secondary)';
    }
  };

  const stats = [
    {
      label: 'Running',
      value: jobs.filter(j => j.status === 'running').length,
      icon: Play,
      color: 'var(--color-primary)',
      trend: '+2 from yesterday'
    },
    {
      label: 'Completed Today',
      value: jobs.filter(j => j.status === 'completed').length,
      icon: CheckCircle,
      color: 'var(--color-success)',
      trend: '94% success rate'
    },
    {
      label: 'Scheduled',
      value: jobs.filter(j => j.status === 'scheduled').length,
      icon: Calendar,
      color: 'var(--color-text-secondary)',
      trend: 'Next in 45 min'
    },
    {
      label: 'Errors',
      value: jobs.filter(j => j.status === 'error').length,
      icon: AlertCircle,
      color: 'var(--color-error)',
      trend: '1 needs attention'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 style={{ color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Job Monitoring
          </h1>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-body)'
          }}>
            Real-time monitoring and control of automated jobs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
            style={{
              borderColor: alertsEnabled ? 'var(--color-success)' : 'var(--color-border)',
              backgroundColor: alertsEnabled ? '#16A34A15' : 'transparent',
              color: alertsEnabled ? 'var(--color-success)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-body)',
              borderRadius: 'var(--radius-md)',
              height: '40px'
            }}
          >
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">
              Alerts {alertsEnabled ? 'On' : 'Off'}
            </span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded transition-all"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-on-primary)',
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--font-weight-semibold)',
              borderRadius: 'var(--radius-md)',
              height: '40px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            <Play className="w-4 h-4" />
            Start Ad Hoc Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-5 rounded-lg border transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-card-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="p-2.5 rounded-lg"
                  style={{ 
                    backgroundColor: `${stat.color}15`,
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span 
                  style={{
                    fontSize: '28px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <p style={{ 
                color: 'var(--color-text-primary)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: '4px'
              }}>
                {stat.label}
              </p>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-caption)'
              }}>
                {stat.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
            style={{ color: 'var(--color-text-secondary)' }}
          />
          <input
            type="text"
            placeholder="Search jobs by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded focus:outline-none"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-body)',
              borderRadius: 'var(--radius-md)',
              height: '40px'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          />
        </div>
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border rounded"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-body)',
              borderRadius: 'var(--radius-md)',
              height: '40px'
            }}
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="error">Error</option>
            <option value="scheduled">Scheduled</option>
            <option value="paused">Paused</option>
          </select>
          <button
            className="px-4 py-2 border rounded transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-md)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            }}
          >
            <Download className="w-4 h-4" />
          </button>
          <div className="flex border rounded overflow-hidden"
               style={{ borderColor: 'var(--color-border)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className="px-3 py-2 transition-colors"
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === 'grid' ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'
              }}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="px-3 py-2 transition-colors border-l"
              style={{
                backgroundColor: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === 'table' ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)',
                borderColor: 'var(--color-border)'
              }}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-lg border transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-card-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                borderLeftWidth: '4px',
                borderLeftColor: getStatusColor(job.status)
              }}
            >
              {/* Job Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ color: 'var(--color-text-primary)' }}>
                      {job.name}
                    </h3>
                    <span 
                      className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                      style={{
                        backgroundColor: getStatusBg(job.status),
                        color: getStatusColor(job.status),
                        fontSize: 'var(--text-caption)',
                        borderRadius: '12px',
                        textTransform: 'capitalize'
                      }}
                    >
                      {getStatusIcon(job.status)}
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ 
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-caption)'
                    }}>
                      {job.id}
                    </span>
                    <span style={{ 
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-caption)'
                    }}>
                      •
                    </span>
                    <span 
                      className="px-2 py-0.5 rounded"
                      style={{ 
                        color: getPriorityColor(job.priority),
                        fontSize: 'var(--text-caption)',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: `${getPriorityColor(job.priority)}15`,
                        borderRadius: 'var(--radius-sm)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {job.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar (for running/paused jobs) */}
              {(job.status === 'running' || job.status === 'paused' || job.status === 'late') && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ 
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-caption)'
                    }}>
                      Progress
                    </span>
                    <span style={{ 
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      {job.progress}%
                    </span>
                  </div>
                  <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-hover-bg)' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${job.progress}%`,
                        backgroundColor: getStatusColor(job.status)
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {job.errorMessage && (
                <div 
                  className="mb-4 p-3 rounded border-l-4"
                  style={{
                    backgroundColor: '#DC262610',
                    borderColor: 'var(--color-error)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <p style={{ 
                    color: 'var(--color-error)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.errorMessage}
                  </p>
                </div>
              )}

              {/* Job Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b"
                   style={{ borderColor: 'var(--color-border)' }}>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Banding Line
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.bandingLine}
                  </p>
                </div>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Run Count
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.runCount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Scheduled Time
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.scheduledStart} - {job.scheduledEnd}
                  </p>
                </div>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Duration
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.duration} / {job.estimatedDuration}
                  </p>
                </div>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Cutoff Time
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.cutoffTime}
                  </p>
                </div>
                <div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '4px'
                  }}>
                    Last Run
                  </p>
                  <p style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {job.lastRun}
                  </p>
                </div>
              </div>

              {/* Linked Jobs */}
              {job.linkedJobs.length > 0 && (
                <div className="mb-4">
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    marginBottom: '8px'
                  }}>
                    Linked Jobs ({job.linkedJobs.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.linkedJobs.map((linkedJob, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 rounded border"
                        style={{
                          backgroundColor: 'var(--color-table-header-bg)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-primary)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        {linkedJob}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {job.status === 'running' && (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors"
                    style={{
                      borderColor: 'var(--color-warning)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-warning)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--font-weight-medium)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F59E0B15';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                )}
                {job.status === 'paused' && (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors"
                    style={{
                      borderColor: 'var(--color-success)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-success)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--font-weight-medium)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#16A34A15';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </button>
                )}
                {job.status === 'error' && (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded transition-colors"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-text-on-primary)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      borderRadius: 'var(--radius-md)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Now
                  </button>
                )}
                <button
                  className="px-4 py-2 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-body)',
                    borderRadius: 'var(--radius-md)'
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
                  View Logs
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="overflow-x-auto">
          <div 
            className="border rounded-lg"
            style={{
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-table-header-bg)' }}>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Job Name
                  </th>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Status
                  </th>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Scheduled
                  </th>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Progress
                  </th>
                  <th className="px-4 py-3 text-center" style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, index) => (
                  <tr 
                    key={job.id}
                    className="border-t transition-colors"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-stripe-bg)',
                      borderColor: 'var(--color-border)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-stripe-bg)';
                    }}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p style={{ 
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-body)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: '2px'
                        }}>
                          {job.name}
                        </p>
                        <p style={{ 
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-caption)'
                        }}>
                          {job.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                        style={{
                          backgroundColor: getStatusBg(job.status),
                          color: getStatusColor(job.status),
                          fontSize: 'var(--text-caption)',
                          borderRadius: '12px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {getStatusIcon(job.status)}
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-2 py-1 rounded"
                        style={{ 
                          color: getPriorityColor(job.priority),
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-semibold)',
                          backgroundColor: `${getPriorityColor(job.priority)}15`,
                          borderRadius: 'var(--radius-sm)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {job.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p style={{ 
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-body)'
                      }}>
                        {job.scheduledStart}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p style={{ 
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-body)'
                      }}>
                        {job.duration}
                      </p>
                      <p style={{ 
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-caption)'
                      }}>
                        Est: {job.estimatedDuration}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex-1 h-2 rounded-full overflow-hidden"
                          style={{ 
                            backgroundColor: 'var(--color-hover-bg)',
                            minWidth: '60px'
                          }}
                        >
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${job.progress}%`,
                              backgroundColor: getStatusColor(job.status)
                            }}
                          />
                        </div>
                        <span style={{ 
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 'var(--font-weight-medium)',
                          minWidth: '35px'
                        }}>
                          {job.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1.5 rounded transition-colors"
                          style={{
                            color: 'var(--color-text-secondary)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-table-header-bg)';
                            e.currentTarget.style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                          }}
                        >
                          {job.status === 'running' ? (
                            <Pause className="w-4 h-4" />
                          ) : job.status === 'paused' ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div 
          className="py-16 text-center rounded-lg border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-card-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <AlertCircle 
            className="w-12 h-12 mx-auto mb-4" 
            style={{ color: 'var(--color-text-secondary)' }}
          />
          <h3 style={{ 
            color: 'var(--color-text-primary)',
            marginBottom: '8px'
          }}>
            No jobs found
          </h3>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-body)'
          }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
