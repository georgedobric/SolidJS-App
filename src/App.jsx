import logo from './logo.svg';
import { createSignal, createEffect, For } from "solid-js";
import './App.css'

function App() {

  //  Signals

  const [branch, setBranch] = createSignal([{id: [1,1], hierarchy: [1], subject: "First Branch"},{id: [1,2], hierarchy: [1], subject: "Second Branch"}])
  const [jobs,setJobs] = createSignal([{id: 1, title: "1st Job", tree:[branch()]}]);
  const [inputValue, setInputValue] = createSignal('');
  const [searchInputValue, setSearchInputValue] = createSignal('');

  //  Handle main input, creating a new branch which will appear on the screen
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let branchIndex = branch().length + 1;
      let newBranch = {
        id: [1,branchIndex], //all but last number should be currHierarchy
        hierarchy: [1],
        subject: inputValue()
      }
      setBranch((prevArray) => [...prevArray, newBranch]);
      console.log(branch());

      const updatedJobs = jobs();
      console.log(updatedJobs[0].tree);
      updatedJobs[0].tree[0] = [...updatedJobs[0].tree[0], newBranch];
      setJobs(updatedJobs);
    //   // setJobs((prevArray) => [...prevArray, ])
      console.log(jobs());

      // Clear the input value
      setInputValue('');
    }
  }

  // const [addState, setAddState] = createSignal(false);
  // let addButtonStyle = "addButton";
  const [addButtonStyle, setAddButtonStyle] = createSignal("addButton");
  const handleMouseDown = () => {
    // if (addState == false)
    //   setAddState(true);
    // else 
    //   setAddState(false);
    setAddButtonStyle("addButtonPressed");
  }

  const handleMouseUp = () => {
    setAddButtonStyle("addButton");
  }

  return (
    <div>

      <input
        class="mainInput"
        value={inputValue()}
        onInput={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}></input>

      <button class={addButtonStyle()}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>➕</button>

      <div class="nodeContainer">

        <For each={branch()}>{(branch, i) =>
          <li>
              <div class="node">{branch.subject}</div>
          </li>
        }</For>

        <input
          class="searchContainer"
          placeholder="🔎 Search 🔎"
          value={searchInputValue()}
          onInput={(e) => setSearchInputValue(e.target.value)}
          onKeyDown={handleKeyDown}></input>
      </div>
    
    
    </div>
  );
}

export default App;
