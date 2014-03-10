window.onload = function() {

  var $ = jQuery;
  var messages = [];
  var socket = io.connect('http://67.169.135.165:8888');
  var field = $("#field");
  var send_button = $("#send");
  var user_name = $("#user_name");
  var content = document.getElementById("content");
 
  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data.message);
      content.innerHTML += data.name + ': ' + data.message + "<br />";
      content.scrollTop = content.scrollHeight;
    } else {
      console.log("There is a problem:", data);
    }
  });
  var send_message = function(evt) {
    if(evt.charCode == undefined || evt.charCode == 13) {
      var text = field.val();
      var name = user_name.val();
      socket.emit('send', { message: text, name: name });
      field.val("");
    }
  }
  send_button.on('click', send_message);
  field.on('keypress', send_message);
}
