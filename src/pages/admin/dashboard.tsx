import React, { Suspense, lazy, useState } from 'react';
import AdminLayout from './AdminLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { format, isAfter, isBefore, parseISO } from 'date-fns';
import Tooltip from '../../components/ui/Tooltip';

const COLORS = ['#f97316', '#6366f1', '#10b981', '#f59e42', '#e11d48', '#0ea5e9'];

const getColor = (idx: number) => COLORS[idx % COLORS.length];

const AdminDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState('');
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/projects.json').then(res => res.json()),
      fetch('/api/services.json').then(res => res.json())
    ]).then(([proj, serv]) => {
      setProjects(proj);
      setServices(serv);
      // Merge activity logs from both projects and services
      const projLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
      const servLog = JSON.parse(localStorage.getItem('activityLogServices') || '[]');
      setActivity([...projLog, ...servLog].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));
      setLoading(false);
    });
  }, []);

  // Filtering helpers
  const filterByDate = (item: any) => {
    if (!startDate && !endDate) return true;
    const date = item.time ? parseISO(item.time) : (item.createdAt ? parseISO(item.createdAt) : null);
    if (!date) return true;
    if (startDate && isBefore(date, startDate)) return false;
    if (endDate && isAfter(date, endDate)) return false;
    return true;
  };
  const filterByCategory = (item: any) => !category || item.category === category;
  const filterByAction = (item: any) => !actionType || item.action === actionType;

  // Filtered data
  const filteredProjects = projects.filter(filterByDate).filter(filterByCategory);
  const filteredServices = services.filter(filterByDate).filter(filterByCategory);
  const filteredActivity = activity.filter(filterByDate).filter(filterByAction);

  // Analytics: count by category
  const allCategories = Array.from(new Set([...projects, ...services].map((p) => p.category).filter(Boolean)));
  const projectCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const serviceCategories = Array.from(new Set(services.map((s) => s.category).filter(Boolean)));
  const projectByCategory = projectCategories.map((cat) => ({ category: cat, count: filteredProjects.filter((p) => p.category === cat).length }));
  const serviceByCategory = serviceCategories.map((cat) => ({ category: cat, count: filteredServices.filter((s) => s.category === cat).length }));

  // Top categories
  const topProjectCategories = [...projectByCategory].sort((a, b) => b.count - a.count).slice(0, 3);
  const topServiceCategories = [...serviceByCategory].sort((a, b) => b.count - a.count).slice(0, 3);

  // Analytics: projects/services added per month (trend)
  function getMonth(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }
  const projectTrend = Object.entries(filteredProjects.reduce((acc: any, p: any) => {
    const m = getMonth(p.createdAt || p.time || p.id);
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {})).map(([month, count]) => ({ month, count: Number(count) }));
  const serviceTrend = Object.entries(filteredServices.reduce((acc: any, s: any) => {
    const m = getMonth(s.createdAt || s.time || s.id);
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {})).map(([month, count]) => ({ month, count: Number(count) }));

  // Growth rate (month-over-month)
  function calcGrowth(trend: { month: string, count: number }[]) {
    if (trend.length < 2) return 0;
    const last = trend[trend.length - 1]?.count || 0;
    const prev = trend[trend.length - 2]?.count || 0;
    if (prev === 0) return last > 0 ? 100 : 0;
    return ((last - prev) / prev) * 100;
  }
  const projectGrowth = calcGrowth(projectTrend);
  const serviceGrowth = calcGrowth(serviceTrend);

  // Activity breakdown
  const activityTypes = ['Add', 'Update', 'Delete', 'Bulk Delete'];
  const activityBreakdown = activityTypes.map(type => ({ type, count: filteredActivity.filter(a => a.action === type).length }));

  // Export analytics as CSV
  const handleExport = () => {
    const rows = [
      ['Type', 'Category', 'Count'],
      ...projectByCategory.map(row => ['Project', row.category, row.count]),
      ...serviceByCategory.map(row => ['Service', row.category, row.count])
    ];
    const csv = rows.map(r => r.map(f => '"'+String(f).replace(/"/g, '""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Responsive grid
  const gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-8 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 text-center">
                <div className="h-8 w-16 mx-auto bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 mx-auto bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
                <div className="h-48 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
                <div className="h-48 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
            <div className="h-48 w-full bg-gray-100 rounded" />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
            <ul className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="h-4 w-3/4 bg-gray-100 rounded" />
              ))}
            </ul>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-orange-600 mb-4 flex items-center gap-2">
        {t('dashboard.analytics')}
        <Tooltip content={t('dashboard.analyticsTooltip')}> 
          <span className="ml-1 text-gray-400 cursor-help">&#9432;</span>
        </Tooltip>
      </h1>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            {t('dashboard.dateRange')}
            <Tooltip content={t('dashboard.dateRangeTooltip')}>
              <span className="text-gray-400 cursor-help">&#9432;</span>
            </Tooltip>
          </label>
          <div className="flex gap-2 items-center">
            <DatePicker
              selected={startDate || undefined}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText={t('dashboard.dateRange')+ ' (start)'}
              className="border rounded px-2 py-1 text-sm"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span>-</span>
            <DatePicker
              selected={endDate || undefined}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText={t('dashboard.dateRange')+ ' (end)'}
              className="border rounded px-2 py-1 text-sm"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            {t('dashboard.category')}
            <Tooltip content={t('dashboard.categoryTooltip')}>
              <span className="text-gray-400 cursor-help">&#9432;</span>
            </Tooltip>
          </label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="">{t('dashboard.all')}</option>
            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            {t('dashboard.actionType')}
            <Tooltip content={t('dashboard.actionTypeTooltip')}>
              <span className="text-gray-400 cursor-help">&#9432;</span>
            </Tooltip>
          </label>
          <select value={actionType} onChange={e => setActionType(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="">{t('dashboard.all')}</option>
            {activityTypes.map(type => <option key={type} value={type}>{t(`dashboard.actions.${type}`)}</option>)}
          </select>
        </div>
        <div className="ml-auto">
          <Tooltip content={t('dashboard.exportTooltip')}>
            <span>
              <Button onClick={handleExport} variant="secondary" size="small">{t('dashboard.export')}</Button>
            </span>
          </Tooltip>
        </div>
      </div>
      {/* Stats */}
      <div className={`grid ${gridCols} gap-6 mb-8`}>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-black mb-2">{filteredProjects.length}</div>
          <div className="text-neutral-500">{t('admin.projects')}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-black mb-2">{filteredServices.length}</div>
          <div className="text-neutral-500">{t('admin.services')}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-black mb-2">{filteredActivity.length}</div>
          <div className="text-neutral-500">{t('dashboard.recentActivity')}</div>
        </div>
      </div>
      {/* Top Categories & Growth Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.topCategories')} ({t('admin.projects')})</h2>
          <ul className="text-sm">
            {topProjectCategories.map((cat, idx) => (
              <li key={cat.category} className="mb-1 flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{background:getColor(idx)}}></span>{cat.category}: <span className="ml-1 font-bold">{cat.count}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.topCategories')} ({t('admin.services')})</h2>
          <ul className="text-sm">
            {topServiceCategories.map((cat, idx) => (
              <li key={cat.category} className="mb-1 flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{background:getColor(idx)}}></span>{cat.category}: <span className="ml-1 font-bold">{cat.count}</span></li>
            ))}
          </ul>
        </div>
      </div>
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.projectsByCategory')}</h2>
          {projectByCategory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
              <span>{t('dashboard.noData')}</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={projectByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                  {projectByCategory.map((entry, idx) => <Cell key={entry.category} fill={getColor(idx)} />)}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value:any, name:any) => [value, t('dashboard.count')]} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.servicesByCategory')}</h2>
          {serviceByCategory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
              <span>{t('dashboard.noData')}</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={serviceByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                  {serviceByCategory.map((entry, idx) => <Cell key={entry.category} fill={getColor(idx)} />)}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value:any, name:any) => [value, t('dashboard.count')]} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.projectsPerMonth')}</h2>
          {projectTrend.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
              <span>{t('dashboard.noData')}</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={projectTrend}>
                <XAxis dataKey="month" tickFormatter={m=>t('dashboard.month')+': '+m} />
                <YAxis allowDecimals={false} />
                <RechartsTooltip formatter={(value:any) => [value, t('dashboard.count')]} />
                <Line type="monotone" dataKey="count" stroke={getColor(0)} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="mt-2 text-sm text-neutral-500">{t('dashboard.growth')}: <span className={projectGrowth>0?'text-green-600':'text-red-600'}>{projectGrowth.toFixed(1)}%</span></div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard.servicesPerMonth')}</h2>
          {serviceTrend.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
              <span>{t('dashboard.noData')}</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={serviceTrend}>
                <XAxis dataKey="month" tickFormatter={m=>t('dashboard.month')+': '+m} />
                <YAxis allowDecimals={false} />
                <RechartsTooltip formatter={(value:any) => [value, t('dashboard.count')]} />
                <Line type="monotone" dataKey="count" stroke={getColor(1)} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="mt-2 text-sm text-neutral-500">{t('dashboard.growth')}: <span className={serviceGrowth>0?'text-green-600':'text-red-600'}>{serviceGrowth.toFixed(1)}%</span></div>
        </div>
      </div>
      {/* Activity Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.activityBreakdown')}</h2>
        {activityBreakdown.every(a => a.count === 0) ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
            <span>{t('dashboard.noData')}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={activityBreakdown} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80} label={entry=>t(`dashboard.actions.${entry.type}`)}>
                {activityBreakdown.map((entry, idx) => <Cell key={entry.type} fill={getColor(idx)} />)}
              </Pie>
              <Legend formatter={v=>t(`dashboard.actions.${v}`)} />
              <RechartsTooltip formatter={(value:any, name:any) => [value, t(`dashboard.actions.${name}`)]} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;