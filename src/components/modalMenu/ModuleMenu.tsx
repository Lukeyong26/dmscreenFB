import { X } from "lucide-react";
import { modules } from "../../utils/componentRenderer"; 

interface ModuleMenuProps {
  isOpen : boolean;
  isEditMode:boolean;
  addModule: CallableFunction;
  editModule: CallableFunction;
}

const ModuleMenu = (props : React.PropsWithChildren<ModuleMenuProps>) => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl mx-2 my-2">
      {props.isOpen && (
          <div className="w-96 p-4 flex flex-col">
            <div className="flex items-center mb-2.5">
              <h4 className="text-2xl">Select a Module</h4>
              <span className="ml-auto"><X/></span>
            </div>
            
            {!props.isEditMode ? 
              <ul className="mt-1.5">
                {modules.map((module) => (
                  <li key={module.id} className="cursor-pointer p-2 border border-gray-100 shadow-sm hover:bg-gray-100" onClick={() => props.addModule(module.id)}>
                    {module.name}
                  </li>
                ))}
              </ul>
            :
              <ul className="mt-1.5">
                {modules.map((module) => (
                <li key={module.id} className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => props.editModule(module.id)}>
                  {module.name}
                </li>
                ))}
              </ul>
            }
            
          </div>
      )}
    </div>
  );
};

export default ModuleMenu