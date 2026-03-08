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
const searchBar = search.value;


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



function openSpinner() {
    spinner.classList.remove("hidden");
    mainSec.innerHTML = "";
};

function closeSpinner() {
    spinner.classList.add("hidden");
};



async function openData() {
    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    const openData = load.data.filter(issue => issue.status === "open");

    displayData(openData);

    issueCount.textContent = openData.length;

    closeSpinner();
}


async function closedData() {
    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    const closedData = load.data.filter(issue => issue.status === "closed");

    displayData(closedData);

    issueCount.textContent = closedData.length;

    closeSpinner();
}

async function loadData() {

    openSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const load = await res.json();

    issueCount.textContent = load.data.length;

    closeSpinner();

    displayData(load.data);
}

function displayData(data) {
    data.forEach((data) => {

        // console.log(data.status)

        const card = document.createElement('div');
        card.className = "card border-t-3 border-t-[#00A96E] shadow-md p-4 rounded-xl";

        card.innerHTML = `<div class="flex items-center justify-between mb-4">

                                <div class="circle"><img
                                src=""
                                alt=""
                                id="oc-stat">
                                </div>

                                <h3 class="text-red-500 w-[80px] h-6 rounded-xl bg-[#FEECEC] text-center">${data.priority}</h3>
                            </div>
                            <div>
                                <h1 class="text-[#1F2937] font-semibold text-[14px]mb-2">${data.title}</h1>
                                <p class="text-[#64748B] text-[14px] mb-3 line-clamp-2">${data.description}</p>
                                <div>
                                    <button class="btn btn-outline btn-error rounded-full">${data.labels[0]}</button>
                                    <button class="btn btn-outline btn-warning rounded-full">${data.labels[1]}</button>
                                </div>
                            </div>
                            <hr class="border-2 border-[#F8FAFC] my-2">
                            <div>
                                <p class="text-[#64748B] text-[14px] mt-3">#${data.id} ${data.author}</p>
                                <p class="text-[#64748B] text-[14px]">${data.createdAt}</p>
                            </div>`
        mainSec.appendChild(card);

    });
}

loadData();