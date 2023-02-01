import { useEffect, useState } from "react";
import { fetchFirstSheet } from "../api/sheets";

const useTest = () => {
  useEffect(() => {
    void fetchFirstSheet(
      "https://docs.google.com/spreadsheets/d/1irSfdHrKOHhs-5xaNjVvJKCJHjf-wsQIz9F_NWlOios/edit#gid=1220838255"
    );
  }, []);
};

export default useTest;
