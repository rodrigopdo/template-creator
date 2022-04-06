import React, { useState } from "react";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";

const copyStringToClipboard = function(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation"
];
const inspectionMergeFields = [
  "InspectionCompleteDate",
  "InspectionEventType"
];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  let optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
}
const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    iconURL: "../images/keyboard-solid.svg",
    popup: (editor, current, self, close) => {
      function onSelected(e) {
        let mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(
          editor.create.inside.fromHTML("{{" + mergeField + "}}")
          );
        }
      }
      let divElement = editor.create.div("merge-field-popup");

      let labelElement = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      labelElement.text = 'Merge field: ';
      divElement.appendChild(labelElement);

      let selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      console.log(divElement);
      return divElement;
    }
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    iconURL: "images/copy.png",
    exec: function(editor) {
      let html = editor.value;
      copyStringToClipboard(html);
    }
  }
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true
  },
  width: 800,
  height: 842
};

const initialContent =`

NOTA PROMISSÓRIA
 

EMITENTE:
CNPJ/ME:
ENDEREÇO:
VALOR:
VENCIMENTO:
Pagarei por esta única via de Nota Promissória, a AGROFORTE SECURITIZADORA CONSULTORIA E SERVICOS FINANCEIROS LTDA., com sede na Cidade de São Paulo, Estado de São Paulo, na Rua Álvaro Anes, nº 56, cj. 61, Pinheiros, CEP 05.421-010, inscrita no CNPJ/ME sob nº 37.284.282/0001-06, ou a sua ordem, a quantia de [     ] (   ), no vencimento, em moeda corrente nacional, pagável na praça de São Paulo-SP, ou onde esta Nota Promissória me for apresentada.
 
Data e local da emissão da nota promissória.
 

______________________________                    
(nome legível do emitente)
 
`


export function TextBox() {
  const [data, setData] = useState(initialContent);

  return (
    <div className="App" style={{ maxWidth: editorConfig.width, margin: "0 auto" }}>
      <JoditEditor
        value={data}
        config={editorConfig}
        onChange={value => setData(value)}
      />
    </div>
  );
}


