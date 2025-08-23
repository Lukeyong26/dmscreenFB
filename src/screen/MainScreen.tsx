import { Responsive, WidthProvider } from "react-grid-layout";
import "../assets/styles/react-grid-layout/styles.css";
import "../assets/styles/react-resizable/styles.css";
import "react-resizable/css/styles.css";
import { useState } from 'react';
import ModuleMenu from '../components/modalMenu/ModuleMenu';
import { useLayoutStore } from '../store/store';
import { GripHorizontal, SquarePen, X, CirclePlus} from "lucide-react";
import { componentRenderer } from "../utils/componentRenderer";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface editMode {
  key: string;
  mode: boolean;
}

// const logLayout = () => {
//   const layout = useLayoutStore.getState().layout;
//   console.log(layout);
// }

function MainScreen() {
    
  const modules = useLayoutStore(state => state.layout);
  // const prevLayout = useLayoutStore(state => state.prevLayout);

  const [ModMenuStatus, setStatus] = useState<boolean>(false);
  // const [AcctMenustatus, setAcctStatus] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<editMode>({key: '', mode: false})

  const setModules = useLayoutStore(state => state.setLayout);
  const addModule = useLayoutStore(state => state.addModule);
  const updateLayout = useLayoutStore(state => state.updateLayout);
  const deleteModule = useLayoutStore(state => state.deleteModule);
  const setPrev = useLayoutStore(state => state.setPrevLayout);

  const editModule = (mod : string) => {
    setPrev();
    const newLayout = modules.map(module => {
      if (module.i === editMode.key) {
        return {...module, component: mod};
      } else {
        return {...module};
      }
    });
    setModules(newLayout);
    setEditMode({key: '', mode: false});
  }

  const openModMenu = (modKey : string) => {
    const modal = document.getElementById('menu');
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
    setEditMode({key: '', mode: false});
    if (modKey !== "") {
      setEditMode({key: modKey, mode: true})
    }
    setStatus((prevStatus) => !prevStatus);
  };

  // const openAcctModal = () => {
  //   setAcctStatus((prevStatus) => !prevStatus);
  // }

  // const undo =()=>{
  //   setModules(prevLayout);
  // }
  
  return (
    <div className="h-full">
      {modules.length === 0 ?
        <div className="w-full h-full flex justify-center items-center">
          Click the + Icon to add a module
        </div>
        :
        <div>
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 20, md: 15, sm: 10, xs: 8, xxs: 4 }}
            rowHeight={20} width={1200} margin={[5,5]} compactType={null}
            preventCollision={true} onDragStart={setPrev} onResizeStart={setPrev}
            onLayoutChange={updateLayout} draggableHandle='.drag-handle' 
            resizeHandles ={['se','sw']}
          >
            {modules.map((mod)=> (
              <div 
                key={mod.i} 
                data-grid={{x: mod.x, y: mod.y, w: mod.w, h: mod.h}}
                className="flex flex-col border-2 border-gray-300"
              >
                <div className="bg-gray-200 flex flex-row cursor-grab">
                  <div className='drag-handle w-full'>
                    <div className="flex items-center p-1">
                    <GripHorizontal size={18} className="text-secondary text-sm" />
                    </div>
                  </div>
        
                  <div className="flex flex-row ml-auto mr-2">
                    <button onClick={() => openModMenu(mod.i)} className="flex items-center mr-2 hover:cursor-pointer">
                      <SquarePen size={15} className="text-secondary text-sm" />
                    </button>
          
                    <button onClick={() => deleteModule(mod.i)} className="flex items-center hover:cursor-pointer">
                      <X size={18} className="text-secondary text-sm" />
                    </button>
                  </div>
                </div>
                
                <div className="h-full w-full bg-gray-50 p-2 overflow-hidden overflow-y-scroll scrollb 
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb:hover]:bg-gray-500
                ">
                  {componentRenderer(mod.componentType, mod.i)}
                </div>
              </div>
            ))}
              
          </ResponsiveGridLayout>
        </div>
      }
      <div className="fixed bottom-0 p-4">
        <div className="flex flex-col bg-gray-400 rounded-3xl p-2 gap-4">
          <button className="bg-primary hover:cursor-pointer" onClick={() => openModMenu("")}>
            <div className={!ModMenuStatus ? `hidden`: ``}>
              <ModuleMenu
                isOpen={ModMenuStatus} isEditMode={editMode.mode}
                addModule={addModule} editModule={editModule}
              />
            </div>
            
            <CirclePlus className="text-secondary" />
          </button>
          {/* <button className="bg-primary hover:cursor-pointer" onClick={undo}>
            <Undo className="text-secondary" />
          </button> */}
          {/* <button className="bg-primary" onClick={() => openAcctModal()}>
            <AccountMenu isOpen={AcctMenustatus} />
            <CircleUser className="text-secondary" />
          </button>  */}
        </div>
      </div>
    </div>
  );
}

export default MainScreen