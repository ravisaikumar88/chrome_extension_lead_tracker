
let myLeads = []
const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")

let ulEl = document.getElementById("ul-el")

const deleteBtn = document.getElementById("delete-btn")

const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))

const tabBtn = document.getElementById("tab-btn")

if(leadsFromlocalStorage){
    myLeads = leadsFromlocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })

    console.log(tabs[0].url)
    
})


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    
    inputEl.value = ""

    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let listItems = ""

    for(let i=0; i<leads.length;i++){
        listItems +=  `<li>
                            <a href='${myLeads[i]}' target='_blank'> 
                                ${myLeads[i]}
                            </a> 
                        </li>`
    }

ulEl.innerHTML = listItems
}