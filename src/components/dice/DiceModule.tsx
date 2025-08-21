import { useState } from "react";

const DiceModule = () => {

  const [value, setValue] = useState(0);

  const rollDice = (dtype : number) => {
    const num = Math.floor((Math.random() * dtype) + 1);
    setValue(num);
  }

  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex justify-center mt-8 mb-8">
        <h2 className="text-4xl">{value}</h2>
      </div>
      <div className="flex justify-center">
        <button onClick={() => rollDice(20)} className="text-secondary border border-solid w-full p-2 rounded-2xl">D20</button>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <button onClick={() => rollDice(12)} className="text-secondary border border-solid p-2 rounded-2xl">D12</button>
        <button onClick={() => rollDice(100)} className="text-secondary border border-solid p-2 rounded-2xl">D100</button>
        <button onClick={() => rollDice(10)} className="text-secondary border border-solid p-2 rounded-2xl">D10</button>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <button onClick={() => rollDice(8)} className="text-secondary border border-solid p-2 rounded-2xl">D8</button>
        <button onClick={() => rollDice(6)} className="text-secondary border border-solid p-2 rounded-2xl">D6</button>
        <button onClick={() => rollDice(4)} className="text-secondary border border-solid p-2 rounded-2xl">D4</button>
      </div>
    </div>
  )
}

export default DiceModule