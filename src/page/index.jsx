import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import useStore from '../stores/useStore';

//COMPONENTS
import Button from '../components/Button';
import ModalSubmit from '../components/ModalSubmit';
import StatusCard from '../components/StatusCard';

//STYLES
import colors from '../styles/colors';
import { Col } from '../styles/grid';
import { 
  BtnContainer, 
  PageContainer, 
  Title,
  CardsWrapper,
  InputTemplateName 
} from './style';

const CKTextBox = () => {
  
  const [template, setTemplate] = useState('Digite aqui..');
  const [disabled, setDisabled] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [statusCards, setStatusCards] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [saveTemplate, setSaveTemplate] = useState({});
  const [storage, setStorage] = useState({});
  const [templateList, setTemplateList] = useState({});
  
  useEffect(() => {

    let arrayTemplateNameList = Object.keys(localStorage);
      
    console.log(arrayTemplateNameList)
  
    setTemplateList(arrayTemplateNameList)

    const items = { ...localStorage };
    console.log(items)
    
  }, []);
  
  // console.log(storage)
  // console.log(templateList)
  
  const currentDate = new Date().toLocaleDateString();
  
  // TO MAKE THE MERGE FIELDS INPUTS
  const mergeFieldsRegex= /[@][{][\w.]+[}]/g;
  let mergeFieldsPattern = new RegExp(mergeFieldsRegex);
  let mergeFieldsList = template.match(mergeFieldsPattern)
  
  let onlyNamesList = mergeFieldsList ? mergeFieldsList.map(item => 
    item
    .replace('@', '')
    .replace('{', '') 
    .replace('}', '')
    ) : null;
    
    let upperCaseList = onlyNamesList ? onlyNamesList.map(item => item.toUpperCase()) : null;
  let formatTemplateName =  upperCaseList ? upperCaseList.map(item => item.replace('_', ' ')) : null;
  console.log(mergeFieldsList);
  console.log(onlyNamesList);
  console.log(upperCaseList);
  console.log(formatTemplateName);
  
  //CREATE AN ARRAY OF OBJECTS TO LOCALSTORAGE
  
  
  const saveTemplateLocalStorage = (key, value) => {
    let newTemplate = {name: templateName, editor: template};
    setSaveTemplate(newTemplate)
    localStorage.setItem(key, value);
    setIsSubmitModalOpen(true);
  };
  
  //OK BUTTON INSIDE MODAL SUBMIT
  const handleCloseSubmitModal = () => {
    
    setIsSubmitModalOpen(false);
    setTemplate('Digite aqui..');
    setTemplateName('');
    window.location.reload()
  };
 
  return (
    <PageContainer>
      {templateList.length > 0 ?
          <CardsWrapper
            alignItems="center"
            justifyContent="flex-start"
          >
            {
              templateList.map((item, index) => (
                <Col key={index} width="25%">
                  <StatusCard 
                    onclick={() => alert(`Abrir formulário para preencher o ${item}`)}
                    title={item}
                    update={`Modificado: ${currentDate}`}
                    // count2={item.count2}
                    // title2={item.title2}
                  />
                </Col>
              ))
            }
          </CardsWrapper>
          : <></>
      }
       
      <Title>Criar novo Template</Title>

      <InputTemplateName>
        <input 
          autoFocus
          maxLength={40} 
          placeholder='Nome do template..'
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </InputTemplateName> 
      
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
      </CKEditor>
      <BtnContainer>
        <div>
          <Button
            bgColor="transparent"
            text="Cancelar"
            color={colors.pureGreen}
            />
        </div>
        <div>
          <Button
            type="submit"
            hoverColor={colors.darkGreen}
            text="Salvar"
            onClick={() => saveTemplateLocalStorage(templateName, template)}
          />
        </div>
      </BtnContainer>

        <ModalSubmit 
          isOpen={isSubmitModalOpen}
          onRequestClose={handleCloseSubmitModal} 
          sendFile={true} 
          status={errorModal ? "Ops, erro ao tentar salvar o Template! Por gentileza, tente novamente!" : `Template ${templateName} salvo com sucesso!`} 
          statusImg={errorModal ? "fas fa-exclamation-triangle" : "far fa-check-circle"} 
          confirmation={true} 
        />

    </PageContainer>
  ); 
}

export default CKTextBox;
