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

//Компоненты

//Приложение
function App() {

  return (
    <div >
      <h1>Инициализация</h1>
    </div>
  )
}
export default App;


//Интерфейсы и типы

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

// class ParamEditor extends React.Component<Props, State> {
//   public getModel(): Model {
//   }
// }
