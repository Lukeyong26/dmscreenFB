import { useEffect, useState, type SetStateAction } from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const spellLevels = ['1','2','3','4','5','6','7','8','9']

interface SpellListData {
  index:string;
  name:string;
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
}

const initialSpell = {
  index:'',
  name:'',
  range:'',
  duration:'',
  concentration:false,
  casting_time:'',
  level:0,
  higher_level:''
}

function SpellsList() {
    const [spells, setSpells] = useState<SpellListData[]>([]);
    const [selection, setSelection] = useState<string>('')
    const [selectedSpell, setSelectedSpell] = useState<SpellData>(initialSpell)
    const [spellDesc, setSpellDesc] = useState([])
    const [isSpellOpen, setIsSpellOpen] = useState(false)
  
    const ruleURL = "https://www.dnd5eapi.co/api/spells";
    
    useEffect(() => {
        fetch(ruleURL)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.results);
            setSpells(data.results);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }, []);
  
    const changeSelection = (event: { target: { value: SetStateAction<string>; }; }) => {
      setSelection(event.target.value);
      const URL = event.target.value === "" ? ruleURL : ruleURL + "?level=" + event.target.value
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSpells(data.results);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const openSpell = (spell : string) => {
      setIsSpellOpen(true);
      const URL = ruleURL + "/" + spell;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSelectedSpell(data);
          setSpellDesc(data.desc)
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const closeSpell = () => {
      setIsSpellOpen(false);
    }
  
    return (
      <div className="mt-4">
        <div className="flex flex-row">
          <h1 className="text-2xl">Spells List</h1>
          <div className="flex flex-row items-center ml-auto mt-1">
            <p>Level: </p>
            <select
              value={selection}
              onChange={changeSelection}
              className="min-w-10 text-secondary border-1 border-gray-300 bg-primary text-sm ml-2 rounded-sm"
            >
              <option value="">
                <em>All</em>
              </option>
              {spellLevels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='p-4'>
          {!isSpellOpen ? 
            <ul className="list-none">
              {spells.map((spell) => (
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
                <h2 className="text-xl">{selectedSpell.name}</h2>
                <button className="ml-auto" onClick={closeSpell}>
                  X
                </button>
              </div>
              <h3>Description:</h3>
              {spellDesc.map((text, index) => (
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

