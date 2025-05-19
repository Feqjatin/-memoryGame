import { useEffect, useState } from 'react';
import './App.css';
import Gcard from './Gcard';
 import { NewPage ,matchCards } from './NewPage';
 
 
function App() {

  const [welcome, setWelcome] = useState('no');
  const [level, setLevel] = useState(1);
  const [change, setChange] = useState(1);
  const [currFliped,setCurrFliped]=useState([]);
  const [currPage, setCurrPage] = useState([]);
  const [Mtime, setMtime] = useState(0);
  const [Stime, setStime] = useState(-1);


  const levelRowCol = [[2, 3], [3, 4], [4, 4], [4, 5], [4, 6]];
  const [rows, cols] = levelRowCol[level - 1];
  const totalCards = rows * cols;
 
  useEffect(() => {
    if (welcome === 'yes') {
      const timer = setInterval(() => {
        setStime(prevStime => {
          if (prevStime >= 59) {
            setMtime(prevMtime => prevMtime + 1);
            return 0;
          }
          return prevStime + 1;
        });
      }, 1000);
  
      return () => clearInterval(timer); // clean up
    }
  }, [welcome]);
    

  useEffect(() => {
    if (welcome === 'yes') {
      console.log("Welcome to the game");
      const [rows, cols] = levelRowCol[level - 1];
      const totalCards = rows * cols;
      setCurrPage(NewPage(totalCards));
      console.log(currPage);
      if(Stime<0){
      setStime(0);
      }
    }
  }, [level, welcome, change]);
  
  
   useEffect(() => {
     
    if(currFliped.length%2 == 0){ {
      setTimeout(() => {
        
        if (currFliped.length % 2 !== 0) {
          remove(currFliped[currFliped.length - 1]);
          currFliped.pop();
        }
        while(!matchCards(currPage[currFliped[currFliped.length-1]],currPage[currFliped[currFliped.length-2]]))
         {
        remove(currFliped[currFliped.length-1]);
        remove(currFliped[currFliped.length-2]);
        currFliped.pop();
        currFliped.pop();
        console.log(currFliped );
       }

  
      
       
        
       
       if(totalCards<=currFliped.length){
        alert("You Win"); 
        goToHome();

       }



       
      }, 400);
       
    }
    
   }
    
   },[currFliped]);

   function remove(name){
    var card=document.getElementById(name);
    card.classList.add("cardBack");
    card.innerHTML = "";
   }

   function reload(){
    for(let id of currFliped){
     remove(id);
    }
    setChange(change+1);
   }

   function goToHome(){
    setWelcome('no');
    setCurrFliped([]); 
    setCurrPage([]);
    setChange(0);
    setLevel(1);
    setMtime(0);
    setStime(0);
   }
    

   function page(){
    if(welcome === 'no') {
      return (
        <div className="welcome">
          <h1>Welcome to Memory Game</h1>
          <p>Select Difficulty Level:</p>
          <div className="level-buttons">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                className={level === lvl ? 'selected' : ''}
                onClick={() =>  setLevel(lvl)}
              >
                Level {lvl}
              </button>
            ))}
          </div>
          <button onClick={() => setWelcome('yes')}>Start Game</button>
        </div>
      );
      
    
      
    }
    else{
      return <>
     <div className="top-bar">
  <label className="level">Level {level}</label>
  <div className="top-bar-buttons">
    <button onClick={goToHome} className="goToHome">Home</button>
    <button onClick={reload} className="reload">Reload</button>
  </div>
  <label className="timer">{Mtime}:{Stime}</label>
</div>

      <div
        className="container"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, auto)`,
        }}
      >
        {Array.from({ length: totalCards }, (_, i) => (
          <Gcard key={i} name={i} currLevel={level} currPage={currPage} currFliped={currFliped} setCurrFliped={setCurrFliped} />
        ))}
      </div>
      </>;
    }
    return <>hi from jatin</>
   }
  
  
  return (
        page()
  );
}

export default App;
