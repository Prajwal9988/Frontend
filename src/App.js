import './App.css';
import TableComponent from './components/Table';
import { FilterComponent } from './components/FilterComponent';
import PaginationComponent from './components/PaginationComponent';
import { DispatchContext, StateContext } from './MyContext';
import { reducer } from './reducer';
import { useReducer } from 'react';

const initialState = {
  queryParam : new URLSearchParams(),
  isTableLoading : true,
  tableData : []
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <FilterComponent/>
          <TableComponent />
          <PaginationComponent />
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
