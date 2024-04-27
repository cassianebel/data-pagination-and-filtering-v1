/*
Cassia Nebel's
FSJS Project 2 - Data Pagination and Filtering
*/

// set the number of students to be displayed on a page
let itemsPerPage = 9;

/**
 * Takes a list of students and a page number.
 * Creates and places the html to display
 * the given number (itemsPerPage) of students.
 * Students are displayed from the list based on the page number.
 * 
 * @param {array} list - An array of student objects.
 * @param {number} page - A number representing which page of results you want.
 */
function showPage(list, page) {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;
  let studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      let studentHTML = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>`;
      studentList.insertAdjacentHTML('beforeend', studentHTML);
    }
  }
}


/**
 * Creates the html for pagination buttons,
 * and inserts them onto the page,
 * and give the current page's button an active class.
 * 
 * @param {array} list - An array of student objects.
 */
function addPagination(list) {
  let numberOfPages = Math.ceil(list.length / itemsPerPage);
  let linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';

  for (let i = 1; i <= numberOfPages; i++) {
    let buttonHTML = `
      <li>
        <button type="button">${i}</button>
      </li>`;
    linkList.insertAdjacentHTML('beforeend', buttonHTML);
  }

  linkList.querySelector('button').classList.add('active');

  linkList.addEventListener('click', (e) => {
    let buttonClicked = e.target.closest('button');
    if (buttonClicked) {
      linkList.querySelector('.active').classList.remove('active');
      buttonClicked.classList.add('active');
      showPage(list, buttonClicked.innerHTML);
    }
  });

}



/**
 * Call functions to display the initial page of students
 * and the pagination buttons.
 */ 
showPage(data, 1);
addPagination(data);