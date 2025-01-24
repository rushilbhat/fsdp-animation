import React, { useState, useEffect } from 'react';

/**
 * A single chevron arrow that "pulses".
 */
const FatChevron = ({ pulseDelay, reverseArrowDir = false, color = "text-blue-300" }) => {
  const chevronPath = reverseArrowDir
    ? "M20 4 L6 12 L20 20"
    : "M4 4 L18 12 L4 20";

  return (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      className={color}
      style={{
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        animationDelay: `${pulseDelay}ms`
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      <path
        d={chevronPath}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * AnimatedChevrons
 */
const AnimatedChevrons = ({
  isVisible,
  fadeOutIndex = -1,
  reverseFadeIn = false,
  reverseArrowDir = false,
  reversePulseOrder = false,
  color = "text-blue-300"
}) => {
  const [visibleChevrons, setVisibleChevrons] = useState([false, false, false]);

  useEffect(() => {
    if (isVisible) {
      // Choose the order in which they become visible
      const sequence = reverseFadeIn ? [2, 1, 0] : [0, 1, 2];

      const timers = sequence.map((index, i) =>
        setTimeout(() => {
          setVisibleChevrons((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, i * 200)
      );

      return () => timers.forEach(clearTimeout);
    } else {
      // Reset if not visible
      setVisibleChevrons([false, false, false]);
    }
  }, [isVisible, reverseFadeIn]);

  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((index) => {
        // Decide the pulse order: normally it's index * 300, reversed is (2 - index) * 300
        const pulseIndex = reversePulseOrder ? 2 - index : index;
        return (
          <div
            key={index}
            className="transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: visibleChevrons[index] && fadeOutIndex < index ? 1 : 0,
            }}
          >
            <FatChevron
              pulseDelay={pulseIndex * 300}
              reverseArrowDir={reverseArrowDir}
              color={color}
            />
          </div>
        );
      })}
    </div>
  );
};

const ModelSplitAnimation = () => {
  // Top-level animation states
  const [isSplit, setIsSplit] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [showHalvesUnit0, setShowHalvesUnit0] = useState(false);
  const [showHalvesUnit1, setShowHalvesUnit1] = useState(false);
  const [showHalvesUnit2, setShowHalvesUnit2] = useState(false);
  const [centerGPUs, setCenterGPUs] = useState(false);
  const [showInternalStructure, setShowInternalStructure] = useState(false);
  const [showTemporaryGlow, setShowTemporaryGlow] = useState(false);
  const [showTemporaryGlow1, setShowTemporaryGlow1] = useState(false);
  const [showTemporaryGlowUnit2Grads, setShowTemporaryGlowUnit2Grads] = useState(false);
  const [showTemporaryGlowUnit2GradsGpu1, setShowTemporaryGlowUnit2GradsGpu1] = useState(false);
  const [hideUnit2Activations, setHideUnit2Activations] = useState(false);

  // First set of chevrons (anchored to Unit0)
  const [showChevrons, setShowChevrons] = useState(false);
  const [chevronFadeOutIndex, setChevronFadeOutIndex] = useState(-1);

  // Second set of chevrons (anchored to Unit2)
  const [showChevrons2, setShowChevrons2] = useState(false);
  const [showPerstepGrads, setShowPerstepGrads] = useState(false);
  const [shrinkPerstepGrads, setShrinkPerstepGrads] = useState(false);
  const [translatePerstepGrads2, setTranslatePerstepGrads2] = useState(false);
  const [translatePerstepGrads1, setTranslatePerstepGrads1] = useState(false);
  const [hideGpu1Perstep1, setHideGpu1Perstep1] = useState(false);
  const [hideGpu0Perstep2, setHideGpu0Perstep2] = useState(false);

  /**
   *  ---- CHANGED HERE: Instead of having finalTranslatePerstep1 and finalTranslatePerstep2,
   *       we have ONE state that handles the "final" translate for both GPU0 and GPU1.
   */
  const [finalTranslatePerstep, setFinalTranslatePerstep] = useState(false);

  const [expandUnit2ParamsFinal, setExpandUnit2ParamsFinal] = useState(false);

  // Arrays controlling param expansions, Activations boxes, etc.
  const [expandParamsBox, setExpandParamsBox] = useState([false, false, false]);
  const [showActivationsBox, setShowActivationsBox] = useState([false, false, false]);
  const [shrinkParamsBox, setShrinkParamsBox] = useState([false, false, false]);

  // Trigger to restart the entire sequence
  const [shouldReset, setShouldReset] = useState(false);

  // Watch for translatePerstepGrads1 changes to trigger the temporary glow (GPU1, per-step grads 1)
  useEffect(() => {
    if (translatePerstepGrads1) {
      const showGlowTimer = setTimeout(() => {
        setShowTemporaryGlow1(true);
        
        const hideGlowTimer = setTimeout(() => {
          setShowTemporaryGlow1(false);
          setHideGpu1Perstep1(true);
        }, 1000);
        
        return () => clearTimeout(hideGlowTimer);
      }, 300);
      
      return () => clearTimeout(showGlowTimer);
    }
  }, [translatePerstepGrads1]);

  // Watch for translatePerstepGrads2 changes to trigger the temporary glow (GPU0, per-step grads 2)
  useEffect(() => {
    if (translatePerstepGrads2) {
      const showGlowTimer = setTimeout(() => {
        setShowTemporaryGlow(true);
        
        const hideGlowTimer = setTimeout(() => {
          setShowTemporaryGlow(false);
          setHideGpu0Perstep2(true);

          // Start the final transition after a delay
          const finalTransitionTimer = setTimeout(() => {
            // Instead of finalTranslatePerstep1 and finalTranslatePerstep2, 
            // we just flip one boolean:
            setFinalTranslatePerstep(true);
          }, 500);

          return () => clearTimeout(finalTransitionTimer);
        }, 1000);
        
        return () => clearTimeout(hideGlowTimer);
      }, 300);
      
      return () => clearTimeout(showGlowTimer);
    }
  }, [translatePerstepGrads2]);

  /**
   * CHANGED HERE: Single effect that watches `finalTranslatePerstep`.
   * Triggers the "temporary glow" on Unit2 grads for both GPU0 and GPU1.
   */
  useEffect(() => {
    if (finalTranslatePerstep) {
      // Delay before showing GPU0 glow
      const showGlowTimerGpu0 = setTimeout(() => {
        setShowTemporaryGlowUnit2Grads(true);
        const hideGlowTimerGpu0 = setTimeout(() => {
          setShowTemporaryGlowUnit2Grads(false);
        }, 1000);
        return () => clearTimeout(hideGlowTimerGpu0);
      }, 300);

      // Delay before showing GPU1 glow
      const showGlowTimerGpu1 = setTimeout(() => {
        setShowTemporaryGlowUnit2GradsGpu1(true);
        const hideGlowTimerGpu1 = setTimeout(() => {
          setShowTemporaryGlowUnit2GradsGpu1(false);
        }, 1000);
        return () => clearTimeout(hideGlowTimerGpu1);
      }, 300);

      return () => {
        clearTimeout(showGlowTimerGpu0);
        clearTimeout(showGlowTimerGpu1);
      };
    }
  }, [finalTranslatePerstep]);

  // Effect to hide Unit 2 activations after final translate
  useEffect(() => {
    if (finalTranslatePerstep) {
      const hideActivationsTimer = setTimeout(() => {
        setHideUnit2Activations(true);
      }, 1500); // Delay after the final translate and glow effects

      return () => clearTimeout(hideActivationsTimer);
    }
  }, [finalTranslatePerstep]);

  useEffect(() => {
    // Start the entire sequence after a short delay
    const splitTimer = setTimeout(() => {
      setIsSplit(true);

      const shiftTimer = setTimeout(() => {
        setIsShifted(true);

        const gpuTimer = setTimeout(() => {
          setShowGPUs(true);

          const halves0Timer = setTimeout(() => {
            setShowHalvesUnit0(true);

            const halves1Timer = setTimeout(() => {
              setShowHalvesUnit1(true);

              const halves2Timer = setTimeout(() => {
                setShowHalvesUnit2(true);

                const centerTimer = setTimeout(() => {
                  setCenterGPUs(true);

                  const structureTimer = setTimeout(() => {
                    setShowInternalStructure(true);

                    // Now show the first set of chevrons
                    const chevronsTimer = setTimeout(() => {
                      setShowChevrons(true);

                      // Helper to animate each unit's Param/Activations expansions
                      const createUnitSequence = (unitIndex, prevTimers = []) => {
                        // Expand Param box
                        const expandParamsTimer = setTimeout(() => {
                          setExpandParamsBox((prev) => {
                            const next = [...prev];
                            next[unitIndex] = true;
                            return next;
                          });

                          // Show Activations box
                          const showActivationsBoxTimer = setTimeout(() => {
                            setShowActivationsBox((prev) => {
                              const next = [...prev];
                              next[unitIndex] = true;
                              return next;
                            });

                            // Shrink Param box
                            const shrinkParamsTimer = setTimeout(() => {
                              setShrinkParamsBox((prev) => {
                                const next = [...prev];
                                next[unitIndex] = true;
                                return next;
                              });

                              // Move to next unit, or fade out chevrons & show second set
                              if (unitIndex < 2) {
                                createUnitSequence(unitIndex + 1, [
                                  ...prevTimers,
                                  expandParamsTimer,
                                  showActivationsBoxTimer,
                                  shrinkParamsTimer
                                ]);
                              } else {
                                // After all three units are done, fade out the first set of chevrons
                                const fadeOutSequence = [0, 1, 2].map((i) => {
                                  return setTimeout(() => {
                                    setChevronFadeOutIndex(i);
                                  }, 1000 + i * 700);
                                });

                                // After they've fully faded, show the second set
                                const finalFadeOutTimer = setTimeout(() => {
                                  setShowChevrons2(true);
                                  
                                  // First expand params box for Unit2
                                  const expandParamsFinalTimer = setTimeout(() => {
                                    setExpandUnit2ParamsFinal(true);
                                    
                                    // Then show perstepgrads after params expansion
                                    const perstepGradsTimer = setTimeout(() => {
                                      setShowPerstepGrads(true);

                                      // After showing perstep grads, shrink their widths
                                      const shrinkTimer = setTimeout(() => {
                                        setShrinkPerstepGrads(true);

                                        // After shrinking, translate Per step grads 2
                                        const translateTimer = setTimeout(() => {
                                          setTranslatePerstepGrads2(true);
                                          setTranslatePerstepGrads1(true);
                                        }, 1000);

                                        return () => {
                                          clearTimeout(shrinkTimer);
                                          clearTimeout(translateTimer);
                                        };
                                      }, 1000);

                                      return () => {
                                        [...prevTimers, ...fadeOutSequence].forEach(clearTimeout);
                                        clearTimeout(finalFadeOutTimer);
                                        clearTimeout(expandParamsFinalTimer);
                                      };
                                    }, 1000);

                                    return () => {
                                      [...prevTimers, ...fadeOutSequence].forEach(clearTimeout);
                                      clearTimeout(finalFadeOutTimer);
                                      clearTimeout(expandParamsFinalTimer);
                                    };
                                  }, 1000);

                                  return () => {
                                    [...prevTimers, ...fadeOutSequence].forEach(clearTimeout);
                                    clearTimeout(finalFadeOutTimer);
                                    clearTimeout(expandParamsFinalTimer);
                                  };
                                }, 3400);
                              }
                            }, 1500);

                            return () => {
                              [...prevTimers, expandParamsTimer, showActivationsBoxTimer].forEach(clearTimeout);
                            };
                          }, 500);

                          return () => {
                            [...prevTimers, expandParamsTimer].forEach(clearTimeout);
                          };
                        }, 1000);

                        return () => {
                          [...prevTimers, expandParamsTimer].forEach(clearTimeout);
                        };
                      };

                      // Kick off the expansions at Unit0
                      createUnitSequence(0);
                    }, 1000);

                    return () => clearTimeout(chevronsTimer);
                  }, 1000);

                  return () => clearTimeout(structureTimer);
                }, 700);

                return () => clearTimeout(centerTimer);
              }, 700);

              return () => clearTimeout(halves2Timer);
            }, 700);

            return () => clearTimeout(halves1Timer);
          }, 700);

          return () => clearTimeout(gpuTimer);
        }, 1000);

        return () => clearTimeout(shiftTimer);
      }, 1000);

      return () => clearTimeout(splitTimer);
    }, 2000);

    // Cleanup on re-run
    return () => clearTimeout(splitTimer);
  }, [shouldReset]);

  return (
    <div className="w-full h-screen relative">
      {/* Units Container */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-700
          ${centerGPUs ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: isShifted ? '25%' : '50%',
          transform: `translate(${isShifted ? '-50%' : '-50%'}, -50%)`
        }}
      >
        <div className="relative flex justify-center items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-2 border-black rounded-xl absolute 
                flex items-center justify-center bg-white
                transition-all duration-500 ease-in-out"
              style={{
                transform: isSplit
                  ? `translateX(${(i - 1) * 140}px)`
                  : 'translateX(0)',
                opacity: isSplit 
                  ? (i === 0 && showHalvesUnit0
                      ? 0
                      : i === 1 && showHalvesUnit1
                      ? 0
                      : i === 2 && showHalvesUnit2
                      ? 0
                      : 1)
                  : i === 1
                  ? 1
                  : 0,
                width: isSplit ? '128px' : '384px',
                height: '160px',
                zIndex: i === 1 ? 2 : 1
              }}
            >
              <span className="text-xl">
                {isSplit ? `Unit${i}` : i === 1 ? 'Model' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PARENT container for both GPUs */}
      <div
        className={`
          absolute top-1/2
          transition-all duration-1000 ease-in-out
          ${showGPUs ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        style={{
          left: centerGPUs ? '50%' : '75%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="flex flex-col space-y-8">
          {[0, 1].map((gpuIndex) => (
            <div
              key={gpuIndex}
              className={`h-72 border-2 border-black rounded-xl 
                bg-white relative
                transition-all duration-500 ease-in-out
                ${showGPUs ? 'opacity-100' : 'opacity-0'}`}
              style={{
                width: '520px',
                transitionDelay: `${gpuIndex * 200}ms`
              }}
            >
              <span className="absolute bottom-2 right-2 text-xl">GPU{gpuIndex}</span>

              {/* Inside each GPU, place 3 Unit placeholders */}
              <div className="w-full h-full p-4 flex justify-center items-center gap-8">
                {[0, 1, 2].map((unitIndex) => (
                  <div key={unitIndex} className="w-32 h-40 relative">
                    {/* Per-step grads box - only for Unit2 */}
                    {unitIndex === 2 && (
                      <>
                        {/* Per-step grads 1 */}
                        <div
                          className="absolute border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-1000"
                          style={{
                            height: '25%',
                            width: shrinkPerstepGrads ? '50%' : '100%',
                            top: '-25%',
                            left: 0,
                            opacity:
                              gpuIndex === 1 && hideGpu1Perstep1
                                ? 0
                                : showPerstepGrads
                                ? 1
                                : 0,
                            transform:
                              // normal "pull up" for GPU1
                              translatePerstepGrads1 && gpuIndex === 1
                                ? 'translateY(-320px) scale(0.9)'
                                : // final short nudge for GPU0 if finalTranslatePerstep is on
                                finalTranslatePerstep && gpuIndex === 0
                                ? 'translateY(80px) scale(0.9)'
                                : 'none',
                            zIndex: translatePerstepGrads1
                              ? gpuIndex === 1
                                ? 10
                                : 30
                              : 'auto',
                            backgroundColor:
                              translatePerstepGrads1 &&
                              gpuIndex === 0 &&
                              showTemporaryGlow1
                                ? 'rgba(255, 200, 200, 1)'
                                : 'white'
                          }}
                        >
                          <span className="text-xs absolute top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center"
                          >
                            Per step
                            <br />
                            grads 1
                          </span>
                        </div>

                        {/* Per-step grads 2 */}
                        <div
                          className="absolute border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-1000"
                          style={{
                            height: '25%',
                            width: shrinkPerstepGrads ? '50%' : '100%',
                            top: '-25%',
                            right: 0,
                            opacity:
                              gpuIndex === 0 && hideGpu0Perstep2
                                ? 0
                                : showPerstepGrads
                                ? 1
                                : 0,
                            transform:
                              // normal "push down" for GPU0
                              translatePerstepGrads2 && gpuIndex === 0
                                ? 'translateY(320px) scale(0.9)'
                                : // final short nudge for GPU1 if finalTranslatePerstep is on
                                finalTranslatePerstep && gpuIndex === 1
                                ? 'translateY(80px) scale(0.9)'
                                : 'none',
                            zIndex: translatePerstepGrads2
                              ? gpuIndex === 0
                                ? 10
                                : 30
                              : 'auto',
                            backgroundColor:
                              translatePerstepGrads2 &&
                              gpuIndex === 1 &&
                              showTemporaryGlow
                                ? 'rgba(255, 200, 200, 1)'
                                : 'white'
                          }}
                        >
                          <span className="text-xs absolute top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center"
                          >
                            Per step
                            <br />
                            grads 2
                          </span>
                        </div>
                      </>
                    )}

                    {/* Label under each Unit */}
                    <div
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm
                        transition-opacity duration-500 
                        ${showInternalStructure ? 'opacity-100' : 'opacity-0'}`}
                    >
                      Unit{unitIndex}
                    </div>

                    {/* Activations box */}
                    <div
                      className="absolute border-2 border-solid border-black rounded-xl bg-white
                        transition-all duration-500"
                      style={{
                        top: '25%',
                        height: 'calc(75%)',
                        width: '64px',
                        opacity: unitIndex === 2 && hideUnit2Activations 
                          ? 0 
                          : showActivationsBox[unitIndex] 
                            ? 1 
                            : 0,
                        right: gpuIndex === 1 ? 'auto' : 0,
                        left: gpuIndex === 1 ? 0 : 'auto',
                        transition: 'opacity 1000ms ease-in-out'
                      }}
                    >
                      <span className="text-xs absolute top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                      >
                        Act.
                      </span>
                    </div>
          
                    {/* Dashed box containing the chevrons */}
                    <div
                      className={`absolute top-0 w-full border-2 border-dashed border-black rounded-xl
                        transition-all duration-500`}
                      style={{
                        height: showInternalStructure ? '25%' : '100%',
                        opacity: showInternalStructure ? 1 : 1
                      }}
                    >
                      {/* FIRST chevron set (Unit0) => Right-facing */}
                      {unitIndex === 0 && (
                        <div
                          className="absolute top-1/2 right-44 transform -translate-y-1/2"
                        >
                          <AnimatedChevrons
                            isVisible={showChevrons}
                            fadeOutIndex={chevronFadeOutIndex}
                            reverseFadeIn={false}
                            reverseArrowDir={false}
                            reversePulseOrder={false}
                          />
                        </div>
                      )}

                      {/* SECOND chevron set (Unit2) => Left-facing */}
                      {unitIndex === 2 && (
                        <div
                          className="absolute top-1/2 left-44 transform -translate-y-1/2"
                        >
                          <AnimatedChevrons
                            isVisible={showChevrons2}
                            fadeOutIndex={-1}
                            reverseFadeIn={true}
                            reverseArrowDir={true}
                            reversePulseOrder={true}
                            color="text-red-300"
                          />
                        </div>
                      )}
                    </div>

                    {/* The "internal structure" box for Params, Grads, Opt states */}
                    <div
                      className={`absolute w-16 transition-all duration-500 ease-in-out flex flex-col
                        ${
                          (unitIndex === 0 && showHalvesUnit0) ||
                          (unitIndex === 1 && showHalvesUnit1) ||
                          (unitIndex === 2 && showHalvesUnit2)
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      style={{
                        top: '50%',
                        marginTop: '-80px',
                        left: gpuIndex === 0 ? '0px' : 'auto',
                        right: gpuIndex === 1 ? '0px' : 'auto',
                        height: '160px',
                      }}
                    >
                      <div className="relative h-full w-full">
                        {/* Params section */}
                        <div
                          className="absolute border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-500"
                          style={{
                            height: 'calc(25%)',
                            width:
                              (expandParamsBox[unitIndex] && !shrinkParamsBox[unitIndex]) ||
                              (unitIndex === 2 && expandUnit2ParamsFinal)
                                ? '128px'
                                : '100%',
                            left: gpuIndex === 1 ? 'auto' : '0',
                            right: gpuIndex === 1 ? '0' : 'auto',
                            transform: `translateY(${showInternalStructure ? '0' : '50%'})`,
                            opacity: showInternalStructure ? '1' : '0'
                          }}
                        >
                          <span className="text-xs absolute top-1/2 left-1/2
                            -translate-x-1/2 -translate-y-1/2"
                          >
                            Params
                          </span>
                        </div>

                        {/* Grads section */}
                        <div
                          className="absolute w-full border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-500"
                          style={{
                            top: '50%',
                            height: showInternalStructure ? 'calc(25%)' : '100%',
                            transform: `translate(0, ${
                              showInternalStructure ? '-100%' : '-50%'
                            })`,
                            // If finalTranslatePerstep is true for GPU0 or GPU1, we raise zIndex for that grads box
                            zIndex: finalTranslatePerstep ? 40 : 'auto',
                            backgroundColor:
                              finalTranslatePerstep &&
                              unitIndex === 2 &&
                              gpuIndex === 0 &&
                              showTemporaryGlowUnit2Grads
                                ? 'rgba(255, 200, 200, 1)'
                                : finalTranslatePerstep &&
                                  unitIndex === 2 &&
                                  gpuIndex === 1 &&
                                  showTemporaryGlowUnit2GradsGpu1
                                ? 'rgba(255, 200, 200, 1)'
                                : 'white'
                          }}
                        >
                          <span className="text-xs absolute top-1/2 left-1/2
                            -translate-x-1/2 -translate-y-1/2"
                          >
                            {showInternalStructure ? 'Grads' : `Unit${unitIndex}`}
                          </span>
                        </div>

                        {/* Optimizer states section */}
                        <div
                          className="absolute w-full border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-500"
                          style={{
                            height: '50%',
                            transform: `translateY(${showInternalStructure ? '100%' : '50%'})`,
                            opacity: showInternalStructure ? '1' : '0'
                          }}
                        >
                          <span className="text-xs absolute top-1/2 left-1/2
                            -translate-x-1/2 -translate-y-1/2 text-center"
                          >
                            Opt.
                            <br />
                            states
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          // Reset everything
          setIsSplit(false);
          setIsShifted(false);
          setShowGPUs(false);
          setShowHalvesUnit0(false);
          setShowHalvesUnit1(false);
          setShowHalvesUnit2(false);
          setShowInternalStructure(false);
          setCenterGPUs(false);
          setShowPerstepGrads(false);
          setShrinkPerstepGrads(false);
          setTranslatePerstepGrads2(false);
          setTranslatePerstepGrads1(false);
          setHideGpu1Perstep1(false);
          setHideGpu0Perstep2(false);
          /**
           * CHANGED HERE: Instead of resetting finalTranslatePerstep1 and finalTranslatePerstep2,
           * we reset our single finalTranslatePerstep.
           */
          setFinalTranslatePerstep(false);
          setExpandUnit2ParamsFinal(false);

          // First chevron set
          setShowChevrons(false);
          setChevronFadeOutIndex(-1);

          // Second chevron set
          setShowChevrons2(false);

          // Reset expansions
          setExpandParamsBox([false, false, false]);
          setShowActivationsBox([false, false, false]);
          setShrinkParamsBox([false, false, false]);

          // Trigger the entire sequence again
          setShouldReset((prev) => !prev);

          // Reset temporary glows
          setShowTemporaryGlow(false);
          setShowTemporaryGlow1(false);
          setShowTemporaryGlowUnit2Grads(false);
          setShowTemporaryGlowUnit2GradsGpu1(false);
          setHideUnit2Activations(false);
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
          px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600
          transition-colors duration-200"
      >
        Reset
      </button>
    </div>
  );
};

export default ModelSplitAnimation;
