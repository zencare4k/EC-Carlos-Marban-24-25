function addlist() {
    const newelement = document.getElementById("addlist").value;

    if (newelement == "") {
        alert("Escriba algo en el cuadro de texto makinon");
        return;
    }

    const newLi = document.createElement("li");

    newLi.textcontent = newelement

    document.getElementById("addlist")


}