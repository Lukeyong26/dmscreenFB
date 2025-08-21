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
    <div className="mt-4 w-full">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl mb-2">D&D Rules</h1>
        <div className=''>
          <select
            value={selection}
            onChange={changeSelection}
            className="border border-gray-300 rounded-md p-2 text-xs overflow-hidden"
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
      
      <div className="flex flex-col p-4 gap-2">
        <Markdown remarkPlugins={[remarkGfm]}>{selectedRule.desc}</Markdown>
      </div>
    </div>
  )
}

export default RulesText