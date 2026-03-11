import React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "scale",
})(({ theme, scale = 1 }) => {
  const trackHeight = 15 * scale;
  const trackWidth = 26 * scale;
  const thumbSize = 10 * scale;

  return {
    width: trackWidth,
    height: trackHeight,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 2 * scale,
      "&.Mui-checked": {
        transform: `translateX(${trackWidth - trackHeight}px)`,
      },
    },
    "& .MuiSwitch-thumb": {
      width: thumbSize,
      height: thumbSize,
      backgroundColor: "#fff",
      boxShadow: "none",
    },
    "& .MuiSwitch-track": {
      borderRadius: trackHeight / 2,
      backgroundColor: "#d1d5db",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 200,
      }),
    },
    "& .Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#16a34a",
    },
  };
});

const SwitchButton = ({ checked, onChange, disabled = false, scale = 1 }) => {
  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <StyledSwitch
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      scale={scale} 
    />
  );
};

export default SwitchButton;
