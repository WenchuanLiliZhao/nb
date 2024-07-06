/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import ePub from 'epubjs';

const EpubReader: React.FC = () => {
  const renditionRef = useRef<any>(null);

  useEffect(() => {
    const book = ePub("https://s3.amazonaws.com/moby-dick/moby-dick.epub");
    const rendition = book.renderTo("area", { width: 600, height: 400 });
    rendition.display();
    renditionRef.current = rendition; // Store the rendition in the ref for later use

    return () => {
      // Cleanup book and rendition on component unmount
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
      book.destroy();
    };
  }, []);

  const prevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  const nextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  return (
    <div className="main">
      <div id="prev" onClick={prevPage} className="arrow">戻る</div>
      <div id="wrapper">
        <div id="area"></div>
      </div>
      <div id="next" onClick={nextPage} className="arrow">進む</div>
    </div>
  );
};

export default EpubReader;
