"use client";

import { useState } from 'react';
import { ComponentLibrary } from '@/lib/component-library';
import { useMutation } from '@/lib/liveblocks/config';
import styles from './CustomComponentSelector.module.css';

interface CustomComponentSelectorProps {
  onSelectComponent: (component: any, props: any) => void;
}

export function CustomComponentSelector({ onSelectComponent }: CustomComponentSelectorProps) {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});

  const handleSelectComponent = (component: any) => {
    setSelectedComponent(component);
    
    // Komponent uchun default propslarni o'rnatish
    const defaultProps: Record<string, any> = {};
    if (component.propTypes) {
      Object.keys(component.propTypes).forEach(key => {
        defaultProps[key] = component.defaultProps?.[key] || '';
      });
    }
    
    setComponentProps(defaultProps);
  };

  const handlePropChange = (propName: string, value: any) => {
    setComponentProps(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  const handleInsertComponent = () => {
    if (selectedComponent) {
      onSelectComponent(selectedComponent, componentProps);
      setSelectedComponent(null);
      setComponentProps({});
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Komponent qo'shish</h3>
      
      <div className={styles.componentGrid}>
        {ComponentLibrary.map(component => (
          <button
            key={component.id}
            className={`${styles.componentButton} ${selectedComponent?.id === component.id ? styles.selected : ''}`}
            onClick={() => handleSelectComponent(component)}
          >
            <span className={styles.componentIcon}>{component.icon}</span>
            <span className={styles.componentLabel}>{component.label}</span>
          </button>
        ))}
      </div>
      
      {selectedComponent && (
        <div className={styles.propEditor}>
          <h4 className={styles.propTitle}>Parametrlar</h4>
          
          {selectedComponent.propTypes && Object.keys(selectedComponent.propTypes).map(propName => (
            <div key={propName} className={styles.propRow}>
              <label className={styles.propLabel}>{propName}</label>
              <input
                type="text"
                className={styles.propInput}
                value={componentProps[propName] || ''}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                placeholder={`${propName} ni kiriting`}
              />
            </div>
          ))}
          
          <button 
            className={styles.insertButton}
            onClick={handleInsertComponent}
          >
            Qo'shish
          </button>
        </div>
      )}
    </div>
  );
} 