### The merge fields will be created by the user typing the name of the field between @{ }.

[*] Create a input Template Name and saving as key into Local Storage

[*] Save the editor string as value into Local Storage

[*] Retrieve template name and current date to fill the template card rendered above de editor

[*] Search the pattern "@{merge_field}" in the editor string and create an array with 'clean' items, without special chars and uppercase, ex.: from ['@{nome_completo}', '@{endereco_completo}'] to ['NOME COMPLETO', 'ENDERECO'].

[*] The array name list name must create input with same label's name to render in the form modal. 

[*] Save function (onclick 'Salvar')
  - Save template name and edition on LocalStorage;
  - create inputs form from merge fields;
  - create a new template card with name and last update above editor;
  - open modal submit.

[*] In the modal submit feedback, the btn inside modal clean editor and template name input (reload page).

[*] Replace merge fields function (onclick 'Preencher campos')
  - Replace de fields;
  - Close modal form.

[*] Toggle button 'SALVAR TEMPLATE' and 'SALVAR EDIÇÃO';

[*] Set disabled state to "CANCELAR" button;

[} Set last update information date in the template card;

[*] Handle Template name requirement when saving with empty field;

[*] Handle Modal Form function (onclick on a Card)
   
[*] Include UI menu dropdown in the cards, with the 'edit', 'remove' and 'close'.


[*] Set feedback in the Modal form when input field is empty, with text and Ilustration, and also change disabled state of "Preencher campos" button.


[*] Create 3 function of the dropdown items: 'Editar', 'Remover' and 'Fechar.
  - EditTemplate function
  - RemoveTemplate function

[] Include tooltip on hover the card menu (3 dots).

[] Save changes function, update localstorage.

[] Set up Firebase Firestore to save TEMPLATES and EDITED DOCUMENTS.

[] Draw 2 new illustration (changes saved and remove template confirmation)

[] Handle special char in merge field (ú, á, ê, etc...).


