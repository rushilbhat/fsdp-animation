import React, { useState, useEffect } from 'react';

/**
 * A single chevron arrow that "pulses".
 *  - pulseDelay: milliseconds delay before pulse animation starts
 *  - reverseArrowDir: if true, points the arrow left instead of right
 */
const FatChevron = ({ pulseDelay, reverseArrowDir = false, color = "text-blue-300" }) => {
  // Original path (right-facing arrow): "M4 4 L18 12 L4 20"
  // Reversed path (left-facing arrow):  "M20 4 L6 12 L20 20"
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
            opacity: .5;
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
 *  - isVisible: toggles the sequential fade-in of the 3 chevrons
 *  - fadeOutIndex: controls which chevron indices are faded out (-1 => none)
 *  - reverseFadeIn: if true, fade them in from right->left instead of left->right
 *  - reverseArrowDir: if true, draws the arrows left-facing instead of right-facing
 *  - reversePulseOrder: if true, the rightmost arrow pulses first, leftmost last
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

  // First set of chevrons (anchored to Unit0)
  const [showChevrons, setShowChevrons] = useState(false);
  const [chevronFadeOutIndex, setChevronFadeOutIndex] = useState(-1);

  // Second set of chevrons (anchored to Unit2)
  const [showChevrons2, setShowChevrons2] = useState(false);
  const [showPerstepGrads, setShowPerstepGrads] = useState(false);
  const [splitPerstepGrads, setSplitPerstepGrads] = useState(false);
  const [shrinkPerstepGrads, setShrinkPerstepGrads] = useState(false);
  const [translatePerstepGrads2, setTranslatePerstepGrads2] = useState(false);
  const [expandUnit2ParamsFinal, setExpandUnit2ParamsFinal] = useState(false);

  // Arrays controlling param expansions, Activations boxes, etc.
  const [expandParamsBox, setExpandParamsBox] = useState([false, false, false]);
  const [showActivationsBox, setShowActivationsBox] = useState([false, false, false]);
  const [shrinkParamsBox, setShrinkParamsBox] = useState([false, false, false]);

  // Trigger to restart the entire sequence
  const [shouldReset, setShouldReset] = useState(false);

  // Watch for translatePerstepGrads2 changes to trigger the temporary glow
  useEffect(() => {
    if (translatePerstepGrads2) {
      // Wait for translation to complete before showing glow
      const showGlowTimer = setTimeout(() => {
        setShowTemporaryGlow(true);
        
        // Hide glow after 1 second
        const hideGlowTimer = setTimeout(() => {
          setShowTemporaryGlow(false);
        }, 1000);
        
        return () => clearTimeout(hideGlowTimer);
      }, 300);
      
      return () => clearTimeout(showGlowTimer);
    }
  }, [translatePerstepGrads2]);

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

                                      // After showing perstep grads, split them horizontally
                                      const splitTimer = setTimeout(() => {
                                        setSplitPerstepGrads(true);

                                        // Then shrink their widths
                                        const shrinkTimer = setTimeout(() => {
                                          setShrinkPerstepGrads(true);

                                          // After shrinking, translate Per step grads 2
                                          const translateTimer = setTimeout(() => {
                                            setTranslatePerstepGrads2(true);
                                          }, 1000);

                                          return () => {
                                            clearTimeout(shrinkTimer);
                                            clearTimeout(translateTimer);
                                          };
                                        }, 1000);

                                        return () => {
                                          clearTimeout(perstepGradsTimer);
                                          clearTimeout(splitTimer);
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

          return () => clearTimeout(halves0Timer);
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
      {/* Units Container: houses the 3 "Unit" boxes before splitting */}
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

      {/*
        PARENT Container for both GPUs. 
        We move the transform (scale, opacity) to *here* so that 
        both GPUs remain in the same stacking context.
      */}
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
        {/* Now nest the GPUs in a simple flex container WITH NO transform on each GPU */}
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
                // No 'transform: scale(...)' here!
              }}
            >
              <span className="absolute bottom-2 right-2 text-xl">GPU{gpuIndex}</span>

              {/* Inside each GPU, place 3 Unit placeholders */}
              <div className="w-full h-full p-4 flex justify-center items-center gap-8">
                {[0, 1, 2].map((unitIndex) => (
                  <div key={unitIndex} className="w-32 h-40 relative">
                    {/* Perstep grads box - only for Unit2 */}
                    {unitIndex === 2 && (
                      <>
                        <div
                          className="absolute border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-500"
                          style={{
                            height: '25%',
                            width: shrinkPerstepGrads ? '50%' : '100%',
                            top: '-25%',
                            left: 0,
                            opacity: showPerstepGrads ? 1 : 0,
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
                        <div
                          className="absolute border-2 border-solid border-black rounded-xl bg-white
                            transition-all duration-1000"
                          style={{
                            height: '25%',
                            width: shrinkPerstepGrads ? '50%' : '100%',
                            top: '-25%',
                            right: 0,
                            opacity: showPerstepGrads 
                              ? (translatePerstepGrads2 && gpuIndex === 0 ? 0.3 : 1)
                              : 0,
                            transform: translatePerstepGrads2 && gpuIndex === 0 
                              ? 'translateY(320px) scale(0.9)' 
                              : 'none',
                            zIndex: translatePerstepGrads2 ? (gpuIndex === 0 ? 10 : 30) : 'auto',
                            backgroundColor: (translatePerstepGrads2 && gpuIndex === 1 && showTemporaryGlow)
                              ? 'rgba(255, 200, 200, 0.9)'
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

                    {/* Activations box*/}
                    <div
                      className="absolute border-2 border-solid border-black rounded-xl bg-white
                        transition-all duration-500"
                      style={{
                        top: '25%',
                        height: 'calc(75%)',
                        width: '64px',
                        opacity: showActivationsBox[unitIndex] ? 1 : 0,
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
                        opacity: showInternalStructure ? 1 : 1,
                      }}
                    >
                      {/* FIRST chevron set (Unit0) => Right-facing, normal fade/pulse order */}
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

                      {/* SECOND chevron set (Unit2) => Left-facing, reversed fade/pulse */}
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
                      className={`absolute top-1/2 -translate-y-1/2 w-16 
                        transition-all duration-500 ease-in-out flex flex-col
                        ${
                          (unitIndex === 0 && showHalvesUnit0) ||
                          (unitIndex === 1 && showHalvesUnit1) ||
                          (unitIndex === 2 && showHalvesUnit2)
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      style={{
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
                            zIndex: showInternalStructure ? '0' : '1'
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
          setSplitPerstepGrads(false);
          setShrinkPerstepGrads(false);
          setTranslatePerstepGrads2(false);
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
