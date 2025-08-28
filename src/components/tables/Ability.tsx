function Ability() {
  return (
    <div className="p-1">
      <div className="bg-gradient-to-tr from-gray-100 to-gray-200 border-1 border-gray-800 rounded-lg shadow-2xl p-6 relative overflow-hidden">
        {/* Decorative corner ornaments */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gray-700"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gray-700"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gray-700"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gray-700"></div>
        
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semi text-gray-900 tracking-wider border-b-1 border-gray-600 pb-2 uppercase">
            Abilities & Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Strength */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              ⚔️ Strength
            </h6>
            <ul className="space-y-1">
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Athletics
              </li>
            </ul>
          </div>

          {/* Dexterity */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              🏹 Dexterity
            </h6>
            <ul className="space-y-1">
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Acrobatics
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Sleight of Hand
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Stealth
              </li>
            </ul>
          </div>

          {/* Intelligence */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              📚 Intelligence
            </h6>
            <ul className="space-y-1">
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Arcana
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                History
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Investigation
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Nature
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Religion
              </li>
            </ul>
          </div>

          {/* Wisdom */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              🦉 Wisdom
            </h6>
            <ul className="space-y-1">
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Animal Handling
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Insight
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Medicine
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Perception
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Survival
              </li>
            </ul>
          </div>

          {/* Charisma */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              🎭 Charisma
            </h6>
            <ul className="space-y-1">
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Deception
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Intimidation
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Performance
              </li>
              <li className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-gray-500">
                Persuasion
              </li>
            </ul>
          </div>

          {/* Constitution (added for completeness) */}
          <div className="bg-gray-50 border-1 border-gray-600 rounded-md p-4 shadow-inner">
            <h6 className="font-bold text-lg text-gray-900 mb-3 text-center border-b border-gray-400 pb-1 uppercase tracking-wide">
              🛡️ Constitution
            </h6>
            <p className="text-gray-600 italic text-center text-sm">No associated skills</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ability