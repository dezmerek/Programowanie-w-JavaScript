const liczba1 = document.querySelector('#liczba1')
 const liczba2 = document.querySelector('#liczba2')
 const liczba3 = document.querySelector('#liczba3')
 const liczba4 = document.querySelector('#liczba4')

 const przeliczBtn = document.querySelector('#przelicz')

 const wynikSuma = document.querySelector(`#suma`);
 const wynikAvg=document.querySelector(`#srednia`);
 const wynikMin=document.querySelector(`#min`);
 const wynikMax=document.querySelector(`#max`);

 przeliczBtn.addEventListener('click', ()=> {
     sumaWynik.innerHTML = (+liczba1.value+ +liczba2.value+ +liczba3.value+ +liczba4.value);

     // console.log(`Wynik dodawania: ${sum}`)
     // console.log(`Wynik srednia: ${avg}`)
     // console.log(`Wynik min: ${min}`)
     // console.log(`Wynik max: ${max}`)
 })
 //Math.min(), .max()