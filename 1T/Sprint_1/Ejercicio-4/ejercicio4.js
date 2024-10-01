function dinamicstyle() {
    let div1 = document.getElementById('div1');
    let div2 = document.getElementById('div2');

    div1.addEventListener('mouseover', function() {
        div1.style.backgroundColor = 'blue';
    });
    div1.addEventListener('mouseout', function() {
        div1.style.backgroundColor = 'white';
    });

    div2.addEventListener('mouseover', function() {
        div2.style.backgroundColor = 'blue';
    });
    div2.addEventListener('mouseout', function() {
        div2.style.backgroundColor = 'white';
    });
}
dinamicstyle();