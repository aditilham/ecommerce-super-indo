import exampleData from '../assets/json/sampleData.json'
const setProductData = () => {
  let productList;
  let exampleDatas = exampleData.shoppingData

  if (
    localStorage.getItem("productList") &&
    (localStorage.getItem("productList") != {} ||
      localStorage.getItem("productList") != null ||
      localStorage.getItem("productList") != `undefined`)
  ) {
    productList = JSON.parse(localStorage.getItem("productList"));
    return productList;
  } else {
    productList = exampleDatas
    return productList;
  }
};

export default setProductData;
