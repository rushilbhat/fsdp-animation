import React from 'react';

const GatherUpdate = () => {
  const boxes = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="-space-x-0.5 flex flex-col items-center">
        <span className="mb-2 text-sm font-medium">Flat Parameter: (1,26)</span>
        <div className="relative flex gap-1 p-1.5">
          <div className="absolute inset-0 border-2 border-solid border-gray-800 rounded-xl" />
          {boxes.map((num) => (
            <div
              key={num}
              className={`flex items-center justify-center w-10 h-8 border-2 border-solid 
                         ${num === 25 ? 'border-red-500' : 'border-gray-800'} rounded-lg bg-white text-sm`}
            >
              <span className="font-semibold">{num}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-40 mt-40">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium">Parameter A: (2,3)</span>
            <div className="relative flex flex-col gap-1 p-1.5">
              <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl" />
              <div className="flex gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center w-10 h-8 border-2 border-solid border-blue-500 rounded-lg bg-white text-sm"
                  >
                    <span className="font-semibold">{i}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i + 3}
                    className="flex items-center justify-center w-10 h-8 border-2 border-solid border-blue-500 rounded-lg bg-white text-sm"
                  >
                    <span className="font-semibold">{i + 3}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium">Parameter B: (1,5)</span>
            <div className="relative flex gap-1 p-1.5">
              <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl" />
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i + 6}
                  className="flex items-center justify-center w-10 h-8 border-2 border-solid border-blue-500 rounded-lg bg-white text-sm"
                >
                  <span className="font-semibold">{i + 6}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium">Parameter C: (7,2)</span>
            <div className="relative flex flex-col gap-1 p-1.5">
              <div className="absolute inset-0 border-2 border-solid border-blue-500 rounded-xl" />
              {Array.from({ length: 7 }, (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {Array.from({ length: 2 }, (_, colIndex) => {
                    const num = 11 + (rowIndex * 2) + colIndex;
                    return (
                      <div
                        key={num}
                        className="flex items-center justify-center w-10 h-8 border-2 border-solid border-blue-500 rounded-lg bg-white text-sm"
                      >
                        <span className="font-semibold">{num}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatherUpdate;