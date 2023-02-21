# Getting Started with CoinTab Portal


## Featues of this Portal


## `Login Page`
- User Can `login` with Their Registered email and password
- If user provide Valid email and password, system will allow them and they redirected to the `User Management Page`
- If a User Provide Wrong Credentials they will see `error`
- If they provide `Wrong Credentials` at most `5 Times`, system will `block` them for `24 hours`

## `User Management Page`
- First of all, only Authorized user (if their email and password match with database) can access the `Users Management Page`
### To Restrict this page from `unauthorized` user I implement `LocalStorage` based Login System
- If email and password `Match` with our `Database` system will save them to the localStorage, so that we can `Access` and `valided` if the user is `logged In` or not
- If user is logged in they will see `User Mangement Page` otherwise they will see `You are not authorized` Message.
- In the Management page I am showing `All Registered User` in a Table, in some colomn `Name`, `Email`, `Password` and 2 `Action Button`
### `On top` of of Users Table, I have add a `Form`, which is by default `Collapsed` when click on `Add User` button form will `Expand` 
- There is total `3 (Three)` input field, I could add an extra input for `Confirm Password` but I thought I will make the UI `Messy`
### Validation while adding new user
- If someone input a `Email` which is already `Exists` in our database, system will `Not Allow` to add user and Show `Error Message`, that means email should be `Unique`
- If someone try to `Add User` by `Skipping` any of the `Three` Field system will `Not Allow` to add and `Show Error Message`
- If User Doesn't `Exists` in our `Database` and all input are provied `System` will create `New User`
- After Successfully `Created` New user, don't need to `Reload` to see `Updated List`, system will auto `Fetch` the data, this will give Nice `SPA Experience`

## `Delete a Specific User`
- `Authorized` and `Logged In` user can delete a user from the table on `Users Management Page`
- For Deleting user have to click on `Delete` icon on the left side of the table
- When click on delete icon `System` will show and `Confirmation` Popup, and if user select `Yes` system will `Delete` selected user otherwise `Not`
- As Before after delete No need to `Reload`, cause system will `Refetch` data automatically

## `Update a Specific User`
- When need to `Update` a specific user, logged In user can do it easily but clicking `Update Icon` button
- If click on `Update Icon` system will redirect to `Update User` Page and Show the Related user
- Only `Name` and `Password` is updatable, `Email` in the Update page is Readonly.
#### - If User will try to leave `Name` or `Password` field `Empty` system will `Not Allow` to update and show an `Error Message`
- If all okay, system will update the user and `Redirect` to `User Magement` Page

### Thank you
