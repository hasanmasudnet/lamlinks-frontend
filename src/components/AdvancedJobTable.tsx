import { useState } from 'react';
import { 
  Play, Pause, AlertCircle, CheckCircle, Clock, RefreshCw, 
  ChevronDown, ChevronRight, Settings, X, TrendingUp,
  Eye, EyeOff, Maximize2, Bell, FileText, Calendar, Search,
  ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsLeft, ChevronsRight,
  Filter
} from 'lucide-react';
import { AdvancedJobTableModernPanel } from './AdvancedJobTableModernPanel';
import { JobTableSearchBar, JobTablePagination } from './JobTableSearchAndPagination';

type JobStatus = 'running' | 'completed' | 'error' | 'scheduled' | 'paused' | 'early' | 'late';
type JobPriority = 'critical' | 'high' | 'medium' | 'low';
type Frequency = 'dynamic' | 'every 5 min' | 'every 10 min' | '24/7';

interface Job {
  id: string;
  job: string;
  bandingLine: string;
  owner: string;
  schedule: string;
  frequency: Frequency;
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

type ColumnConfig = {
  id: string;
  label: string;
  visible: boolean;
  width?: string;
  sticky?: boolean;
  category: 'core' | 'scheduling' | 'status' | 'details';
};

export function AdvancedJobTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  
  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<JobPriority | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'job', label: 'Job', visible: true, sticky: true, width: '220px', category: 'core' },
    { id: 'bandingLine', label: 'Banding Line', visible: true, width: '130px', category: 'core' },
    { id: 'owner', label: 'Owner', visible: true, width: '150px', category: 'core' },
    { id: 'schedule', label: 'Schedule', visible: true, width: '180px', category: 'scheduling' },
    { id: 'frequency', label: 'Frequency', visible: true, width: '120px', category: 'scheduling' },
    { id: 'note', label: 'Note', visible: true, width: '200px', category: 'details' },
    { id: 'cutoff', label: 'Cutoff', visible: true, width: '140px', category: 'scheduling' },
    { id: 'estDur', label: 'Est. Dur.', visible: true, width: '100px', category: 'status' },
    { id: 'estComp', label: 'Est. Comp.', visible: true, width: '120px', category: 'status' },
    { id: 'lastCheckIn', label: 'Last Check In', visible: true, width: '150px', category: 'status' },
    { id: 'priority', label: 'Priority', visible: true, width: '100px', category: 'core' },
    { id: 'lastLogMessage', label: 'Last Log Message', visible: true, width: '250px', category: 'details' },
    { id: 'alerts', label: 'Alerts', visible: true, width: '200px', category: 'status' },
    { id: 'notes', label: 'Notes', visible: false, width: '200px', category: 'details' }
  ]);

  const jobs: Job[] = [
    {
      id: '1',
      job: 'Do prep',
      bandingLine: 'Running Line',
      owner: 'David Pittz...sched 7:15 AM',
      schedule: 'Tues, Fri 1 AM - 11:25 PM',
      frequency: 'dynamic',
      note: 'something didnt get upload',
      cutoff: 'auto-assigned',
      estDur: '2 hrs',
      estComp: '10:14 AM',
      lastCheckIn: '10:14:02 AM',
      priority: 'high',
      lastLogMessage: '(AutoImmy) gridLines',
      alerts: 'Do not set max & do until David Pittz',
      notes: '',
      status: 'running',
      progress: 85
    },
    {
      id: '2',
      job: 'EDI rcv download C2',
      bandingLine: 'Srv',
      owner: 'David Pittz...sched 7:15 AM',
      schedule: 'Sun - Sched 2:45 PM',
      frequency: 'dynamic',
      note: '',
      cutoff: 'auto-assigned',
      estDur: '5 gal mins',
      estComp: '8:20 AM',
      lastCheckIn: '8:45:44 AM',
      priority: 'medium',
      lastLogMessage: '(AutoImmy) file(s) you backed up',
      alerts: '8:45 PM AM, last wed',
      notes: '',
      status: 'completed',
      progress: 100
    },
    {
      id: '3',
      job: 'Awards download C2',
      bandingLine: 'Running Line',
      owner: 'Brent T...mid sched',
      schedule: '',
      frequency: 'every 5 min',
      note: 'setting to DB',
      cutoff: 'Sched',
      estDur: '4 hrs',
      estComp: '10:55:42 AM',
      lastCheckIn: '10:55:42 AM',
      priority: 'critical',
      lastLogMessage: '(AutoImmy) gridLines',
      alerts: '10% AM, actual to chart',
      notes: '',
      status: 'error',
      progress: 45
    },
    {
      id: '4',
      job: 'EDA C2',
      bandingLine: 'Running Line',
      owner: 'David Pittz...sched 7:15 AM',
      schedule: 'Sun - 1:15 PM',
      frequency: 'dynamic',
      note: '',
      cutoff: 'auto-assigned',
      estDur: '',
      estComp: '',
      lastCheckIn: '',
      priority: 'low',
      lastLogMessage: '',
      alerts: '3:54 AM, last mon to David Pittz',
      notes: '',
      status: 'scheduled',
      progress: 0
    },
    {
      id: '5',
      job: 'ePDA',
      bandingLine: 'Finished Early',
      owner: 'Collin Vilmar...sched 7:41 AM',
      schedule: 'Yrts - 12:01 AM - 4 AM',
      frequency: 'every 15 min',
      note: 'completed',
      cutoff: 'Server2',
      estDur: '10 mins',
      estComp: '12:46:00 AM',
      lastCheckIn: '12:52:32 AM',
      priority: 'high',
      lastLogMessage: '12:52 assign ∃B:25%',
      alerts: '12:52:42 AM - email to Collin Vilmar',
      notes: '',
      status: 'early',
      progress: 100
    },
    {
      id: '6',
      job: 'Heartfirm',
      bandingLine: '',
      owner: '',
      schedule: '',
      frequency: 'every 10 min',
      note: '',
      cutoff: '',
      estDur: '',
      estComp: '',
      lastCheckIn: '',
      priority: 'low',
      lastLogMessage: '',
      alerts: '',
      notes: '',
      status: 'paused',
      progress: 0
    },
    {
      id: '7',
      job: 'SAM.GOV D/L',
      bandingLine: 'Inactive',
      owner: 'Scott Landry',
      schedule: 'Yrts, 1:20 AM - 4 AM',
      frequency: '24/7',
      note: '',
      cutoff: 'auto-assigned',
      estDur: '9 mins',
      estComp: '',
      lastCheckIn: '',
      priority: 'medium',
      lastLogMessage: '',
      alerts: '9/17/24 4:58:35 AM, 3/6 completed successfully',
      notes: '',
      status: 'late',
      progress: 92
    }
  ];

  const toggleColumn = (columnId: string) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  const toggleAllInCategory = (category: string, visible: boolean) => {
    setColumns(columns.map(col => 
      col.category === category ? { ...col, visible } : col
    ));
  };

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

  const getStatusBg = (status: JobStatus) => {
    return `${getStatusColor(status)}15`;
  };

  const getPriorityColor = (priority: JobPriority) => {
    switch (priority) {
      case 'critical': return 'var(--color-error)';
      case 'high': return 'var(--color-warning)';
      case 'medium': return 'var(--color-primary)';
      case 'low': return 'var(--color-text-secondary)';
    }
  };

  // Filter and paginate jobs
  const filteredJobs = jobs.filter(job => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      job.job.toLowerCase().includes(searchLower) ||
      job.owner.toLowerCase().includes(searchLower) ||
      job.bandingLine.toLowerCase().includes(searchLower) ||
      job.note.toLowerCase().includes(searchLower);
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    // Priority filter
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const visibleColumns = columns.filter(col => col.visible);
  const densityPadding = density === 'compact' ? 'py-2 px-3' : density === 'comfortable' ? 'py-3 px-4' : 'py-4 px-4';

  const renderCellContent = (job: Job, columnId: string) => {
    const cellStyle = {
      color: 'var(--color-text-primary)',
      fontSize: 'var(--text-body)',
      lineHeight: '1.5'
    };

    switch (columnId) {
      case 'job':
        return (
          <div className="flex items-center gap-2" style={{ minWidth: '200px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedRow(expandedRow === job.id ? null : job.id);
              }}
              className="p-1 rounded transition-colors flex-shrink-0"
              style={{ 
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {expandedRow === job.id ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p style={{ 
                ...cellStyle,
                fontWeight: 'var(--font-weight-medium)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {job.job}
              </p>
            </div>
          </div>
        );
      
      case 'priority':
        return (
          <span 
            className="px-2 py-1 rounded inline-block"
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
        );
      
      default:
        const value = job[columnId as keyof Job];
        return (
          <span style={{ 
            ...cellStyle,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {value?.toString() || '-'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
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
            Real-time job execution and scheduling overview
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowColumnConfig(!showColumnConfig)}
          className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
          style={{
            borderColor: showColumnConfig ? 'var(--color-primary)' : 'var(--color-border)',
            backgroundColor: showColumnConfig ? 'var(--color-table-header-bg)' : 'transparent',
            color: showColumnConfig ? 'var(--color-primary)' : 'var(--color-text-primary)',
            fontSize: 'var(--text-body)',
            borderRadius: 'var(--radius-md)',
            height: '40px'
          }}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Columns</span>
          <span className="px-1.5 py-0.5 rounded text-xs" 
                style={{ 
                  backgroundColor: 'var(--color-hover-bg)',
                  color: 'var(--color-text-secondary)'
                }}>
            {visibleColumns.length}/{columns.length}
          </span>
        </button>
        
        <div className="flex border rounded overflow-hidden"
             style={{ borderColor: 'var(--color-border)' }}>
          {(['compact', 'comfortable', 'spacious'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDensity(mode)}
              className="px-3 py-2 transition-colors capitalize text-sm"
              style={{
                backgroundColor: density === mode ? 'var(--color-primary)' : 'transparent',
                color: density === mode ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)',
                borderRight: mode !== 'spacious' ? `1px solid var(--color-border)` : 'none',
                fontSize: 'var(--text-caption)'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <span style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-caption)'
          }}>
            {jobs.length} jobs
          </span>
        </div>
      </div>

      {/* Column Configuration Panel */}
      {showColumnConfig && (
        <div 
          className="p-5 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-card-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: 'var(--color-text-primary)' }}>
              Configure Columns
            </h3>
            <button
              onClick={() => setShowColumnConfig(false)}
              className="p-1 rounded transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['core', 'scheduling', 'status', 'details'].map((category) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-3">
                  <h4 style={{ 
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'capitalize'
                  }}>
                    {category}
                  </h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleAllInCategory(category, true)}
                      className="p-1 rounded transition-colors"
                      style={{ color: 'var(--color-success)' }}
                      title="Show all"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleAllInCategory(category, false)}
                      className="p-1 rounded transition-colors"
                      style={{ color: 'var(--color-text-secondary)' }}
                      title="Hide all"
                    >
                      <EyeOff className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {columns
                    .filter(col => col.category === category)
                    .map((col) => (
                      <label 
                        key={col.id}
                        className="flex items-center gap-2 cursor-pointer p-1.5 rounded transition-colors"
                        style={{
                          backgroundColor: col.visible ? 'var(--color-table-header-bg)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!col.visible) {
                            e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!col.visible) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={col.visible}
                          onChange={() => toggleColumn(col.id)}
                          className="w-4 h-4"
                          style={{ accentColor: 'var(--color-primary)' }}
                        />
                        <span style={{ 
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-caption)',
                          fontWeight: col.visible ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
                        }}>
                          {col.label}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <JobTableSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Table Container with Custom Scrollbar */}
      <div 
        className="border rounded-lg overflow-hidden"
        style={{
          borderColor: 'var(--color-border)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div 
          className="overflow-x-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-border) var(--color-surface)'
          }}
        >
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                height: 8px;
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: var(--color-surface);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: var(--color-border);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: var(--color-text-secondary);
              }
            `}
          </style>
          <table className="w-full custom-scrollbar" style={{ minWidth: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ backgroundColor: 'var(--color-table-header-bg)' }}>
                {visibleColumns.map((col) => (
                  <th 
                    key={col.id}
                    className={`${densityPadding} text-left ${col.sticky ? 'sticky left-0 z-20' : ''}`}
                    style={{ 
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--font-weight-semibold)',
                      backgroundColor: 'var(--color-table-header-bg)',
                      whiteSpace: 'nowrap',
                      minWidth: col.width || 'auto',
                      width: col.width || 'auto',
                      borderBottom: `2px solid var(--color-border)`,
                      boxShadow: col.sticky ? '2px 0 4px rgba(0,0,0,0.05)' : 'none'
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((job, index) => (
                <>
                  <tr 
                    key={job.id}
                    className="border-t transition-colors"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-stripe-bg)',
                      borderColor: 'var(--color-border)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedRow(expandedRow === job.id ? null : job.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-stripe-bg)';
                    }}
                  >
                    {visibleColumns.map((col) => (
                      <td 
                        key={col.id}
                        className={`${densityPadding} ${col.sticky ? 'sticky left-0 z-10' : ''}`}
                        style={{
                          backgroundColor: col.sticky 
                            ? (index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-stripe-bg)')
                            : 'transparent',
                          minWidth: col.width || 'auto',
                          width: col.width || 'auto',
                          maxWidth: col.width || 'auto',
                          boxShadow: col.sticky ? '2px 0 4px rgba(0,0,0,0.05)' : 'none'
                        }}
                      >
                        {renderCellContent(job, col.id)}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Collapsible Detail Row */}
                  {expandedRow === job.id && (
                    <tr style={{ 
                      backgroundColor: 'var(--color-table-header-bg)',
                      borderTop: `1px solid var(--color-border)`,
                      borderBottom: `2px solid var(--color-primary)`
                    }}>
                      <td colSpan={visibleColumns.length} className="p-0">
                        <div 
                          className="p-6 border rounded-lg m-4"
                          style={{
                            borderLeft: `4px solid ${getStatusColor(job.status)}`,
                            borderColor: 'var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'var(--color-surface)'
                          }}
                        >
                          {/* Status Header */}
                          <div className="flex items-center justify-between mb-5 pb-4 border-b"
                               style={{ borderColor: 'var(--color-border)' }}>
                            <div className="flex items-center gap-3">
                              <span 
                                className="px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2"
                                style={{
                                  backgroundColor: getStatusBg(job.status),
                                  color: getStatusColor(job.status),
                                  borderRadius: '12px',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {job.status === 'running' && <RefreshCw className="w-4 h-4 animate-spin" />}
                                {job.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                                {job.status === 'error' && <AlertCircle className="w-4 h-4" />}
                                {job.status}
                              </span>
                              {job.progress > 0 && (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="h-2 rounded-full overflow-hidden"
                                    style={{ 
                                      backgroundColor: 'var(--color-hover-bg)',
                                      width: '120px'
                                    }}
                                  >
                                    <div 
                                      className="h-full rounded-full transition-all"
                                      style={{ 
                                        width: `${job.progress}%`,
                                        backgroundColor: getStatusColor(job.status)
                                      }}
                                    />
                                  </div>
                                  <span style={{ 
                                    color: 'var(--color-text-primary)',
                                    fontSize: 'var(--text-caption)',
                                    fontWeight: 'var(--font-weight-semibold)'
                                  }}>
                                    {job.progress}%
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedJob(job);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
                                style={{
                                  borderColor: 'var(--color-primary)',
                                  backgroundColor: 'transparent',
                                  color: 'var(--color-primary)',
                                  fontSize: 'var(--text-body)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  borderRadius: 'var(--radius-md)'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                  e.currentTarget.style.color = 'var(--color-text-on-primary)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = 'var(--color-primary)';
                                }}
                              >
                                <Maximize2 className="w-4 h-4" />
                                View Full Details
                              </button>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                                <p style={{ 
                                  color: 'var(--color-text-secondary)',
                                  fontSize: 'var(--text-caption)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  Schedule
                                </p>
                              </div>
                              <p style={{ 
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--text-body)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}>
                                {job.schedule || 'Not scheduled'}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                                <p style={{ 
                                  color: 'var(--color-text-secondary)',
                                  fontSize: 'var(--text-caption)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  Frequency
                                </p>
                              </div>
                              <p style={{ 
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--text-body)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}>
                                {job.frequency}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                                <p style={{ 
                                  color: 'var(--color-text-secondary)',
                                  fontSize: 'var(--text-caption)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  Est. Duration
                                </p>
                              </div>
                              <p style={{ 
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--text-body)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}>
                                {job.estDur || 'N/A'}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                                <p style={{ 
                                  color: 'var(--color-text-secondary)',
                                  fontSize: 'var(--text-caption)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  Last Check In
                                </p>
                              </div>
                              <p style={{ 
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--text-body)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}>
                                {job.lastCheckIn || 'N/A'}
                              </p>
                            </div>
                          </div>

                          {/* Messages Section */}
                          {(job.lastLogMessage || job.alerts) && (
                            <div className="mt-5 pt-5 border-t space-y-3"
                                 style={{ borderColor: 'var(--color-border)' }}>
                              {job.lastLogMessage && (
                                <div 
                                  className="p-3 rounded-lg border-l-4"
                                  style={{
                                    backgroundColor: 'var(--color-surface)',
                                    borderColor: 'var(--color-primary)',
                                    borderRadius: 'var(--radius-md)'
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <FileText className="w-4 h-4 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                                    <div className="flex-1">
                                      <p style={{ 
                                        color: 'var(--color-text-secondary)',
                                        fontSize: 'var(--text-caption)',
                                        marginBottom: '4px'
                                      }}>
                                        Last Log Message
                                      </p>
                                      <p style={{ 
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--text-body)'
                                      }}>
                                        {job.lastLogMessage}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {job.alerts && (
                                <div 
                                  className="p-3 rounded-lg border-l-4"
                                  style={{
                                    backgroundColor: job.status === 'error' ? '#DC262610' : 'var(--color-surface)',
                                    borderColor: job.status === 'error' ? 'var(--color-error)' : 'var(--color-warning)',
                                    borderRadius: 'var(--radius-md)'
                                  }}
                                >
                                  <div className="flex items-start gap-2">
                                    <Bell className="w-4 h-4 mt-0.5" 
                                          style={{ color: job.status === 'error' ? 'var(--color-error)' : 'var(--color-warning)' }} />
                                    <div className="flex-1">
                                      <p style={{ 
                                        color: 'var(--color-text-secondary)',
                                        fontSize: 'var(--text-caption)',
                                        marginBottom: '4px'
                                      }}>
                                        Alert
                                      </p>
                                      <p style={{ 
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--text-body)'
                                      }}>
                                        {job.alerts}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <JobTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredJobs.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>

      {/* Detail Side Panel */}
      {selectedJob && (
        <AdvancedJobTableModernPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}