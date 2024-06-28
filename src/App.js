import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Table from './components/Table';
import toast from 'react-hot-toast';
function App() {
  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    showAllEntries();
  }, []);

  const addEntry = async () => {
    try {
      const {data} = await axios.post(`http://localhost:4000/api/v1/addEntry`, {
        Name: userName,
      });
      // console.log("Data entry", res);
      if(data.success){
        setUserName("");
        toast.success("Entry added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add entry.Please try again...");
    }
  };

  const showAllEntries = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/getAllEntries"
      );
      console.log("All Entries", data);
      setEntries(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEntry = async (id) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/api/v1/deleteEntry/${id}`);
      if (data.success) {
        showAllEntries();
        toast.success("Entry deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete.Please try again...")
    }
  };

  const editEntry = async (id) =>{
    try{

      const {data} = await axios.post(`http://localhost:4000/api/v1/deleteEntry/${id}`);

      if(data.success){
        
      }

    }catch(error){
      console.log("Error while editing an entry");
      toast.error("Failed to delete entry.Please try again...");
    }
  }

  const deleteHandler = (id)=>{
    deleteEntry(id);
    showAllEntries();
  }

  const handleAddEntry = (e) => {
    e.preventDefault();
    addEntry();
    showAllEntries();
  };

  const handleOnchange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <Header />

      <div className="input-conatiner">
        <form onSubmit={handleAddEntry}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              required
              name="userName"
              id="userName"
              placeholder="Enter your name:"
              value={userName}
              onChange={handleOnchange}
            />
            <button>Add Entry</button>
          </div>
        </form>
      </div>
      <div className="table-container">
        <Table entries={entries} deleteHandler={deleteHandler}/>
      </div>
    </>
  );
}

export default App;
