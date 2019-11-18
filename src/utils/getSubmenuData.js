/*
*@lll
*/

let _routes = {};
const findMenu = (routes, path  ) => {
  for ( let i= 0; i<routes.length; i++ ){
    if ( routes[i].path ) {
      _routes[routes[i].path] = routes[i];
    }else {
      if ( routes[i].children && routes[i].children.length ){
        findMenu( routes[i].children );
      }
    }
  }
};
const _getSubmenuData = ( name ,menu , isChinarailway, isNew ) => {
  if ( !isChinarailway ) return [];
  let path = location.href.split('?')[0].split('#')[1];
  let _re = null;
  if ( isNew  ){
    findMenu(menu);
  }else {
    if ( !Object.keys(_routes).length ) {
      findMenu(menu);
    }
  }
  if ( _routes [path] ) return [_routes [path]];
  return [{title:'',path:''}];
}
export default _getSubmenuData;
