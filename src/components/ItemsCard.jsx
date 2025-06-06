import React from "react";

const ItemsCard = ({ item }) => {
  const { _id } = item;
  return (
    <div>
      <h1>{_id}</h1>
    </div>
  );
};

export default ItemsCard;
