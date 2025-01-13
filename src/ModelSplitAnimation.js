import React, { useState, useEffect } from 'react';

const ModelSplitAnimation = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [showHalvesUnit0, setShowHalvesUnit0] = useState(false);
  const [showHalvesUnit1, setShowHalvesUnit1] = useState(false);
  const [showHalvesUnit2, setShowHalvesUnit2] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

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
        className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-700"
        style={{
          left: isShifted ? '25%' : '50%',
          transform: `translate(${isShifted ? '-50%' : '-50%'}, -50%)`
        }}
      >
        <div className="relative flex justify-center items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-2 border-black rounded-2xl absolute 
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
      <div className="absolute left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-8">
        {[0, 1].map((gpuIndex) => (
          <div
            key={gpuIndex}
            className={`h-64 border-2 border-black rounded-2xl 
              bg-white relative
              transition-all duration-500 ease-in-out transform
              ${showGPUs ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              width: '520px',
              transitionDelay: `${gpuIndex * 200}ms`
            }}
          >
            <span className="absolute top-2 left-4 text-xl">GPU{gpuIndex}</span>
            <div className="w-full h-full p-4 flex justify-center items-center gap-8">
              {[0, 1, 2].map((unitIndex) => (
                <div
                  key={unitIndex}
                  className="w-32 h-40 border-2 border-dashed border-black rounded-2xl relative"
                >
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-16 h-40 
                      border-2 border-solid border-black rounded-2xl bg-white
                      transition-all duration-500 ease-in-out
                      ${(unitIndex === 0 && showHalvesUnit0) || 
                        (unitIndex === 1 && showHalvesUnit1) || 
                        (unitIndex === 2 && showHalvesUnit2) 
                          ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      left: gpuIndex === 0 ? '0' : 'auto',
                      right: gpuIndex === 1 ? '0' : 'auto',
                    }}
                  >
                    <span className="text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      Unit{unitIndex}
                    </span>
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