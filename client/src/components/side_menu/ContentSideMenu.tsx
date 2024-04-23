// import React from 'react';

// Import from layouts
import SideLayout from 'src/layouts/SideLayout';

// Import types
import type { CustomizedModalItemProps } from 'tunangn-react-modal';

/**
 * __Composition__
 * 
 * Component renders a side menu or drawer.
 * @param props 
 * @returns 
 */
export default function ContentSideMenu(props: CustomizedModalItemProps) {
  return (
    <SideLayout
      titleElement={(
        <h1 className="font-bold text-2xl">
          Content
        </h1>
      )}
      bodyElement={(
        <div>

        </div>
      )}
      modalItemProps={props}
    />
  )
}