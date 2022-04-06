## Steps

* Create merge fields by typing "@{}"

* Then, create a variable to store the field

* This field must create input with same label's name, replacing _ to ' ' and capitalize string. Ex.: nome_completo / Nome Completo

* This inputs have to fill the merge fields with their target.values ( in other process, when the user is gonna generate a PDF from a previous created template.

* Create a btn "+ Novo Template" 

* Create a btn to save the template. This functionalities:
 - At the first, save templates data through Local Storage
 - Create a Template Card Above (same page)


* Input template name as start creating new template



 Lembrar: 

 Criar regex @{a-z}

 pattern.match()

 match() returns an array with the matches [nomeCompleto, ...]


Exemple:

let text = "Visit W3Schools";
let pattern = /w3schools/i; (IMPORTANT: change the modifier " i " to " g " to find all matches rather than stopping after first match
let result = text.match(pattern);


test()