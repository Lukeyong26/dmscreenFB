import { useEffect, useState } from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react'; 

const spellLevels = ['0','1','2','3','4','5','6','7','8','9']

interface SpellListData {
  index:string;
  name:string;
  level:number;
}

interface SpellData {
  index:string;
  name:string;
  range:string;
  duration:string;
  concentration:boolean;
  casting_time:string;
  level:number;
  higher_level:string;
  desc:string[];
}

const initialSpell = {
  index:'',
  name:'',
  range:'',
  duration:'',
  concentration:false,
  casting_time:'',
  level:0,
  higher_level:'',
  desc:[]
}

function SpellsList() {
    const [spells, setSpells] = useState<SpellListData[]>([]);
    const [displayedSpells, setDisplayedSpells] = useState<SpellListData[]>(spells);
    const [level, setLevel] = useState<string>('')
    const [selectedSpell, setSelectedSpell] = useState<SpellData>(initialSpell)
    const [isSpellOpen, setIsSpellOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
  
    const ruleURL = "https://www.dnd5eapi.co/api/spells";
    
    useEffect(() => {
        fetch(ruleURL)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.results);
            setSpells(data.results);
            setDisplayedSpells(data.results);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }, []);

    useEffect(() => {
      applyFilters();
    }, [level, searchTerm]);

    const openSpell = (spell : string) => {
      setIsSpellOpen(true);
      const URL = ruleURL + "/" + spell;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSelectedSpell(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const applyFilters = () => {
      let filteredSpells = spells;
      if (level !== '' && level !== 'all') {
        filteredSpells = filteredSpells.filter((spell) => spell.level.toString() === level);
      }
      if (searchTerm !== '') {
        filteredSpells = filteredSpells.filter((spell) => spell.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      setDisplayedSpells(filteredSpells);
    }

    const closeSpell = () => {
      setIsSpellOpen(false);
    }
  
    return (
      <div className="w-full min-h-full bg-gradient-to-bl from-gray-200 to-gray-50 p-4">
        <div className="flex flex-row items-center p-2">
          <div className="flex">
            <h1 className="text-2xl font-bold ">
              📜
            </h1>
          </div>
          <h1 className="text-2xl text-gray-800 ">Spells</h1>
          <div className="flex flex-row items-center ml-auto mt-1 text-white">
            {/* search bar */}
            <div className='p-2'>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search"
                className="border border-gray-300 text-white rounded-md p-2 text-xs bg-gray-500"
              />
            </div>
            <p className='text-gray-800'>Level: </p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="min-w-10 text-secondary border-1 hover:cursor-pointer bg-gray-500 border-gray-300 bg-primary text-sm ml-2 rounded-sm"
            >
              <option value="all">
                <em>All</em>
              </option>
              {spellLevels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
          
        </div>
        
        <div className='p-4 text-gray-800'>
          {!isSpellOpen ? 
            <ul className="list-none font-semibold">
              {displayedSpells.map((spell) => (
                <li key={spell.index} className="py-1">
                  <button onClick={() => openSpell(spell.index)} className="w-full text-left">
                    {spell.name}
                  </button>
                </li>
              ))}
            </ul>
            : 
            <div>
              <div className="flex flex-row items-center mb-2">
                <h2 className="text-xl font-semibold">{selectedSpell.name}</h2>
                <button className="ml-auto hover:cursor-pointer" onClick={closeSpell}>
                  <X size={18} />
                </button>
              </div>
              <h3>Description:</h3>
              {selectedSpell.desc.map((text, index) => (
                <div key={index} className="markdown">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {text}
                  </Markdown>
                </div>
              ))}
          
              <div className='my-4 text-sm'>
                Range: {selectedSpell.range}<br/>
                Duration: {selectedSpell.duration}<br/>
                Concentration: {selectedSpell.concentration ? 'Yes':'No'}<br/>
                Cast Time: {selectedSpell.casting_time}<br/>
                Level: {selectedSpell.level}<br/>
              </div>
              <h3>At Higher Levels:</h3>
              {selectedSpell.higher_level}
              <br/><br/>
            </div>
          }
        </div>
      </div>
    )
}

export default SpellsList

