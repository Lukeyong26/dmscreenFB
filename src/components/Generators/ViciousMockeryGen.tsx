import React, { useState } from 'react';
import { Angry, LoaderCircle } from 'lucide-react';

interface InsultParts {
  adjectives: string[];
  nouns: string[];
  endings: string[];
}

const ViciousMockeryGen: React.FC = () => {
  const [currentInsult, setCurrentInsult] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const insultParts: InsultParts = {
    adjectives: [
      'half-witted',
      'bumbling',
      'cowardly',
      'weak-kneed',
      'fumbling',
      'spineless',
      'witless',
      'clumsy',
      'pathetic',
      'sniveling',
      'worthless',
      'incompetent',
      'feeble-minded',
      'dim-witted',
      'sorry',
      'pitiful',
      'useless',
      'hapless',
      'foolish',
      'blundering'
    ],
    nouns: [
      'kobold',
      'goblin',
      'orc',
      'troll',
      'ogre',
      'gnoll',
      'owlbear',
      'gelatinous cube',
      'mimic',
      'rust monster',
      'stirge',
      'skeleton',
      'zombie',
      'bandit',
      'cultist',
      'imp',
      'quasit',
      'duergar',
      'hobgoblin',
      'bugbear',
      'lizardfolk',
      'troglodyte',
      'kuo-toa',
      'drow',
      'doppelganger'
    ],
    endings: [
      'Your sword arm is weaker than a pixie\'s!',
      'Even a commoner has more skill than you!',
      'You couldn\'t hit the broad side of a barn!',
      'Your magic is as useful as a chocolate teapot!',
      'You\'d flee from your own shadow!',
      'Even a peasant knows better tactics!',
      'Your spellbook is emptier than your head!',
      'You make orcs look civilized!',
      'A torch burns brighter than your wit!',
      'You\'d lose a battle of wits with a mindless undead!',
      'Even a mimic is less fake than you!',
      'You make a ranger look like a city dweller!',
      'Your stealth is about as subtle as a raging barbarian!',
      'I\'ve seen stronger spines in boiled noodles!',
      'Your mother should\'ve left you on read!',
      'Even your shadow looks embarrassed to be seen with you!',
      'You swing that weapon like you\'re apologizing to it!',
      'The only thing legendary about you is your incompetence!',
      'I\'d say you fight like a child, but even children hit their targets!',
      'You bring shame to your ancestors... and they were all farmers!',
      'The gods don\'t smite you because even they can\'t be bothered.',
      'You\'re proof evolution can run backwards!',
      'Your face makes onions cry!',
      'You look like failure had a baby with disappointment!',
      'Honestly, I\'ve seen goblins with more dignity in death than you have in life!',
      'If your purpose in this world is to inspire pity, congratulations—you\'re an overwhelming success.',
      'Your parents must be so proud... of your sibling',
      'You\'re living proof that even the most useless things can\'t die fast enough!',
      'If ugly were a crime, you\'d get the death penalty!',
      'The last time I saw a face like yours, it had an arrow in it!',
      'You\'re a walking, talking argument for why we should have a shorter lifespan!',
      'You\'re the reason they invented the word "failure."!',
      'If you had a brain, it\'d probably be trying to get out'
    ]
  };

  const generateInsult = (): void => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const adjective = insultParts.adjectives[Math.floor(Math.random() * insultParts.adjectives.length)];
      const noun = insultParts.nouns[Math.floor(Math.random() * insultParts.nouns.length)];
      const ending = insultParts.endings[Math.floor(Math.random() * insultParts.endings.length)];
      
      const insult = `You ${adjective} ${noun}! ${ending}`;
      setCurrentInsult(insult);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="bg-gradient-to-b min-h-full from-gray-200 to-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Angry className="text-red-700" size={28} />
            <h1 className="text-xl font-bold text-red-800">
              Vicious Mockery Generator
            </h1>
            <Angry className="text-red-700" size={28} />
          </div>
        </div>

        {/* Insult Display */}
        <div className="bg-white border-2 border-red-800 rounded-xl p-8 shadow-lg flex items-center justify-center">
          {isGenerating ? (
            <div className="text-center">
              <div className="animate-spin text-4xl mb-4"><LoaderCircle/></div>
            </div>
          ) : currentInsult ? (
            <div className="text-center">
              <blockquote className="text-xl text-amber-900 font-medium leading-relaxed italic border-l-4 border-red-800 pl-4">
                "{currentInsult}"
              </blockquote>
            </div>
          ) : (
            <div className="text-center text-red-700">
              <div className="text-4xl mb-4">🗡️</div>
              <p className="font-light italic">
                Click the button to generate a D&D insult
              </p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="text-center mt-4">
          <button
            onClick={generateInsult}
            disabled={isGenerating}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? 'Conjuring Insult...' : 'Generate Insult'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViciousMockeryGen;