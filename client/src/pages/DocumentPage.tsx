import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

// Import apis
// import { Docs_API } from 'src/apis';

// Import hooks
import { useDocumentOutline } from 'src/hooks/useDocumentOutlineState';
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import layouts
import ThreeColumnLayout from 'src/layouts/ThreeColumnLayout';

// Import components
import Dropdown from 'src/components/dropdown/Dropdown';

// Import route names
import { RouteNames } from 'src/routenames';

import { DocumentPageLocalState as __LOCALSTATE__ } from './states/DocumentPage';

// Import types
import type { DocumentOutlineItemData } from 'src/apis/docs';

export default function DocumentPage() {
  const { documentOutline, documentOutlineDispatcher } = useDocumentOutline();
  const [state, stateFns] = useStateWESSFns(__LOCALSTATE__.getInitialState(), __LOCALSTATE__.getStateFns);
  const navigate = useNavigate();

  React.useEffect(function() {
    documentOutlineDispatcher.getPlayerIDAsync();
  }, []);

  return (
    <ThreeColumnLayout
      leftSide={(
        <div className="p-4">
          {
            documentOutline.data.map(function(data, index) {
              return (
                <Dropdown<DocumentOutlineItemData>
                  key={index}
                  title={data.title}
                  items={data.items}
                  onSelectItem={function(item) { navigate(RouteNames.Document.Path + "/" + item.value) }}
                  renderItem={function(item) {
                    return (
                      <h1 className="font-bold">{item.title}</h1>
                    )
                  }}
                />
              )
            })
          }
        </div>
      )}
      mainSide={(
        <div className="max-w-[960px] mx-auto p-4">
          <Outlet />
        </div>
      )}
      rightSide={(
        <div className="p-4">
          <h1>Tổng quan</h1>
        </div>
      )}
    />
  )
}