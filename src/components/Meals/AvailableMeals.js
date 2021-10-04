import { React, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const { get, data, isLoading } = useHttp();

  useEffect(() => {
    const getData = async () => {
      var result = await get("https://localhost:5001/api/meals/all");
      console.log(result);
    };

    getData();
  }, [get]);

  const mealsList = data?.data?.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.amount}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <ul>isLoading</ul>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
