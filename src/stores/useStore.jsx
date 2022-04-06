import create from 'zustand';

const useStore = create(set => ({
  
  names: '',
  
  setName: (names) => {
    set( state => ({ ...state, names }));
  },
}));

export default useStore;