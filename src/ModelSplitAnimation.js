import React, { useState, useEffect } from 'react';

/**
 * A single chevron arrow that "pulses".
 *  - pulseDelay: milliseconds delay before pulse animation starts
 *  - reverseArrowDir: if true, points the arrow left instead of right
 */
const FatChevron = ({ pulseDelay, reverseArrowDir = false }) => {
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
      className="text-blue-300"
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
  reversePulseOrder = false
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

  // First set of chevrons (anchored to Unit0)
  const [showChevrons, setShowChevrons] = useState(false);
  const [chevronFadeOutIndex, setChevronFadeOutIndex] = useState(-1);

  // Second set of chevrons (anchored to Unit2)
  const [showChevrons2, setShowChevrons2] = useState(false);

  // Arrays controlling param expansions, top boxes, etc.
  const [expandParamsBox, setExpandParamsBox] = useState([false, false, false]);
  const [showTopBox, setShowTopBox] = useState([false, false, false]);
  const [shrinkParamsBox, setShrinkParamsBox] = useState([false, false, false]);

  // Trigger to restart the entire sequence
  const [shouldReset, setShouldReset] = useState(false);

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

                          // Show top Activations box
                          const showTopBoxTimer = setTimeout(() => {
                            setShowTopBox((prev) => {
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
                                  showTopBoxTimer,
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
                                }, 3400); 
                                // 3400 = 1000 + 2*700 + ~1000 for final fade

                                return () => {
                                  [...prevTimers, ...fadeOutSequence].forEach(clearTimeout);
                                  clearTimeout(finalFadeOutTimer);
                                };
                              }
                            }, 1500);

                            return () => {
                              [...prevTimers, expandParamsTimer, showTopBoxTimer].forEach(clearTimeout);
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

        return () => clearTimeout(gpuTimer);
      }, 1000);

      return () => clearTimeout(shiftTimer);
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

      {/* GPUs Container: houses the GPU boxes and the splitted Unit structures */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-8
          transition-all duration-1000 ease-in-out`}
        style={{
          left: centerGPUs ? '50%' : '75%',
          transform: `translate(-50%, -50%)`
        }}
      >
        {[0, 1].map((gpuIndex) => (
          <div
            key={gpuIndex}
            className={`h-72 border-2 border-black rounded-xl 
              bg-white relative
              transition-all duration-500 ease-in-out transform
              ${showGPUs ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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
                  {/* Label under each Unit */}
                  <div
                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm
                      transition-opacity duration-500 
                      ${showInternalStructure ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Unit{unitIndex}
                  </div>

                  {/* Top "Activations" box above each Unit */}
                  <div
                    className="absolute border-2 border-solid border-black rounded-xl bg-white
                      transition-all duration-500"
                    style={{
                      top: '-30px',
                      height: '12.5%',
                      width: '128px',
                      opacity: showTopBox[unitIndex] ? 1 : 0,
                      left: gpuIndex === 1 ? 'auto' : 0,
                      right: gpuIndex === 1 ? 0 : 'auto',
                      transition: 'opacity 1000ms ease-in-out'
                    }}
                  >
                    <span className="text-xs absolute top-1/2 left-1/2 
                      -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                      Activations
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
                          reverseFadeIn={false}      // normal fade order: left->right
                          reverseArrowDir={false}    // right-facing arrows
                          reversePulseOrder={false}  // leftmost arrow pulses first
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
                          reverseFadeIn={true}       // fade in right->left
                          reverseArrowDir={true}     // left-facing arrows
                          reversePulseOrder={true}   // rightmost arrow pulses first
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
                            expandParamsBox[unitIndex] && !shrinkParamsBox[unitIndex]
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

          // First chevron set
          setShowChevrons(false);
          setChevronFadeOutIndex(-1);

          // Second chevron set
          setShowChevrons2(false);

          // Reset expansions
          setExpandParamsBox([false, false, false]);
          setShowTopBox([false, false, false]);
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
