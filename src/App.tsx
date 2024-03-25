import "normalize.css";
import { useCallback, useState } from 'react';
import './App.css';


//Начальные значения параметров
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

  const handleDeleteParam = useCallback((id: number) => {
    setParams(prevParams =>
      prevParams.filter(param => param.id !== id)
    );
  }, []);

  return (
    <div className='appContainer'>
      <CreateParamForm onAddParam={handleAddParam} />
      <ParamList params={params} onParamChange={handleParamChange} onDeleteParam={handleDeleteParam} />
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
    const newParam: EditorParam = { id: getId(), name, type, value };
    onAddParam(newParam);
    setName('');
    setValue('');
  }, [name, type, value, onAddParam]);

  function getId(): number {
    const currentTime = Date.now();
    const randomValue = Math.floor(Math.random() * 1000); // Просто для добавления небольшого случайного значения
    return currentTime + randomValue;
  }

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

function ParamList({ params, onParamChange, onDeleteParam }: { params: EditorParam[], onParamChange: (id: number, value: string) => void, onDeleteParam: (id: number) => void }) {

  return (
    <div className="container">
      <h2> Список параметров</h2>
      {params && params.length !== 0 ? (<div className='paramList'>
        <div className='createFormInput'>
          {params.map(item => (
            <div key={item.id}>
              <div className="paramItemContent">
                <label>
                  {item.name}:
                  <div className="inputContainer">
                    <input
                      type={item.type}
                      value={item.value}
                      onChange={(e) => onParamChange(item.id, e.target.value)}
                    />
                    <img src="/iconDelete.svg" alt="Delete Icon" className="inputIcon" onClick={() => onDeleteParam(item.id)} />
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => (console.log(params))}>
          Вывести в консоль
        </button>
      </div>) : (<h4>Параметры не заданы</h4>)}
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

interface EditorParam extends Param {
  value: ParamValue["value"],
}