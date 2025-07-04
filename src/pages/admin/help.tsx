import React from 'react';
import AdminLayout from './AdminLayout';

const HelpPage: React.FC = () => (
  <AdminLayout>
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Admin Help & Documentation</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Dashboard Analytics</h2>
        <p className="text-gray-700 dark:text-gray-200 mb-2">The dashboard provides real-time analytics on your projects and services, including trends, top categories, and recent activity. Use the filters and tooltips for more details.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Theme & Sidebar Customization</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>Change dashboard colors and logo in <b>Settings</b>.</li>
          <li>Reorder or hide sidebar items using <b>Customize Sidebar</b>.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bulk Actions & Data Export</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>Use bulk select and delete in Projects/Services management.</li>
          <li>Export analytics and data as CSV for reporting.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Help & Support</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>Hover over <span className="text-orange-600">&#9432;</span> icons for inline help.</li>
          <li>For further assistance, contact <a href="mailto:support@jegrjalal.com" className="text-blue-600 underline">support@jegrjalal.com</a>.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">External Resources</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">React Documentation</a></li>
          <li><a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Tailwind CSS Docs</a></li>
        </ul>
      </section>
    </div>
  </AdminLayout>
);

export default HelpPage; 