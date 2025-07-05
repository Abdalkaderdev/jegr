import React, { PropsWithChildren } from 'react';
import AdminSidebar from './AdminSidebar';
import { useTranslation } from 'react-i18next';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <header className="bg-orange-600 text-white py-4 px-8 flex items-center justify-between">
        <span className="font-bold text-xl">{t('admin.headerTitle')}</span>
        <nav>
          <a href="/" className="hover:underline mr-4">{t('navbar.home')}</a>
          <a href="/admin/settings" className="hover:underline">{t('admin.settings')}</a>
        </nav>
      </header>
      <div className="flex flex-col">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      <footer className="text-center text-gray-500 py-6">
        {t('admin.footerText')}
      </footer>
    </div>
  );
};

export default AdminLayout; 