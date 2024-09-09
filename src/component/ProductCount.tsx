import React, { useState } from "react";
import styles from "./ProductCount.module.css";

const ProductCount = () => {
  const [productCount, setProductCount] = useState<number>(0);

  return (
    <div className={styles.container}>
      <h2>This is Product Count</h2>
      <button onClick={() => setProductCount(productCount + 1)}>Plus</button>
      <button onClick={() => setProductCount(productCount - 1)}>Minus</button>
      {productCount}
    </div>
  );
};

export default ProductCount;
