import logo from "./logo.svg";
import { createSignal, createEffect, For, onMount, onCleanup } from "solid-js";
import "./App.css";
import { createScrollPosition } from "@solid-primitives/scroll";

function App() {
  //  Signals

  const [branch, setBranch] = createSignal([
    { id: [1, 1], hierarchy: [1], subject: "First Branch" },
    { id: [1, 2], hierarchy: [1], subject: "Second Branch" },
  ]);
  const [jobs, setJobs] = createSignal([
    { id: 1, title: "1st Job", tree: [branch()] },
  ]);
  const [inputValue, setInputValue] = createSignal("");
  const [searchInputValue, setSearchInputValue] = createSignal("");
  const [currentJob, setCurrentJob] = createSignal(1);
  const [mouseOverID, setMouseOverID] = createSignal();
  const [hierarchy, setHierarchy] = createSignal([1]);
  const windowScroll = createScrollPosition();
  console.log(branch()[0].hierarchy.toString());
  console.log(hierarchy().toString());
  console.log(hierarchy().toString() == branch()[0].hierarchy.toString());

  //  Handle main input, creating a new branch which will appear on the screen
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let newBranch = {
        id: [...hierarchy(), jobs()[currentJob() - 1].tree[0].length],
        hierarchy: hierarchy(),
        subject: inputValue(),
      };
      let updatedTree = [...jobs()[currentJob() - 1].tree[0], newBranch];
      const updatedJobs = jobs();
      updatedJobs[currentJob() - 1].tree[0] = updatedTree;
      setJobs(updatedJobs);

      // Clear the input value
      setInputValue("");

      // update the DOM
      setBranch(jobs()[currentJob() - 1].tree[0]);
    }
  };

  //  Add Job Button Styling
  const [addButtonStyle, setAddButtonStyle] = createSignal("addButton");
  const handleMouseDown = () => {
    setAddButtonStyle("addButtonPressed");
  };
  const handleMouseUp = () => {
    setAddButtonStyle("addButton");
  };

  //  Add a new job
  const handleAddJob = () => {
    let title = prompt("Project Title: ");
    let branchSubject = prompt("First thing: ");
    let branch = [{ id: [1, 1], hierarchy: [1], subject: branchSubject }];
    const newJob = {
      id: jobs().length + 1,
      title: title,
      tree: [branch],
    };
    let updatedJobs = jobs();
    updatedJobs = [...updatedJobs, newJob];
    setJobs(updatedJobs);
    console.log(jobs());
    setCurrentJob(newJob.id);
    console.log(currentJob());

    // update the DOM
    setBranch(jobs()[currentJob() - 1].tree[0]);
  };

  const [branchHover, setBranchHover] = createSignal(false);
  const handleMouseEnter = (branch) => {
    setMouseOverID(branch.id);
    console.log(mouseOverID());
    setBranchHover(true);
  };
  const handleMouseLeave = () => {
    setMouseOverID();
    setBranchHover(false);
    setShiftComplete(false);
  };

  const [shiftComplete, setShiftComplete] = createSignal(false);

  const handleHierarchyShift = () => {
    if (shiftComplete() == false) {
      if (wDelta() == "up" && branchHover() == true) {
        console.log("scroll up");
        console.log(mouseOverID());
        setShiftComplete(true);
        setHierarchy(mouseOverID);
      } else if (wDelta() == "down" && branchHover() == true) {
        console.log("scroll down");
        if (hierarchy().length > 2)
          setHierarchy(hierarchy().slice(0,-1));
          setShiftComplete(true);
      }
      setWDelta("");
    }
  };

  const [wDelta, setWDelta] = createSignal("");
  // const [scrolleRegistered, setScrollRegistered] = createSignal(false);

  const handleMouseWheel = (e) => {
    const delta = e.deltaY;
    let direction = delta < 0 ? "up" : "down";
    if (delta == 0) direction = "";

    setWDelta(direction);
  };

  // Add event listener when the component is mounted
  onMount(() => {
    window.addEventListener("wheel", handleMouseWheel);
    // Remove event listener when the component is unmounted
    onCleanup(() => {
      window.removeEventListener("wheel", handleMouseWheel);
    });
  });

  return (
    <div>
      <input
        class="mainInput"
        value={inputValue()}
        onInput={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>

      <button
        class={addButtonStyle()}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleAddJob}
      >
        ➕
      </button>

      <div class="nodeContainer">
        <For each={jobs()}>
          {(job, i) => (
            <li
              // onMouseEnter={handleMouseEnter(job.tree[i].id)}
              class="list"
            >
              {currentJob() == job.id && (
                <For each={branch()}>
                  {(branch, j) => (
                    <>
                      {branch.hierarchy.toString() ==
                        hierarchy().toString() && (
                        <div
                          class="node"
                          onMouseEnter={() => handleMouseEnter(branch)}
                          onMouseLeave={handleMouseLeave}
                          onWheel={handleHierarchyShift}
                        >
                          {branch.subject}
                        </div>
                      )}
                    </>
                  )}
                </For>
              )}
            </li>
          )}
        </For>

        <input
          class="searchContainer"
          placeholder="🔎 Search 🔎"
          value={searchInputValue()}
          onInput={(e) => setSearchInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </div>
  );
}

export default App;
