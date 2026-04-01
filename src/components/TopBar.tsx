import React from "react";
import { useStore } from "../store/useStore";

export const TopBar: React.FC = () => {
  const name = useStore((s) => s.userName);
  const setName = useStore((s) => s.setUserName);

  return (
    <div className="top-bar">
      <input
        type="text"
        className="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome"
        maxLength={30}
      />
    </div>
  );
};
