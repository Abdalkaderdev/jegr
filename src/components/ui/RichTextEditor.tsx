import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, required, className }) => {
  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 min-h-[120px]"
      />
      {required && !value && (
        <div className="text-red-500 text-xs mt-1">This field is required.</div>
      )}
    </div>
  );
};

export default RichTextEditor; 