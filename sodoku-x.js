const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (userTimeZone === "Asia/Ho_Chi_Minh" || userTimeZone === "Asia/Saigon") {
  var to = "https://translate.google.com.vn/?sl=en&tl=vi&op=translate";
  window.location.href = to;
}
