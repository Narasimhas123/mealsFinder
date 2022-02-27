import { useState } from "react";
import Reacipe from "./Reacipe";

function Search({ meals }) {
  const [currentReceipe, setCurrentReceipe] = useState(null);
  return (
    <>
      <div>
        {meals.map((e) => {
          return (
            <div onClick={() => setCurrentReceipe(e)}>
              <img serc={e.strMealThumb} alt={e.strMeal} />
              <div>
                <h3>{e.strMeal}</h3>
              </div>
            </div>
          );
        })}
      </div>
      {currentReceipe ? <Reacipe meal={currentReceipe} /> : null}
    </>
  );
}

export default Search;
