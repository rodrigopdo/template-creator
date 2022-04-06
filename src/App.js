import { TextBox } from './components/TextBox';
import CKTextBox from './components/CKTextBox';
import JoditDefault from './components/JoditDefault';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { MergeFields } from './components/MergeFields';

function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {/* <TextBox placeholder="placeholder"/> */}
        {/* <MergeFields name="Nome Completo" /> */}
        <CKTextBox />
        {/* <JoditDefault /> */}
      </DndProvider>
    </div>

  );
}

export default App;
