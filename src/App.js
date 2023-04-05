import React, { useState, useEffect } from "react";

export default function App() {
  const [second, setsecond] = useState(0);
  const [minute, setminute] = useState(0);
  const [hour, sethour] = useState(0);
  const [startb, setstartb] = useState(false);
  const [reset, setreset] = useState(false);
  const [restsec, setrestsec] = useState(false);

  const [splitvalue, setsplitvalue] = useState([
    {
      sec: second,
      min: minute,
      hr: hour,
    },
  ]);

  const start = () => {
    setstartb(true);
    timer();
  };

  const timer = () => {
    setTimeout(() => {
      setsecond(second + 1);
    }, 1000);
   
  };

  useEffect(() => {
    if (startb) {
      timer();
    }else if(restsec){
      resetw()
    }
   
  }, [second, minute, hour]);

  if (second === 60) {
    setminute(minute + 1);
    setsecond(0);
  }
  if (minute === 60) {
    sethour(hour + 1);
    setminute(0);
  }

  const pause = () => {
    setstartb(false);
  };

  const split = () => {

    splitvalue.push(
      {
        sec: second,
        min: minute,
        hr: hour,
      }
    )
   
    console.log(splitvalue);
  };

  const resetw = () => {
    if (startb) {
      setstartb(false);
    }
    setrestsec(true)
    
    setsecond(0);
    setminute(0);
    sethour(0);
    setsplitvalue([])
    
    
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Stop Watch</h1>
        <h3>{`${hour} hr:${minute} min:${second} sec`}</h3>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {startb ? (
            <>
              <button onClick={() => pause()}>Pause</button>
            </>
          ) : (
            <button onClick={() => start()}>Start</button>
          )}

          <button onClick={() => split()}>Split</button>
          <button
            onClick={() => {
              resetw();
            }}
          >
            Reset
          </button>
        </div>
        <h2>Split</h2>
        {splitvalue.map((value) => {
          return (
            <>
            {
              value.hr > 0 || value.sec > 0 || value.min > 0 ? (
                <><h4>{value.hr} hr : {value.min} min: {value.sec} sec</h4>
                </>
              ) : (
                <></>
              )
            }
              
             
            </>
          );
        })}
      </div>
    </>
  );
}
