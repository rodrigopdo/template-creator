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
  const [saveTemplate, setSaveTemplate] = useState();

  useEffect(() => {
      
    setStatusCards([
      {
        "count": "Contrato de Cessão",
        "title": "Ultima atualização: 13/02/2022"
      },
      {
        "count": "Contrato de Cessão com Sacado",
        "title": "Ultima atualização: 13/02/2022"
      },
      {
        "count": "Nota Promissória",
        "title": "Ultima atualização: 14/02/2022"
      },
      {
        "count": "Termo de Cessão",
        "title": "Ultima atualização: 04/02/2022"
      }
    ]);
  }, []);


  const mergeFieldsRegex= /[@][{][\w.]+[}]/g;
  let mergeFieldsPattern = new RegExp(mergeFieldsRegex);
  let mergeFieldsList = template.match(mergeFieldsPattern)
  
  
  const onlyNamesList = mergeFieldsList ? mergeFieldsList.map(item => 
  item
    .replace('@', '')
    .replace('{', '') 
    .replace('}', '')
  ) : null;

  const upperCaseList = onlyNamesList ? onlyNamesList.map(item => item.toUpperCase()) : null;
  
  console.log(mergeFieldsList);
  console.log(onlyNamesList);
  console.log(upperCaseList);
  
  const saveTemplateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    setIsSubmitModalOpen(true);
  }
  
  const removeTemplate = (key) => {
    
  }
  
  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
    console.log('salvou');
  }
  
  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setTemplate('Digite aqui..');
    setTemplateName('');
  }
 
  return (
    <PageContainer>
     {statusCards.length > 0 ?
          <CardsWrapper
            alignItems="center"
            justifyContent="space-between"
          >
            {
              statusCards.map((item, index) => (
                <Col width="25%">
                  <StatusCard key={index}
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                    count2={item.count2}
                    title2={item.title2}
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
            hoverColor={colors.pureGreen}
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
