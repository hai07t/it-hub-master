const userTimeZone =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

if (
  userTimeZone === "Asia/Ho_Chi_Minh" ||
  userTimeZone === "Asia/Saigon"
) {
  window.location.replace(
    "https://translate.google.com.vn/?sl=en&tl=vi&op=translate"
  );
} else {
  window.location.href = "app://game";
}
