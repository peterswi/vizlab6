
d3.csv('data/unemployment.csv',d3.autoType).then(data=>{
    console.log(data)
    totalCount=[]
    data.forEach(element => {
      //need to find all the sums
      total=element["Agriculture"]+element["Wholesale and Retail Trade"]+element["Manufacturing"]+element["Leisure and hospitality"]+element["Business services"]+element["Construction"]+element["Education and Health"]+element["Government"]+element["Finance"]+element["Self-employed"]+element["Other"]+element["Transportation and Utilities"]+element["Information"]+element["Mining and Extraction"]
      element['total']=total
      
    });
    console.log(data)
 

})