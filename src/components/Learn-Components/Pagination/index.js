import React, { useState, useEffect } from "react";
import Button from "../../../reusecore/Button";
import { PaginationWrapper } from "./paginate.style";
import { getActiveServiceMesh } from "../../../utils/getActiveServiceMesh";
import { getCurrentPage } from "../../../utils/getCurrentPage";

const Pagination = ({ TOCData, chapterData, location }) => {

  const [path, setPath] = useState("");

  const availableChapters = TOCData.filter(toc => toc.fields.section === getActiveServiceMesh(chapterData))
    .map(toc => toc.fields.chapter);

  useEffect(() => {
    const path = location.pathname.split("/");
    if(path[1] === "learn-ng"){
      setPath(getCurrentPage(location));
    } else
      return;
  }, [location.pathname]);

  const currentChapterIndx = availableChapters.indexOf(path);
  let nextChapter = "";
  let nextChapterTitle = "";
  if(currentChapterIndx + 1 <= availableChapters.length - 1) {
    nextChapter = availableChapters[currentChapterIndx + 1];
    for(let i = 0; i < TOCData.length; i++){
      if(TOCData[i].fields.chapter === nextChapter &&
          TOCData[i].fields.section === getActiveServiceMesh(chapterData)){
        nextChapterTitle = TOCData[i].frontmatter.chapterTitle;
        break;
      }
    }
  }

  return (
    nextChapter !== "" ? (
      <PaginationWrapper>
        <h4 className="next-chapter">
                    NEXT CHAPTER
        </h4>
        <div className="paginate-section">
          <h3 className="next-chapter-heading">
            {nextChapterTitle}
          </h3>
          <div className="chapter-link">
            <Button secondary title="Next Chapter"
              url={`/learn-ng/${chapterData.fields.learnpath}/${chapterData.fields.course}/${getActiveServiceMesh(chapterData)}/${nextChapter}/`}
              external={false} />
          </div>
        </div>
      </PaginationWrapper>
    )
      : null
  );
};

export default Pagination;
