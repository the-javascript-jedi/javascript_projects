title = 'angular-sandbox';

  countryList=["India","America"];
  statesAll={
    "India":["TN","AP"],
    "America":["NY","Chicago"]
  }
  stateList=[];

  getSelectedData(selectedCountry){
    console.log("getSelectedData-selectedCountry",selectedCountry);
    this.stateList=this.statesAll[selectedCountry];
    console.log("this.stateList",this.stateList)

  }