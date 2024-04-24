import React from 'react'

// Import hooks
import { useStateWESSFns } from 'src/hooks/useStateWESSFns'

// Import types
import type { DropdownProps } from './Dropdown.props'

import { DropdownLocalState as __LOCALSTATE__ } from './state/Dropdown';
import Button from '../buttons/Button';

export default function Dropdown<N>(props: DropdownProps<N>) {
  const [state, stateFns] = useStateWESSFns(__LOCALSTATE__.getInitialState(), __LOCALSTATE__.getStateFns);

  const __Items = React.useMemo(function() {
    return props.items.map(function(item, index) {
      return (
        <li key={index}>
          <Button
            buttonType="normal"
            colorType="background"
            extendClassName="flex justify-between w-full px-3 py-2 rounded-lg hover:bg-primary/10"
            hasFocusOutline={false}  
            onClick={() => props.onSelectItem(item)}
          >
            {props.renderItem(item)}
          </Button>
        </li>
      )
    })
  }, []);

  return (
    <section>
      <Button
        colorType="background"
        extendClassName="flex justify-between w-full hover:bg-primary/10"
        hasFocusOutline={false} 
        onClick={function() { stateFns.toggleIsOpen() }}
      >
        <h1 className="uppercase">{props.title}</h1>
        {/* <span className="material-symbols-outlined">{state.isOpen ? "expand_more" : "chevron_right"}</span> */}
        <span className={"material-symbols-outlined" + (state.isOpen ? " rotate-90" : "")}>chevron_right</span>
      </Button>
      {
        state.isOpen && (<ul>{__Items}</ul>)
      }
    </section>
  )
}