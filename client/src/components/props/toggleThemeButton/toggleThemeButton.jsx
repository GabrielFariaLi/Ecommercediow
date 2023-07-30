import { React, useState, useEffect } from "react";
import "./styles.css";

const ToggleThemeButton = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const gerirTrocaDeTema = async (tema) => {
    console.log(currentTheme);
    if (currentTheme === "light") {
      document.body.classList.remove("light-theme");
      await document.body.classList.add("dark-theme");
      console.log(document.body.classList);
      setCurrentTheme("dark");
      return;
    } else if (currentTheme === "dark") {
      document.body.classList.remove("dark-theme");
      await document.body.classList.add("light-theme");
      console.log(document.body.classList);
      setCurrentTheme("light");
      return;
    }
  };

  return (
    <>
      <div className="wrapper-togglTeheme">
        <input onClick={() => gerirTrocaDeTema()} type="checkbox" />
        {/*  <label for="hide-checkbox" className="toggle">
          <span className="toggle-button">
            <span className="crater crater-1"></span>
            <span className="crater crater-2"></span>
            <span className="crater crater-3"></span>
            <span className="crater crater-4"></span>
            <span className="crater crater-5"></span>
            <span className="crater crater-6"></span>
            <span className="crater crater-7"></span>
          </span>
          <span className="star star-1"></span>
          <span className="star star-2"></span>
          <span className="star star-3"></span>
          <span className="star star-4"></span>
          <span className="star star-5"></span>
          <span className="star star-6"></span>
          <span className="star star-7"></span>
          <span className="star star-8"></span>
        </label> */}
      </div>
    </>
  );
};

export default ToggleThemeButton;
