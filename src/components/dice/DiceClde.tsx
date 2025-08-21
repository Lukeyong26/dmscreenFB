import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface DiceType {
  name: string;
  sides: number;
}

interface RollResult {
  dice: string;
  count: number;
  rolls: number[];
  total: number;
}

const DiceClde: React.FC = () => {
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceCount, setDiceCount] = useState<number>(1);
  //const [rollingDice, setRollingDice] = useState<string | null>(null);

  const diceTypes: DiceType[] = [
    { name: 'D4', sides: 4 },
    { name: 'D6', sides: 6 },
    { name: 'D8', sides: 8 },
    { name: 'D10', sides: 10 },
    { name: 'D12', sides: 12 },
    { name: 'D100', sides: 100 }
  ];

  const rollDice = (sides: number, diceName: string): void => {
    setIsRolling(true);
    //setRollingDice(diceName);
    
    setTimeout(() => {
      const rolls: number[] = [];
      let total = 0;
      
      for (let i = 0; i < diceCount; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
      }
      
      const result: RollResult = {
        dice: diceName,
        count: diceCount,
        rolls: rolls,
        total: total
      };
      
      setCurrentRoll(result);
      setIsRolling(false);
      //setRollingDice(null);
    }, 1000);
  };

  const adjustDiceCount = (change: number): void => {
    setDiceCount(prev => Math.max(1, Math.min(10, prev + change)));
  };

  const DiceShape: React.FC = () => {
    const baseClasses = "w-16 h-16 mx-auto animate-bounce [animation-duration:0.4s]";

    return (
      <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
        <polygon points="32,62 4,48 4,16 32,2, 60,16, 60,48" stroke="#1f2937" strokeWidth="2"/>
      </svg>
    );
    
    // switch (type) {
    //   case 'D4': // Tetrahedron
    //     return (
    //     <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <polygon points="0,55 32,0 64,55" stroke="#1f2937" strokeWidth="2" />  
    //     </svg>
    //     );
    //   case 'D6': // Cube
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <rect x="12" y="12" width="50" height="50" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   case 'D8': // Octahedron
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <polygon points="32,8 48,32 32,56 16,32" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   case 'D10': // Pentagonal trapezohedron
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <polygon points="32,6 50,20 46,44 18,44 14,20" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   case 'D12': // Dodecahedron
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <polygon points="32,0 0,46 0,18 32,0, 64,18, 64,46" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   case 'D20': // Icosahedron
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <polygon points="32,62 4,48 4,16 32,2, 60,16, 60,48" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   case 'D100': // Percentile die (represented as two D10s)
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <circle cx="24" cy="32" r="16" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
    //         <circle cx="40" cy="32" r="12" fill="#6b7280" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    //   default:
    //     return (
    //       <svg className={baseClasses} viewBox="0 0 64 64" fill="none">
    //         <rect x="12" y="12" width="40" height="40" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
    //       </svg>
    //     );
    // }
  };

  return (
    <div className="h-full p-2">
      <div className="max-w-2xl mx-auto">
        {/* Dice Count */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => adjustDiceCount(-1)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
            disabled={diceCount <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="text-lg min-w-[4rem] text-center">
            {diceCount} {diceCount === 1 ? 'die' : 'dice'}
          </span>
          <button
            onClick={() => adjustDiceCount(1)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
            disabled={diceCount >= 10}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Result Display */}
        <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center my-2">
          {isRolling ? (
            <div className="text-center">
              <DiceShape />
            </div>
          ) : currentRoll ? (
            <div className="text-center">
              <div className="text-5xl font-light mb-6">
                {currentRoll.total}
              </div>
              {currentRoll.count > 1 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {currentRoll.rolls.map((roll: number, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded font-light text-sm"
                    >
                      {roll}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="font-light">Choose a die to roll</p>
            </div>
          )}
        </div>

        {/* Dice Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <button
            key={"D20"}
            onClick={() => rollDice(20, "D20")}
            disabled={isRolling}
            className="col-span-3 bg-white hover:bg-gray-50 border border-gray-200 font-light py-3 px-2 rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            {"D20"}
          </button>
          {diceTypes.map((dice: DiceType) => (
            <button
              key={dice.name}
              onClick={() => rollDice(dice.sides, dice.name)}
              disabled={isRolling}
              className="bg-white hover:bg-gray-50 border border-gray-200 font-light py-3 px-2 rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              {dice.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DiceClde;