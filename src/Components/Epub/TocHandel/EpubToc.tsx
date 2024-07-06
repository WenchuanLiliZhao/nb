import React, { useEffect, useState } from "react";
import { Rendition, NavItem } from "epubjs";
import TocToggle from "./TocToggle";

interface EpubTocProps {
  rendition: Rendition | null;
}

const EpubToc: React.FC<EpubTocProps> = ({ rendition }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!rendition) return;

    // Load table of contents
    rendition.book.loaded.navigation.then((navigation) => {
      const navContainer = document.getElementById("toc");
      if (!navContainer) return;

      const buildTocItems = (parent: HTMLElement, tocItems: NavItem[]) => {
        const ul = document.createElement("ul");

        tocItems.forEach((chapter: NavItem) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = chapter.label;
          a.href = chapter.href;

          a.addEventListener("click", (e) => {
            e.preventDefault();
            rendition.display(chapter.href);
          });

          li.appendChild(a);

          if (chapter.subitems) {
            buildTocItems(li, chapter.subitems);
          }

          ul.appendChild(li);
        });

        parent.appendChild(ul);
      };

      // Clear TOC container and build new TOC
      navContainer.innerHTML = "";
      buildTocItems(navContainer, (navigation as unknown) as NavItem[]);
    });
  }, [rendition]);

  // 此处调用 TocToggle.tsx
  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`table-of-contents`}>
      <TocToggle onClick={handleToggleClick} isOpen={isOpen} />
      <div id="navigation" className={`toc-list ${isOpen ? "open" : "close"}`}>
        <div id="toc"></div>
      </div>
    </div>
  );
};

export default EpubToc;
