// get the element
const loginPage = document.getElementById("login-page");
const mainPage = document.getElementById("main-page");
const userInput = document.getElementById("user-input");
const passwordInput = document.getElementById("password-input");
const singInBtn = document.getElementById("singin-btn");
const btnsContainer = document.getElementById("btns-container");
const allCardsContainer = document.getElementById("all-cards-show");
const spinnerLoad = document.getElementById("spinner-load");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issuesCount = document.getElementById("issues-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// store data
let allCards = [];

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

// search btn click specific cards
// searchBtn.addEventListener("click", () => {
//   const searchValue = searchInput.value.toLowerCase();

//   const filteredCards = allCards.filter(
//     (card) =>
//       card.title.toLowerCase().includes(searchValue) ||
//       card.author.toLowerCase().includes(searchValue) ||
//       card.id.toString().includes(searchValue),
//   );

//   displayCard(filteredCards);
// });

//search automatic show when find specific card
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredCards = allCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchValue) ||
      card.author.toLowerCase().includes(searchValue) ||
      card.id.toString().includes(searchValue),
  );

  displayCard(filteredCards);
});

// issues count fnc
const updateIssuesCardsCount = (cardsArr) => {
  issuesCount.textContent = `${cardsArr.length} Issues`;
};

// all btn dynamic loaded here
allBtn.addEventListener("click", async () => {
  setActiveBtn(allBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayCard(data.data);

  removeLoadingSpinner();
});

//open btn dynamic loaded here
openBtn.addEventListener("click", async () => {
  setActiveBtn(openBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  const openCards = data.data.filter((card) => card.status === "open");
  displayCard(openCards);

  removeLoadingSpinner();
});

//closed btn dynamic loaded here
closedBtn.addEventListener("click", async () => {
  setActiveBtn(closedBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  const closedCards = data.data.filter((card) => card.status === "closed");
  displayCard(closedCards);

  removeLoadingSpinner();
});

// active btn when click

const setActiveBtn = (activeBtn) => {
  const allActiveBtns = document.querySelectorAll(".active-common-btn");
  allActiveBtns.forEach((btn) => btn.classList.remove("btn-primary"));

  activeBtn.classList.add("btn-primary");
};

//spinner loading
const showLoadingSpinner = () => {
  spinnerLoad.classList.remove("hidden");
  allCardsContainer.innerText = "";
};
const removeLoadingSpinner = () => {
  spinnerLoad.classList.add("hidden");
};

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

//cards  dynamic loaded here
const loadCard = async () => {
  showLoadingSpinner();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  allCards = data.data;
  displayCard(data.data);
  removeLoadingSpinner();
};
//display cards
const displayCard = (cards) => {
  // update Issues Cards Count
  updateIssuesCardsCount(cards);

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
          <p class="text-gray-500 text-sm">#${card.id} by ${card.author}</p>
          <p class="text-gray-500 text-sm">${dateUpdate(card.createdAt)}</p>
        </div>
     
    `;

    allCardsContainer.appendChild(div);
  });
};

// specific btn click show cards
const specificBtnClick = (cards) => {};

// declare fn
loadCard();
