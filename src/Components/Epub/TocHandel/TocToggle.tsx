import React from "react";

interface TocToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

const TocToggle: React.FC<TocToggleProps> = ({ onClick, isOpen }) => {
  return (
    <div className="toc-toggle" onClick={onClick}>
      <span>Table of contents {isOpen ? "▼" : "▲"}</span>
    </div>
  );
};

export default TocToggle;
