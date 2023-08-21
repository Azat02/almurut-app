


export interface UsersProps {
    index: number;
    selected: number;
    setSelected: (selected: number) => void;
    racer: Racer;
  }
  
 export  interface StyledUserNumberProps {
    selected: boolean;
  }

  export interface Racer {
    id: number;
    name: string;
    speed: number;
  }