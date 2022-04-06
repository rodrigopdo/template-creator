import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import useStore from '../stores/useStore';

const CKTextBox = () => {
  
  const [template, setTemplate] = useState('Início template');
 
    const regex= /[@][{][\w.]+[}]/g;
    let pattern = new RegExp(regex)
    console.log(template.match(pattern));

    const templateCampo = template.toString()
   
    console.log(templateCampo)
 
  return (

    <div style={{display: 'flex', margin: '0 auto', flexDirection: 'column', maxWidth: '1000px'}}>
       <h2 >Novo Template</h2> 
        
        <CKEditor id="ckeditor" 
          editor={ ClassicEditor }
          data={template}
          onReady={ editor => {
            // you can store the "editor" and use when it is needed.
            console.log( 'editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            setTemplate(data)
          
            console.log( { event, editor, template } );
          } }
          onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
            
          } }
        >
          <div>
            teste
          </div>
        </CKEditor>
    </div>); 
}

export default CKTextBox;
