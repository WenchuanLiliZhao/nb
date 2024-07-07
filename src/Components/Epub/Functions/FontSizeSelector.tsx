/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// FontSizeSelector.tsx
import React, { useEffect } from 'react';

interface FontSizeSelectorProps {
  rendition: any; // Replace 'any' with appropriate type
}

const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ rendition }) => {
  const handleFontSizeChange = (size: string) => {
    if (!rendition) return;
    let fontSize;
    switch (size) {
      case "small":
        fontSize = "16px";
        break;
      case "medium":
        fontSize = "18px";
        break;
      case "large":
        fontSize = "20px";
        break;
      default:
        fontSize = "18px";  // Default to medium if unknown size
    }
    // Apply the font size to the rendition
    rendition.themes.fontSize(fontSize);
    // Save the selected font size to localStorage
    localStorage.setItem('fontSize', size);
  };

  useEffect(() => {
    // Retrieve the last selected font size from localStorage on component mount
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    handleFontSizeChange(savedFontSize);
  }, [rendition]); // Dependency array includes rendition to ensure it re-applies correctly

  return (
    <div>
      <button onClick={() => handleFontSizeChange("small")}>Small</button>
      <button onClick={() => handleFontSizeChange("medium")}>Medium</button>
      <button onClick={() => handleFontSizeChange("large")}>Large</button>
    </div>
  );
};

export default FontSizeSelector;
