"use client"
import Confetti from "react-confetti";

interface IConfetti {
  width?: number;
}

export const ConfettiEffect = ({ width = 400 }: IConfetti) => {
  return <Confetti recycle={false} width={width} numberOfPieces={500} />;
};
