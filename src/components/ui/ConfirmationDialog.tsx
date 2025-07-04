import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onConfirm, onCancel, message }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            tabIndex={-1}
          >
            <p className="mb-6">{message}</p>
            <div className="flex justify-end space-x-2">
              <button className="btn-tertiary" onClick={onCancel}>Cancel</button>
              <button className="btn-primary" onClick={onConfirm}>Confirm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ConfirmationDialog; 