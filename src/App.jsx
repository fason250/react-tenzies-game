import {  useState,useRef,useEffect } from "react"
import Die from "./components/Die"
import FullScreenConfetti from "./components/FullScreenConfetti"


function App(){
  const [newDices,setNewDices] = useState(()=>generateAllNewDice())
  const [rolledTimes ,setRolledTimes] = useState(0)
  const refElement = useRef(null)
  const gameWon = newDices.every(dice => dice.isHeld) && newDices.every(dice=> dice.value === newDices[0].value)



  useEffect(()=>{
    if(gameWon){
      refElement.current.focus()
    }
  },[gameWon])

  function generateAllNewDice(){
    return new Array(10).fill(0).map(()=>({value:  Math.ceil(Math.random() * 6),isHeld: false,id: crypto.randomUUID()}))
  }

  function rollDice(){
    setNewDices( prevNewDices => prevNewDices.map(dice =>(dice.isHeld ? dice : {...dice,value:Math.ceil(Math.random() * 6)})) )

  }

  function handleRoll(event){
    if(event.target.innerText.toLowerCase() === "roll"){
      rollDice()
      rolledTime()
    }else{
      setNewDices(generateAllNewDice())
    }
    
  }

  function rolledTime(){
    setRolledTimes(prevRolledTimes=> prevRolledTimes + 1)
  }
  
  function hold(id){
    setNewDices(prevNewDices => prevNewDices.map( dice => ( dice.id === id ? {...dice,isHeld: !dice.isHeld} : dice )))

  }


  const allNewDices = newDices.map((die,index)=>( <Die key={index} hold={()=>hold(die.id)}  dice={die} />))



  return (
    <main>
      { gameWon && <FullScreenConfetti /> }
      <div className="screen-reader-only" aria-live="polite">
        {gameWon && <p>Congratulations! you won press &quot;New Game&quot; to start again.</p>}

      </div>
      <h1 className="tittle">Tenzies Game</h1>
      <p className="instruction">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
      <div className="dices">
        { allNewDices }
      </div>
      <button ref={refElement} className="roll-btn" onClick={handleRoll}>{ gameWon ? "New Game" : "Roll"}</button>
      {gameWon && <p>you Won✨🙌 and you  Rolled  <b>{rolledTimes - 1}</b> times </p>}
      {!gameWon ?  <small> &copy; {new Date().getFullYear() }  Jey Fason All rights reserved</small> : "" }
    </main> 
  )
}


export default App 