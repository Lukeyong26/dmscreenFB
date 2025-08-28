import { RefreshCcw } from 'lucide-react';
import { useEffect, useState, type SetStateAction } from 'react'

interface Monsters {
  count: number;
  next: string | null | undefined;
  previous: string | null | undefined;
  results: MonsterResult[];
}

interface MonsterResult {
  slug: string;
  name: string;
  size: string;
  type: string;
  subtype: string;
  group: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: {
    walk: number;
    burrow: number;
    climb: number;
    fly: number;
    swim: number;
  };
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  strength_save: number;
  dexterity_save: number;
  constitution_save: number;
  intelligence_save: number;
  wisdom_save: number;
  charisma_save: number;
  perception: number;
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  languages: string;
  challenge_rating: string;
}

function MonsterGen() {
  // const queryClient  = useQueryClient();
  // const URL = "https://api.open5e.com/monsters/"
  const URL = "https://www.dnd5eapi.co"
  
  
  const [monsters, setMonsters] = useState<MonsterResult[]>([]);
  const [cr, setCR] = useState<string>('1')
  // const [size, setSize] = useState<string>('')
  const [mon, setMon] = useState<MonsterResult>({} as MonsterResult);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const {data : monsters, refetch , isLoading} = useQuery({
  //   queryKey: ['monsters'],
  //   enabled: false,
  //   refetchOnWindowFocus: false,
  //   queryFn: async () => {
  //     const finalURL = URL + '?challenge_rating=' + cr;
  //     return fetch(finalURL).then((res) => {
  //       console.log(res.json());
  //       return res.json();
  //     });
  //   },
  // });
  // const changeSize = (e : SelectChangeEvent) => {
  //   setSize(e.target.value);
  // }

  useEffect(() => {
    selectRandomMonster();
  }, [monsters]);

  const changeCR = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCR(e.target.value);
  }


  const generate = async () => {
    setIsLoading(true);
    const finalURL = URL + '/api/monsters?challenge_rating=' + cr;
    await fetch(finalURL)
    .then((response) => response.json()
    .then((data : Monsters) => {
      console.log(data.results);
      setMonsters(data.results);
      
      setIsLoading(false);
    }))
    .catch((err) => {
      console.log(err.message);
    });
    //queryClient.invalidateQueries({ queryKey: ['monsters'] })
    //refetch(); 
  }

  const selectRandomMonster = () => {
    if (monsters.length === 0) {
      return;
    }
    const index = Math.floor(Math.random() * monsters.length);
    setMon(monsters[index]);
  }

  const CR = [];
  for (let i = 0; i < 31; i++) {
    CR.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-50 p-4">
      <div className="flex flex-row items-center justify-center mb-4 w-full">
        <h1 className="text-2xl">Monster Generator</h1>
      </div>
      <div className="flex flex-row items-center">
      <span className="mr-2 ">CR:</span>
      <select
        value={cr}
        onChange={changeCR}
        className="min-w-[80px] mx-2 p-1 border border-gray-300 rounded"
      >
        {CR}
      </select>
      
      <div className="ml-2">
        <button onClick={generate} className="px-4 border-1 border-gray-300 py-2 rounded">Generate</button>
      </div>
      <div className="ml-auto">
        <button onClick={selectRandomMonster} className="px-4 py-2 rounded">
          <RefreshCcw />
        </button>
      </div>
      </div>
      <div className="flex flex-row items-center font-light mt-2">
        <span>Monsters Found: {monsters.length}</span>
      </div>
      <div className="flex h-[70%] justify-center items-center">
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-4 border-t-transparent rounded-full"></div>
      ) : (
        <div>
          
          <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">{mon.name}</h2>
            {/* <p><span className="font-semibold">Type:</span> {mon.size} {mon.type}, {mon.alignment}</p>
            <p><span className="font-semibold">AC:</span> {mon.armor_class}</p>
            <p><span className="font-semibold">HP:</span> {mon.hit_points} ({mon.hit_dice})</p>
            <p><span className="font-semibold">Speed:</span> {Object.entries(mon.speed).map(([key, value]) => value ? `${key} ${value} ft.` : null).filter(Boolean).join(', ')}</p>
            <p><span className="font-semibold">STR:</span> {mon.strength} <span className="font-semibold">DEX:</span> {mon.dexterity} <span className="font-semibold">CON:</span> {mon.constitution}</p>
            <p><span className="font-semibold">INT:</span> {mon.intelligence} <span className="font-semibold">WIS:</span> {mon.wisdom} <span className="font-semibold">CHA:</span> {mon.charisma}</p>
            <p><span className="font-semibold">CR:</span> {mon.challenge_rating}</p> */}
            {mon.languages && <p><span className="font-semibold">Languages:</span> {mon.languages}</p>}
            {mon.damage_vulnerabilities && <p><span className="font-semibold">Damage Vulnerabilities:</span> {mon.damage_vulnerabilities}</p>}
            {mon.damage_resistances && <p><span className="font-semibold">Damage Resistances:</span> {mon.damage_resistances}</p>}
            {mon.damage_immunities && <p><span className="font-semibold">Damage Immunities:</span> {mon.damage_immunities}</p>}
            {mon.condition_immunities && <p><span className="font-semibold">Condition Immunities:</span> {mon.condition_immunities}</p>}
          </div>
          
      </div>
      )}
      </div>
    </div>
  )
}

export default MonsterGen