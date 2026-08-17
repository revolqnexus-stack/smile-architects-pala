'use client';

import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'markdown'>('visual');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('rich-text-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'B', title: 'Bold', action: () => insertMarkdown('**', '**') },
    { label: 'I', title: 'Italic', action: () => insertMarkdown('*', '*') },
    { label: 'H1', title: 'Heading 1', action: () => insertMarkdown('# ', '') },
    { label: 'H2', title: 'Heading 2', action: () => insertMarkdown('## ', '') },
    { label: 'H3', title: 'Heading 3', action: () => insertMarkdown('### ', '') },
    { label: '•', title: 'Bullet List', action: () => insertMarkdown('- ', '') },
    { label: '1.', title: 'Numbered List', action: () => insertMarkdown('1. ', '') },
    { label: '""', title: 'Quote', action: () => insertMarkdown('> ', '') },
    { label: 'Link', title: 'Link', action: () => insertMarkdown('[', '](url)') },
  ];

  return (
    <div style={{
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #d1d5db',
        padding: '0.5rem',
        display: 'flex',
        gap: '0.25rem',
        flexWrap: 'wrap',
      }}>
        {toolbarButtons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            title={btn.title}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              fontWeight: btn.label.length <= 2 ? 600 : 400,
              cursor: 'pointer',
              color: '#374151',
            }}
          >
            {btn.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.25rem' }}>
          <button
            type="button"
            onClick={() => setMode('visual')}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: mode === 'visual' ? '#2563eb' : 'white',
              color: mode === 'visual' ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('markdown')}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: mode === 'markdown' ? '#2563eb' : 'white',
              color: mode === 'markdown' ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        id="rich-text-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight: '400px',
          padding: '1rem',
          border: 'none',
          fontSize: '1rem',
          fontFamily: mode === 'markdown' ? 'monospace' : 'inherit',
          lineHeight: 1.6,
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      {/* Helper */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #d1d5db',
        padding: '0.5rem 1rem',
        fontSize: '0.75rem',
        color: '#666',
      }}>
        {mode === 'markdown' ? (
          'Markdown supported: **bold**, *italic*, # heading, - list, [link](url), > quote'
        ) : (
          'Use toolbar buttons to format text or switch to Markdown mode for more control'
        )}
      </div>
    </div>
  );
}
