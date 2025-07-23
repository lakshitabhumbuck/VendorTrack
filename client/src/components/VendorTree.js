import React, { useState } from 'react';

function VendorNode({ node, onSelect, selectedId }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        style={{
          cursor: 'pointer',
          fontWeight: node._id === selectedId ? 'bold' : 'normal',
          background: node._id === selectedId ? '#e2e8f0' : 'transparent',
          borderRadius: 4,
          padding: '2px 6px',
          display: 'inline-block',
        }}
        onClick={() => onSelect(node)}
      >
        {hasChildren && (
          <span onClick={e => { e.stopPropagation(); setExpanded(x => !x); }} style={{ marginRight: 4 }}>
            {expanded ? '▼' : '▶'}
          </span>
        )}
        {node.name} ({node.role})
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children.map(child => (
            <VendorNode key={child._id} node={child} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </div>
      )}
    </div>
  );
}

function VendorTree({ tree, onSelect, selectedId }) {
  return (
    <div>
      {tree.map(node => (
        <VendorNode key={node._id} node={node} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  );
}

export default VendorTree; 