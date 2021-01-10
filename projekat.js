const button = document.getElementById('submit')
let prihodi = [];
let rashodi = [];

button.addEventListener('click', (e) => {
    e.preventDefault()
    const select = document.getElementById('prihod/rashod').value;
    const opisTransakcije = document.getElementById('opis').value;
    const iznosTransakcije = document.getElementById('iznos').valueAsNumber;

    if (select == 'prihod') {
        const prihod = {
            opis: opisTransakcije,
            iznos: iznosTransakcije
        };
        prihodi.push(prihod);
        dodajUListu('PR', prihod, prihodi);
    }
    else {
        const rashod = {
            opis: opisTransakcije,
            iznos: iznosTransakcije,
            procenat: 0
        };
        rashodi.push(rashod);
    }

    let ukupniPrihodi = 0;

    prihodi.forEach(el => {
        ukupniPrihodi += el.iznos;
    });

    const lista = document.getElementById('RA')
    lista.replaceChildren();
    lista.textContent = "Rashodi";

    let ukupniRashodi = 0;

    rashodi.forEach(el => {
        ukupniRashodi += el.iznos;
        el.procenat = (el.iznos / ukupniPrihodi) * 100;
        dodajUListu('RA', el, rashodi);
    });
    let razlika = ukupniPrihodi - ukupniRashodi;

    console.log(ukupniPrihodi)
    document.getElementById('ukupnaSuma').innerHTML = `Bilans: ${razlika}`;
    document.getElementById('ukupniPrihodi').innerHTML = `Ukupni prihodi: ${ukupniPrihodi}`;
    document.getElementById('ukupniRashodi').innerHTML = `Ukupni rashodi: ${ukupniRashodi}`;

})

function dodajUListu(idListe, transakcija, niz) {
    const lista = document.getElementById(idListe);
    const linija = document.createElement('li');
    linija.className = 'linija';
    const procenat = transakcija.procenat ? " " + transakcija.procenat + '%' : '';
    linija.textContent = transakcija.opis + ' ' + transakcija.iznos + procenat;

    const btnDelete = document.createElement('button');
    btnDelete.className = 'delete';
    btnDelete.innerHTML = "delete";

    btnDelete.addEventListener('click', (e) => {
        linija.remove();
        niz.splice(niz.indexOf(transakcija), 1);

    });

    linija.append(btnDelete);
    lista.append(linija);

}



