import React, { useState, useEffect } from 'react';

const ModelSplitAnimation = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [showGPUs, setShowGPUs] = useState(false);
  const [splitUnit0, setSplitUnit0] = useState(false);
  const [splitUnit1, setSplitUnit1] = useState(false);
  const [splitUnit2, setSplitUnit2] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setIsSplit(true);
      
      const gpuTimer = setTimeout(() => {
        setShowGPUs(true);
        
        // Split Unit0 after GPUs appear
        const unit0Timer = setTimeout(() => {
          setSplitUnit0(true);
          
          // Split Unit1 after delay
          const unit1Timer = setTimeout(() => {
            setSplitUnit1(true);
            
            // Split Unit2 after delay
            const unit2Timer = setTimeout(() => {
              setSplitUnit2(true);
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

  return (
    <div className="w-full h-screen relative">
      {/* Units Section */}
      <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-32 h-40 border-2 border-black rounded-lg absolute 
                flex items-center justify-center bg-white
                transition-all duration-700 ease-in-out`}
              style={{
                transform: isSplit 
                  ? `translateX(${(i - 1) * 140}px)` 
                  : 'translateX(0)',
                opacity: isSplit ? 
                  (i === 0 && splitUnit0) || (i === 1 && splitUnit1) || (i === 2 && splitUnit2) 
                    ? 0 : 1 
                  : i === 1 ? 1 : 0,
                width: isSplit ? '128px' : '384px',
                zIndex: i === 1 ? 2 : 1
              }}
            >
              <span className="text-xl">
                {isSplit ? `Unit${i}` : (i === 1 ? 'Model' : '')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GPUs Section */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 flex flex-col space-y-8">
        {[0, 1].map((gpuIndex) => (
          <div
            key={gpuIndex}
            className={`w-96 h-64 border-2 border-black rounded-lg 
              bg-white relative
              transition-all duration-500 ease-in-out transform
              ${showGPUs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{
              transitionDelay: `${gpuIndex * 200}ms`
            }}
          >
            <span className="absolute top-2 left-4 text-xl">GPU{gpuIndex}</span>
            
            {/* Three Dashed Boxes in each GPU */}
            <div className="absolute inset-0 flex justify-center items-center gap-8">
              {[0, 1, 2].map((unitIndex) => (
                <div
                  key={unitIndex}
                  className={`w-32 h-40 border-2 border-dashed border-black rounded-lg
                    relative transition-all duration-500
                    ${(unitIndex === 0 && splitUnit0) || 
                      (unitIndex === 1 && splitUnit1) || 
                      (unitIndex === 2 && splitUnit2) 
                        ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* Half Unit */}
                  <div 
                    className={`w-14 h-40 border-2 border-black rounded-lg
                      absolute top-0 bg-white flex items-center justify-center
                      transition-all duration-500
                      ${(unitIndex === 0 && splitUnit0) || 
                        (unitIndex === 1 && splitUnit1) || 
                        (unitIndex === 2 && splitUnit2) 
                          ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{
                      left: gpuIndex === 0 ? '0' : 'auto',
                      right: gpuIndex === 1 ? '0' : 'auto'
                    }}
                  >
                    <span className="text-xl">Unit{unitIndex}</span>
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
          setIsSplit(false);
          setShowGPUs(false);
          setSplitUnit0(false);
          setSplitUnit1(false);
          setSplitUnit2(false);
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