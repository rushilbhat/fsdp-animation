import React, { useState, useEffect } from 'react';

const ModelSplitAnimation = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [splitUnit0, setSplitUnit0] = useState(false);
  const [splitUnit1, setSplitUnit1] = useState(false);
  const [splitUnit2, setSplitUnit2] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setIsSplit(true);

      const gpuTimer = setTimeout(() => {
        setShowGPUs(true);

        const unit0Timer = setTimeout(() => {
          setSplitUnit0(true);

          const unit1Timer = setTimeout(() => {
            setSplitUnit1(true);

            const unit2Timer = setTimeout(() => {
              setSplitUnit2(true);

              const componentsTimer = setTimeout(() => {
                setShowComponents(true);
              }, 800);

              return () => clearTimeout(componentsTimer);
            }, 800);

            return () => clearTimeout(unit2Timer);
          }, 800);

          return () => clearTimeout(unit1Timer);
        }, 1000);

        return () => clearTimeout(unit0Timer);
      }, 1000);

      return () => clearTimeout(gpuTimer);
    }, 2000);

    return () => clearTimeout(splitTimer);
  }, [shouldReset]);

  const UnitComponent = ({ unitIndex, gpuIndex }) => {
    const isUnitSplit =
      (unitIndex === 0 && splitUnit0) ||
      (unitIndex === 1 && splitUnit1) ||
      (unitIndex === 2 && splitUnit2);

    return (
      <div className="relative w-32 h-40 border-2 border-dashed border-black rounded-lg">
        {showComponents ? (
          <>
            <div
              className="absolute w-16 border-2 border-black rounded-lg bg-white 
                flex items-center justify-center transition-all duration-500"
              style={{
                height: '25%',
                top: '0',
                right: gpuIndex === 1 ? '0' : 'auto',
                left: gpuIndex === 0 ? '0' : 'auto',
                opacity: isUnitSplit ? 1 : 0,
                transform: isUnitSplit ? 'scale(1)' : 'scale(0)'
              }}
            >
              <span className="text-sm">Params</span>
            </div>

            <div
              className="absolute w-16 border-2 border-black rounded-lg bg-white 
                flex items-center justify-center transition-all duration-500"
              style={{
                height: '25%',
                top: '25%',
                right: gpuIndex === 1 ? '0' : 'auto',
                left: gpuIndex === 0 ? '0' : 'auto',
                opacity: isUnitSplit ? 1 : 0,
                transform: isUnitSplit ? 'scale(1)' : 'scale(0)',
                transitionDelay: '100ms'
              }}
            >
              <span className="text-sm">Grads</span>
            </div>

            <div
              className="absolute w-16 border-2 border-black rounded-lg bg-white 
                flex items-center justify-center transition-all duration-500"
              style={{
                height: '50%',
                bottom: '0',
                right: gpuIndex === 1 ? '0' : 'auto',
                left: gpuIndex === 0 ? '0' : 'auto',
                opacity: isUnitSplit ? 1 : 0,
                transform: isUnitSplit ? 'scale(1)' : 'scale(0)',
                transitionDelay: '200ms'
              }}
            >
              <span className="text-sm whitespace-pre-line text-center">
                Opt.{'\n'}states
              </span>
            </div>

            <div className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 text-sm">
              {`Unit${unitIndex}`}
            </div>
          </>
        ) : (
          <div
            className="absolute w-16 inset-0 border-2 border-black rounded-lg bg-white 
              flex items-center justify-center transition-all duration-500"
            style={{
              right: gpuIndex === 1 ? '0' : 'auto',
              left: gpuIndex === 0 ? '0' : 'auto',
              opacity: isUnitSplit ? 1 : 0,
              transform: isUnitSplit ? 'scale(1)' : 'scale(0)'
            }}
          >
            <span className="text-xl">Unit{unitIndex}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-2 border-black rounded-lg absolute 
                flex items-center justify-center bg-white
                transition-all duration-700 ease-in-out"
              style={{
                transform: isSplit
                  ? `translateX(${(i - 1) * 140}px)`
                  : 'translateX(0)',
                opacity: isSplit
                  ? (i === 0 && splitUnit0) ||
                    (i === 1 && splitUnit1) ||
                    (i === 2 && splitUnit2)
                    ? 0
                    : 1
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

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 flex flex-col space-y-8">
        {[0, 1].map((gpuIndex) => (
          <div
            key={gpuIndex}
            className={`h-64 border-2 border-black rounded-lg 
              bg-white relative
              transition-all duration-500 ease-in-out transform
              ${showGPUs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{
              width: '520px', // Increased from 384px (w-96) to 480px
              transitionDelay: `${gpuIndex * 200}ms`
            }}
          >
            <span className="absolute top-2 left-4 text-xl">GPU{gpuIndex}</span>

            <div className="w-full h-full p-4 flex justify-center items-center gap-8">
              {[0, 1, 2].map((unitIndex) => (
                <UnitComponent
                  key={unitIndex}
                  unitIndex={unitIndex}
                  gpuIndex={gpuIndex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setIsSplit(false);
          setShowGPUs(false);
          setSplitUnit0(false);
          setSplitUnit1(false);
          setSplitUnit2(false);
          setShowComponents(false);
          setShouldReset(!shouldReset);
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
          px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
          transition-colors duration-200"
      >
        Reset
      </button>
    </div>
  );
};

export default ModelSplitAnimation;