import {create} from "zustand";
import {persist} from "zustand/middleware";
import ReactGridLayout from "react-grid-layout";
import type { Layout } from "./moduleType";

type LayoutStore = {
    layout: Layout[];

    // Layout management functions
    setLayout: (layout: Layout[]) => void;
    addModule: (mod: string) => void;
    updateLayout: (layout: ReactGridLayout.Layout[]) => void;
    deleteModule: (i:string) => void;

    // individual state management
    setLayoutState: (i: string, state: Record<string, any>) => void;
    updateLayoutState: (i: string, partialState: Record<string, any>) => void;
    getLayoutState: (i: string) => Record<string, any> | undefined;

    prevLayout: Layout[];
    setPrevLayout: () => void;
}

export const useLayoutStore = create<LayoutStore>()(
    persist((set, get) => ({
        layout: [],
        setLayout: (layout: Layout[]) => {
            set({layout});
        },
        addModule: (mod: string) => {
            const key = new Date().getTime().toString() + 'a'
            set((state)=>({
                prevLayout: state.layout,
                layout: [
                    ...state.layout,
                    {
                        i : key, x: 0, y: 0, w: 4, h: 10,
                        componentType: mod
                    }
                ]
            }));
        },
        updateLayout: (layout: ReactGridLayout.Layout[]) => {
            set((state)=>({  
                layout: state.layout.map(mod => {
                    const newItem = layout.find(item => item.i === mod.i);
                    return {...mod, x:newItem?.x ?? 0, y:newItem?.y ?? 0, w:newItem?.w ?? 0, h:newItem?.h ?? 0 };
                })
            }));
        },
        deleteModule: (i:string) => {
            set((state)=>({
                prevLayout: state.layout,
                layout: state.layout.filter((mod) => mod.i !== i)
            }));
        },

        setLayoutState: (i: string, state: Record<string, any>) => {
            set((prev) => ({
                layout: prev.layout.map((mod) =>
                    mod.i === i ? {...mod, componentState: state} : mod
                )
            }));
        },

        updateLayoutState: (i: string, partialState: Record<string, any>) => {
            set((prev) => ({
                layout: prev.layout.map((mod) =>
                    mod.i === i
                        ? {
                              ...mod,
                              componentState: {
                                  ...mod.componentState,
                                  ...partialState,
                              },
                          }
                        : mod
                ),
            }));
        },
        getLayoutState: (i: string) => {
            const mod = get().layout.find((mod) => mod.i === i);
            return mod ? mod.componentState : undefined;
        },

        prevLayout: [],
        setPrevLayout: () => {
            set((state) => ({prevLayout: state.layout}));
        }
    }),
    {
        name: 'layout-storage',
    }
));