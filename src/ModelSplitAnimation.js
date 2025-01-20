import React, { useState, useEffect } from 'react';

const FatChevron = ({ pulseDelay }) => (
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
      d="M4 4 L18 12 L4 20"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnimatedChevrons = ({ isVisible, fadeOutIndex = -1 }) => {
  const [visibleChevrons, setVisibleChevrons] = useState([false, false, false]);

  useEffect(() => {
    if (isVisible) {
      const timers = [0, 1, 2].map((index) =>
        setTimeout(() => {
          setVisibleChevrons((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, index * 200)
      );

      return () => timers.forEach(clearTimeout);
    } else {
      setVisibleChevrons([false, false, false]);
    }
  }, [isVisible]);

  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: visibleChevrons[index] && fadeOutIndex < index ? 1 : 0,
          }}
        >
          <FatChevron pulseDelay={index * 300} />
        </div>
      ))}
    </div>
  );
};

const ModelSplitAnimation = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [showHalvesUnit0, setShowHalvesUnit0] = useState(false);
  const [showHalvesUnit1, setShowHalvesUnit1] = useState(false);
  const [showHalvesUnit2, setShowHalvesUnit2] = useState(false);
  const [centerGPUs, setCenterGPUs] = useState(false);
  const [showInternalStructure, setShowInternalStructure] = useState(false);
  const [showChevrons, setShowChevrons] = useState(false);
  const [chevronFadeOutIndex, setChevronFadeOutIndex] = useState(-1);

  // Arrays for param/activations expansions, repeated for each unit 0..2
  const [expandParamsBox, setExpandParamsBox] = useState([false, false, false]);
  const [showTopBox, setShowTopBox] = useState([false, false, false]);
  const [shrinkParamsBox, setShrinkParamsBox] = useState([false, false, false]);

  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    // Start the entire sequence
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

                    const chevronsTimer = setTimeout(() => {
                      setShowChevrons(true);

                      // ---------------------------------
                      // SEQUENTIAL expansions for each unit
                      // ---------------------------------

                      // ---- UNIT 0 sequence ----
                      const expandParamsTimer0 = setTimeout(() => {
                        setExpandParamsBox([true, false, false]);

                        const showTopBoxTimer0 = setTimeout(() => {
                          setShowTopBox([true, false, false]);

                          const shrinkParamsTimer0 = setTimeout(() => {
                            setShrinkParamsBox([true, false, false]);

                            // ---- UNIT 1 sequence ----
                            const expandParamsTimer1 = setTimeout(() => {
                              // keep Unit0's expansions "frozen" in place
                              setExpandParamsBox([true, true, false]);

                              const showTopBoxTimer1 = setTimeout(() => {
                                setShowTopBox([true, true, false]);

                                const shrinkParamsTimer1 = setTimeout(() => {
                                  setShrinkParamsBox([true, true, false]);

                                  // ---- UNIT 2 sequence ----
                                  const expandParamsTimer2 = setTimeout(() => {
                                    setExpandParamsBox([true, true, true]);

                                    const showTopBoxTimer2 = setTimeout(() => {
                                      setShowTopBox([true, true, true]);

                                      const shrinkParamsTimer2 = setTimeout(() => {
                                        setShrinkParamsBox([true, true, true]);

                                        // Start chevron fade-out sequence
                                        const fadeOutChevron0 = setTimeout(() => {
                                          setChevronFadeOutIndex(0);

                                          const fadeOutChevron1 = setTimeout(() => {
                                            setChevronFadeOutIndex(1);

                                            const fadeOutChevron2 = setTimeout(() => {
                                              setChevronFadeOutIndex(2);
                                            }, 700);

                                            return () => clearTimeout(fadeOutChevron2);
                                          }, 700);

                                          return () => clearTimeout(fadeOutChevron1);
                                        }, 1000);

                                        return () => clearTimeout(fadeOutChevron0);
                                      }, 1500);

                                      return () => clearTimeout(showTopBoxTimer2);
                                    }, 500);

                                    return () => clearTimeout(expandParamsTimer2);
                                  }, 1000);
                                  // ---- end UNIT 2 ----

                                  return () => clearTimeout(shrinkParamsTimer0);
                                }, 1500);

                                return () => clearTimeout(showTopBoxTimer0);
                              }, 500);

                              return () => clearTimeout(expandParamsTimer0);
                            }, 1000);
                            // ---- end UNIT 1 ----

                            return () => clearTimeout(shrinkParamsTimer0);
                          }, 1500);

                          return () => clearTimeout(showTopBoxTimer0);
                        }, 500);

                        return () => clearTimeout(expandParamsTimer0);
                      }, 1000);

                      return () => clearTimeout(expandParamsTimer0);
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
                  ? (i === 0 && showHalvesUnit0 ? 0 
                    : i === 1 && showHalvesUnit1 ? 0
                    : i === 2 && showHalvesUnit2 ? 0 
                    : 1)
                  : i === 1 ? 1 : 0,
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

      {/* GPUs Container */}
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
            <div className="w-full h-full p-4 flex justify-center items-center gap-8">
              {[0, 1, 2].map((unitIndex) => (
                <div key={unitIndex} className="w-32 h-40 relative">
                  {/* Unit label at bottom */}
                  <div 
                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm
                      transition-opacity duration-500 
                      ${showInternalStructure ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Unit{unitIndex}
                  </div>

                  {/* The top "Activations" box for each GPU's Unit */}
                  <div
                    className="absolute border-2 border-solid border-black rounded-xl bg-white
                      transition-all duration-500"
                    style={{
                      top: '-30px',
                      height: '12.5%',
                      width: '128px',
                      // Only show if showTopBox[unitIndex] is true
                      opacity: showTopBox[unitIndex] ? 1 : 0,
                      left: gpuIndex === 1 ? 'auto' : 0,
                      right: gpuIndex === 1 ? 0 : 'auto',
                      transition: 'opacity 1000ms ease-in-out'
                    }}
                  >
                    <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                      Activations
                    </span>
                  </div>

                  {/* Dashed border containers that split */}
                  <div 
                    className={`absolute top-0 w-full border-2 border-dashed border-black rounded-xl
                      transition-all duration-500`}
                    style={{
                      height: showInternalStructure ? '25%' : '100%',
                      opacity: showInternalStructure ? 1 : 1,
                    }}
                  >
                    {/* AnimatedChevrons in the middle of first dashed box in GPU0 or GPU1, Unit0 */}
                    {unitIndex === 0 && (
                      <div className="absolute top-1/2 right-28 transform -translate-x-1/2 -translate-y-1/2">
                        <AnimatedChevrons isVisible={showChevrons} fadeOutIndex={chevronFadeOutIndex} />
                      </div>
                    )}
                  </div>

                  {/* The "internal structure" box that slides in (Params / Grads / Opt states) */}
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-16 
                      transition-all duration-500 ease-in-out flex flex-col
                      ${(unitIndex === 0 && showHalvesUnit0) || 
                        (unitIndex === 1 && showHalvesUnit1) || 
                        (unitIndex === 2 && showHalvesUnit2) 
                          ? 'opacity-100' : 'opacity-0'}`}
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
                          // Expand only if expandParamsBox[unitIndex] && not shrinkParamsBox[unitIndex]
                          width:
                            expandParamsBox[unitIndex] && 
                            !shrinkParamsBox[unitIndex]
                              ? '128px'
                              : '100%',
                          left: gpuIndex === 1 ? 'auto' : '0',
                          right: gpuIndex === 1 ? '0' : 'auto',
                          transform: `translateY(${showInternalStructure ? '0' : '50%'})`,
                          opacity: showInternalStructure ? '1' : '0'
                        }}
                      >
                        <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                          transform: `translate(0, ${showInternalStructure ? '-100%' : '-50%'})`,
                          zIndex: showInternalStructure ? '0' : '1'
                        }}
                      >
                        <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                        <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
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
          setShowChevrons(false);
          setChevronFadeOutIndex(-1);

          // Reset new arrays
          setExpandParamsBox([false, false, false]);
          setShowTopBox([false, false, false]);
          setShrinkParamsBox([false, false, false]);

          // Trigger the useEffect sequence again
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
