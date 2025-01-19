import React, { useState, useEffect } from 'react';

const ModelSplitAnimation = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [showHalvesUnit0, setShowHalvesUnit0] = useState(false);
  const [showHalvesUnit1, setShowHalvesUnit1] = useState(false);
  const [showHalvesUnit2, setShowHalvesUnit2] = useState(false);
  const [centerGPUs, setCenterGPUs] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const [showInternalStructure, setShowInternalStructure] = useState(false);

  useEffect(() => {
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
                  }, 1000);

                  return () => {
                    clearTimeout(centerTimer);
                    clearTimeout(structureTimer);
                  };
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
                <div
                  key={unitIndex}
                  className="w-32 h-40 relative"
                >
                  {/* Unit label at bottom */}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm
                    transition-opacity duration-500 ${showInternalStructure ? 'opacity-100' : 'opacity-0'}`}>
                    Unit{unitIndex}
                  </div>
                  {/* Dashed border containers that split */}
                  <div 
                    className={`absolute top-0 w-full border-2 border-dashed border-black rounded-xl
                      transition-all duration-500`}
                    style={{
                      height: showInternalStructure ? '25%' : '100%',
                      opacity: showInternalStructure ? 1 : 1,
                    }}
                  />
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-16 
                      transition-all duration-500 ease-in-out flex flex-col
                      ${(unitIndex === 0 && showHalvesUnit0) || 
                        (unitIndex === 1 && showHalvesUnit1) || 
                        (unitIndex === 2 && showHalvesUnit2) 
                          ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      left: gpuIndex === 0 ? '-2px' : 'auto',
                      right: gpuIndex === 1 ? '-2px' : 'auto',
                      height: showInternalStructure ? '160px' : '160px',
                    }}
                  >
                    {/* Internal structure container */}
                    <div className="relative h-full w-full">
                      {/* Params section */}
                      <div 
                        className="absolute w-full border-2 border-solid border-black rounded-xl bg-white
                          transition-all duration-500"
                        style={{ 
                          height: 'calc(25%)',
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
          setIsSplit(false);
          setIsShifted(false);
          setShowGPUs(false);
          setShowHalvesUnit0(false);
          setShowHalvesUnit1(false);
          setShowHalvesUnit2(false);
          setShowInternalStructure(false);
          setCenterGPUs(false);
          setShouldReset(!shouldReset);
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