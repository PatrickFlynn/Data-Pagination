/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Patrick Flynn
*/

const student_list = document.querySelector('ul.student-list');
const link_list = document.querySelector('ul.link-list')

function create_student (student_object) {
   //Create elements
   let li = document.createElement('li');
   let div_details = document.createElement('div');
   let div_joined = document.createElement('div');
   let img_avatar = document.createElement('img');
   let h3 = document.createElement('h3');
   let span_email = document.createElement('span');
   let span_joined = document.createElement('span');

   //Add attributes
   li.className = 'student-item cf';
   div_details.className = 'student-details';
   img_avatar.className = 'avatar';
   img_avatar.src = student_object.picture.large;
   img_avatar.alt = 'Profile Picture'
   h3.textContent = student_object.name.first + ' ' + student_object.name.last;
   span_email.className = "email";
   span_email.textContent = student_object.email;
   div_joined.className = 'joined-details';
   span_joined.className = 'date';
   span_joined.textContent = 'Joined ' + student_object.registered.date
   div_details.appendChild(img_avatar);
   div_details.appendChild(h3);
   div_details.appendChild(span_email);
   div_joined.appendChild(span_joined);
   li.appendChild(div_details);
   li.appendChild(div_joined);

   return li;

}

function showPage(list, page, items_per_page = 9){

   //if student list already has children, clear them
   if (student_list.children.length > 0){
      student_list.innerHTML = ''
   }

   start_index = (page * items_per_page) - items_per_page
   end_index = page * items_per_page

   //if is last page, set end index to length of data instead
   if (page === Math.ceil(list.length/items_per_page)){
      end_index = list.length;
   }

   //create each LI for each student within bounds
   for (let i = start_index; i < end_index; i++){
      student_list.appendChild(create_student(data[i]))
   }

   //if link list already has children, clear them
   if (link_list.children.length > 0){
      link_list.innerHTML = ''
   }

   for (let j = 1; j <= Math.ceil(list.length/items_per_page); j++){

      link_list.appendChild(addPagination(j, page));

   }
   
};



function addPagination(page_number, currentPage){

   let pag_li = document.createElement('li');
   let li_but = document.createElement('button');
   li_but.type = 'button';
   li_but.textContent = page_number
   if (page_number === currentPage){
      li_but.className = 'active';
   };

   pag_li.appendChild(li_but);
   return pag_li;

};


// Call functions
showPage(data, 1);

link_list.addEventListener('click', (e) => {
   //ensure each item generating click event is a button
   if (e.target.tagName === 'BUTTON'){
      showPage(data, parseInt(e.target.textContent));
      e.target.className = 'Active';
   };
})