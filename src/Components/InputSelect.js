import React from "react";
import Select from "react-select";


function InputSelect(props) {
  //console.log(props.test);
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#434956",
      color:"red !important",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#434956" : "#434956",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        //borderColor: state.isFocused ? "red" : "#cccccc"
      }
    }),
    singleValue: base => ({
      ...base,
    color:"#FFF"
    }),
    menu: base => ({
      ...base,
      backgroundColor:"#434956",
      color:"#cccccc"
    }),
    option: (base,state) => ({
      ...base,
      backgroundColor:  state.isSelected ? '#656e81' : state.isFocused ? '#14A76C' : null,
      color:  state.isSelected ? '#FFF' : state.isFocused ? '#FFF' : null,
    })
  };
/*
  const optionsDa = [
    {
      label: "option 1",
      value: 1
    },
    {
      label: "option 2",
      value: 2
    },
    {
      label: "option 3",
      value: 3
    },
    {
      label: "option 4",
      value: 4
    },
    {
      label: "option 5",
      value: 5
    }
  ];
*/
  let options = [];

  //props.catList
   props.catList.map((cat) =>
      options = [{label:cat.category,value:cat.id},...options],
   );


  return (
    <div className="App" style={{width:"35%"}}>
      <Select  styles={customStyles} options={options}  placeholder="Select a category"  onChange={props.changeCategory}/>
    </div>
  );
}
export default InputSelect;

