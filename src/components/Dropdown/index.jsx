import React, { useRef, useState, useEffect } from 'react';

import {
  DropdownContainer,
  DropdownContent,
  DropdownToggle
} from './styles';

import menu_list_dropdown from '../../data/menu_list_dropdown.json';

const clickOutsideRef = (content_ref, toggle_ref, dropdown, setDropdown) => {
  document.addEventListener('mousedown', (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target) && !dropdown) {
      content_ref.current.classList.add('active');
      setDropdown(true);
    } else {
      if (content_ref.current && !content_ref.current.contains(e.target) && dropdown) {
      content_ref.current.classList.remove('active')
      setDropdown(false)
      }
    }
  });
}

const Dropdown = ({image, onClick, id}) => {

  const [dropdown, setDropdown] = useState(false)

  const dropdown_content_el = useRef(null);
  const dropdown_toggle_el = useRef(null);

  useEffect(() => {
    clickOutsideRef(dropdown_content_el, dropdown_toggle_el, dropdown, setDropdown);
  });

  return (
    <DropdownContainer>
      <DropdownToggle ref={dropdown_toggle_el}>
        <img src={image} alt="Menu" />
      </DropdownToggle>
      
      <DropdownContent id={id} ref={dropdown_content_el}>
        {menu_list_dropdown ? menu_list_dropdown.map((item, index) => (  
          <div key={index}>
            <button name={item.element_name} type='button' onClick={onClick}>{item.display_name}</button>
          </div>
        )) : <></>}
        </DropdownContent>
    </DropdownContainer>
  )
}

export default Dropdown;
