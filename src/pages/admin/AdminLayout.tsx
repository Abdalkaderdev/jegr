import React, { PropsWithChildren } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout; 