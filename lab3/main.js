document.addEventListener("keypress", nacisniecieKlawisza);

function nacisniecieKlawisza(zdarzenie) {
  switch (zdarzenie.key) {
    case "1":
      dzwiek = "boom";
      break;
    case "2":
      dzwiek = "clap";
      break;
    case "3":
      dzwiek = "hihat";
      break;
    case "4":
      dzwiek = "kick";
      break;a
    case "5":
      dzwiek = "openhat";
      break;
    case "6":
      dzwiek = "ride";
      break;
    case "7":
      dzwiek = "snare";
      break;
    case "8":
      dzwiek = "tink";
      break;
    case "9":
      dzwiek = "tom";
      break;
    default:
      return;
  }
  odtworzDzwiek(dzwiek);
}

function odtworzDzwiek(dzwiek) {
  const audioTag = document.querySelector(`#${dzwiek}`);
  audioTag.currentTime = 0;
  audioTag.play();
}