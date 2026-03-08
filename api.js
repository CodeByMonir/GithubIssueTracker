const mainSec = document.getElementById('main-sec');
const spinner = document.getElementById('spinner')

async function loadData() {
    spinner.classList.remove("hidden");
    spinner.classList.add('flex');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

    const load = await res.json();

    spinner.classList.remove("flex");
    spinner.classList.add('hidden');

    displayData(load.data)
    ocBtn(load.data.status)
}

async function ocBtn(params) {
    console.log(params);
}

function displayData(data) {
    data.forEach((data) => {

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