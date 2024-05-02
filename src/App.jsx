import logo from './logo.svg';
import { createSignal, createEffect, For } from "solid-js";
import './App.css'

function App() {

  //  Signals

  const [branch, setBranch] = createSignal([{id: [1,1], hierarchy: [1], subject: "First Branch"},{id: [1,2], hierarchy: [1], subject: "Second Branch"}])
  const [jobs,setJobs] = createSignal([{id: 1, title: "1st Job", tree:[branch()]}]);
  const [inputValue, setInputValue] = createSignal('');
  const [searchInputValue, setSearchInputValue] = createSignal('');
  const [currentJob, setCurrentJob] = createSignal(1);
  const [currentHierarchy, setCurrentHierarchy] = createSignal([1]);

  //  Handle main input, creating a new branch which will appear on the screen
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

      let newBranch = {
        id: [],
        hierarchy: [],
        subject: inputValue()
      };
      let updatedTree = [...jobs()[currentJob()-1].tree[0], newBranch];
      const updatedJobs = jobs();
      updatedJobs[currentJob()-1].tree[0] = updatedTree;
      setJobs(updatedJobs);

      // Clear the input value
      setInputValue('');

      // update the DOM
      setBranch(jobs()[currentJob()-1].tree[0]);
    }
  }

  //  Add Job Button Styling
  const [addButtonStyle, setAddButtonStyle] = createSignal("addButton");
  const handleMouseDown = () => {
    setAddButtonStyle("addButtonPressed");
  }
  const handleMouseUp = () => {
    setAddButtonStyle("addButton");
  }

  //  Add a new job
  const handleAddJob = () => {
    let title = prompt("Project Title: ");
    let branchSubject = prompt("First thing: ")
    let branch = [{id: [1,1], hierarchy: [1], subject: branchSubject}]
    const newJob = {
      id: jobs().length + 1, 
      title: title,
      tree: [branch]
    };
    let updatedJobs = jobs();
    updatedJobs = [...updatedJobs, newJob];
    setJobs(updatedJobs);
    console.log(jobs());
    setCurrentJob(newJob.id);
    console.log(currentJob());

    // update the DOM
    setBranch(jobs()[currentJob()-1].tree[0]);
  }

  const handleMouseEnter = (id) => {
    // console.log(id)
    console.log('ENTER');
  }
  const handleMouseLeave = (id) => {
    // console.log(id)
    console.log('LEAVE');
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
        onMouseUp={handleMouseUp}
        onClick={handleAddJob}>➕</button>

      <div class="nodeContainer">

        <For each={jobs()}>{(job, i) =>
        
          <li
          // onMouseEnter={handleMouseEnter(job.tree[i].id)}
          class="list"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            {currentJob() == job.id &&
            <For each={branch()}>{(branch, j) =>
              <div class="node"
              >{branch.subject}</div>
            }</For>
          }
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
