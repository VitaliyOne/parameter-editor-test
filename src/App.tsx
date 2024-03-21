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

  const params: EditorParam[] = [
    { id: 1, name: "Назначение", type: "string", value: "повседневное" },
    { id: 2, name: "Длина", type: "string", value: "макси" },
  ];

  return (
    <div className='appContainer'>
      <CreateParamForm />
      <ParamList items={params} />
    </div>
  )
}
export default App;


// Компонент создания нового параметра
const CreateParamForm = () => {
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
  }, []);

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

function ParamList({ items }: { items: EditorParam[] }) {

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
                />
              </label>
            </div>
          ))}
        </div>
        <button onClick={() => (console.log('22'))}>
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
