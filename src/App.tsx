import React, { useEffect } from "react";
import "./App.scss";
import { ItemComponent } from "./Catalog";
import { CreateDialog } from "./dialog/CreateDialog";
import { DeleteDialog } from "./dialog/DeleteDialog";
import { DialogProvider } from "./dialog/DialogProvider";
import { EditDialog } from "./dialog/EditDialog";
import { IItem, IItemProps } from "./interfaces";


enum ActionCatalogType {
  GET = 'get',
  SET = 'set',
  EDIT = 'edit',
  CREATE = 'create',
  DELETE = 'delete',
}

interface ICatalog {
  catalog: IItem[];
}
interface IActionCatalog {
  type: ActionCatalogType;
  payload: {
    catalog?: IItem[];
    id?: string;
    item?: IItem;
  };
}

const initialState: ICatalog = { catalog: [] };
const reducer: React.Reducer<ICatalog, IActionCatalog> = (state, action) => {
  switch (action.type) {
    case ActionCatalogType.GET:
      return state;
    case ActionCatalogType.SET:
      return action.payload.catalog ? { catalog: action.payload.catalog } : state;
    case ActionCatalogType.EDIT:
      return action.payload.item ? { catalog: state.catalog.map(x => { return x.id === action.payload.item?.id ? action.payload.item : x }) } : state;
    case ActionCatalogType.CREATE:
      return action.payload.item ? { catalog: [...state.catalog, action.payload.item] } : state;
    case ActionCatalogType.DELETE:
      return action.payload.id ? { catalog: state.catalog.filter(x => x.id !== action.payload.id) } : state;
    default:
      return state
  }
}

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<ICatalog, IActionCatalog>>(reducer, initialState);

  const setDir = () => {
    fetch('http://localhost:3050/dir')
      .then((res) => res.json())
      .then(json => dispatch({ type: ActionCatalogType.SET, payload: { catalog: json } }))
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  // const [catalog, setCatalog] = useState<IItem[]>([])
  const getRoot = () => {
    return state.catalog ? state.catalog.filter(x => x.parent_id === null || x.parent_id === 'null')[0] : { id: '1', name: 'root', parent_id: null }
  }
  let root = getRoot()

  useEffect(() => setDir(), [])
  useEffect(() => { root = getRoot() }, [state.catalog])

  const createDirHandler = (newDir: IItem) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDir)
    };
    fetch('http://localhost:3050/dir', requestOptions)
      .then(res => res.json())
      .then(json => dispatch({ type: ActionCatalogType.CREATE, payload: { item: json } }))
      .catch(err => {
        console.log(err)
      })
  }
  const editDirHandler = (item: IItem) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: item.name, parent_id: item.parent_id })
    };
    fetch('http://localhost:3050/dir/' + item.id, requestOptions)
      .then(res => res.json())
      .then(json => dispatch({ type: ActionCatalogType.EDIT, payload: { item: json } }))
      .catch(err => {
        console.log(err)
      })
  }

  const validNameDir = (editItem: IItem) => {
    let valid = true
    const result = state.catalog.filter(item => item.parent_id === editItem.parent_id && item.id !== editItem.id)
    result.forEach(item => {
      if (item.name === editItem.name) {
        valid = false
      }
    })
    return valid
  }

  const checkChildren = (item: IItem) => {
    let result = state.catalog.filter(i => i.parent_id === item.id)
    result.forEach((x, i) => setTimeout(() => deleteDirHandler(x), (++i) * 200))
  }

  const deleteDirHandler = (item: IItem) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch('http://localhost:3050/dir/' + item.id, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: ActionCatalogType.DELETE, payload: { id: item.id } })
          setTimeout(() => checkChildren(item), 150)
        } else {
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const props: IItemProps = {
    item: root,
    catalog: state.catalog,
    onDeleteDir: deleteDirHandler,
    onCreateDir: createDirHandler,
  }

  return (
    <div className="App">
      <div className="App-header">
        catalog ™
      </div>
      <div className="App-body">
        <div className="catalog">
          <DialogProvider {...{ onEdit: editDirHandler, onCreate: createDirHandler, onDelete: deleteDirHandler }}>
            {root ? <ItemComponent {...props} /> : <p>Пусто</p>}
            <DeleteDialog {...{ onDelete: deleteDirHandler }} />
            <EditDialog {...{ onEdit: editDirHandler, onValid: validNameDir }} />
            <CreateDialog {...{ onCreate: createDirHandler, onValid: validNameDir }} />
          </DialogProvider>

          {/* <div className="catalog-box">
            <div className="catalog-box_item">
              <div className="catalog-box_item-title">item 1</div>
            </div>
            <div className="catalog-box_item">
              <div className="catalog-box_item-title parent">item 2</div>
              <div className="catalog-box">
                <div className="catalog-box_item">
                  <div className="catalog-box_item-title">item 1</div>
                </div>
                <div className="catalog-box_item">
                  <div className="catalog-box_item-title active">
                    item 2
                    <div className="actions">
                      <div className="actions_edit">edit</div>
                      <div className="actions_add">add</div>
                      <div className="actions_delete">del</div>
                    </div>
                  </div>
                </div>
                <div className="catalog-box_item">
                  <div className="catalog-box_item-title">item 3</div>
                </div>
              </div>
            </div>
            <div className="catalog-box_item">
              <div className="catalog-box_item-title">item 3</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
