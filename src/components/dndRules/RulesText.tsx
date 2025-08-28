import { useEffect, useState, type SetStateAction } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLayoutState } from '../../utils/useLayoutState';

interface RuleSection {
  index: string;
  name: string;
  desc: string;
}

interface RuleIndex {
  index: string;
  name: string;
}

const RulesText = ({id} : {id: string}) => {
  const [rules, setRules] = useState<RuleIndex[]>([]);
  const [selection, setSelection] = useState<string>('')
  const [selectedRule, setSelectedRule] = useLayoutState<RuleSection>(id,{index:'', name: '', desc: ''});
  const ruleURL = "https://www.dnd5eapi.co/api/rule-sections";
  
  useEffect(() => {
      fetch(ruleURL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.results);
          setRules(data.results);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);

  const changeSelection = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelection(e.target.value);
    fetch(ruleURL + "/" + e.target.value)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSelectedRule(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className=" w-full min-h-full bg-gradient-to-b from-gray-200 to-gray-50 p-4">
      <div className="flex flex-col items-center w-full">
        <div className='flex items-center gap-2'>
          <div className="flex justify-center items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold ">
              📚
            </h1>
          </div>
          <h1 className="text-xl mb-2 font-bold text-gray-800">D&D Rules</h1>
        </div>
        
        <div className=''>
          <select
            value={selection}
            onChange={changeSelection}
            className="border-2 border-gray-300 rounded-md p-2 text-xs overflow-hidden text-gray-800"
            aria-label="Without label"
          >
            <option value="">
              None
            </option>
            {rules.map((rule) => (
              <option key={rule.index} value={rule.index}>{rule.name}</option>
            ))}
          </select>
      </div>
      
      </div>
      
      <div className="flex flex-col p-4 gap-2 text-gray-800">
        <Markdown remarkPlugins={[remarkGfm]}>{selectedRule.desc}</Markdown>
      </div>
    </div>
  )
}

export default RulesText