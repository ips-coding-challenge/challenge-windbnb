import React, { useContext, useMemo, memo } from "react";
import Stay from "./Stay";
import StayProps from "../interfaces/StayProps";
import { store } from "../store/store";

const Stays = memo(({ stays }: any) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Stays in Finland</h2>
        <span className="text-gray-800 text-xl">{stays.length} stays</span>
      </div>
      <div className="grid sm:gap-4 grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 mt-6">
        {stays.length > 0 &&
          stays.map((stay: any, i: number) => <Stay {...stay} key={i} />)}
      </div>
    </div>
  );
});

export default Stays;
