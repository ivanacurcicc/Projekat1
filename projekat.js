const button = document.getElementById('submit')
let prihodi = [];
let rashodi = [];

button.addEventListener('click', (e) => {
    e.preventDefault()
    const select = document.getElementById('prihod/rashod').value;
    const opisTransakcije = document.getElementById('opis').value;
    const iznosTransakcije = document.getElementById('iznos').value;

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

    let suma = 0;

    prihodi.forEach(el => {
        suma += el.iznos;
    });

    const lista = document.getElementById('RA')
    lista.replaceChildren();
    lista.textContent = "Rashodi";

    rashodi.forEach(el => {
        el.procenat = (el.iznos / suma) * 100;
        dodajUListu('RA', el, rashodi);
    });

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



