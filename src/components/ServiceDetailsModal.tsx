import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  service: { name: string; description: string; imageUrl: string; category: string } | null;
}
const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ open, onClose, service }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open || !service) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative outline-none"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          tabIndex={-1}
        >
          <button className="absolute top-2 right-2 text-gray-500" onClick={onClose} aria-label="Close modal">✕</button>
          <img src={service.imageUrl} alt={service.name} className="w-full h-48 object-cover rounded mb-4" />
          <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
          <div className="text-orange-600 font-medium mb-2">{service.category}</div>
          <p className="text-gray-700">{service.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ServiceDetailsModal; 