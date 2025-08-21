export interface Layout {
    i : string; 
    x: number;
    y: number;
    w: number;
    h: number;
    componentType: string;
    componentState?: Record<string, any>;
}