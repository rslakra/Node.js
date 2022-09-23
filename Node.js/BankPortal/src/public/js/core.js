/**
 * Select the menuitem.
 * 
 * @param {*} divName 
 * @param {*} itemName 
 */
function selectMenuIem(divName, itemName) {
    var index;
    var divElement = document.getElementsByClassName(divName);
    for (index = 0; index < divElement.length; index++) {
        divElement[index].style.display = "none";
    }
    document.getElementById(itemName).style.display = "block";
}


