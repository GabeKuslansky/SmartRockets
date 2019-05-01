const createLevel = true;
const saveLevel = async () => {
    if(level.target == null || level.spawnCoordinate == null)
        return;
   const levelStructure = level.serialize();
   $('#createLevelBtn').attr('disabled', 'disabled').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
   try {
       await axios.post(API.level, levelStructure);
       window.location.href = '/';
    } catch (error) {
        const httpStatusCode = error.toString().substring(39);
        console.log(httpStatusCode)
        if (['404', '405'].includes(httpStatusCode)) {
            window.location.href = '/';
        } else {
            alert(error);
        }
    }

}