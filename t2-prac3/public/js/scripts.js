const cardList = [
{
title: "Book 2",
image: "images/book2.jpg",
link: "About Book 2",
desciption: "Demo desciption about Book 2"
},
{
title: "Book 3",
image: "images/book3.jpg",
link: "About Book 3",
desciption: "Demo desciption about Book 3"
}
]
const clickMe = () => {
alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function(){
$('.materialboxed').materialbox();
$('#clickMeButton').click(()=>{
clickMe();
})
});
const submitForm = () => {
let formData = {};
formData.first_name = $('#first_name').val();
formData.last_name = $('#last_name').val();
formData.password = $('#password').val();
formData.email = $('#email').val();
console.log("Form Data Submitted: ", formData);
}
const addCards = (items) => {
items.forEach(item => {
let itemToAppend = '<div class="col s4 center-align">'+
'<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
'</div><div class="card-content">'+
'<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
'<div class="card-reveal">'+
'<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
'<p class="card-text">'+item.desciption+'</p>'+
'</div></div></div>';
$("#card-section").append(itemToAppend)
});
}
$(document).ready(function(){
$('.materialboxed').materialbox();
$('#formSubmit').click(()=>{
submitForm();
})
addCards(cardList);
$('.modal').modal();
});


