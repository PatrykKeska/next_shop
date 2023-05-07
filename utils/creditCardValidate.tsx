export const creditCardValidate = (value:string)=>{
    const currYear = new Date().getFullYear();
  const [month, year] = value.split('/');

  if(Number(value.length) !== 5){
      return `Please use MM/YY format`
  }
  if(Number(Number(month) > 12 || Number(month) < 1)){
      return 'Month value is wrong'
  }
  if(Number(year) < currYear % 100){
      return `Your credit card is expired `
  }

}
