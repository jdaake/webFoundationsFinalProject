I'm having issues with this following block of code in my login.js file.

As it is, it functions how I would like it to. If no email or password is entered or it doesn't match from the users object, it displays an error message. Even though it technically works, I know it can't be the right way to do write it.

You suggested the return to break the loop and then using an else to display any error message if the 'if' statement wasn't met. However, when doing that it that way it displays the error box even with the right credentials. The function that generates the code is running so it's meeting the 'if' but it seems to invoke the 'else' anyway.

So this works:

$("#loginSubmit").on('click', (e) => {
event.preventDefault();
// Verify email address and password match a user
for (var i in USERS) {
if ($('#emailAddress').val() === USERS[i].email && $('#pass').val() === USERS[i].password) {
twoFactAuth();
return;
}
}
for (var i in USERS) {
if ($('#emailAddress').val() !== USERS[i].email && $('#pass').val() !== USERS[i].password) {
$('#loginBox').css('display', 'none');
$('#error').fadeIn(500).css('display', 'inherit');
}
}
});

This is what I would think it should be:

$("#loginSubmit").on('click', (e) => {
event.preventDefault();
// Verify email address and password match a user
for (var i in USERS) {
if ($('#emailAddress').val() === USERS[i].email && $('#pass').val() === USERS[i].password) {
twoFactAuth();
return;
} else {
$('#loginBox').css('display', 'none');
$('#error').fadeIn(500).css('display', 'inherit');
}
}
});

Any thoughts on what might be causing it to act this way?
