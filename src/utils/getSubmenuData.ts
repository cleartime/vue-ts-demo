/* tslint:disable */

let _routes:any = {};
const findMenu:any = (routes:any, path:any  ) => {
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
const _getSubmenuData:any = ( name:any ,menu:any , isChinarailway:any, isNew:any ) => {
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
