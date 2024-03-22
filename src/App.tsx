import "normalize.css";
import { useCallback, useState } from 'react';
import './App.css';

//Начальные параметров
const initModel: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "макси"
    }
  ]
};

const initParams: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string"
  },
  {
    id: 2,
    name: "Длина",
    type: "string"
  }
];

//--------------Компоненты--------------

//Приложение
function App() {
  const [params, setParams] = useState<EditorParam[]>(() => {
    const mergedParams: EditorParam[] = initParams.map(param => {
      const initialValue = initModel.paramValues.find(value => value.paramId === param.id)?.value || '';
      return { ...param, value: initialValue };
    });
    return mergedParams;
  });

  const handleAddParam = useCallback((newParam: EditorParam) => {
    setParams(prevParams => [...prevParams, newParam]);
  }, []);

  const handleParamChange = useCallback((id: number, newValue: string) => {
    setParams(prevParams =>
      prevParams.map(param =>
        param.id === id ? { ...param, value: newValue } : param
      )
    );
  }, []);

  return (
    <div className='appContainer'>
      <CreateParamForm onAddParam={handleAddParam} />
      <ParamList items={params} onParamChange={handleParamChange} />
    </div>
  )
}
export default App;


// Компонент создания нового параметра
const CreateParamForm = ({ onAddParam }: { onAddParam: (newParam: EditorParam) => void }) => {
  const [type, setType] = useState<ParamType>("string");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const types: ParamTypes = ["string", "number", "select"];

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as ParamType);
    setValue("");
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParam: EditorParam = { id: Math.random(), name, type, value };
    onAddParam(newParam);
    setName('');
    setValue('');
  }, [name, type, value, onAddParam]);

  return (
    <div className="container">
      <h2>Редактор параметров</h2>
      <br />
      <form className='createForm' onSubmit={handleSubmit}>

        <div className="createFormInput">
          <label>
            Type:
            <select value={type} onChange={handleTypeChange}>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <>
            <label>
              Name:
              <input
                required
                value={name}
                onChange={handleNameChange}
              />
            </label>
            {type === "select" ? (
              <label>
                Value:
                <input
                  value={"По ТЗ не требуется select"}
                  disabled
                />
              </label>
            ) : (
              <label>
                Value:
                <input
                  type={type}
                  required
                  value={value}
                  onChange={handleValueChange}
                />
              </label>
            )}
          </>
        </div>
        <button type="submit" disabled={type === "select"} >
          Добавить параметр
        </button>
      </form >
    </div>
  );
}

// Компонент для вывода списка параметров

function ParamList({ items, onParamChange }: { items: EditorParam[]; onParamChange: (id: number, newValue: string) => void }) {

  return (
    <div className="container">
      <h2> Список параметров</h2>
      {items ? (<div className='paramList'>
        <div className='createFormInput'>
          {items.map(item => (
            <div key={item.id}>
              <label>
                {item.name}:
                <input
                  type={item.type}
                  value={item.value}
                  onChange={(e) => onParamChange(item.id, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
        <button onClick={() => (console.log(items))}>
          Вывести в консоль
        </button>
      </div>) : ("Параметры не заданы")}
    </div>
  );
}

//Интерфейсы и типы
type ParamTypes = ["string", "number", "select"];
type ParamType = ParamTypes[number];

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface EditorParam extends Param {
  value: ParamValue["value"],
}

// class ParamEditor extends React.Component<Props, State> {
//   public getModel(): Model {
//   }
// }
