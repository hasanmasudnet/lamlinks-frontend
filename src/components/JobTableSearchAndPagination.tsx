import { Search, Filter, ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsLeft, ChevronsRight, X } from 'lucide-react';

type JobStatus = 'running' | 'completed' | 'error' | 'scheduled' | 'paused' | 'early' | 'late';
type JobPriority = 'critical' | 'high' | 'medium' | 'low';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: JobStatus | 'all';
  setStatusFilter: (status: JobStatus | 'all') => void;
  priorityFilter: JobPriority | 'all';
  setPriorityFilter: (priority: JobPriority | 'all') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onFilterChange: () => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export function JobTableSearchBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  showFilters,
  setShowFilters,
  onFilterChange
}: SearchAndFilterProps) {
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as JobStatus | 'all');
    onFilterChange();
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value as JobPriority | 'all');
    onFilterChange();
  };

  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery !== '';

  return (
    <div className="space-y-3">
      {/* Search and Filter Button Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px] max-w-md relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
          </div>
          <input
            type="text"
            placeholder="Search jobs, owner, line..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded border transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: searchQuery ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-body)',
              borderRadius: 'var(--radius-md)',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary)15';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = searchQuery ? 'var(--color-primary)' : 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded border transition-colors"
          style={{
            borderColor: hasActiveFilters ? 'var(--color-primary)' : 'var(--color-border)',
            backgroundColor: hasActiveFilters || showFilters ? 'var(--color-primary)15' : 'transparent',
            color: hasActiveFilters ? 'var(--color-primary)' : 'var(--color-text-primary)',
            fontSize: 'var(--text-body)',
            borderRadius: 'var(--radius-md)',
            height: '40px',
            fontWeight: hasActiveFilters ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)'
          }}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span 
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              {[statusFilter !== 'all', priorityFilter !== 'all', searchQuery !== ''].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div 
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              Filter Jobs
            </h4>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 rounded transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label 
                style={{
                  display: 'block',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 rounded border transition-colors"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: statusFilter !== 'all' ? 'var(--color-primary)' : 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="error">Error</option>
                <option value="scheduled">Scheduled</option>
                <option value="paused">Paused</option>
                <option value="early">Early</option>
                <option value="late">Late</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label 
                style={{
                  display: 'block',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="w-full px-3 py-2 rounded border transition-colors"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: priorityFilter !== 'all' ? 'var(--color-primary)' : 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-body)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  onFilterChange();
                }}
                className="px-4 py-2 rounded transition-colors"
                style={{
                  backgroundColor: 'var(--color-hover-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-medium)',
                  borderRadius: 'var(--radius-md)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)15';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function JobTablePagination({
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  totalItems,
  startIndex,
  endIndex
}: PaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div 
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)'
      }}
    >
      {/* Results Info and Items Per Page */}
      <div className="flex items-center gap-4">
        <span style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-body)'
        }}>
          Showing <strong style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
            {startIndex + 1}
          </strong> to <strong style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
            {Math.min(endIndex, totalItems)}
          </strong> of <strong style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
            {totalItems}
          </strong> jobs
        </span>

        <div className="flex items-center gap-2">
          <label style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-caption)'
          }}>
            Per page:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 rounded border transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-caption)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="p-2 rounded transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: currentPage === 1 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: currentPage === 1 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className="px-3 py-1 rounded transition-colors min-w-[32px]"
            style={{
              backgroundColor: page === currentPage ? 'var(--color-primary)' : 'transparent',
              color: page === currentPage ? 'white' : 'var(--color-text-primary)',
              fontSize: 'var(--text-caption)',
              fontWeight: page === currentPage ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
              borderRadius: 'var(--radius-md)'
            }}
            onMouseEnter={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: currentPage === totalPages ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: currentPage === totalPages ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
