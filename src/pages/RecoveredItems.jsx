import React from "react";
import { useLoaderData } from "react-router";

const RecoveredItems = () => {
  const items = useLoaderData();
  console.log(items);

  return <div></div>;
};

export default RecoveredItems;
