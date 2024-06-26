import React from 'react';
import cn from 'classnames';

// Import hooks
import { useStateWESSFns } from 'src/hooks/useStateWESSFns';

// Import components
import Button from '../buttons/Button';

// Import types
import type { DropdownProps } from './Dropdown.props'

import { DropdownLocalState as __LOCALSTATE__ } from './state/Dropdown';

export default function Dropdown<N>(props: DropdownProps<N>) {
  const [state, stateFns] = useStateWESSFns(__LOCALSTATE__.getInitialState(), __LOCALSTATE__.getStateFns);

  const __Items = React.useMemo(function() {
    return props.items.map(function(item, index) {
      return (
        <li key={index}>
          <Button
            colorType="background"
            extendClassName="flex justify-between w-full rounded-lg hover:bg-primary/10"
            hasFocusOutline={false}  
            onClick={() => props.onSelectItem(item)}
          >
            {props.renderItem(item)}
          </Button>
        </li>
      )
    })
  }, []);

  React.useEffect(function() {
    stateFns.setIsOpen(true);
  }, []);

  return (
    <section>
      <Button
        colorType="background"
        extendClassName="flex justify-between w-full hover:bg-primary/10"
        hasFocusOutline={false} 
        onClick={function() {
          stateFns.toggleIsOpen();
          console.log("Hello: ", props.topValue);

          if(props.topValue !== undefined)
            stateFns.updateSelectedItem(props.topValue);
          
          if(props.topValue !== undefined && props.onSelectTop) {
            props.onSelectTop(props.topValue);
          }
        }}
      >
        <h1 className="font-bold uppercase text-lg">{props.title}</h1>
        {/* <span className="material-symbols-outlined">{state.isOpen ? "expand_more" : "chevron_right"}</span> */}
        <span
          className={
            cn("material-symbols-outlined", { "rotate-90": state.isOpen, "": !state.isOpen })
          }
        >
          chevron_right
        </span>
      </Button>
      {
        state.isOpen && (<ul>{__Items}</ul>)
      }
    </section>
  )
}