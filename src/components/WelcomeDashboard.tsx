import { TrendingUp, Users, FileText, CheckCircle } from 'lucide-react';

export function WelcomeDashboard() {
  const stats = [
    {
      icon: FileText,
      label: 'Active Contracts',
      value: '156',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: DollarSign,
      label: 'Total Value',
      value: '$2.4M',
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: CheckCircle,
      label: 'Completed Bids',
      value: '89',
      change: '+23%',
      changeType: 'positive'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '94%',
      change: '+3%',
      changeType: 'positive'
    },
  ];
  
  const recentActivity = [
    { type: 'Contract', title: 'DOD-2026-0123', status: 'Open', date: 'Jan 18, 2026' },
    { type: 'Quote', title: 'NSN: 5998-01-234-5678', status: 'Pending', date: 'Jan 17, 2026' },
    { type: 'Bid', title: 'Navy Supply Contract', status: 'Submitted', date: 'Jan 16, 2026' },
    { type: 'Contract', title: 'GSA-2026-0456', status: 'Closed', date: 'Jan 15, 2026' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 style={{ color: 'var(--color-text-primary)' }}>
          Welcome back, Admin
        </h1>
        <p style={{ 
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-body)',
          marginTop: '8px'
        }}>
          Here's what's happening with your contracts today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-5 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-card-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p style={{ 
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 'var(--font-weight-medium)',
                    marginBottom: '8px'
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.2'
                  }}>
                    {stat.value}
                  </p>
                  <p style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-success)',
                    fontWeight: 'var(--font-weight-medium)',
                    marginTop: '4px'
                  }}>
                    {stat.change} from last month
                  </p>
                </div>
                <div 
                  className="p-2 rounded"
                  style={{ 
                    backgroundColor: 'var(--color-table-header-bg)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div 
          className="lg:col-span-2 p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-card-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
          }}
        >
          <h3 style={{ 
            color: 'var(--color-text-primary)',
            marginBottom: '20px'
          }}>
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded border"
                style={{
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: activity.status === 'Open' 
                        ? 'var(--color-success)' 
                        : activity.status === 'Pending'
                        ? 'var(--color-warning)'
                        : 'var(--color-text-secondary)'
                    }}
                  ></div>
                  <div>
                    <p style={{ 
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)'
                    }}>
                      {activity.title}
                    </p>
                    <p style={{ 
                      fontSize: 'var(--text-caption)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px'
                    }}>
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                </div>
                <span 
                  className="px-3 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: activity.status === 'Open' 
                      ? '#16A34A20' 
                      : activity.status === 'Pending'
                      ? '#F59E0B20'
                      : '#6B728020',
                    color: activity.status === 'Open' 
                      ? 'var(--color-success)' 
                      : activity.status === 'Pending'
                      ? 'var(--color-warning)'
                      : 'var(--color-text-secondary)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
          
          <button 
            className="mt-4 w-full py-2 text-sm font-medium rounded transition-colors"
            style={{
              color: 'var(--color-primary-hover)',
              borderRadius: 'var(--radius-md)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            View All Activity
          </button>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div 
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-card-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
          }}
        >
          <h3 style={{ 
            color: 'var(--color-text-primary)',
            marginBottom: '20px'
          }}>
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <button 
              className="w-full px-4 py-3 rounded font-medium text-left transition-colors"
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
              Create New Quote
            </button>
            
            <button 
              className="w-full px-4 py-3 rounded font-medium text-left transition-colors border"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--font-weight-semibold)',
                borderColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-table-header-bg)';
                e.currentTarget.style.color = 'var(--color-primary-hover)';
                e.currentTarget.style.borderColor = 'var(--color-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
            >
              Search Library
            </button>
            
            <button 
              className="w-full px-4 py-3 rounded font-medium text-left transition-colors border"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--font-weight-semibold)',
                borderColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-table-header-bg)';
                e.currentTarget.style.color = 'var(--color-primary-hover)';
                e.currentTarget.style.borderColor = 'var(--color-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
            >
              Submit Bid
            </button>
            
            <button 
              className="w-full px-4 py-3 rounded font-medium text-left transition-colors border"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--font-weight-semibold)',
                borderColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                height: '40px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-table-header-bg)';
                e.currentTarget.style.color = 'var(--color-primary-hover)';
                e.currentTarget.style.borderColor = 'var(--color-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
            >
              View Reports
            </button>
          </div>
          
          <div 
            className="mt-6 pt-6 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p style={{ 
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-secondary)',
              marginBottom: '8px'
            }}>
              Need help?
            </p>
            <a 
              href="#"
              className="flex items-center gap-2"
              style={{ 
                fontSize: 'var(--text-body)',
                color: 'var(--color-primary-hover)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <HelpCircle className="w-4 h-4" />
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import DollarSign and HelpCircle
import { DollarSign, HelpCircle } from 'lucide-react';
