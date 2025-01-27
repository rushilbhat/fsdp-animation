import React, { useState, useEffect } from 'react';

const ShardingAnimation = () => {
    const boxes = Array.from({ length: 26 }, (_, i) => i);
    const negativeBoxes = Array.from({ length: 13 }, (_, i) => -13 + i); // Creates array from -13 to -1
    const [showTransition, setShowTransition] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showParamB, setShowParamB] = useState(false);
    const [showParamC, setShowParamC] = useState(false);
    const [shiftArrows, setShiftArrows] = useState(0);
    const [showSecondRowArrows, setShowSecondRowArrows] = useState(false);
    const [offset1, setOffset1] = useState(0);
    const [offset2, setOffset2] = useState(-13);
    const [numel, setNumel] = useState(6);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
      // Show offset and numel first
      const transitionTimer = setTimeout(() => {
        setShowTransition(true);
      }, 500);

      // Show arrow 500ms after offset and numel
      const arrowTimer = setTimeout(() => {
        setShowArrow(true);
      }, 1000);

      // Show Parameter A boxes
      const copyTimer = setTimeout(() => {
        setShowCopy(true);
      }, 2000);

      // Flash before first change
      const firstFlashTimer = setTimeout(() => {
        setIsFlashing(true);
      }, 2800);

      // Change offsets and numel 1.5s after copy appears
      const offsetTimer = setTimeout(() => {
        setIsFlashing(false);
        setOffset1(6);
        setOffset2(-7);
        setNumel(5);
      }, 3000);

      // Shift arrows 500ms after offset changes
      const shiftArrowsTimer = setTimeout(() => {
        setShiftArrows(1);
      }, 3500);

      // Show Parameter B boxes 500ms after arrows shift
      const paramBTimer = setTimeout(() => {
        setShowParamB(true);
      }, 4500);

      // Flash before second change
      const secondFlashTimer = setTimeout(() => {
        setIsFlashing(true);
      }, 5300);

      // Final offset and numel change 1s after Parameter B appears
      const finalOffsetTimer = setTimeout(() => {
        setIsFlashing(false);
        setOffset1(11);
        setOffset2(-2);
        setNumel(14);
      }, 5500);

      // Second arrow shift 500ms after final offset change
      const secondShiftTimer = setTimeout(() => {
        setShiftArrows(2);
      }, 6000);

      // Show Parameter C boxes right after second shift
      const paramCTimer = setTimeout(() => {
        setShowParamC(true);
      }, 7000);

      // Show second row arrows 500ms after second shift
      const showSecondRowArrowsTimer = setTimeout(() => {
        setShowSecondRowArrows(true);
      }, 6100);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(arrowTimer);
        clearTimeout(copyTimer);
        clearTimeout(firstFlashTimer);
        clearTimeout(offsetTimer);
        clearTimeout(shiftArrowsTimer);
        clearTimeout(paramBTimer);
        clearTimeout(secondFlashTimer);
        clearTimeout(finalOffsetTimer);
        clearTimeout(secondShiftTimer);
        clearTimeout(paramCTimer);
        clearTimeout(showSecondRowArrowsTimer);
      };
    }, []);

    return (
      <div className="w-full h-screen flex items-center justify-center p-4" style={{
        backgroundColor: '#fdfdfd', transform: 'scale(0.65)'}}>
        <div className="flex flex-col gap-72 -mt-28">
          {/* First Row */}
          <div className="relative">
            <div className="absolute -top-10 left-0">
              <span className="text-lg font-semibold">GPU 0</span>
            </div>
            <div className="absolute -top-10 right-0 flex flex-col items-end">
              <div 
                className={`flex flex-col text-sm text-gray-600 transition-opacity duration-500 ease-in-out ${
                  showTransition ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span>Offset: <span className={`font-mono inline-block w-8 text-right ${isFlashing ? 'animate-pulse font-bold text-red-600' : ''}`}>{offset1}</span></span>
                <span>Numel: <span className={`font-mono inline-block w-8 text-right ${isFlashing ? 'animate-pulse font-bold text-red-600' : ''}`}>{numel}</span></span>
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

                  {/* Floating copy of boxes 6-10 (Parameter B) 320px = 48px*/}
                  <div 
                    className={`absolute -bottom-32 left-[372px] flex flex-col items-center transition-all duration-700 ease-in-out ${
                      showParamB ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                    }`}
                  >
                    <div className="relative flex gap-1 p-1.5">
                      <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                      {boxes.slice(6, 11).map((num) => (
                        <div
                          key={`paramB-${num}`}
                          className="flex items-center justify-center w-10 h-8 border-2 border-solid 
                                     border-blue-500 rounded-lg bg-white text-sm shadow-lg"
                        >
                          <span className="font-semibold">{num}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mt-2 text-sm font-medium">Parameter B</span>
                  </div>

                  {/* Floating copy of boxes 11-12 (Parameter C) 596px*/}
                  <div 
                    className={`absolute -bottom-32 left-[700px] flex flex-col items-center transition-all duration-700 ease-in-out ${
                      showParamC ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                    }`}
                  >
                    <div className="relative flex gap-1 p-1.5">
                      <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                      {boxes.slice(11, 13).map((num) => (
                        <div
                          key={`paramC-${num}`}
                          className="flex items-center justify-center w-10 h-8 border-2 border-solid 
                                     border-blue-500 rounded-lg bg-white text-sm shadow-lg"
                        >
                          <span className="font-semibold">{num}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mt-2 text-sm font-medium">Parameter C</span>
                  </div>

                  <div className={`absolute -bottom-16 -left-3 transition-all duration-500 ease-in-out ${
                    showArrow ? 'opacity-100' : 'opacity-0'
                  } ${shiftArrows === 1 ? 'translate-x-[265px]' : ''} ${shiftArrows === 2 ? 'translate-x-[487px]' : ''}`}>
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
                  <div className={`absolute -bottom-16 left-[256px] transition-all duration-500 ease-in-out ${
                    showArrow ? 'opacity-100' : 'opacity-0'
                  } ${shiftArrows === 1 ? 'translate-x-[222px]' : ''} ${shiftArrows === 2 ? 'translate-x-[308px]' : ''}`}>
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

          {/* Dashed line divider */}
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '50%' }}>
            <div className="w-[1200px] border-t-2 border-dashed border-gray-400"></div>
          </div>

          {/* Second Row */}
          <div className="relative">
            <div className="absolute -top-14 left-0">
              <span className="text-lg font-semibold">GPU 1</span>
            </div>
            <div className="absolute -top-14 right-0 flex flex-col items-end">
              <div 
                className={`flex flex-col text-sm text-gray-600 transition-opacity duration-500 ease-in-out ${
                  showTransition ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span>Offset: <span className={`font-mono inline-block w-8 text-right ${isFlashing ? 'animate-pulse font-bold text-red-600' : ''}`}>{offset2}</span></span>
                <span>Numel: <span className={`font-mono inline-block w-8 text-right ${isFlashing ? 'animate-pulse font-bold text-red-600' : ''}`}>{numel}</span></span>
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

              {/* Parameter C for second row 365px 600px*/}
              <div 
                className={`absolute -bottom-32 left-[469px] flex flex-col items-center transition-all duration-700 ease-in-out ${
                  showParamC ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                }`}
              >
                <div className="relative flex gap-1 p-1.5">
                  <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                  {boxes.slice(0, 12).map((num) => (
                    <div
                      key={`paramC-second-${num}`}
                      className="flex items-center justify-center w-10 h-8 border-2 border-solid 
                                 border-blue-500 rounded-lg bg-white text-sm shadow-lg"
                    >
                      <span className="font-semibold">{num}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-2 text-sm font-medium">Parameter C</span>
              </div>

              {/* Parameter A copy for second row */}
              <div 
                className={`absolute -bottom-32 left-[1px] flex flex-col items-center transition-all duration-700 ease-in-out ${
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

              {/* Parameter B empty tensor for second row 183px 322px*/} 
              <div 
                className={`absolute -bottom-32 left-[235px] flex flex-col items-center transition-all duration-700 ease-in-out ${
                  showParamB ? 'translate-y-8 opacity-100' : 'translate-y-0 opacity-0'
                }`}
              >
                <div className="relative flex gap-1 p-1.5">
                  <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl pointer-events-none" />
                  <div className="h-8 px-4 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">Empty Tensor</span>
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium">Parameter B</span>
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

              {/* Add arrows for second row */}
              <div className={`absolute -bottom-16 left-[568px] transition-all duration-500 ease-in-out ${
                showSecondRowArrows ? 'opacity-100' : 'opacity-0'
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
              <div className={`absolute -bottom-16 left-[1101px] transition-all duration-500 ease-in-out ${
                showSecondRowArrows ? 'opacity-100' : 'opacity-0'
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
        </div>
      </div>
    );
  };
  
export default ShardingAnimation;
  