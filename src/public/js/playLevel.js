const levelId = window.location.pathname.replace('/level/','');
let levelStructure = {};
const editing = false;
axios.get(`/api/level/${levelId}`).then(levelObj  => {
    levelStructure = levelObj.data.levelStructure;
    //level.initLevel(levelObj.data.levelStructure);
});