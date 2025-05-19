import React, { useState, useEffect } from 'react';
import './Gcard.css';
import { matchCards } from './NewPage';

function Gcard({ name, currLevel, currPage, currFliped, setCurrFliped }) {
  const levelRowCol = [[2, 3], [3, 4], [4, 4], [5, 4], [6, 4]];
  const level = levelRowCol[currLevel - 1];

  const [cardSize, setCardSize] = useState({ width: 100, height: 150 });

  useEffect(() => {
    const calculateCardSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Divide width by columns and height by rows
      const cardHeight = Math.floor((vh * 0.8) / level[1]);
      const cardWidth = Math.floor((vw * 0.9) / level[0]);

      // Use the smaller of the two to keep cards square-ish
      const finalHeight = Math.min(cardHeight, cardWidth * 1.5); // adjust aspect ratio
      const finalWidth = finalHeight / 1.5;

      setCardSize({ width: finalWidth, height: finalHeight });
    };

    calculateCardSize(); // Initial calculation
    window.addEventListener('resize', calculateCardSize); // Recalculate on resize

    return () => window.removeEventListener('resize', calculateCardSize);
  }, [currLevel]);

  function remove(name) {
    const card = document.getElementById(name);
    if (card) {
      card.classList.add('cardBack');
      card.innerHTML = '';
    }
  }

  const halCard = (name) => {
    const card = document.getElementById(name);
    if (card && card.style.background !== 'none') {
      card.classList.remove('cardBack');
      card.innerHTML = currPage[name];
      card.style.fontSize = '5rem';

      if (!currFliped.includes(name)) {
        const flippedCopy = [...currFliped];
        const toKeep = [];

        const len = flippedCopy.length;
        const hasOdd = len % 2 !== 0;
        const limit = hasOdd ? len - 1 : len;

        for (let i = 0; i < limit; i += 2) {
          const id1 = flippedCopy[i];
          const id2 = flippedCopy[i + 1];
          const card1 = currPage[id1];
          const card2 = currPage[id2];

          if (matchCards(card1, card2)) {
            toKeep.push(id1, id2);
          } else {
            remove(id1);
            remove(id2);
          }
        }

        if (hasOdd) {
          const lastId = flippedCopy[len - 1];
          toKeep.push(lastId);
        }

        toKeep.push(name);
        setCurrFliped(toKeep);
      }
    }
  };

  return (
    <div
      className="Card cardBack"
      id={name}
      onClick={(e) => halCard(e.target.id)}
      style={{
        width: `${cardSize.width}px`,
        height: `${cardSize.height}px`,
      }}
    ></div>
  );
}

export default Gcard;
