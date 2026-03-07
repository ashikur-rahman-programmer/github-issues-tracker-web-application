// get the element
const loginPage = document.getElementById("login-page");
const mainPage = document.getElementById("main-page");
const userInput = document.getElementById("user-input");
const passwordInput = document.getElementById("password-input");
const singInBtn = document.getElementById("singin-btn");
// main page element
const btnsContainer = document.getElementById("btns-container");
const allBtn = document.getElementById("all-btn");
const allCardsContainer = document.getElementById("all-cards-show");

// login btn here
singInBtn.addEventListener("click", () => {
  const userInputValue = userInput.value;
  const passwordInputValue = passwordInput.value;
  const isLogIn =
    userInputValue === "admin" && passwordInputValue === "admin123";

  if (!isLogIn) {
    alert("Your username or password is wrong! please try again.");
    return;
  } else {
    mainPage.classList.remove("hidden");
    loginPage.classList.add("hidden");
  }
});

// all btn container dynamic loaded here
// allBtn.addEventListener("click", () => {
//   loadBtn();
// });

// labels arr output
const labelFunc = (arr) => {
  const specificElm = arr.map((elm) => {
    let color = "bg-gray-100 text-gray-500";
    let icon = `<i class="fa-solid fa-tag"></i>`;

    //
    if (elm === "bug") {
      color = "text-[#EF4444] bg-red-100";
      icon = `<i class="fa-solid fa-bug"></i>`;
    } else if (elm === "help wanted") {
      color = "text-[#F59E0B] bg-yellow-100";
      icon = `<i class="fa-regular fa-life-ring"></i>`;
    } else if (elm === "good first issue") {
      color = "bg-orange-100 text-orange-500";
      icon = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
    } else if (elm === "documentation") {
      color = "bg-purple-100 text-purple-500";
      icon = `<i class="fa-regular fa-file-lines"></i>`;
    } else if (elm === "enhancement") {
      color = "bg-blue-100 text-blue-500";
      icon = `<i class="fa-solid fa-arrow-up-right-dots"></i>`;
    }
    ///
    return `<span class="px-3 py-1 rounded-3xl shadow bg-gray-100 ${color}">${icon} ${elm.toUpperCase()}</span>`;
  });
  return specificElm.join("");
};

// priority bg
const priorityFunc = (priority) => {
  if (priority === "high") {
    return "text-[#EF4444] bg-red-100";
  } else if (priority === "medium") {
    return "text-[#F59E0B] bg-yellow-100";
  } else if (priority === "low") {
    return "text-[#9CA3AF] bg-gray-100";
  }
};

// border top condition
const borderTopCon = (bor) => {
  if (bor === "open") {
    return "border-t-4 border-t-green-500";
  } else if (bor === "closed") {
    return "border-t-4 border-t-purple-500";
  }
};

// get date

const dateUpdate = (date) => {
  const createDate = new Date(date);
  const day = createDate.getDate();
  const month = createDate.getMonth() + 1;
  const year = createDate.getFullYear();
  return `${day} / ${month} / ${year}`;
};

//btns  dynamic loaded here
const loadBtn = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  displayBtn(data.data);
};
//display
const displayBtn = (cards) => {
  // const allCardsContainer = document.getElementById("all-cards-show");
  allCardsContainer.innerHTML = "";
  cards.forEach((card) => {
    // statusIcon
    const statusIcon =
      card.status === "closed"
        ? "./assets/closed- Status.png"
        : "./assets/open-Status.png";

    const div = document.createElement("div");
    div.className = `space-y-5 p-4 shadow-md rounded-lg ${borderTopCon(card.status)}`;
    div.innerHTML = `
    
        <div class="space-y-5 pb-4 border-b-2 border-b-gray-200">
          <div class="flex gap-6 justify-between items-center">
            <img
              src="${statusIcon}"
              alt=""
            />
            <span id="priority-unq" class="rounded-4xl py-1 px-8 ${priorityFunc(card.priority)} bg-gray-100 text-md">
            ${card.priority.toUpperCase()}
            </span>
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold">${card.title}</h2>
            <p class="text-gray-500 line-clamp-2">${card.description}</p>
          </div>
          <div class="flex text-[12px] flex-wrap items-center gap-2">
           ${labelFunc(card.labels)}
          </div>
        </div>
        <div>
          <p class="text-gray-500 text-sm">#${card.id} ${card.author}</p>
          <p class="text-gray-500 text-sm">${dateUpdate(card.createdAt)}</p>
        </div>
     
    `;

    allCardsContainer.appendChild(div);
  });
};

// declare fn
loadBtn();
