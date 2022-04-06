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
  const [statusCards, setStatusCards] = useState([])

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
    console.log('salvou');
  }

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  }

    const mergeFieldsRegex= /[@][{][\w.]+[}]/g;
    let mergeFieldsPattern = new RegExp(mergeFieldsRegex);
    let mergeFieldsList = template.match(mergeFieldsPattern)
    
    console.log(mergeFieldsList);
    
    const onlyNamesList = mergeFieldsList ? mergeFieldsList.map(item => 
      item
        .replace('@', '')
        .replace('{', '') 
        .replace('}', '')
      ) : null;
    
    console.log(onlyNamesList);
    
    const upperCaseList = onlyNamesList ? onlyNamesList.map(item => item.toUpperCase()) : null;
    
    console.log(upperCaseList);

    useEffect(() => {
      
      setStatusCards([
        {
          "count": "Contrato de Cessão",
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
        <input placeholder='Nome do template..'></input>
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
            onClick={handleOpenSubmitModal}
          />
        </div>
      </BtnContainer>

        <ModalSubmit 
        isOpen={isSubmitModalOpen}
        onRequestClose={handleCloseSubmitModal} 
        sendFile={true} 
        status={errorModal ? "Ops, erro ao tentar salvar o Template! Por gentileza, tente novamente!" : "Template salvo com sucesso!"} 
        statusImg={errorModal ? "fas fa-exclamation-triangle" : "far fa-check-circle"} 
        confirmation={true} />

    </PageContainer>
  ); 
}

export default CKTextBox;
