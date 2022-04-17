import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
// import { addDoc, collection } from 'firebase/firestore';

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

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

const firebaseApp = initializeApp( {
  apiKey: "AIzaSyBtdRCyl5-8apWsegyT73P1lXaN5Bzb4GA",
  authDomain: "template-poc-36ee9.firebaseapp.com",
  projectId: "template-poc-36ee9",
  storageBucket: "template-poc-36ee9.appspot.com",
  messagingSenderId: "200222506514",
  appId: "1:200222506514:web:4f162934018bed4503e2cb"
});

const database = getFirestore()

const specialOfTheDay = doc(database, 'dailySpecial/2021-09-14');
function writeDailySpecial() {
  const docData = {
    description: 'A delicious vanilla latte',
    price: 3.99,
    milk: 'Whofddddddf',
    vegan: false,
  };
  // setDoc(specialOfTheDay, docData, {merge: false});
  setDoc(specialOfTheDay, docData);
}

writeDailySpecial();


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

  
  useEffect(() => {
   
    //FIREBASE
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
  
  const joditEditor = useRef(null)
  const config = {
    readonly: false,
    height: 400,
    placeholder: 'Digite aqui...'
  };
 
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
    
  //FIREBASE
  const saveTemplateLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem(templateName, JSON.stringify([template, formattedTemplateListName, currentDate]));
   
    setIsSubmitModalOpen(true);
  };
  
  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setTemplate('Digite aqui..');
    setTemplateName('');
    window.location.reload()
  };

  //FIREBASE
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
  };
  
  const fillMergeFields = () => {
    
    let inputValueArray = [];
    let inputEl;
    
    for(let i = 0; i <= inputValueArray.length; i++) {
      if(document.getElementById(`input${i}`) != null) {
        inputEl = document.getElementById(`input${i}`).value;
        inputValueArray.push(inputEl);
       
        setArrayOfInputValue(inputValueArray)
      }
    }
  }
  console.log(arrayOfInputValue);
  
  const replaceMergeFields = (e) => {
    
    let templateReplaced = template;
    
    arrayOfInputValue.map((item) => {
      templateReplaced = templateReplaced.replace(/[@][{][\w.]+[}]/, item)
      setTemplate(templateReplaced)
    });
      
    setIsFormModalOpen(false);
    setIsSaveButtonShow(false);
    e.preventDefault();
    window.scrollBy(0, 10000);
  }
  console.log(template);

  //FIREBASE
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
              text="Salvar Documento"
              onClick={() => alert('Salvo no Firebase...')}
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
        onChange={fillMergeFields} 
        onClickModalFillFields={replaceMergeFields}
      />

    </PageContainer>
  ); 
}

export default Editor;
