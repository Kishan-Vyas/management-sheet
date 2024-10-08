import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="w-full min-w-[200px] text-[20px] my-2">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="peer w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder=" " // Transparent placeholder to control the label animation
        />
        <label
          className={`absolute bg-white px-1 left-3 text-slate-400 text-sm transition-all duration-300 ease-in-out transform origin-left
            ${value ? '-top-2 left-3 text-xs text-slate-400' : 'top-2.5 left-3 text-sm text-slate-400'}
            peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-slate-400`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputField;
