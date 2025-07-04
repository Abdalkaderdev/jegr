import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import DetailsModal from '../../components/ui/DetailsModal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import toast from 'react-hot-toast';
import RichTextEditor from '../../components/ui/RichTextEditor';
import ImageGalleryInput from '../../components/ui/ImageGalleryInput';
import Papa from 'papaparse';
import { useHotkeys } from 'react-hotkeys-hook';
import servicesCategories from '../../../api/servicesCategories.json';

interface Service {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

const emptyForm: { name: string; description: string; images: string[]; category: string } = { name: '', description: '', images: [], category: '' };
type FormMode = 'add' | 'edit';

const API_URL = '/api/services';

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<{ name: string; description: string; images: string[]; category: string }>(emptyForm);
  const [mode, setMode] = useState<FormMode>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [selected, setSelected] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsService, setDetailsService] = useState<Service | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
  const [activityLog, setActivityLog] = useState<any[]>(() => JSON.parse(localStorage.getItem('activityLogServices') || '[]'));
  const [helpOpen, setHelpOpen] = useState(false);

  // Fetch services on mount
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleAddClick = () => {
    setForm(emptyForm);
    setMode('add');
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (service: Service) => {
    setForm({ name: service.name, description: service.description, images: service.images || [], category: service.category });
    setMode('edit');
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDeleteClick = async (_id: string) => {
    setLoading(true);
    setError('');
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: _id }),
      });
      setServices((prev) => prev.filter((s) => s._id !== _id));
      toast.success('Service deleted successfully');
      logActivity('Delete', { _id });
    } catch {
      setError('Failed to delete service');
    }
    setLoading(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'add') {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const newService = await res.json();
        setServices((prev) => [newService, ...prev]);
        toast.success('Service added successfully');
        logActivity('Add', newService);
      } else if (mode === 'edit' && editingId !== null) {
        const res = await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        const updated = await res.json();
        setServices((prev) => prev.map((s) => (s._id === editingId ? updated : s)));
        toast.success('Service updated successfully');
        logActivity('Update', updated);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError('Failed to save service');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const filteredServices = services.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.description.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? s.category === filter : true)
  );
  const totalPages = Math.ceil(filteredServices.length / pageSize);
  const paginatedServices = filteredServices.slice((currentPage-1)*pageSize, currentPage*pageSize);

  const logActivity = (action: string, data: any) => {
    const log = { time: new Date().toISOString(), action, data };
    const newLog = [log, ...activityLog].slice(0, 50);
    setActivityLog(newLog);
    localStorage.setItem('activityLogServices', JSON.stringify(newLog));
  };

  const handleExportCSV = () => {
    const csv = [
      ['Name', 'Description', 'Images', 'Category'],
      ...services.map(s => [s.name, s.description, s.images.join(', '), s.category])
    ].map(row => row.map(field => '"'+String(field).replace(/"/g, '""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBulkDelete = () => {
    setConfirmOpen(true);
    setConfirmAction(() => async () => {
      setConfirmOpen(false);
      setLoading(true);
      try {
        for (const _id of selected) {
          await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: _id }),
          });
        }
        setServices(prev => prev.filter(s => !selected.includes(s._id)));
        setSelected([]);
        toast.success('Deleted selected services');
        logActivity('Bulk Delete', selected);
      } catch {
        toast.error('Failed to delete selected services');
      }
      setLoading(false);
    });
  };

  // Add import CSV handler
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: Papa.ParseResult<any>) => {
        const rows = results.data as any[];
        let successCount = 0;
        let errorCount = 0;
        for (const row of rows) {
          // Validate required fields
          if (!row.Name || !row.Description || !row.Category) {
            errorCount++;
            continue;
          }
          const images = row.Images ? String(row.Images).split(',').map((s: string) => s.trim()).filter(Boolean) : [];
          const newService = {
            name: row.Name,
            description: row.Description,
            images,
            category: row.Category,
          };
          try {
            await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newService),
            });
            successCount++;
          } catch {
            errorCount++;
          }
        }
        toast.success(`Imported ${successCount} services. ${errorCount ? errorCount + ' errors.' : ''}`);
        // Reload services
        setLoading(true);
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => {
            setServices(data);
            setLoading(false);
          });
      },
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  // Keyboard shortcuts
  useHotkeys('n', () => handleAddClick());
  useHotkeys('ctrl+s,cmd+s', (e) => { if (showForm) { e.preventDefault(); document.getElementById('admin-service-form-submit')?.click(); } }, [showForm]);
  useHotkeys('/', (e) => { e.preventDefault(); document.getElementById('admin-service-search')?.focus(); });
  useHotkeys('i', () => document.getElementById('admin-service-import')?.click());
  useHotkeys('e', () => handleExportCSV());
  useHotkeys('shift+/', () => setHelpOpen(true));

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-orange-600">Manage Services</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="form-input"
          >
            <option value="">All Categories</option>
            {[...new Set(services.map(s => s.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="btn-secondary" onClick={handleExportCSV}>Export CSV</button>
          <label className="btn-secondary cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>
          <button className="btn-tertiary" onClick={handleBulkDelete} disabled={!selected.length}>Bulk Delete</button>
          <button className="btn-primary" onClick={handleAddClick}>Add Service</button>
        </div>
      </div>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{mode === 'add' ? 'Add New Service' : 'Edit Service'}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="form-input w-full"
                placeholder="Service Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <RichTextEditor
                value={form.description}
                onChange={val => setForm(f => ({ ...f, description: val }))}
                placeholder="Service Description"
                required
                className="mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Images</label>
              <ImageGalleryInput
                images={form.images}
                onChange={imgs => setForm(f => ({ ...f, images: imgs as string[] }))}
                className="mb-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                className="form-input w-full mb-4"
                value={form.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                {Object.entries(servicesCategories).map(([main, subs]) => [
                  <optgroup key={main} label={main} />,
                  (subs as string[]).map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))
                ])}
              </select>
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn-primary" disabled={loading}>
                {mode === 'add' ? 'Add Service' : 'Save Changes'}
              </button>
              <button type="button" className="btn-tertiary" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : (
          <>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2"><input type="checkbox" checked={selected.length === paginatedServices.length && paginatedServices.length > 0} onChange={e => setSelected(e.target.checked ? paginatedServices.map(s => s._id) : [])} /></th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Images</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedServices.map((service) => (
                  <tr key={service._id} className="border-b hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-2"><input type="checkbox" checked={selected.includes(service._id)} onChange={e => setSelected(e.target.checked ? [...selected, service._id] : selected.filter(id => id !== service._id))} /></td>
                    <td className="px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => { setDetailsService(service); setDetailsOpen(true); }}>{service.name}</td>
                    <td className="px-4 py-2 text-gray-700 max-w-xs truncate">{service.description}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        {service.images && service.images.length > 0 && service.images.map((img, i) => (
                          <img key={i} src={img} alt={service.name} className="h-12 w-20 object-cover rounded shadow" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2">{service.category}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="btn-secondary" onClick={() => handleEditClick(service)} disabled={loading}>Edit</button>
                      <button className="btn-tertiary" onClick={() => { setConfirmOpen(true); setConfirmAction(() => () => handleDeleteClick(service._id)); }} disabled={loading}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredServices.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-8">No services found.</div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              <button className="btn-tertiary" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="btn-tertiary" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
      <DetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} title={detailsService?.name || ''}>
        {detailsService && (
          <div>
            {detailsService.images && detailsService.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {detailsService.images.map((img, i) => (
                  <img key={i} src={img} alt={detailsService.name} className="h-32 w-48 object-cover rounded" />
                ))}
              </div>
            )}
            <div><strong>Description:</strong> {detailsService.description}</div>
            <div><strong>Category:</strong> {detailsService.category}</div>
          </div>
        )}
      </DetailsModal>
      <ConfirmationDialog open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={confirmAction} message="Are you sure you want to delete?" />
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-lg font-bold mb-2">Activity Log</h2>
        <ul className="max-h-40 overflow-y-auto text-sm">
          {activityLog.map((log, i) => (
            <li key={i} className="mb-1 text-gray-600">[{new Date(log.time).toLocaleString()}] {log.action} {JSON.stringify(log.data)}</li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminServices; 