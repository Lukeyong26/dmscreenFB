import DiceClde from "../components/dice/DiceClde";
import RulesText from "../components/dndRules/RulesText";
import SpellsList from "../components/dndRules/SpellsList";
import Initiative from "../components/initative/Initiative";
import MonsterGen from "../components/Generators/MonsterGen";
import Ability from "../components/tables/Ability";
import ViciousMockeryGen from "../components/Generators/ViciousMockeryGen";

export const modules = [
    { id: 'rules', name: 'D&D Rules', component: RulesText as React.FC<{id: string}> },
    { id: 'initiative', name: 'Initiative Tracker', component: Initiative as React.FC<{id:string}> },
    { id: 'spells', name: 'Spells List', component: SpellsList as React.FC },
    { id: 'dice', name: 'Dice Roller', component: DiceClde as React.FC },
    { id: 'monsterGen', name: 'Random Monster Generator', component: MonsterGen as React.FC },
    { id: 'ability', name: 'Ability Tables', component: Ability as React.FC },
    { id: 'viciousMockeryGen', name: 'Vicious Mockery Generator', component: ViciousMockeryGen as React.FC },
]

export const componentRenderer = (id:string, componentId: string) => {
    const module = modules.find(mod => mod.id === id);
    if (module) {
        return <module.component id={componentId} />;
    } else {
        return null;
    }
}