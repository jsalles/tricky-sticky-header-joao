import React, { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import { ShowMoreButton } from "react-instantsearch-hooks-web/dist/es/ui/ShowMoreButton";
// https://github.com/bvaughn/react-virtualized/issues/1739
import {
  AutoSizer as _AutoSizer,
  Grid as _Grid,
  GridProps,
  WindowScroller as _WindowScroller,
  WindowScrollerProps,
  InfiniteLoader as _InfiniteLoader,
  InfiniteLoaderProps,
} from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

const Grid = _Grid as unknown as React.FC<GridProps>;
_InfiniteLoader as unknown as React.FC<InfiniteLoaderProps>;
const WindowScroller =
  _WindowScroller as unknown as React.FC<WindowScrollerProps>;

export function InfiniteHits({ hitComponent: HitComponent, ...props }: any) {
  const { hits, showMore } = useInfiniteHits(props);

  const containerWidth = 1180;
  const rowHeight = 154;
  const columnWidth = 284;

  const columnCount = Math.floor(containerWidth / columnWidth);

  return (
    <>
      <WindowScroller serverWidth={containerWidth}>
        {({ height }) => {
          const rowCount = Math.floor(height / rowHeight);
          return (
            <Grid
              containerStyle={{
                width: containerWidth,
                maxWidth: undefined,
                height: "auto",
                maxHeight: undefined,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              style={{
                width: containerWidth,
                maxWidth: undefined,
              }}
              height={height}
              width={containerWidth}
              autoHeight
              autoWidth
              rowCount={rowCount}
              columnCount={columnCount}
              rowHeight={rowHeight}
              columnWidth={columnWidth}
              cellRenderer={({ key, rowIndex, columnIndex }) =>
                hits[rowIndex * rowCount + columnIndex] && (
                  <div key={key} className="ais-InfiniteHits-item">
                    <HitComponent
                      hit={hits[rowIndex * rowCount + columnIndex]}
                    />
                  </div>
                )
              }
            />
          );
        }}
      </WindowScroller>
      <button onClick={showMore}>Show More</button>
    </>
  );
}
