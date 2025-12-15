// src/components/TreeView.tsx
import React, { useState } from 'react';
import { Tree } from 'src/Models/Model';
import styles from './TreeView.module.css'; // Importing the CSS Module

interface Props {
  treeData: Tree | null;
  onNodeClick : (id: number, isProduct: boolean) => void
}

const TreeView = (props: Props) => {
  // Check for null early
  if (!props.treeData) return null;

  const node = props.treeData;
  const hasChildren = node.children && node.children.length > 0;
  
  // State: Default all nodes to collapsed (false)
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    // Only allow toggling if there are children
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    // Apply the base node styling
    <li key={node.id} className={styles.treeNode}>
      <div className={styles.nodeContentWrapper}>
        
        {/* Toggle Button/Icon */}
        {hasChildren && (
          <span 
            className={`${styles.toggleIcon} ${isExpanded ? styles.expanded : styles.collapsed}`}
            onClick={handleToggle}
          >
            {isExpanded ? '▼' : '►'}
          </span>
        )}
        
        {/* Node Name */}
        {/* add the anonymous () in the click event, if i only put onClick = {method} then it will call everytime the span is loaded.. so infinite loop */}
        <span className={ !node.isProduct ? styles.nodeLabel : styles.leaf} onClick={() => props.onNodeClick(node.id, node.isProduct)}> {node.name} </span>
      </div>

      {/* Children List: Conditionally rendered and styled */}
      {hasChildren && (
        <ol className={`${styles.treeChildren} ${isExpanded ? styles.visible : styles.hidden}`}>
          {
            // Recursive call for each child node
            node.children!.map((child) => (
              <TreeView key={child.id} treeData={child} onNodeClick={props.onNodeClick}/>
            ))
          }
        </ol>
      )}
    </li>
  );
};

export default TreeView;