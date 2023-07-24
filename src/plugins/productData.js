import exampleData from '../assets/json/sampleData.json'
const setProductData = () => {
  let productList;
  let exampleDatas = exampleData.shoppingData

  if (
    localStorage.getItem("esiProduct") &&
    (localStorage.getItem("esiProduct") != {} ||
      localStorage.getItem("esiProduct") != null ||
      localStorage.getItem("esiProduct") != `undefined`)
  ) {
    productList = JSON.parse(window.atob(localStorage.getItem("esiProduct")));
    return productList;
  } else {
    productList = exampleDatas
    return productList;
  }
};

export default setProductData;
