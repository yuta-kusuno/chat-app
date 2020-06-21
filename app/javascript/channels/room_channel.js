import consumer from "./consumer"

// $(function() {}; で囲んでレンダリング後に実行
// レンダリング前に実行されると $('#messages').data('room_id') が取得できない
$(function () {
  const chatChannel = consumer.subscriptions.create({ channel: "RoomChannel", room: $('#messages').data('room_id')}, {
    connected() {
      // Called when the subscription is ready for use on the server
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received: function(data) {
      // Called when there's incoming data on the websocket for this channel
      return $('#messages').append(data['message']);
    },
  
    speak: function(message) {
      return this.perform('speak', {
        message: message
      });
    }
  });
  $(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
    if (event.keyCode === 13) {
      chatChannel.speak(event.target.value);
      event.target.value = '';
      // eventにはenterが入る。speakに引数を渡したらeventをキャンセル。なぜ？
      return event.preventDefault();
    }
  });
});
