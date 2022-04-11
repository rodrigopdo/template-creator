## Steps

### The merge fields will be created by the user typing the name of the field between @{ }.

* Create a input Template Name and saving as key into Local Storage

* Save the editor string as value into Local Storage

* Retrieve template name and current date to fill the template card rendered above de editor

* Search the pattern "@{merge_field}" in the editor string and create an array with 'clean' items, without special chars, ex.: ['NOME COMPLETO', 'ENDERECO']

* This field's name must create input with same label's name, replacing _ to ' ' and capitalize string. Ex.: nome_completo / Nome Completo

* Save function (onclick 'Salvar')
  - Save template name and edition on LocalStorage;
  - create inputs form from merge fields;
  - create a new template card with name and last update above editor;
  - open modal submit;

* Show modal submit feedback, the btn inside modal clean editor and template name input.

* Create pdf function (click on template card)
  - Open a form modal (to fill the merge fields created)

* Generate pdf function (on click 'Gerar PDF' in form modal)
  - Replace the merge fields into editor string;
  - active the lib to generate pdf;


  ### NEXTS COMMITS 

  [] Create the form modal and rules to render inputs mapping from the template names array.

  [] Store an array with: template name, [template content, list of merge fields].

  [] Set the click on card event to get the respectives inputs.

  [] Set form modal button click event to:
    - get the input values to replace the pattern '@{merge_field} with those values,
    - generate the pdf  

  [] Setup the update value to be fixed creation/last edition.





