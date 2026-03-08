const mainSec = document.getElementById('main-sec');
const spinner = document.getElementById('spinner');

// button call
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');

// issue count call
const issueCount = document.getElementById('issue-count');

// search bar call
const search = document.getElementById('search-bar');




// searchbar function

search.addEventListener('keyup', async function (e) {
    const searchInput = e.target.value.toLowerCase();

    if (searchInput.trim() === ""){
        loadData();
        return;
    }

    openSpinner();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`);
    const load = await res.json();

    issueCount.textContent = load.data.length;

    closeSpinner();

    displayData(load.data);
});




// button toggling

allBtn.addEventListener('click', function () {
    allBtn.classList.add('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');

    loadData();
});

openBtn.addEventListener('click', function () {
    allBtn.classList.remove('btn-primary');
    openBtn.classList.add('btn-primary');
    closedBtn.classList.remove('btn-primary');

    openData();
});

closedBtn.addEventListener('click', function () {
    allBtn.classList.remove('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.add('btn-primary');

    closedData();
});



// loading spinner

function openSpinner() {
    spinner.classList.remove("hidden");
    mainSec.innerHTML = "";
};

function closeSpinner() {
    spinner.classList.add("hidden");
};




// open btn function

async function openData() {
    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    const openData = load.data.filter(issue => issue.status === "open");

    displayData(openData);

    issueCount.textContent = openData.length;

    closeSpinner();
};



// close btn function

async function closedData() {
    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    const closedData = load.data.filter(issue => issue.status === "closed");

    displayData(closedData);

    issueCount.textContent = closedData.length;

    closeSpinner();
}



// all btn and main json fetch function

async function loadData() {

    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    issueCount.textContent = load.data.length;

    closeSpinner();

    displayData(load.data);
}




// json data display function

function displayData(data) {

    data.forEach((data) => {

        let priorityColor = "bg-[#EEEFF2] text-[#9CA3AF]";

        if(data.priority === 'high'){
            priorityColor = "bg-[#FEECEC] text-[#EF4444]";
        }
        else if(data.priority === 'medium'){
            priorityColor = "bg-[#FFF6D1] text-[#F59E0B]";
        };

        const card = document.createElement('div');
        card.className = `card border-t-3 border-t-${data.status === "open" ? '[#00A96E]' : '[#A855F7]'} shadow-md p-4 rounded-xl`;
        card.setAttribute("onclick", `modal(${data.id}, ${JSON.stringify(data)})`);

        card.innerHTML = `<div class="flex items-center justify-between mb-4">

                                <div class="circle"><img
                                src="./assets/${data.status === "open" ? 'Open-Status.png' : 'Closed-Status.png'}"
                                alt=""
                                id="oc-stat">
                                </div>

                                <h3 class=" w-[80px] h-6 rounded-xl ${priorityColor} text-center">${data.priority}</h3>

                            </div>
                            <div>
                                <h1 class="text-[#1F2937] font-semibold text-[14px]mb-2">${data.title}</h1>
                                <p class="text-[#64748B] text-[14px] mb-3 line-clamp-2">${data.description}</p>
                                <div class="flex gap-2">
                                    ${data.labels.map(tag => `
                                        <span class="text-xs px-3 py-1 rounded-full ${tag === 'bug' ? 'bg-red-100 text-red-600 border border-red-200' : tag === 'enhancement' ? 'bg-green-100 text-green-600 border border-green-200' : tag === 'help wanted' ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' : tag === 'good first issue' ? 'bg-gray-100 text-gray-600 border border-gray-200' : tag === 'documentation' ? 'bg-blue-100 text-blue-600 border border-blue-200' : ''}">${tag}</span>
                                    `).join('')}
                                </div>
                            </div>
                            <hr class="border-2 border-[#F8FAFC] my-2">
                            <div>
                                <p class="text-[#64748B] text-[14px] mt-3">#${data.id} ${data.author}</p>
                                <p class="text-[#64748B] text-[14px]">${data.createdAt}</p>
                            </div>`
        mainSec.appendChild(card);

    });
};

loadData();


function modal(id, data){

    console.log(id, data);

    // data.forEach((data) => {
    //     let priorityColor = "bg-[#EEEFF2] text-[#9CA3AF]";

    //     if (data.priority === "high") {
    //       priorityColor = "bg-[#FEECEC] text-[#EF4444]";
    //     } else if (data.priority === "medium") {
    //       priorityColor = "bg-[#FFF6D1] text-[#F59E0B]";
    //     }

    //     const card = document.createElement("div");

    //     card.innerHTML = `
    //         <h1 class="text-[#1F2937] font-bold text-[24px]">${data.title}</h1>
    //         <div class="flex items-center gap-2 text-[12px] text-[#64748B]">
    //             <button class="${data.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} py-1 px-2    rounded-full -2 text-white">${data.status}</button> 
    //             <div class="h-1 w-1 bg-[#64748B] rounded-full"></div> 
    //             <p>Opened by ${data.assignee}</p> 
    //             <div class="h-1 w-1 bg-[#64748B] rounded-full"></div>
    //             <p>${data.updatedAt}</p>
    //         </div>
    //         <div class="flex gap-2 mb-6">
    //             ${data.labels.map((tag) => `
    //                 <span class="text-xs px-3 py-1 rounded-full 
    //                 ${tag === "bug" ? "bg-red-100 text-red-600 border border-red-200" : tag === "enhancement" ?     "bg-green-100 text-green-600 border border-green-200" : tag === "help wanted" ? "bg-yellow-100  text-yellow-600 border border-yellow-200" : tag === "good first issue" ? "bg-gray-100    text-gray-600 border border-gray-200" : tag === "documentation" ? "bg-blue-100 text-blue-600   border border-blue-200" : ""}">${tag}</span>
    //             `,).join("")}
    //         </div>
    //         <p class="text-[#64748B]">${data.description}</p>
    //         <div class="p-4 bg-[#F8FAFC] rounded-md flex">
    //             <div class="w-[296px]">
    //                 <p class="text-[#64748B]">Assignee:</p>
    //                 <p class="text-[#1F2937] font-semibold">${data.assignee}</p>
    //             </div>
    //             <div class="w-[296px]">
    //                 <p class="text-[#64748B]">Priority:</p>
    //                 <h3 class=" w-[80px] h-6 rounded-xl ${priorityColor} text-center">${data.priority}</h3>
    //             </div>                                
    //         </div>
    //         <div class="modal-action">
    //             <form method="dialog"> 
    //                 <!-- if there is a button in form, it will close the modal -->
    //                 <button class="btn btn-primary">Close</button>
    //             </form>
    //         </div>
    //     `;
    // });
    

        
    
}