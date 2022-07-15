import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./CommonStyle.module.css";

function CommonStyle() {
  return <Outlet className={styles} />;
}

export default CommonStyle;
