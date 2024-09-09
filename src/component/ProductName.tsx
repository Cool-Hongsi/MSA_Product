import React, { useState } from "react";
import styles from "./ProductName.module.css";

const ProductName = () => {
  const [productName, setProductName] = useState<string[]>([]);

  const onClickProductName = () => {
    const productNameList = ["AA", "BB", "CC", "DD"];
    setProductName(productNameList);
  };

  return (
    <div className={styles.container}>
      <h2>This is Product Name</h2>
      <button onClick={onClickProductName}>Show Product Name List</button>
      {productName.map((product: string) => {
        return <div key={product}>{product}</div>;
      })}
    </div>
  );
};

export default ProductName;
