let target = null;
let current = 'A';

window.onload = function () {
    alert('Turm auswählen und danach auf Move drücken um die Scheiben zu verschieben.');

    document.getElementById('A').onclick = function () {
        document.getElementById('A').style.backgroundColor = '#9f9f9f';
        document.getElementById('B').style.backgroundColor = '#e5e5e5';
        document.getElementById('C').style.backgroundColor = '#e5e5e5';
        target = document.getElementById('A');
        document.getElementById('target').innerHTML = 'Turm A';
        document.getElementById('button').disabled = false;
    }

    document.getElementById('B').onclick = function () {
        document.getElementById('A').style.backgroundColor = '#e5e5e5';
        document.getElementById('B').style.backgroundColor = '#9f9f9f';
        document.getElementById('C').style.backgroundColor = '#e5e5e5';
        target = document.getElementById('B');
        document.getElementById('target').innerHTML = target;
        document.getElementById('target').innerHTML = 'Turm B';
        document.getElementById('button').disabled = false;
    }

    document.getElementById('C').onclick = function () {
        document.getElementById('A').style.backgroundColor = '#e5e5e5';
        document.getElementById('B').style.backgroundColor = '#e5e5e5';
        document.getElementById('C').style.backgroundColor = '#9f9f9f';
        target = document.getElementById('C');
        console.log(target)
        document.getElementById('target').innerHTML = 'Turm C';
        document.getElementById('button').disabled = false;
    }


    document.getElementById('button').onclick = async function () {
        if (target.id ==  current) {
            alert('Bitte wähle einen anderen Turm aus. Das ist der gleiche Turm.');
            return;
        }

        document.getElementById('button').disabled = true;
        document.getElementById('button-title').innerHTML = 'Wurde gestartet...';
        console.log('Move disk from tower ' + current + ' to tower ' + target.id);
        await move(5, '#' + current, '#' + target.id, ['#A', '#B', '#C'].filter(x => x !== '#' + current && x !== '#' + target.id)[0]);
        current = target.id;
        document.getElementById('button-title').innerHTML = 'Starten';
        document.getElementById('button').disabled = false;
    }
}

async function move(n, source, target, auxiliary) {
    await sleep(300);
    if (n > 0) {
        await move(n - 1, source, auxiliary, target);
        $(`#ring-${n}`).prependTo(target);
        console.log('Move disk from tower ' + source + ' to tower ' + target);
        await move(n - 1, auxiliary, target, source);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
