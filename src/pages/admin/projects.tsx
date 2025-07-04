import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import DetailsModal from '../../components/ui/DetailsModal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import toast from 'react-hot-toast';
import RichTextEditor from '../../components/ui/RichTextEditor';
import ImageGalleryInput from '../../components/ui/ImageGalleryInput';
import Papa from 'papaparse';
import { useHotkeys } from 'react-hotkeys-hook';

interface Project {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

const emptyForm: { name: string; description: string; images: string[]; category: string } = { name: '', description: '', images: [], category: '' };
type FormMode = 'add' | 'edit';

const API_URL = '/api/projects';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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
  const [detailsProject, setDetailsProject] = useState<Project | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
  const [activityLog, setActivityLog] = useState<any[]>(() => JSON.parse(localStorage.getItem('activityLog') || '[]'));

  // Fetch projects on mount
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setForm(emptyForm);
    setMode('add');
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (project: Project) => {
    setForm({ name: project.name, description: project.description, images: project.images || [], category: project.category });
    setMode('edit');
    setEditingId(project._id);
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
      setProjects((prev) => prev.filter((p) => p._id !== _id));
      toast.success('Project deleted successfully');
      logActivity('Delete', { _id });
    } catch {
      setError('Failed to delete project');
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
        const newProject = await res.json();
        setProjects((prev) => [newProject, ...prev]);
        toast.success('Project added successfully');
        logActivity('Add', newProject);
      } else if (mode === 'edit' && editingId !== null) {
        const res = await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
        toast.success('Project updated successfully');
        logActivity('Update', updated);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError('Failed to save project');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const filteredProjects = projects.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? p.category === filter : true)
  );
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice((currentPage-1)*pageSize, currentPage*pageSize);

  const logActivity = (action: string, data: any) => {
    const log = { time: new Date().toISOString(), action, data };
    const newLog = [log, ...activityLog].slice(0, 50);
    setActivityLog(newLog);
    localStorage.setItem('activityLog', JSON.stringify(newLog));
  };

  const handleExportCSV = () => {
    const csv = [
      ['Name', 'Description', 'Images', 'Category'],
      ...projects.map(p => [p.name, p.description, p.images.join(', '), p.category])
    ].map(row => row.map(field => '"'+String(field).replace(/"/g, '""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.csv';
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
        setProjects(prev => prev.filter(p => !selected.includes(p._id)));
        setSelected([]);
        toast.success('Deleted selected projects');
        logActivity('Bulk Delete', selected);
      } catch {
        toast.error('Failed to delete selected projects');
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
          const newProject = {
            name: row.Name,
            description: row.Description,
            images,
            category: row.Category,
          };
          try {
            await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newProject),
            });
            successCount++;
          } catch {
            errorCount++;
          }
        }
        toast.success(`Imported ${successCount} projects. ${errorCount ? errorCount + ' errors.' : ''}`);
        // Reload projects
        setLoading(true);
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => {
            setProjects(data);
            setLoading(false);
          });
      },
      error: () => toast.error('Failed to parse CSV'),
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-orange-600">Manage Projects</h1>
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
            {[...new Set(projects.map(p => p.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="btn-secondary" onClick={handleExportCSV}>Export CSV</button>
          <label className="btn-secondary cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>
          <button className="btn-tertiary" onClick={handleBulkDelete} disabled={!selected.length}>Bulk Delete</button>
          <button className="btn-primary" onClick={handleAddClick}>Add Project</button>
        </div>
      </div>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{mode === 'add' ? 'Add New Project' : 'Edit Project'}</h2>
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
                placeholder="Project Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <RichTextEditor
                value={form.description}
                onChange={val => setForm(f => ({ ...f, description: val }))}
                placeholder="Project Description"
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
              <label className="block text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleInputChange}
                required
                className="form-input w-full"
                placeholder="Category"
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn-primary" disabled={loading}>
                {mode === 'add' ? 'Add Project' : 'Save Changes'}
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
                  <th className="px-4 py-2"><input type="checkbox" checked={selected.length === paginatedProjects.length && paginatedProjects.length > 0} onChange={e => setSelected(e.target.checked ? paginatedProjects.map(p => p._id) : [])} /></th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Images</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.map((project) => (
                  <tr key={project._id} className="border-b hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-2"><input type="checkbox" checked={selected.includes(project._id)} onChange={e => setSelected(e.target.checked ? [...selected, project._id] : selected.filter(id => id !== project._id))} /></td>
                    <td className="px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => { setDetailsProject(project); setDetailsOpen(true); }}>{project.name}</td>
                    <td className="px-4 py-2 text-gray-700 max-w-xs truncate">{project.description}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        {project.images && project.images.length > 0 && project.images.map((img, i) => (
                          <img key={i} src={img} alt={project.name} className="h-12 w-20 object-cover rounded shadow" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2">{project.category}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="btn-secondary" onClick={() => handleEditClick(project)} disabled={loading}>Edit</button>
                      <button className="btn-tertiary" onClick={() => { setConfirmOpen(true); setConfirmAction(() => () => handleDeleteClick(project._id)); }} disabled={loading}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProjects.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-8">No projects found.</div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              <button className="btn-tertiary" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="btn-tertiary" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
      <DetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} title={detailsProject?.name || ''}>
        {detailsProject && (
          <div>
            {detailsProject.images && detailsProject.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {detailsProject.images.map((img, i) => (
                  <img key={i} src={img} alt={detailsProject.name} className="h-32 w-48 object-cover rounded" />
                ))}
              </div>
            )}
            <div><strong>Description:</strong> {detailsProject.description}</div>
            <div><strong>Category:</strong> {detailsProject.category}</div>
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

export default AdminProjects; 