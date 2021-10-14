import React, { useState, useEffect } from 'react'

import './FilterTest.css'
import { LatestLaunch, Cores, AllLaunches } from '../../data'

const FilterTest = () => {
  const allYears = [2006, 2007, 2008, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

  // for the selecting of reused state
  const [reusedState, setReusedState] = useState([true, false]);

  // for the multiple selecting of years
  const [yearState, setyearState] = useState([2021])



  // array Trigger to trigger the page refresher
  // work with stateSelect() 
  const [arrayTrigger, setarrayTrigger] = useState(true)

  // for change the items in array. if exist, remove it, otherwise add into array
  const stateSelect = (input, array, setFunction) => {
    function removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
    setarrayTrigger(!arrayTrigger);
    if (array.includes(input)) {
      setFunction(removeItemOnce(array, input))
    } else {
      array.push(input);
      setFunction(array);
    }
  }



  // for the filter condition
  const filter = (launchDateUTC, reusedData) => {
    //take the first fourth digitals of launchDateUTC as year 
    // check if this year in yearState array
    let yearStatement = yearState.includes(parseInt(launchDateUTC.substring(0, 4)));
    // check if this reused in reusedState array
    let reusedStatement = reusedState.includes(reusedData);


    if (yearStatement && reusedStatement) {
      return true;
    } else {
      return false;
    }
  }

  // SelectButton component
  // name: button name | unit: item in array | array: state array | fun: the function which handle the items
  const SelectButton = props => {

    return (
      <button
        className={props.array.includes(props.unit) ? 'SelectButton-active' : 'SelectButton-inactive'}
        onClick={props.fun}
      >
        {props.name}
      </button>
    )
  }



  return (
    <div className='filter'>

      <div className='filter-years'>
        {/* reset to all year */}
        <button
          className={yearState.length === allYears.length ? 'SelectButton-active' : 'SelectButton-inactive'}
          onClick={() => setyearState(allYears)}
        >All Years</button>
        {/* set to only 2021 */}
        <button
          className={JSON.stringify(yearState) == JSON.stringify([2021]) ? 'SelectButton-active' : 'SelectButton-inactive'}
          onClick={() => setyearState([2021])}
        >
          Only 2021
        </button>
      </div>



      <div className='filter-years'>
        {allYears.map((year) => {
          return (
            <SelectButton name={year} unit={year} array={yearState} fun={() => stateSelect(year, yearState, setyearState)} />
          )
        })}
      </div>

      <div className='filter-reused'>
        <SelectButton
          name={'Reused'}
          unit={true}
          array={reusedState}
          fun={() => stateSelect(true, reusedState, setReusedState)}
        />
        <SelectButton
          name={'Unreused'}
          unit={false}
          array={reusedState}
          fun={() => stateSelect(false, reusedState, setReusedState)}
        />
        {/* {console.log(reusedState)}
        {console.log(yearState)} */}
      </div>


      <div className='filter-nodes'>
        {/* {console.log(AllLaunches)} */}
        {AllLaunches.map((launch, launchIndex) => {
          if (filter(launch.date_utc, launch.cores[0].reused) === true) {
            return (
              <div className={launch.cores[0].reused === true ? 'filter-node-reused' : 'filter-node-unreused'} id={launchIndex}>
                <div>Number: {launch.flight_number}</div>
                <div>Reused: {launch.cores[0].reused === true ? 'Yes' : 'No'}</div>
                <div>Year: {launch.date_utc.substring(0, 4)}</div>
              </div>
            )
          } else { return (null) }
        })}
      </div>

    </div>
  )
}

export default FilterTest
