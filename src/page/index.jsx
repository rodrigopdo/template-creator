import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//COMPONENTS
import Button from '../components/Button';
import ModalSubmit from '../components/ModalSubmit';
import ModalForm from '../components/ModalForm';
import StatusCard from '../components/StatusCard';

//STYLES
import colors from '../styles/colors';
import { Col } from '../styles/grid';
import { 
  BtnContainer, 
  PageContainer, 
  Title,
  CardsWrapper,
  HeaderEditor,
  EditorFooter
} from './styles';

import ModalImage from '../assets/no_template.svg';

const Editor = () => {
  
  const [template, setTemplate] = useState('');
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateList, setTemplateList] = useState({});
  const [inputMergeFieldValue, setInputMergeFieldValue] = useState();
  const [lastUpdate, setLastUpdate] = useState('');
  const [arrayOfInputValue, setArrayOfInputValue] = useState([]);
  const [isSaveButtonShow, setIsSaveButtonShow] = useState(true);
  
  //UPDATE CHANGES
  useEffect(() => {
    
    const getFullTemplate = (JSON.parse(localStorage.getItem(templateName)))
    const getUpdate= getFullTemplate[2];
    setLastUpdate(getUpdate);
    
  }, [localStorage]);

  console.log(localStorage);

  useEffect(() => {
    
  let arrayTemplateNameList = Object.keys(localStorage);
    setTemplateList(arrayTemplateNameList);
    console.log(arrayTemplateNameList);

    if(templateName != '') {
      setIsSaveButtonDisabled(false);
    }else {
      setIsSaveButtonDisabled(true);
    }
    
    if(templateName != '') {
      setIsCancelButtonDisabled(false);
    }else {
      setIsCancelButtonDisabled(true);
    }
    
  }, [template, templateName]);
  
  //JODIT EDITOR
  const joditEditor = useRef(null)
  const config = {
    readonly: false,
    height: 400,
    placeholder: 'Digite aqui...'
  };
 
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
    let formattedTemplateListName =  upperCaseList ? upperCaseList.map(item => item.replace(/_/g, ' ')) : null;

    console.log(mergeFieldsList);
    console.log(onlyNamesList);
    console.log(upperCaseList);
    console.log(formattedTemplateListName);
    
  const saveTemplateLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem(templateName, JSON.stringify([template, formattedTemplateListName, currentDate]));
   
    setIsSubmitModalOpen(true);
  };
  
  //OK BUTTON INSIDE MODAL SUBMIT
  const handleCloseSubmitModal = () => {
    
    setIsSubmitModalOpen(false);
    setTemplate('Digite aqui..');
    setTemplateName('');
    window.location.reload()
  };

  //TOGGLE FORM MODAL
  const handleFormModal = (status, templateStorageKey) => {

    setIsFormModalOpen(status);

    const getFullTemplate = (JSON.parse(localStorage.getItem(templateStorageKey)))
    const getArrayOfMergeFieldNames = getFullTemplate[1];
    const getCurrentTemplateString = getFullTemplate[0];
    setInputMergeFieldValue(getArrayOfMergeFieldNames)
    setTemplate(getCurrentTemplateString.toString()); 
    setTemplateName(templateStorageKey);
    console.log(getArrayOfMergeFieldNames);
    console.log(getCurrentTemplateString);
  }
  let inputValueArray = [];

  const fillPdfMergeFields = () => {
    
    let inputEl;
    
    for(let i = 0; i <= inputValueArray.length; i++) {
      if(document.getElementById(`input${i}`) != null) {
        inputEl = document.getElementById(`input${i}`).value;
        inputValueArray.push(inputEl);
        // localStorage.setItem('typedInput' ,JSON.stringify(inputValueArray));
        setArrayOfInputValue(inputValueArray)
      }
    }
  }
  // console.log(arrayOfInputValue);
  
  const replaceMergeFields = (e) => {
    
    let templateReplaced = template;
    
    arrayOfInputValue.map((item) => {
      templateReplaced = templateReplaced.replace(/[@][{][\w.]+[}]/, item)
      setTemplate(templateReplaced)
    });
      
    e.preventDefault();
    setIsFormModalOpen(false);
    setIsSaveButtonShow(false);
  }
  
  console.log(template);

  const editOrRemoveTemplate = (e, templateStorageKey, id) => {

    const elementName = e.target.name; 

    switch (elementName) {
      case 'edit':
        const getFullTemplate = (JSON.parse(localStorage.getItem(templateStorageKey)))
        const getArrayOfMergeFieldNames = getFullTemplate[1];
        const getCurrentTemplateString = getFullTemplate[0];
        setInputMergeFieldValue(getArrayOfMergeFieldNames)
        setTemplate(getCurrentTemplateString.toString()); 
        setTemplateName(templateStorageKey);

        const elementId = document.getElementById(id);
        elementId.classList.remove('active');
        window.scrollBy(0,10000);

        break;
      case 'remove':
        localStorage.removeItem(templateStorageKey)
        window.location.reload()
        break;
      default:
        console.log('Menu item not found!');
    }
  };

  return (
    <PageContainer>
      {!templateList ? 
        <Title>Ainda não há templates salvos.</Title> 
        : 
        <Title>Templates Salvos</Title>
      }

      {templateList.length > 0 ?
        <CardsWrapper
          alignItems="center"
          justifyContent="flex-start"
        >
          {
            templateList.map((item, index) => (
              <Col key={index} width="25%">
                <StatusCard 
                  onClick={() => handleFormModal(true, item)}
                  onClickMenu={(e) => editOrRemoveTemplate(e, item, index)}
                  title={item}
                  update={`Modificado: ${lastUpdate}`}
                  id={index}
                />
              </Col>
            ))
          }
        </CardsWrapper>
        : 
        <></>
      }
      <Title>Criar novo Template</Title>

      <HeaderEditor>
        <div>
          <input 
            autoFocus
            required
            maxLength={40} 
            minLength={5}
            placeholder='Nome do template..'
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
      </HeaderEditor> 

      <JoditEditor 
        ref={joditEditor}
        value={template}
        config={config}
        onBlur={e => setTemplate(e)} 
        // onChange={}
      />
      <EditorFooter>
        <p>Exemplo de entrada de texto: <strong>@{'{nome_completo}'}</strong></p>
      </EditorFooter>
      <BtnContainer>
        <div>
          <Button
            bgColor="transparent"
            text="Cancelar"
            color={colors.pureGreen}
            disabled={isCancelButtonDisabled}
            onClick={() => window.location.reload()}
            />
        </div>
        {isSaveButtonShow ?
          <div>
            <Button
              type="submit"
              hoverColor={colors.darkGreen}
              text="Salvar Template"
              disabled={isSaveButtonDisabled}
              onClick={saveTemplateLocalStorage}
            />
          </div>
          :
          <div>
            <Button
              type="submit"
              hoverColor={colors.darkGreen}
              text="Salvar Edição"
              // onClick={saveTemplateLocalStorage}
            />
          </div>
        }
      </BtnContainer>
      

      <ModalSubmit 
        isOpen={isSubmitModalOpen}
        onRequestClose={handleCloseSubmitModal} 
        sendFile={true} 
        status={errorModal ? "Ops, erro ao tentar salvar o Template! Por gentileza, tente novamente!" : `Template ${templateName} salvo com sucesso!`} 
        statusImg={errorModal ? "fas fa-exclamation-triangle" : "far fa-check-circle"} 
        confirmation={true} 
      />

      <ModalForm 
        isOpen={isFormModalOpen}
        modalTitle={inputMergeFieldValue ? templateName : ""}
        image={ModalImage}
        fieldsNameList={inputMergeFieldValue}
        onRequestClose={() => handleFormModal(false)} 
        onChange={() => fillPdfMergeFields(templateName)} 
        onClickModalFillFields={replaceMergeFields}
      />

    </PageContainer>
  ); 
}

export default Editor;
