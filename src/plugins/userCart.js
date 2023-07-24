const setUserCart = () => {
  let userCart;

  if (
    localStorage.getItem("userCart") &&
    (localStorage.getItem("userCart") != {} ||
      localStorage.getItem("userCart") != null ||
      localStorage.getItem("userCart") != `undefined`)
  ) {
    userCart = JSON.parse(window.atob(localStorage.getItem("userCart")));
    return userCart;
  } else {
    userCart = null
    return userCart;
  }
};

export default setUserCart;
