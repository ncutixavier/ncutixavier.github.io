completeCallback(resultIndicator, sessionVersion) {
  var ref = this;
      ref.send(
          '/payresponse{"response":"1","message":"success","sessionversion":"' +
            sessionVersion.toString() +
            '"}'
        );
        $(".singleCard").remove();
        ref.showBotTyping();
}
