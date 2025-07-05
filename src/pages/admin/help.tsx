import React from 'react';
import AdminLayout from './AdminLayout';
import { useTranslation } from 'react-i18next';

const AdminHelpPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-8 text-orange-600">{t('admin.helpTitle')}</h1>
        <div className="mb-8 text-gray-700">{t('admin.helpDesc')}</div>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('admin.helpItem1')}</li>
          <li>{t('admin.helpItem2')}</li>
          <li>{t('admin.helpItem3')}</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminHelpPage; 