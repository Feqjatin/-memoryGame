import { use } from "react";
import { useState } from "react";
const emojis = ['🍎', '🍌', '🍇', '🍉', '🥑', '🍒', '🍍', '🍋', '🍓', '🥝','🍑','🥥']

   
  function NewPage(totalCards) {
  
    const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
    const selectedEmojis = shuffledEmojis.slice(0, totalCards / 2);
   const cardEmojis = [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);
   // alert(cardEmojis);  
    // const selectedEmojis = emojis.slice(0, totalCards / 2);
    //const cardEmojis = [...selectedEmojis, ...selectedEmojis];
    return cardEmojis;                                             
  }
 
 function matchCards(card1, card2) {
  console.log(card1+" "+card2 + " im from match "+ (card1==card2));
  
    return card1 == card2;
  }

 export  {NewPage,matchCards};
 