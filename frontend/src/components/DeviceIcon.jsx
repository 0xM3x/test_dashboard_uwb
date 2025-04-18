import React from "react";
import { FaBroadcastTower, FaUser } from "react-icons/fa";
import { MdForklift } from 'react-icons/md';

export const DeviceIcon = ({ type, className = "" }) => {
  let Icon;
  switch (type) {
    case "forklift":
      Icon = MdForklift;
      break;
    case "antenna":
      Icon = FaBroadcastTower;
      break;
    case "personal":
    default:
      Icon = FaUser;
      break;
  }

  return <Icon className={`text-4xl md:text-6xl ${className}`} size={64} />;
};

