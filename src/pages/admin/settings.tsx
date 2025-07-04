import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { toast } from 'sonner';
import { HexColorPicker } from 'react-colorful';

const defaultSettings = {
  company: {
    name: '',
    logo: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
  },
  site: {
    defaultLanguage: 'en',
    enableTestimonials: true,
    enableBlog: true,
    enableFAQ: true,
    maintenanceMode: false,
    theme: {
      primary: '#f97316',
      secondary: '#6366f1',
    },
  },
  admin: {
    password: '',
    newPassword: '',
    confirmPassword: '',
  },
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({ ...defaultSettings, ...data });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load settings.');
        setLoading(false);
      });
  }, []);

  const handleInput = (section: string, field: string, value: any) => {
    setSettings(s => ({
      ...s,
      [section]: {
        ...s[section as keyof typeof s],
        [field]: value,
      },
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleInput('company', 'logo', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeColor = (field: 'primary' | 'secondary', value: string) => {
    setSettings(s => ({
      ...s,
      site: {
        ...s.site,
        theme: {
          ...s.site.theme,
          [field]: value,
        },
      },
    }));
  };

  const applyTheme = (theme: { primary: string; secondary: string }) => {
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  };

  useEffect(() => {
    if (settings.site.theme) {
      applyTheme(settings.site.theme);
    }
  }, [settings.site.theme]);

  const handleSave = () => {
    setLoading(true);
    setError('');
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save');
        return res.json();
      })
      .then(() => {
        setLoading(false);
        toast.success('Settings saved!');
      })
      .catch(() => {
        setError('Failed to save settings.');
        setLoading(false);
        toast.error('Failed to save settings.');
      });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-8 text-orange-600">Settings</h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {loading && <div className="mb-4 text-gray-500 text-center">Loading...</div>}
        {/* Company Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Company Info</h2>
          <div className="space-y-4">
            <input className="form-input w-full" placeholder="Company Name" value={settings.company.name} onChange={e => handleInput('company', 'name', e.target.value)} />
            <div>
              <label className="block mb-1">Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="form-input w-full" />
              {settings.company.logo && <img src={settings.company.logo} alt="Logo Preview" className="h-16 mt-2 rounded shadow" />}
            </div>
            <input className="form-input w-full" placeholder="Address" value={settings.company.address} onChange={e => handleInput('company', 'address', e.target.value)} />
            <input className="form-input w-full" placeholder="Phone" value={settings.company.phone} onChange={e => handleInput('company', 'phone', e.target.value)} />
            <input className="form-input w-full" placeholder="Email" value={settings.company.email} onChange={e => handleInput('company', 'email', e.target.value)} />
            <input className="form-input w-full" placeholder="Facebook" value={settings.company.facebook} onChange={e => handleInput('company', 'facebook', e.target.value)} />
            <input className="form-input w-full" placeholder="LinkedIn" value={settings.company.linkedin} onChange={e => handleInput('company', 'linkedin', e.target.value)} />
            <input className="form-input w-full" placeholder="WhatsApp" value={settings.company.whatsapp} onChange={e => handleInput('company', 'whatsapp', e.target.value)} />
          </div>
        </section>
        {/* Site Preferences */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Site Preferences</h2>
          <div className="space-y-4">
            <label className="block">Default Language
              <select className="form-input w-full" value={settings.site.defaultLanguage} onChange={e => handleInput('site', 'defaultLanguage', e.target.value)}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.site.enableTestimonials} onChange={e => handleInput('site', 'enableTestimonials', e.target.checked)} /> Enable Testimonials
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.site.enableBlog} onChange={e => handleInput('site', 'enableBlog', e.target.checked)} /> Enable Blog
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.site.enableFAQ} onChange={e => handleInput('site', 'enableFAQ', e.target.checked)} /> Enable FAQ
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.site.maintenanceMode} onChange={e => handleInput('site', 'maintenanceMode', e.target.checked)} /> Maintenance Mode
            </label>
            <div>
              <label className="block font-medium mb-1">Primary Color</label>
              <div className="flex items-center gap-4">
                <HexColorPicker color={settings.site.theme?.primary || '#f97316'} onChange={c => handleThemeColor('primary', c)} />
                <input type="text" className="form-input w-28" value={settings.site.theme?.primary || ''} onChange={e => handleThemeColor('primary', e.target.value)} />
                <span className="w-8 h-8 rounded-full border" style={{background: settings.site.theme?.primary}}></span>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Secondary Color</label>
              <div className="flex items-center gap-4">
                <HexColorPicker color={settings.site.theme?.secondary || '#6366f1'} onChange={c => handleThemeColor('secondary', c)} />
                <input type="text" className="form-input w-28" value={settings.site.theme?.secondary || ''} onChange={e => handleThemeColor('secondary', e.target.value)} />
                <span className="w-8 h-8 rounded-full border" style={{background: settings.site.theme?.secondary}}></span>
              </div>
            </div>
          </div>
        </section>
        {/* Admin Preferences */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Admin Preferences</h2>
          <div className="space-y-4">
            <input className="form-input w-full" type="password" placeholder="Current Password" value={settings.admin.password} onChange={e => handleInput('admin', 'password', e.target.value)} />
            <input className="form-input w-full" type="password" placeholder="New Password" value={settings.admin.newPassword} onChange={e => handleInput('admin', 'newPassword', e.target.value)} />
            <input className="form-input w-full" type="password" placeholder="Confirm New Password" value={settings.admin.confirmPassword} onChange={e => handleInput('admin', 'confirmPassword', e.target.value)} />
          </div>
        </section>
        <button className="btn-primary w-full" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Settings'}</button>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 