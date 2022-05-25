import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  getDoc, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  updateDoc 
} from 'firebase/firestore';

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

//ASSETS
import ModalImage from '../assets/no_template.svg';


const firebaseApp = initializeApp( {
  apiKey: "AIzaSyBtdRCyl5-8apWsegyT73P1lXaN5Bzb4GA",
  authDomain: "template-poc-36ee9.firebaseapp.com",
  projectId: "template-poc-36ee9",
  storageBucket: "template-poc-36ee9.appspot.com",
  messagingSenderId: "200222506514",
  appId: "1:200222506514:web:4f162934018bed4503e2cb"
});

const database = getFirestore(firebaseApp);

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
  const [arrayOfInputValue, setArrayOfInputValue] = useState([]);
  const [isSaveButtonShow, setIsSaveButtonShow] = useState(true);
  const [isSaveEditionModalOpen, setIsSaveEditionModalOpen] = useState(false);
  const [isSaveDocumentModalOpen, setIsSaveDocumentModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState('Documento sem nome');
  
  async function getMergefieldNames() {
    const newArrayNameList = [];
    const q = query(collection(database, "templates"));
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      newArrayNameList.push(doc.id);
      console.log(doc.id, " => ", doc.data());
      console.log(querySnapshot.content);
    });
    console.log(newArrayNameList);
    setTemplateList(newArrayNameList);
  }

  useEffect(() => {
    getMergefieldNames();
  }, [])
  
  useEffect(() => {
    // let arrayTemplateNameList = Object.keys(localStorage);
    // setTemplateList(arrayTemplateNameList);
    // console.log(localStorage);
    // console.log(arrayTemplateNameList);
    if(templateName !== '') {
      setIsSaveButtonDisabled(false);
    }else {
      setIsSaveButtonDisabled(true);
    }
    if(templateName !== '') {
      setIsCancelButtonDisabled(false);
    }else {
      setIsCancelButtonDisabled(true);
    }
  }, [templateName]);
  
  const joditEditor = useRef(null)
  const config = {
    readonly: false,
    height: 600,
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
    let mergeFieldsListName =  upperCaseList ? upperCaseList.map(item => item.replace(/_/g, ' ')) : null;

    console.log(mergeFieldsList);
    console.log(onlyNamesList);
    console.log(upperCaseList);
    console.log(mergeFieldsListName);
    
  const saveTemplate = () => {
    const editedDocument = doc(database, `templates/${templateName}`);
    function writeDocument() {
      const docData = {
        documentName: templateName,
        content: template,
        mergeFieldList: mergeFieldsListName,
      };
      setDoc(editedDocument, docData, { merge: true});
    }
    writeDocument();
    setIsSubmitModalOpen(true);
    // localStorage.setItem(templateName, JSON.stringify([template, mergeFieldsListName]));
  };
  
  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
    window.location.reload()
  };

  const handleCloseSaveEditionModal = () => {
  setIsSaveEditionModalOpen(false);
    window.location.reload()
  };

  const handleSaveDocumentModal = (status) => {
    setIsSaveDocumentModalOpen(status);
  };

  const handleFormModal = async (status, templateStorageKey) => {
    // const getFullTemplate = (JSON.parse(localStorage.getItem(templateStorageKey)))
    // const getArrayOfMergeFieldNames = getFullTemplate[1];
    // const getCurrentTemplateString = getFullTemplate[0];
    const docRef = doc(database, "templates", templateStorageKey);
    const docSnap = await getDoc(docRef);
    const getFullTemplate = docSnap.data();
    const getArrayOfMergeFieldNames = getFullTemplate.mergeFieldList;
    const getCurrentTemplateString = getFullTemplate.content;
  
    console.log(docSnap);
    console.log(getFullTemplate);
    console.log(getArrayOfMergeFieldNames);
    console.log(getCurrentTemplateString);
   
    setInputMergeFieldValue(getArrayOfMergeFieldNames)
    setTemplate(getCurrentTemplateString); 
    setTemplateName(templateStorageKey);
    setIsFormModalOpen(status);
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
  const editOrRemoveTemplate = async (e, templateStorageKey, id) => {

    const elementName = e.target.name; 

    switch (elementName) {
      case 'edit':

        const docRef = doc(database, "templates", templateStorageKey);
        const docSnap = await getDoc(docRef);
        const getFullTemplate = docSnap.data();
        const getArrayOfMergeFieldNames = getFullTemplate.mergeFieldList;
        const getCurrentTemplateString = getFullTemplate.content;

        // const getFullTemplate = (JSON.parse(localStorage.getItem(templateStorageKey)))
        // const getArrayOfMergeFieldNames = getFullTemplate[1];
        // const getCurrentTemplateString = getFullTemplate[0];

        setInputMergeFieldValue(getArrayOfMergeFieldNames)
        setTemplate(getCurrentTemplateString.toString()); 
        setTemplateName(templateStorageKey);

        const elementId = document.getElementById(id);
        elementId.classList.remove('active');
        window.scrollBy(0,10000);
        break;

      case 'remove':
        await deleteDoc(doc(database, "templates", templateStorageKey));
        window.location.reload()

        // localStorage.removeItem(templateStorageKey)

        break;
      default:
        console.log('Menu item not found!');
    }
  };

  const saveDocumentEdition = () => {
    const editedDocument = doc(database, `documents/${templateName}`);
    function writeDoc() {
      const docData = {
        documentType: templateName,
        content: template,
      };
      setDoc(editedDocument, docData, { merge: true });
    }
    writeDoc();
    // window.location.reload()
    setTemplate('');
    setTemplateName('');
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
                  update={`Modificado: ${'18/04/2022'}`} //SET CURRENT DATE
                  id={index}
                />
              </Col>
            ))
          }
        </CardsWrapper>
        : 
        <></>
      }
      {isSaveButtonShow ?
      <Title>Criar novo Template</Title>
      :
      <Title>Salvar Documento</Title>
      }
      <HeaderEditor>
        <div>
          {/* {isDocumentEdition ? */}
            <input 
              autoFocus
              required
              maxLength={40} 
              minLength={5}
              placeholder='Insira o nome...'
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            {/* : */}
            {/* <input 
              autoFocus
              required
              maxLength={40} 
              minLength={5}
              placeholder='Nome do documento..'
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
          /> */}
          {/* } */}
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
            // disabled={isCancelButtonDisabled}
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
              onClick={saveTemplate}
            />
          </div>
          :
          <div>
            <Button
              type="submit"
              hoverColor={colors.darkGreen}
              text="Salvar Documento"
              onClick={saveDocumentEdition}
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
      <ModalSubmit 
        isOpen={isSaveEditionModalOpen}
        onRequestClose={() => setIsSaveEditionModalOpen(false)} 
        status={errorModal ? "Ops, erro ao tentar salvar o documento! Por gentileza, tente novamente!" : `Documento ${templateName} salvo com sucesso!`} 
        statusImg={errorModal ? "fas fa-exclamation-triangle" : "far fa-check-circle"} 
      />
      <ModalForm 
        isOpen={isFormModalOpen}
        modalTitle={inputMergeFieldValue ? templateName : ""}
        image={ModalImage}
        fieldsNameList={inputMergeFieldValue}
        onRequestClose={() => setIsFormModalOpen(false)} 
        onChange={fillMergeFields} 
        onClickModalFillFields={replaceMergeFields}
      />
    </PageContainer>
  ); 
}

export default Editor;
