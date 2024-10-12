// src/app/components/TextInput.tsx
import React from 'react';

interface TextInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="border rounded px-3 py-2 w-full bg-white text-black dark:bg-gray-800 dark:text-gray-400"
  />
);

export default TextInput;
