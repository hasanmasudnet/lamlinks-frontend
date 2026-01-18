import { useState } from 'react';
import { Plus, Clock, Calendar, Play, Pause, Edit2, Trash2, Link2, AlertCircle, Check } from 'lucide-react';

export function SchedulingInterface() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  const schedules = [
    {
      id: 1,
      name: '24/7 Continuous',
      description: 'Runs continuously without interruption',
      status: 'active',
      interCyclePause: 'None',
      maxRuns: 'Unlimited',
      jobFailureRule: 'Continue',
      linkedJobs: ['SAM.GOV D/L'],
      nextRun: 'Running now',
      lastRun: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Monday Morning Batch',
      description: 'Weekly processing every Monday',
      status: 'scheduled',
      interCyclePause: 'None',
      maxRuns: 'Unlimited',
      jobFailureRule: 'Continue',
      linkedJobs: ['Award prep'],
      nextRun: 'Mon 6:00 AM',
      lastRun: '6 days ago'
    },
    {
      id: 3,
      name: 'Mid-Month Processing',
      description: '17th-18th monthly batch job',
      status: 'paused',
      interCyclePause: '45 min',
      maxRuns: 'Unlimited',
      jobFailureRule: 'Continue',
      linkedJobs: ['BMS prep', 'ePDA'],
      nextRun: 'Paused',
      lastRun: '3 days ago'
    },
    {
      id: 4,
      name: 'End-of-Month Reconciliation',
      description: '21st-23rd monthly processing',
      status: 'scheduled',
      interCyclePause: '45 min',
      maxRuns: 'Unlimited',
      jobFailureRule: 'Continue',
      linkedJobs: ['BMS prep', 'ePDA'],
      nextRun: 'Jan 21 8:00 PM',
      lastRun: '15 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--color-success)';
      case 'paused':
        return 'var(--color-warning)';
      case 'scheduled':
        return 'var(--color-primary)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return '#16A34A15';
      case 'paused':
        return '#F59E0B15';
      case 'scheduled':
        return '#00336615';
      default:
        return '#4B556315';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 style={{ color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Job Schedules
          </h1>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-body)'
          }}>
            Manage and monitor your automated job schedules
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded transition-all shadow-sm"
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
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
          }}
        >
          <Plus className="w-4 h-4" />
          Create Schedule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Schedules', value: '1', icon: Play, color: 'var(--color-success)' },
          { label: 'Scheduled', value: '2', icon: Clock, color: 'var(--color-primary)' },
          { label: 'Paused', value: '1', icon: Pause, color: 'var(--color-warning)' },
          { label: 'Total Jobs', value: '4', icon: Calendar, color: 'var(--color-accent)' }
        ].map((stat, index) => {
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
                    fontSize: '24px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <p style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-caption)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="p-6 rounded-lg border transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: selectedSchedule === schedule.id ? 'var(--color-primary)' : 'var(--color-card-border)',
              borderWidth: selectedSchedule === schedule.id ? '2px' : '1px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: selectedSchedule === schedule.id 
                ? '0 4px 12px rgba(0, 51, 102, 0.15)' 
                : '0 1px 3px rgba(15, 23, 42, 0.08)'
            }}
            onClick={() => setSelectedSchedule(schedule.id)}
            onMouseEnter={(e) => {
              if (selectedSchedule !== schedule.id) {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSchedule !== schedule.id) {
                e.currentTarget.style.borderColor = 'var(--color-card-border)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.08)';
              }
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: 'var(--color-text-primary)' }}>
                    {schedule.name}
                  </h3>
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: getStatusBg(schedule.status),
                      color: getStatusColor(schedule.status),
                      fontSize: 'var(--text-caption)',
                      borderRadius: '12px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {schedule.status}
                  </span>
                </div>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)'
                }}>
                  {schedule.description}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b" 
                 style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)',
                  marginBottom: '4px'
                }}>
                  Next Run
                </p>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {schedule.nextRun}
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
                  {schedule.lastRun}
                </p>
              </div>
              <div>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)',
                  marginBottom: '4px'
                }}>
                  Pause Between
                </p>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {schedule.interCyclePause}
                </p>
              </div>
              <div>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)',
                  marginBottom: '4px'
                }}>
                  On Failure
                </p>
                <p style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {schedule.jobFailureRule}
                </p>
              </div>
            </div>

            {/* Linked Jobs */}
            <div className="mb-4">
              <p style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-caption)',
                marginBottom: '8px'
              }}>
                Linked Jobs
              </p>
              <div className="flex flex-wrap gap-2">
                {schedule.linkedJobs.map((job, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 rounded-md border flex items-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--color-table-header-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-primary)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 'var(--font-weight-medium)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <Link2 className="w-3 h-3" />
                    {job}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors"
                style={{
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  borderRadius: 'var(--radius-md)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-table-header-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                className="px-4 py-2 rounded border transition-colors"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-secondary)',
                  borderRadius: 'var(--radius-md)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-error)';
                  e.currentTarget.style.color = 'var(--color-error)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="p-8 rounded-xl shadow-2xl max-w-lg w-full"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-table-header-bg)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <Calendar className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                  Create New Schedule
                </h2>
                <p style={{ 
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)'
                }}>
                  Set up a new automated job schedule
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Schedule Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Daily Data Sync"
                  className="w-full px-4 py-2.5 border rounded focus:outline-none focus:ring-2"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Schedule Type
                </label>
                <select
                  className="w-full px-4 py-2.5 border rounded focus:outline-none focus:ring-2"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Custom</option>
                  <option>Continuous (24/7)</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Link to Job
                </label>
                <select
                  className="w-full px-4 py-2.5 border rounded focus:outline-none focus:ring-2"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <option>SAM.GOV D/L</option>
                  <option>Award prep</option>
                  <option>BMS prep</option>
                  <option>ePDA</option>
                  <option>Atlantic</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-5 py-2.5 rounded border transition-colors"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  borderRadius: 'var(--radius-md)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowWarning(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded transition-colors"
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
                <Check className="w-4 h-4" />
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarning && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowWarning(false)}
        >
          <div 
            className="p-8 rounded-xl shadow-2xl max-w-md w-full"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div 
                className="p-4 rounded-full mb-4"
                style={{ 
                  backgroundColor: '#F59E0B15',
                  borderRadius: '50%'
                }}
              >
                <AlertCircle className="w-12 h-12" style={{ color: 'var(--color-warning)' }} />
              </div>
              
              <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                Confirm Action
              </h2>
              
              <p className="mb-8" style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-body)',
                lineHeight: '1.6'
              }}>
                This schedule is already linked to another job. Creating this will overwrite the existing configuration. Are you sure you want to continue?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowWarning(false)}
                  className="flex-1 px-5 py-2.5 rounded border transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-medium)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowWarning(false)}
                  className="flex-1 px-5 py-2.5 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--color-warning)',
                    color: 'var(--color-text-on-primary)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D97706';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-warning)';
                  }}
                >
                  Continue Anyway
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
