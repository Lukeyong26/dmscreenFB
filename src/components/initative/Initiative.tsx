import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useLayoutState } from '../../utils/useLayoutState';
import { UserRound } from 'lucide-react'

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
    <div className="m-1">
      <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: state.players?.length, md: state.players?.length, sm: state.players?.length, xs: state.players?.length, xxs: state.players?.length }}
      margin={[5,5]} compactType={'horizontal'} maxRows={1} rowHeight={140}
      onLayoutChange={updateLayout} isResizable={false} draggableHandle='.drag-handle-card'
      >
      {state.players?.map((player) => (
        <div
          key={player.key}
          data-grid={{x: player.x, y: player.y, w: 1, h: 1}}
          className="border-1 border-gray-300 rounded-lg h-full"
        >
          <div className="flex flex-col h-full items-center">
            <div className="ml-auto mx-2">
              {state.players?.length > 1 &&
                <button className="" onClick={() => deletePlayer(player.key)}>
                  <span className="text-xs">X</span>
                </button>
              }
            </div>

            <div className='drag-handle-card flex w-full items-center justify-center hover:cursor-grab'>
              <span className="mb-1"><UserRound size={64} /></span>
            </div>
            <input 
              type="text" 
              className="text-center text-sm mt-auto w-full rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={player.name} onChange={(e) => updatePlayerName(e.target.value, player.key)}
            />
            {player.turn ? 
              <div className="w-full h-5 mt-auto bg-green-400 rounded-lg"/>
              :
              <div className="w-full h-5 mt-auto"/>
            }
          </div>
        </div>
      ))}
      
      </ResponsiveGridLayout>

      <div className="flex flex-row gap-4 mt-2">
        <button className="text-secondary border border-gray-300 rounded p-2" onClick={addPlayer}>Add Player</button>
        <button className="text-secondary border border-gray-300 rounded p-2" onClick={resetInitiative}>Reset Initiative</button>
        <button className="text-secondary border border-gray-300 rounded p-2 ml-auto" onClick={nextPlayer}>Next Player</button>
      </div>
      
    </div>
  )
}

export default Initiative