const ShardingAnimation = () => {
    const boxes = Array.from({ length: 26 }, (_, i) => i);
    const negativeBoxes = Array.from({ length: 13 }, (_, i) => -13 + i); // Creates array from -13 to -1
  
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="flex flex-col gap-52">
          {/* First Row */}
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
              </div>
            </div>
      
            {/* Dashed-border boxes 13–25 */}
            <div className="flex gap-1 p-1.5 mt-8">
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

          {/* Second Row */}
          <div className="-space-x-0.5 flex">
            {/* Dashed boxes -13 to -1 */}
            <div className="flex gap-1 p-1.5 mt-8">
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
    );
  };
  
export default ShardingAnimation;
  