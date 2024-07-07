import React, { useEffect, useRef, useState } from "react";
import ePub, { Rendition } from "epubjs";
import "./Style.scss";
import EpubToc from "./TocHandel/EpubToc";  // 导入新组件
import FontSizeSelector from "./Functions/FontSizeSelector";

interface EpubViewerProps {
  bookUrl: string;
}

interface RenditionOptions {
  flow: string;  // Keeping it simple; adjust according to actual spec
  width: string;
  height: string;
}

interface Section {
  href: string;
  next: () => Section | null;
  prev: () => Section | null;
}

const EpubViewer: React.FC<EpubViewerProps> = ({ bookUrl }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);

  useEffect(() => {
    const book = ePub(bookUrl);
    const rend = book.renderTo(viewerRef.current as HTMLElement, {
      flow: "auto",
      width: "100%",
      height: "100%",
    } as RenditionOptions);
    setRendition(rend);

    const hash = window.location.hash.slice(2);
    rend.display(hash || undefined);

    return () => {
      rend.destroy();
    };
  }, [bookUrl]);

  useEffect(() => {
    if (!rendition) return;

    const handlePrevClick = (e: MouseEvent) => {
      e.preventDefault();
      rendition.prev();
    };

    const handleNextClick = (e: MouseEvent) => {
      e.preventDefault();
      rendition.next();
    };

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton?.addEventListener("click", handlePrevClick);
    nextButton?.addEventListener("click", handleNextClick);

    return () => {
      prevButton?.removeEventListener("click", handlePrevClick);
      nextButton?.removeEventListener("click", handleNextClick);
    };
  }, [rendition]);

  useEffect(() => {
    if (!rendition) return;

    rendition.on("rendered", (section: Section) => {
      const nextSection = section.next();
      const prevSection = section.prev();

      const nextButton = document.getElementById("next");
      const prevButton = document.getElementById("prev");

      if (nextSection && nextButton) {
        const nextNav = rendition.book.navigation.get(nextSection.href);
        nextButton.textContent = nextNav ? `${nextNav.label} »` : "next »";
      }

      if (prevSection && prevButton) {
        const prevNav = rendition.book.navigation.get(prevSection.href);
        prevButton.textContent = prevNav ? `« ${prevNav.label}` : "« previous";
      }

      window.location.hash = `#/${section.href}`;
    });

    rendition.on("relocated", (location: Location) => {
      console.log(location);
    });
  }, [rendition]);

  return (
    <div className="container">
      <div id="test1"></div>

      <div id="toc-container">
        <EpubToc rendition={rendition} />  {/* 使用新组件 */}
      </div>

      <div id="main">
        <div id="viewer" ref={viewerRef}></div>
      </div>

      <FontSizeSelector rendition={rendition} />

      <div id="pagination">
        <a id="prev" href="#prev" className="arrow">...</a>
        <a id="next" href="#next" className="arrow">...</a>
      </div>

      <div id="test2"></div>
    </div>
  );
};

export default EpubViewer;
