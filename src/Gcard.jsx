import React from 'react';
import './Gcard.css';
import  {matchCards } from './NewPage';
import { useState,useEffect } from 'react';
function Gcard({key,name,currLevel,currPage,currFliped,setCurrFliped}) {
  

    var levelRowCol=[ [2,3],[3,4],[4,4],[5,4],[6,4]];
    var level=levelRowCol[currLevel-1];
    var vw=window.innerWidth;
    var vh=window.innerHeight;
    
    //console.log(Math.round(vw/level[0]));
    function remove(name){
      var card=document.getElementById(name);
      card.classList.add("cardBack");
      card.innerHTML = "";
     }

    const halCard=(name)=>{
        //console.log(name+currPage+currPage[name]);
        var card=document.getElementById(name);
         if(card!=null&& card.style.background !="none"){
          card.classList.remove("cardBack");
          card.innerHTML =  currPage[name] ;
          card.style.fontSize ="5rem";

          if (!currFliped.includes(name)) {
            const flippedCopy = [...currFliped]; // Copy to avoid direct mutation
            const toKeep = []; // Store matched + unmatched last card
          
            const len = flippedCopy.length;
            const hasOdd = len % 2 !== 0;
            const limit = hasOdd ? len - 1 : len;
          
            // Step through even pairs
            for (let i = 0; i < limit; i += 2) {
              const id1 = flippedCopy[i];
              const id2 = flippedCopy[i + 1];
              const card1 = currPage[id1];
              const card2 = currPage[id2];
          
              if (matchCards(card1, card2)) {
                toKeep.push(id1, id2); // Keep matched
              } else {
                remove(id1);
                remove(id2);
              }
            }
          
            // Keep last unmatched card if odd
            if (hasOdd) {
              const lastId = flippedCopy[len - 1];
              toKeep.push(lastId);
            }
          
            // Add new card to check in next round
            toKeep.push(name);
          
            // Finally, update state
            setCurrFliped(toKeep);
          }
          
         }
    }
    
   var h1=Math.round(vh/level[1])*0.80;
  

    return (
        <div className="Card cardBack" id={name} onClick={(e)=>halCard(e.target.id)} style={{width:`${h1*2/3}px`,height:`${h1}px`}}>
        
      </div>
      
    );
  }
  export default Gcard;