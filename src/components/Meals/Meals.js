import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import AddMeal from "./MealItem/AddMeal";

const Meals = () => {
  
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <AddMeal />
    </Fragment>
  );
};

export default Meals;
