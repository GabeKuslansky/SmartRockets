const levelId = window.location.pathname.replace('/level/','');
let levelStructure = {};
const editing = false;
const createLevel = false;
axios.get(`/api/level/${levelId}`).then(levelObj => {
    levelStructure = levelObj.data.levelStructure;
    levelShouldLoad = true;
});