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

[*] In the modal submit feedback, the btn inside modal clean editor and template name input.

[*] Replace merge fields function (onclick 'Preencher campos')
  - Replace de fields;
  - Close modal form.

[] Generate pdf function (on click 'Gerar PDF' in form modal)
  - Parse string to render html object;
  - Open preview pdf.




