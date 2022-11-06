// Title of the Webpage

const titleDiv = document.createElement("div");
titleDiv.className = "text-bg-secondary p-3 text-center";

const title = document.createElement("h1");
title.innerText = "Book Shelf";
title.style.color = "gold";

// Description of the Webpage
const description = document.createElement("h4");

description.innerText = "Pagination of Book Information";
description.style = " font-family: 'Dancing Script', cursive; color: yellow";

titleDiv.append(title, description);

document.body.append(titleDiv);

// Main DIV
const mainDiv = document.createElement("div");

mainDiv.className = "table-responsive";

document.body.append(mainDiv);

// Creating Table Elements
const tableEle = document.createElement("table");
tableEle.className = " table table-primary";

tableEle.id = "table";

// Creating Table Head Elements
const theadEle = document.createElement("thead");
// theadEle.className = "table-dark";

// Creating Table Tr Elements
const trEle = document.createElement("tr");

[
  "Name",
  "ISBN",
  "No. of Pages",
  "Authors",
  "Publisher",
  "Released Date",
].forEach((columnName) => {
  // Creating Table Head Elements
  const thEle = document.createElement("th");
  thEle.className = " table-dark";
  thEle.innerText = columnName;
  trEle.appendChild(thEle);
});

theadEle.appendChild(trEle);

// Creating Table Body Elements
const tbodyEle = document.createElement("tbody");

tableEle.append(theadEle, tbodyEle);

mainDiv.appendChild(tableEle);

// Creating Empty Array for displaying Book items

var globalData = [];

var currPage = 0;

const getbooks = async () => {
  try {
    const response = await fetch(
      " https://www.anapioficeandfire.com/api/books"
    ); // Fetching data from API
    const books = await response.json(); // Getting data in json format
    globalData = books;

    books.slice(currPage, 2).forEach((book) => {
      const innerTr = document.createElement("tr");

      // Map used for destructuring the values of the Objects and stored as an array
      const details = [
        "name",
        "isbn",
        "numberOfPages",
        "authors",
        "publisher",
        "released",
      ].map((values) => book[values]);

      // ForEach used for creating td elements of the body from the required values stored in the array
      details.forEach((info) => {
        const tdEle = document.createElement("td");
        tdEle.innerText = info;
        innerTr.append(tdEle);
      });

      tbodyEle.appendChild(innerTr);
    });
  } catch (error) {
    console.log(error);
  }
};

getbooks();

// Creating Function to display Pages

const populateTable = (startIndex, endIndex) => {
  globalData.slice(startIndex, endIndex).forEach((book) => {
    const innerTr = document.createElement("tr");

    // Map used for destructuring the values of the Objects and stored as an array
    const details = [
      "name",
      "isbn",
      "authors",
      "numberOfPages",
      "publisher",
      "released",
    ].map((values) => book[values]);

    // ForEach used for creating td elements of the body from the required values stored in the array
    details.forEach((info) => {
      const tdEle = document.createElement("td");
      tdEle.innerText = info;
      innerTr.append(tdEle);
    });

    tbodyEle.appendChild(innerTr);
  });
};

// Buttons Div
const btnsDiv = document.createElement("div");

btnsDiv.className = "d-flex justify-content-center";

//  Creating Page Buttons to display Two Books in Each Page
const pageBtns = [...Array(5).keys()].map((pageNo) => {
  const pageBtn = document.createElement("button");
  pageBtn.innerText = pageNo + 1;

  pageBtn.addEventListener("click", () => {
    currPage = pageNo;
    tbodyEle.innerHTML = "";
    const startIndex = pageNo * 2;

    const endIndex = pageNo * 2 + 2;
    populateTable(startIndex, endIndex);
  });
  return pageBtn;
});

// Next Button
const nextBtn = document.createElement("button");

nextBtn.innerText = "Next";

// Previous Button

const prevBtn = document.createElement("button");

prevBtn.innerText = "Prev";

const showNextSetOfData = (prev = false) => {
  if (prev && currPage > 0) currPage--;
  else if (!prev && currPage < 4) currPage++;
  else return;

  tbodyEle.innerHTML = "";

  const startIndex = currPage * 2;

  const endIndex = currPage * 2 + 2;
  populateTable(startIndex, endIndex);
};

//  Creating Action to Next Button using addEventListener
nextBtn.addEventListener("click", () => showNextSetOfData());

//  Creating Action to Previous Button using addEventListener

prevBtn.addEventListener("click", () => {
  showNextSetOfData(true);
});
btnsDiv.append(prevBtn, ...pageBtns, nextBtn);
mainDiv.append(btnsDiv);
