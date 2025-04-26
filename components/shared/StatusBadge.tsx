"use client";

import { ContentStatus } from '@/types/content';

interface StatusBadgeProps {
  status: ContentStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  // Status bo'yicha ranglar
  const getStatusColor = () => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Status bo'yicha matnlar
  const getStatusText = () => {
    switch (status) {
      case 'published':
        return 'Nashr qilingan';
      case 'review':
        return 'Ko\'rib chiqishda';
      case 'draft':
      default:
        return 'Qoralama';
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor()} ${className}`}>
      {getStatusText()}
    </span>
  );
} 