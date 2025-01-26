import React, { useState, useEffect } from 'react';

const ShardingAnimation = () => {
    const boxes = Array.from({ length: 26 }, (_, i) => i);
    const negativeBoxes = Array.from({ length: 13 }, (_, i) => -13 + i); // Creates array from -13 to -1
    const [showTransition, setShowTransition] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [showCopy, setShowCopy] = useState(false);

    useEffect(() => {
      // Show offset and numel first
      const transitionTimer = setTimeout(() => {
        setShowTransition(true);
      }, 500);

      // Show arrow 500ms after offset and numel
      const arrowTimer = setTimeout(() => {
        setShowArrow(true);
      }, 1000);

      const copyTimer = setTimeout(() => {
        setShowCopy(true);
      }, 1500);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(arrowTimer);
        clearTimeout(copyTimer);
      };
    }, []);

    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="flex flex-col gap-64 -mt-28">
          {/* First Row */}
          <div className="relative">
            <div className="absolute -top-12 left-0 flex flex-col">
              <span className="text-sm font-medium">GPU 0</span>
              <div 
                className={`flex flex-col text-sm text-gray-600 transition-opacity duration-500 ease-in-out ${
                  showTransition ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span>Offset: 0</span>
                <span>Numel: 6</span>
              </div>
            </div>
            <div className="-space-x-0.5 flex">
              {/* First row boxes */}
              <div className="flex flex-col items-center">
                <span className="mb-2 text-sm font-medium">Local Shard</span>
                <div className="relative flex gap-1 p-1.5">
                  <div className="absolute inset-0 border-2 border-solid border-gray-800 rounded-xl pointer-events-none" />
                  
                  {boxes.slice(0, 13).map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-10 h-8 border-2 border-solid 
                                 border-gray-800 rounded-lg bg-white text-sm"
                    >
                      <span className="font-semibold">{num}</span>
                    </div>
                  ))}

                  {/* Floating copy of boxes 0-6 */}
                  <div 
                    className={`absolute -bottom-32 left-0 flex flex-col items-center transition-all duration-700 ease-in-out ${
                      showCopy ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                    }`}
                  >
                    <div className="relative flex gap-1 p-1.5">
                      <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                      {boxes.slice(0, 6).map((num) => (
                        <div
                          key={`copy-${num}`}
                          className="flex items-center justify-center w-10 h-8 border-2 border-solid 
                                     border-blue-500 rounded-lg bg-white text-sm shadow-lg"
                        >
                          <span className="font-semibold">{num}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mt-2 text-sm font-medium">Parameter A</span>
                  </div>

                  <div className={`absolute -bottom-16 -left-3 transition-opacity duration-500 ease-in-out ${
                    showArrow ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex flex-col items-center">
                    <svg 
                      viewBox="0 0 24 40"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-10"
                    >
                      <path d="M12 3L9 12H15L12 3Z" fill="rgb(31, 41, 55)" stroke="rgb(31, 41, 55)" stroke-width="2" stroke-linejoin="round"/>
                      <rect x="11" y="11" width="1.5" height="26" fill="rgb(31, 41, 55)" />
                    </svg>
                      <span className="text-sm font-medium">Start</span>
                    </div>
                  </div>
                  {/* Second arrow at box 7 */}
                  <div className={`absolute -bottom-16 left-[256px] transition-opacity duration-500 ease-in-out ${
                    showArrow ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex flex-col items-center">
                    <svg 
                      viewBox="0 0 24 40"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-10"
                    >
                      <path d="M12 3L9 12H15L12 3Z" fill="rgb(31, 41, 55)" stroke="rgb(31, 41, 55)" stroke-width="2" stroke-linejoin="round"/>
                      <rect x="11" y="11" width="1.5" height="26" fill="rgb(31, 41, 55)" />
                    </svg>
                      <span className="text-sm font-medium">End</span>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Dashed-border boxes 13–25 */}
              <div className="flex gap-1 p-1.5 mt-7">
                {boxes.slice(13).map((num) => (
                  <div
                    key={num}
                    className={`flex items-center justify-center w-10 h-8 border-2 border-dashed 
                               ${num === 25 ? 'border-red-500' : 'border-gray-800'} rounded-lg bg-white text-sm`}
                  >
                    <span className="font-semibold">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="relative">
            <div className="absolute -top-12 left-0 flex flex-col">
              <span className="text-sm font-medium">GPU 1</span>
              <div 
                className={`flex flex-col text-sm text-gray-600 transition-opacity duration-500 ease-in-out ${
                  showTransition ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span>Offset: -13</span>
                <span>Numel: 6</span>
              </div>
            </div>
            <div className="-space-x-0.5 flex">
              {/* Dashed boxes -13 to -1 */}
              <div className="flex gap-1 p-1.5 mt-7">
                {negativeBoxes.map((num) => (
                  <div
                    key={`second-${num}`}
                    className="flex items-center justify-center w-10 h-8 border-2 border-dashed 
                               border-gray-800 rounded-lg bg-white text-sm"
                  >
                    <span className="font-semibold">{num}</span>
                  </div>
                ))}
              </div>

              {/* Parameter A copy for second row */}
              <div 
                className={`absolute -bottom-32 left-[71px] flex flex-col items-center transition-all duration-700 ease-in-out ${
                  showCopy ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                }`}
              >
                <div className="relative flex gap-1 p-1.5">
                  <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                  <div className="h-8 px-4 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">Empty Tensor</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">Parameter A</span>
              </div>
        
              {/* Solid boxes 0-12 with label */}
              <div className="flex flex-col items-center">
                <span className="mb-2 text-sm font-medium">Local Shard</span>
                <div className="relative flex gap-1 p-1.5">
                  <div className="absolute inset-0 border-2 border-solid border-gray-800 rounded-xl pointer-events-none" />
                  {boxes.slice(0, 13).map((num) => (
                    <div
                      key={`second-${num}`}
                      className={`flex items-center justify-center w-10 h-8 border-2 border-solid 
                                 ${num === 12 ? 'border-red-500' : 'border-gray-800'} rounded-lg bg-white text-sm`}
                    >
                      <span className="font-semibold">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default ShardingAnimation;
  