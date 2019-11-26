'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//First Page
Route.get('/', () => {
  return { 
    "Auth": "prefix['/Auth']",
    "[POST]Login" : "Auth/Login",
    "[POST]Refresh Token" : "Auth/refresh",
    "Users": "prefix['/Users']",
    "[GET]Tutti gli Utenti" : "Users/",
    "[GET]Mio Utente" : "Users/me",
    "[GET]Singolo Utente(admin o user with his ID)" : "Users/:id",
    "[POST]Crea Utente" : "Users/",
    "[PATCH]Update Utente" : "Users/:id",
    "[DELETE]Elimina Utente" : "Users/:id",
    "Roles": "prefix['/Roles']",
    "[GET]Tutti i Ruoli" : "Roles/",
    "[POST]Crea Ruolo" : "Roles/",
    "[DELETE]Elimina Ruolo" : "Roles/:id",

    "Groups": "----------",
    "[GET]Tutti i Gruppi" : "/Groups",
   }
})


//Login
Route.group(() => {
  //Effettua Login
  Route.post('/Login', 'AuthController.login')
  //Get Refresh Token
  Route.post('/refresh', 'AuthController.refresh')

  Route.post('/logout', 'AuthController.logout')
}).prefix('/Auth')

//Me User
Route.group(() => {
  //Get Me
  Route.get('/', 'AuthController.getUser')
  //Get Event
  Route.get('/events', 'AuthController.getEvents')
  //Get Categories
  Route.get('/categories', 'AuthController.getCategory')
  //Get locations
  Route.get('/locations', 'AuthController.getlocation')
  //Get groups
  Route.get('/groups', 'AuthController.getGroups')

}).prefix('/me').middleware('auth')

//User
Route.group(() => {
  //Get All User
  Route.get('/', 'UserController.getAll').middleware('userRouteAdminPrivate')
  //Create new User
  Route.post('/', 'UserController.create').validator('User').middleware('userRouteAdminPrivate')
  //Get User-Id
  Route.get('/:id', 'UserController.getById').middleware('userRouteDualPrivate')
  //Get User-Id Event
  Route.get('/:id/events', 'UserController.getEventsById').middleware('userRouteDualPrivate')
  //Get User-Id Categories
  Route.get('/:id/categories', 'UserController.getCategoriesById').middleware('userRouteDualPrivate')
  //Get User-Id Location
  Route.get('/:id/locations', 'UserController.getLocationById').middleware('userRouteDualPrivate')
  //Get User-Id Groups
  Route.get('/:id/groups', 'UserController.getGroupsById').middleware('userRouteDualPrivate')

  //Update User
  Route.patch('/:id', 'UserController.update').validator('UserUpdate').middleware('userRouteDualPrivate')
  //Delete User
  Route.delete('/:id', 'UserController.deleteById').middleware('userRouteDualPrivate')

}).prefix('/Users').middleware('auth')

//Categories
Route.group(() => {
  //Get All Categories
  Route.get('/', 'CategoryController.getAll').middleware('userRouteAdminPrivate')
  //Create Categories
  Route.post('/', 'CategoryController.create').validator('Category')
  //Get Categories-Id
  Route.get('/:id', 'CategoryController.getById').middleware('CategoriesRouteDualPrivate')
  //Delete Categories-Id
  Route.delete('/:id', 'CategoryController.deleteById').middleware('CategoriesRouteDualPrivate')
  //Patch Categories-Id
  Route.patch('/:id', 'CategoryController.updateById').middleware('CategoriesRouteDualPrivate')
  
  //Get Event on Category
  Route.get('/:id/events', 'CategoryController.getEvents').middleware('userRouteAdminPrivate')
}).prefix('/categories').middleware('auth')

//Roles
Route.group(() => {
  //Get All Roles
  Route.get('/', 'RoleController.getAll')
  //Create Roles
  Route.post('/', 'RoleController.create').validator('Role')
  //Get Roles By Id
  Route.get('/:id', 'RoleController.getById')
  //Delete Role
  Route.delete('/:id', 'RoleController.deleteById')
}).prefix('/Roles').middleware('auth','userRouteAdminPrivate')


//Events
Route.group(() => {
  //Get All Events
  Route.get('/', 'EventController.getAll')
  //Post Event
  Route.post('/', 'EventController.create').validator('Event')
  //Patch Event
  Route.patch('/:id', 'EventController.update').middleware('userRouteDualPrivate')
  //Post User Event
  Route.post('/:id/partecipants', 'EventPartecipantController.addById')
  //Delete User Event
  Route.delete('/:id/partecipants', 'EventPartecipantController.deleteUsersById')
  //Get Event By Id
  Route.get('/:id', 'EventController.getById').middleware('EventsRouteDualPrivate')
}).prefix('/Events').middleware('auth')


//Groups
Route.group(() => {
  //Get All Groups
  Route.get('/', 'GroupController.getAll').middleware('userRouteAdminPrivate')
  //Create Group
  Route.post("/",'GroupController.create').validator('Group').middleware('userRouteAdminPrivate')
  //Update Group by Id
  Route.patch("/:id", 'GroupController.update').validator('Group').middleware('userRouteAdminPrivate')|
  //Get Groups By Id
  Route.get('/:id', 'GroupController.getById').middleware('GroupsRouteDualPrivate')
  //Delete Groups By Id
  Route.delete('/:id', 'GroupController.deleteById').middleware('userRouteAdminPrivate')
  //Get get member By Id
  Route.post('/:id/member', 'UserGroupController.addById').middleware('GroupsRouteDualPrivate')
  //Put/remove Manager Group By Id
  Route.patch('/:id/member', 'UserGroupController.modifyManagerById').middleware('userRouteAdminPrivate')
  //Delete User inside Group By Id
  Route.delete('/:id/member', 'UserGroupController.deleteUserById').middleware('GroupsRouteDualPrivate')
  

}).prefix('/groups').middleware('auth')


//locations
Route.group(() => {
  //Get All Locations
  Route.get('/', 'LocationController.getAll').middleware('userRouteAdminPrivate')
  //Get Location-Id
  Route.get('/:id', 'LocationController.getId').middleware('LocationRouteDualPrivate')
  //Create Location
  Route.post('/', 'LocationController.create').validator('Location').middleware('userRouteAdminPrivate')
  
  //Update Location
  Route.patch('/:id', 'LocationController.update').validator('LocationUpdate').middleware('userRouteAdminPrivate')
  //Delete Location
  Route.delete('/:id', 'LocationController.delete').middleware('userRouteAdminPrivate')

  //Add Location Private
  Route.post('/:id/users', 'UserLocationController.addPrivate').middleware('userRouteAdminPrivate')
  //Remove Location Private
  Route.delete('/:id/users', 'UserLocationController.removePrivate').middleware('userRouteAdminPrivate')

  //Get Event On Location
  Route.get('/:id/events', 'LocationController.getEvents').middleware('userRouteAdminPrivate')
}).prefix('/locations').middleware('auth')