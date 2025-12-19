import { useState, useEffect, useRef } from 'react';

import Controls from "./Controls";
import CardView from "./CardView";

export default function DeckApp() {

    //Section 1: Hooks (useState, useRef, useEffect - in that order)

//State Management Variables (should update when these change)
const [ deckId, setDeckId ] = useState(null);
const [ remaining, setRemaining ] = useState(null);
const [ drawn, setDrawn ] = useState([]);
const [ isShuffling, setIsShuffling ] = useState(false);

//REF Variable (persists across renders, does not trigger re-renders)
//Unmount safety flag for async operations
const isMountedRef = useRef(true);

//Effect Hook Function (runs after render- creates new deck on mount)
useEffect(() => {
    //Unmount safety flag for async operations
    isMountedRef.current = true;
//Todos:
//1. Create new deck- fetch endpoint, must put in a variable
async function createDeck() {
const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
//2. parse JSON response
const data = await response.json();
//3. unmounted safety guard
if (!isMountedRef.current) return;
//4. extract desired info from JSON, (using data.):
// Set deckId state variable to new deck id
setDeckId(data.deck_id);
// Set remaining state variable to what api returns
setRemaining(data.remaining);
}
//4. Call the createDeck function
createDeck();

return () => {
    //5. Cleanup run when component unmounts
    isMountedRef.current = false;
   };
}, []);


        //Section 2: Event Handlers
//Event Handler Functions
async function handleDraw () {
    //Todos:
    //1. fetch draw endpoint, must put in a variable
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    //2. parse JSON response
    const data = await response.json();
    //3. unmount safety guard
    if (!isMountedRef.current) return;
    //4. extract card from JSON response
    const newCard = data.cards[0];
    //5. update state (using setter) from Server data (API)
     setDrawn(prevDrawn => [...prevDrawn, newCard]);
     setRemaining(data.remaining);
    //6. if newRemaining === 0, alert immediately
    if (data.remaining === 0) {
        alert("No more cards left in the deck!");
    }
}

async function handleShuffle () {
    //Todos: (Pattern changes slightly once UI gets involved)
    //1. Tricky part- user clicked shuffle button, set isShuffling state variable to true
    // "React the user clicked shuffle, so now we are waiting on the server"
    // while we're waiting, we disabled the shuffle button, we flipped the "Busy" sign over.
    // this happens before the fetch call is even made.
    setIsShuffling(true);
    //2. fetch shuffle endpoint, must put in a variable
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    //3. parse JSON response
    const data = await response.json();
    //4. guard with isMountedRef
    if (!isMountedRef.current) return;
    //5. Clear drawn (setDrawn([]))
    setDrawn([]);
    //6. upddate state (using setter) from Server data (API)
    setRemaining(data.remaining);
    //7. Set isShuffling state variable to false
    // "React, the server responded- we're done shuffling"
    // the button get turned back on, allows drawing again and reflects new remaining count.
    setIsShuffling(false);
}  //Step 1 & 7 are a pair that go on either end of the user interaction, the rest is the same 
   // as draw.


        //Section 3: Derived Values

//Derived Values (from computed state variables)
const latestCard= drawn.length > 0 ? drawn[drawn.length - 1] : null;

const drawDisabled = !deckId || isShuffling || remaining === 0;

const shuffleDisabled = !deckId || isShuffling;

        //Section 4: Render

//Render- put JSX in here
return (
    <div className="deck-app">
        <h1>Card Dealer</h1>
          <div className="controls">
          <Controls
            onDraw={handleDraw}
            onShuffle={handleShuffle}
            drawDisabled={drawDisabled}
            shuffleDisabled={shuffleDisabled}
            shuffleLabel={isShuffling ? "Shuffling..." : "Shuffle Deck"}
          />
          </div>

        
        <div className="card-view">
        <CardView card={latestCard} />
        </div>
    </div>
  );
}

/* Notes:
I. Parent Component Structure: (after imports) Sections: 1. hooks (state, ref, effect -in this order), 
   2. event handlers, 3. derived values, 4. render (JSX)
II. Beginning to learn to put export default function ComponentName() {} inline at the top. This goes
    before you start writing your hooks, event handlers, and derived values. This is a real world
    practice for React components. It makes it easy for devs to quickly see the component name and its
    export status.
III. When dealing with API's, there is a hierarchy of "truth". The API is at the top,
    then the parent component is next, it houses all the state, conditions, & logic.
    "Never compute what the server already knows". Apply this statement to your code.
IV. Establish this pattern when working with API's and React components:
    1. fetch API endpoint, put in a variable (const response =)
    2. parse JSON response, (const data = await response.json())
    3. unmount safety guard
    4. extract desired info from JSON
    5. update state (using setter) from Server data (API)
    Your specific project may require additional steps, but this is a good starting point.
V.  Use the unmount safety guard when dealing with async operations. This is a common pattern in React.
VI. When working with state variables, always use the setter function to update them. 
    This ensures that the component re-renders with the new state.
*/






