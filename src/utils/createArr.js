const createArr= (num)=> {
    
    const tempArr = [];
 
        for (let i = 1; i <= num*num ; i++) {
            tempArr.push({ id: `el${i}`, name: `cell${i}`,index:i });            
          }

    return tempArr;
  }

  export default createArr;