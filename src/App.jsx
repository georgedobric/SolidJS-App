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


      {/* <Switch>
        <Match when={condition1}>
          <p>Outcome 1</p>
        </Match>
      </Switch> */}

        {/* <Show
          when={loggedIn()}
          fallback={<button onClick={toggle}>Log in</button>}
        >
          <button onClick={toggle}>Log out</button>
        </Show> */}

{/* <div class="node">currentJob: {currentJob()}</div>
<div class="node">jobID: {jobs()[0].id}</div> */}
        <For each={jobs()}>{(job, i) =>
        
          <li>
            {/* {job.id == currentJob &&
            <div class="node">{job.title}</div>
            }    */}

            {/* <div class="node">{job.id}</div> */}


            {currentJob() == job.id &&
            <For each={job.tree[0]}>{(branch, j) =>
              // <div class="node">asda</div>
              <div class="node">{branch.subject}</div>
            }</For>
          }
          </li>
        }</For>
        {/* <For each={branch()}>{(branch, i) =>
          <li>
              <div class="node">{branch.subject}</div>
          </li>
        }</For> */}

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
