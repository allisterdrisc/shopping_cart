import { useState } from 'react';

interface SortButtonProps {
  sortBy: 'title' | 'price' | 'quantity';
  onClick: (sortBy: 'title' | 'price' | 'quantity', clickedCount: number) => void;
}

export const SortButton:React.FC<SortButtonProps> = ({sortBy, onClick}) => {
  const [clickedCount, setClickedCount] = useState(0);

  return (
    <button onClick={() => {setClickedCount(prev => prev + 1); onClick(sortBy, clickedCount)}}>
      {sortBy}
    </button>
  )
}