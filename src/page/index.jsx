import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import useStore from '../stores/useStore';

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
  InputTemplateName 
} from './styles';

const CKTextBox = () => {
  
  const [template, setTemplate] = useState('Digite aqui..');
  const [disabled, setDisabled] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [statusCards, setStatusCards] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [saveTemplate, setSaveTemplate] = useState({});
  const [storage, setStorage] = useState({});
  const [templateList, setTemplateList] = useState({});
  const [inputMergeFieldValue, setInputMergeFieldValue] = useState();
  const [typedNameMergeField, setTypedNameMergeField] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [arrayOfInputValue, setArrayOfInputValue] = useState([]);
  // const [currentTemplate, setTemplate] = useState('');

  // const inputModalEl = useRef('dfdfd');
  // console.log(inputModalEl.current)

  // const inputValue = inputModalEl.current;
  // console.log(inputValue)

  useEffect(() => {

    let arrayTemplateNameList = Object.keys(localStorage);
    setTemplateList(arrayTemplateNameList)
    console.log(arrayTemplateNameList)
      
    // const getFullTemplate = (JSON.parse(localStorage.getItem('CPR Vigor')))
    // const getItemtwo = getFullTemplate[1];
    // console.log(getItemtwo)
    const storedTime = localStorage.getItem('currentTime');
    if(!storedTime) localStorage.setItem('currentTime', new Date().toLocaleDateString());
    setLastUpdate(localStorage.getItem('currentTime'));


    const items = { ...localStorage };
    console.log(items)
  
  }, []);

  //HOOK TO FILL MERGE FIELDS IN PDF
  // useEffect(() => {
    
  //   const getTemplateData = () => {
  //     const templateData = (JSON.parse(localStorage.getItem(templateName)))     
  //     const getTemplateString = templateData[0];
  //     console.log(getTemplateString)
  //     getTemplateString.replace()
  //   } 

  // }, []);

  //  useEffect(() => {
  //   inputModalEl.current = typedNameMergeField;
  // }, [typedNameMergeField]);
  
  

  // const getInputValue = (e) => {
  //   const typedValue = e.inputModalEl.current.value;
  //   setTypedNameMergeField(typedValue);
  // }
  
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
    let formattedTemplateListName =  upperCaseList ? upperCaseList.map(item => item.replace(/_/g, ' ')) : null;

    console.log(mergeFieldsList);
    console.log(onlyNamesList);
    console.log(upperCaseList);
    console.log(formattedTemplateListName);
    
  const saveTemplateLocalStorage = () => {

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

    setOpenModal(status);

    const getFullTemplate = (JSON.parse(localStorage.getItem(templateStorageKey)))
    const getArrayOfMergeFieldNames= getFullTemplate[1];
    const getCurrentTemplateString = getFullTemplate[0];
    setInputMergeFieldValue(getArrayOfMergeFieldNames)
    setTemplate(getCurrentTemplateString.toString()); 

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
    // console.log(inputValueArray);
    // console.log(arrayOfInputValue);
    console.log(template);
  }
  console.log(arrayOfInputValue);

  let templateReplaced = "";
  
  const fillMergeFields = (e) => {

    for (let item in arrayOfInputValue) {
      if(item != null) {
        templateReplaced = template.replace( /[@][{][\w.]+[}]/ , arrayOfInputValue[item]);
        setTemplate(templateReplaced);
        console.log(item);
      } 
    }

    // for (let i = 0; i <= arrayOfInputValue.length; i++) {

    //   templateReplaced = template.replace(/[@][{][\w.]+[}]/, arrayOfInputValue[i])
      
    //   console.log(arrayOfInputValue[0]);
    // }
    console.log(arrayOfInputValue);
    console.log(arrayOfInputValue.length);
    console.log(template);
    console.log(templateReplaced);

    e.preventDefault();
  }

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
                    onclick={() => handleFormModal(true, item)}
                    title={item}
                    update={`Modificado: ${lastUpdate}`}
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
            onClick={saveTemplateLocalStorage}
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

        <ModalForm 
          isOpen={openModal}
          fieldsNameList={inputMergeFieldValue}
          onRequestClose={() => handleFormModal(false)} 
          onChange={() => fillPdfMergeFields(templateName)} 
          onClickModalFillFields={fillMergeFields}
        />

    </PageContainer>
  ); 
}

export default CKTextBox;
