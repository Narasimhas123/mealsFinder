import { useState } from "react";
import Reacipe from "./Reacipe";
import Search from "./Search";
import "./styles.css";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [meals, setMeals] = useState([]);
  const [currentReacipe, setCurrentReacipe] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showReacipe, setShowReacipe] = useState(false);
  // const [currentReacipe, setCurrentReacipe]=useState(null)
  const search = async (e) => {
    e.preventDefault();
    if (keyword === "") {
      alert("enter meals");
      return;
    }
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword
      );
      const data = await response.json();
      if (data.meals == null) {
        alert("no search result try again");
        return;
      }
      setMeals(data.meals);
      setShowResult(true);
      setShowReacipe(false);
      setKeyword("");
    } catch (error) {
      console.log(error);
    }
  };
  const random = async () => {
    try {
      setMeals([]);
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php" + keyword
      );
      const data = await response.json();
      setCurrentReacipe(data.meals[0]);
      setShowReacipe(true);
      setShowResult(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <form onSubmit={search}>
        <input
          type="text"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <input type="submit" value="search" />
      </form>
      <input type="button" value="random" onClick={random} />
      {showResult ? (
        <div>
          <Search meals={meals} />
        </div>
      ) : null}
      {showReacipe ? <Reacipe meal={currentReacipe} /> : null}
    </div>
  );
}
