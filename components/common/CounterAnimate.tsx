"use client";
import React, { useEffect, useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

export default function CounterAnimate({ num }: { num: number }) { // num hoga number type ka
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      {show && (
        <AnimatedNumbers
        includeComma
        transitions={(index) => ({
          type: "spring",
          duration: index + 0.3,
        })}
        animateToNumber={num} // taking num as dynamic 
        fontStyle={{
          fontSize: 40,
          fontWeight: "bold",
          color: "black",
        }}
      />
      )}
    </>
  );
}