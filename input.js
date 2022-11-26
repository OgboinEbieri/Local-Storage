let form = document.getElementById("form")
let continent = document.getElementById("continent")
let country = document.getElementById("country")
let state = document.getElementById("state")
let height = document.getElementById("height")
let complexion= document.getElementById("complexion")
let wealthstatus= document.getElementById("status")
let submitbtn = document.getElementById("btn")
let dropdown = document.getElementById('dropdown')
let sortbyinput = document.getElementById('sortbyinput');
let optionClass = document.querySelectorAll('.option')
let div = document.getElementById('div')
let wealthvalue = document.getElementById('wealthValue')
let div1 = document.getElementById('div1')

//empty array
let data = []
let arr = []
let count = 0
function sensor(continent,country,state,height,complexion,wealthstatus){
    this.continent = continent;
    this.country = country;
    this.state = state;
    this.height = height;
    this.complexion = complexion;
    this.wealthstatus = wealthstatus;
}
submitbtn.addEventListener('click',(ev)=>{
    if(localStorage.getItem('count')){
        count = Number(localStorage.getItem('count'));
    }

    let formContinent = continent.value
    let formCountry = country.value
    let formState = state.value
    let formHeight = height.value
    let formComplexion = complexion.value
    let formWealthStatus = wealthstatus.value


    let sensordata = new sensor(formContinent,formCountry,formState,formHeight,formComplexion,formWealthStatus)
    let optionvalue;
    console.log(sensordata);



    localStorage.setItem(`data${count}`,JSON.stringify(sensordata))
    count++
    localStorage.setItem('count',count);
    
    ev.preventDefault();
    
});

let getAllMembers = (()=>{
    
    data.length = 0
    
    for (let i=0; i<localStorage.length; i++){
        let person = JSON.parse(localStorage.getItem (`data${i}`));
        optionvalue = dropdown.value;
        let value ='';
        

        if(optionvalue === 'continent'){
            value =  person.continent;
            
        }else{
            value = person.country
        
        }
        let similarValue = '';
        
        
        
    

        if(data){
            data.filter((val)=>{
                if(val === value){
                    similarValue = val
                    
                }
            })
        }
        // console.log(similarValue)
     
        if(!similarValue){
            
                data.push(value)
                let option = document.createElement('option');
                let optText = document.createTextNode(value);
                option.appendChild(optText);
                option.setAttribute('value',value)
                option.setAttribute('class', 'option')

                sortbyinput.appendChild(option);
                similarValue = ''
        }
     
            
        
    };
   
    return
})

let getCountryContinent = ()=>{
    
    let sortbyinputVal = sortbyinput.value
    console.log(sortbyinputVal)
    div.innerHTML = '';
    arr =[]
    for(let i =0; i<localStorage.length; i++){
        let dataFetch = JSON.parse(localStorage.getItem (`data${i}`));
        let value = ''

    
        if(optionvalue === 'continent'){

           value = dataFetch.continent;


        if(value === sortbyinputVal){
            


            let paragraph = document.createElement('p');
            paragraph.innerHTML =`continent:${dataFetch.continent},country:${dataFetch.country},state:${dataFetch.state},
            height:${dataFetch.height}, complexion:${dataFetch.complexion}, wealthStatus:${dataFetch.wealthstatus}`
            div.append(paragraph);
            arr.push(dataFetch)
        }
        
     
        }else{
            value = dataFetch.country;
            if(value === sortbyinputVal){
                let paragraph = document.createElement('p');
                paragraph.innerHTML =`continent:${dataFetch.continent},country:${dataFetch.country},state:${dataFetch.state},
                height:${dataFetch.height}, complexion:${dataFetch.complexion}, wealthStatus:${dataFetch.wealthstatus}`
                div.append(paragraph);
                arr.push(dataFetch)
            }

        }
       
    }
}



dropdown.addEventListener('click',(event)=>{
    sortbyinput.innerHTML = '';
    


    getAllMembers();


    event.preventDefault()
    
})

sortbyinput.addEventListener('change',getCountryContinent)



let paragraph;
let getwealthstatus = ()=>{
    div1.innerHTML =''
    let wealthValueExact = wealthvalue.value
    console.log(arr)
        if(arr){
            arr.filter((val)=>{
                if (val.wealthstatus === wealthValueExact){
                    console.log(val.wealthstatus)
                    console.log(wealthValueExact)
                    
                    
                    paragraph = document.createElement('p')
                    paragraph.innerHTML = JSON.stringify(val)
                    div1.append(paragraph)
                    
                };
            })
        }

}

wealthvalue.addEventListener('change', getwealthstatus)
 