import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_ITEMS = [
  { key: 'dashboard', nameKey: 'admin.sidebar.dashboard', path: '/admin/dashboard', visible: true },
  { key: 'projects', nameKey: 'admin.sidebar.projects', path: '/admin/projects', visible: true },
  { key: 'services', nameKey: 'admin.sidebar.services', path: '/admin/services', visible: true },
  { key: 'help', nameKey: 'admin.sidebar.help', path: '/admin/help', visible: true },
];

function getSidebarConfig() {
  const stored = localStorage.getItem('sidebarConfig');
  if (stored) return JSON.parse(stored);
  return DEFAULT_ITEMS;
}

function setSidebarConfig(config: any) {
  localStorage.setItem('sidebarConfig', JSON.stringify(config));
}

function SortableItem({ id, item, t, onToggle }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners} className="flex items-center gap-2 bg-gray-50 rounded p-2 mb-2">
      <span className="cursor-move">☰</span>
      <span className="flex-1">{t(item.nameKey)}</span>
      <label className="flex items-center gap-1 text-xs">
        <input type="checkbox" checked={item.visible} onChange={() => onToggle(item.key)} /> Show
      </label>
    </li>
  );
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarItems, setSidebarItems] = useState(getSidebarConfig());
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const customizeRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileOpen]);

  // Focus trap for customize modal
  useEffect(() => {
    if (!customizeOpen) return;
    const first = customizeRef.current?.querySelector('button, [tabindex]:not([tabindex="-1"])');
    (first as HTMLElement)?.focus();
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setCustomizeOpen(false);
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [customizeOpen]);

  useEffect(() => {
    setSidebarItems(getSidebarConfig());
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sidebarItems.findIndex((i: any) => i.key === active.id);
      const newIndex = sidebarItems.findIndex((i: any) => i.key === over.id);
      const newItems = arrayMove(sidebarItems, oldIndex, newIndex);
      setSidebarItems(newItems);
      setSidebarConfig(newItems);
    }
  };

  const handleToggle = (key: string) => {
    const newItems = sidebarItems.map((item: any) => item.key === key ? { ...item, visible: !item.visible } : item);
    setSidebarItems(newItems);
    setSidebarConfig(newItems);
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow focus:outline-none"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.aside
              ref={sidebarRef}
              className="w-64 h-full bg-white border-r border-gray-200 flex flex-col py-8 px-4 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              tabIndex={-1}
              onClick={e => e.stopPropagation()}
            >
              <div className="mb-10 text-2xl font-bold text-orange-600 text-center">{t('admin.sidebar.title')}</div>
              <nav className="flex-1 space-y-2">
                <ul className="space-y-2">
                  {sidebarItems.filter((item: any) => item.visible).map((item: any) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-orange-100 text-orange-700'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(item.nameKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a href="/admin/settings" className="block px-4 py-2 rounded hover:bg-orange-100 transition-colors">{t('admin.settings')}</a>
                <button className="mt-4 w-full btn-secondary text-xs py-1 rounded" onClick={() => setCustomizeOpen(true)}>{t('admin.customize.sidebar')}</button>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop sidebar */}
      <aside ref={sidebarRef} className="hidden md:flex h-screen w-64 bg-white border-r border-gray-200 flex-col py-8 px-4">
        <div className="mb-10 text-2xl font-bold text-orange-600 text-center">{t('admin.sidebar.title')}</div>
        <nav className="flex-1 space-y-2">
          <ul className="space-y-2">
            {sidebarItems.filter((item: any) => item.visible).map((item: any) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {t(item.nameKey)}
                </Link>
              </li>
            ))}
          </ul>
          <a href="/admin/settings" className="block px-4 py-2 rounded hover:bg-orange-100 transition-colors">{t('admin.settings')}</a>
          <button className="mt-4 w-full btn-secondary text-xs py-1 rounded" onClick={() => setCustomizeOpen(true)}>{t('admin.customize.sidebar')}</button>
        </nav>
      </aside>
      {/* Customization Modal */}
      <AnimatePresence>
        {customizeOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <motion.div
              ref={customizeRef}
              className="bg-white rounded-lg shadow-lg p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              tabIndex={0}
              aria-label="Customize Sidebar"
            >
              <h2 className="text-lg font-semibold mb-4">{t('admin.customize.title')}</h2>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sidebarItems.map((i: any) => i.key)} strategy={verticalListSortingStrategy}>
                  <ul>
                    {sidebarItems.map((item: any) => (
                      <SortableItem key={item.key} id={item.key} item={item} t={t} onToggle={handleToggle} />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
              <button className="btn-primary mt-4 w-full" onClick={() => setCustomizeOpen(false)}>{t('admin.customize.done')}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar; 