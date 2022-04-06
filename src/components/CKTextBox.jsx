import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

import useStore from '../stores/useStore';

import { MergeFields } from './MergeFields';

const style = {
  height: '2rem',
  width: '12rem',
  margin: '1rem auto', 
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
 
};

const editor = <CKEditor />
console.log(editor.editor)


const CKTextBox = () => {
  const EditorEl = useRef('testeRef');
  console.log(EditorEl)
  
  function inputField (e) {
    editor = e.target.value;
    return console.log(editor)
  }
  // const setName = useStore(state => state.setName)
  // const name = useStore(state => state.name);
  const [template, setTemplate] = useState('Início template');
 
    const campo = 'merge_fields';

    const templateCampo = template.toString().replace(`@{}`, campo)
    console.log(templateCampo)
 
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => ({ name: 'Template' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
      }
      else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
  
  return (
    <div style={{display: 'flex', margin: '0 auto', flexDirection: 'column', maxWidth: '1000px'}}>
      <div ref={drop} style={{ ...style, backgroundColor }}>
        {isActive ? 'Release to drop' : template }
      </div>
      <div>
        <MergeFields name="Nome Completo" pasteField="MergeTest"  />
      </div>
      <div>
        <h2 >Novo Template</h2> 
        
        <CKEditor id="ckeditor" ref={EditorEl}
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

      </div>
    </div>); 
}

export default CKTextBox;
