import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* Notes:
1. Main.jsx is the main entry point of the React application.
2. It must import whatever it renders.  This is why we import App from './App.jsx'.
3. To put these layers in a book analogy:
    Main.jsx = physical binding of the book
    App.jsx = Table of Contents
    Parent Component = Chapter (where the story is told)
    Children Component = Paragraphs/Illustrations (giving the story more detail)
4. Global stylings go here; don't forget css is not a component, but a styling language.
  */
