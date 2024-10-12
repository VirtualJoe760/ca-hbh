// src/components/Gutter.tsx
import React from 'react';
import clsx from 'clsx';

interface GutterProps {
  children: React.ReactNode;
  className?: string;
}

export default function Gutter({ children, className }: GutterProps) {
  return (
    <div className={clsx('px-4 md:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
