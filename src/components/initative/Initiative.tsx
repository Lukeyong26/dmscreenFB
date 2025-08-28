import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useLayoutState } from '../../utils/useLayoutState';
import { UserRound, Sword, Shield, Plus, RotateCcw, ChevronRight, X, GripVertical } from 'lucide-react'

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Player {
  key : string;
  name: string;
  x: number;
  y: number;
  turn: boolean;
}

interface InitiativeState {
  players: Player[];
}

const Initiative = ({id}:{id: string}) => {
  const initialPlayerState = [
    {key:'a',name:'PLAYER 1',x:0,y:0,turn:false,playerName:''},
    {key:'b',name:'PLAYER 2',x:1,y:0,turn:false,playerName:''}
  ]
  const [state, setPlayers] = useLayoutState<InitiativeState>(id,{players:initialPlayerState});
  const [turn, setTurn] = useState(0)

  const addPlayer =()=> {
    const key = new Date().getTime().toString() + 'b'
    const newPlayer: Player = {key, name: 'PLAYER ' + (state.players.length + 1), x: state.players.length, y: 0, turn: false};
    const newLayout = {players: [...state.players, newPlayer]};
    setPlayers(newLayout);
  }

  const deletePlayer =(key:string)=> {
    const newLayout = {players: state.players.filter((player) => player.key !== key)}
    // console.log(newLayout)
    setPlayers(newLayout);
  }

  const nextPlayer =()=>{
    const players = state.players;
    const newList = players.map(player => {
      if (player.x === turn) {
        return {...player, turn: true};
      } else {
        return {...player, turn: false};
      }
      
    });
    setTurn((turn+1)%players.length);
    const newLayout = {players: newList};
    setPlayers(newLayout);
  }

  const resetInitiative =()=>{
    const players = state.players;
    const newList = players.map(player => {
      return {...player, turn: false};
    });
    setTurn(0);
    const newLayout = {players: newList};
    setPlayers(newLayout);
  }

  const updatePlayerName = (e:string, key:string)=> {
    const players = state.players;
    const newList = players.map(player => {
      if (player.key === key) {
        return {...player, name: e};
      } else {
        return {...player};
      }
    });
    const newLayout = {players: newList};
    setPlayers(newLayout);
  }

  function updateLayout(layout:ReactGridLayout.Layout[]) {
    const players = state.players;
    const newList = players.map(mod => {
      const newItem = layout.find(item => item.i === mod.key);
      return {...mod, x:newItem?.x ?? 0, y:newItem?.y ?? 0};
    });
    const newLayout = {players: newList};
    setPlayers(newLayout);
  }
  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-50 p-4 h-full min-h-80 items-center justify-center">
      <div className="text-center mb-2">
        <div className="flex justify-center items-center gap-3">
          <Sword className="text-gray-700" size={20} />
          <h1 className="text-xl font-bold text-gray-600">
            Initiative Tracker
          </h1>
          <Shield className="text-gray-700" size={20} />
        </div>
      </div>   

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: state.players?.length, md: state.players?.length, sm: state.players?.length, xs: state.players?.length, xxs: state.players?.length }}
        margin={[5,5]} compactType={'horizontal'} maxRows={1} rowHeight={160}
        onLayoutChange={updateLayout} isResizable={false} draggableHandle='.drag-handle-card'
      >
      {state.players?.map((player) => (
        <div
          key={player.key}
          data-grid={{x: player.x, y: player.y, w: 1, h: 1}}
          className={`rounded-xl shadow-md transition-all duration-300 cursor-move h-full
            ${player.turn ? 
            'bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 shadow-green-200 ' 
            : 
            'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-400 hover:border-gray-300'}`
          }
        >
          <div className="flex flex-col items-center drag-handle-card ">
            <div className="ml-auto mx-2">
              {state.players?.length > 1 &&
              <>
                <div className="absolute top-2 left-2 text-gray-400">
                  <GripVertical size={16} />
                </div>
                <button 
                  className="mt-1 w-4 h-4 text-gray-500 hover:text-red-600 hover:cursor-pointer flex items-center justify-center text-sm transition-colors z-10"
                  onClick={() => deletePlayer(player.key)}
                >
                  <X size={12} />
                </button>
              </>
              }
            </div>

            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="p-2">
                <div className={`p-4 rounded-full transition-colors ${
                  player.turn 
                    ? 'bg-green-200 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <UserRound size={40} />
                </div>
              </div>

              
            </div>
          </div>
          {/* Player Name Input */}
          <div className='px-2'>
            <input 
              type="text" 
              className="text-center text-sm font-medium w-full px-3 py-2 rounded-lg border border-gray-400 bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              value={player.name} 
              onChange={(e) => updatePlayerName(e.target.value, player.key)}
              placeholder="Player Name"
            />
          </div>
        </div>
      ))}
      </ResponsiveGridLayout>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        <button 
          className="bg-gray-600 hover:bg-amber-400 hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          onClick={addPlayer}
        >
          <Plus size={18} />
          Add Player
        </button>
        
        <button 
          className="bg-gray-600 hover:bg-red-700 hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          onClick={resetInitiative}
        >
          <RotateCcw size={18} />
          Reset Initiative
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          onClick={nextPlayer}
        >
          Next Turn
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default Initiative