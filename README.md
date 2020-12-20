# repo-12Dec20
.net 5 angular project -- update the backend with nodeJs

# create solution
**> dotnet new sln --name ac-repo**


### dotnet new webapi --name ac.api
### dotnet new xunit --name ac.test

# add projects to sln
### >_ dotnet sln ac-repo.sln add ./ac.api/ac.api.csproj ./ac.test/ac.test.csproj

### >_ dotnet sln ac-repo.sln list
```
Project(s)
----------
ac.api/ac.api.csproj
ac.test/ac.test.csproj
```
### trust cert for the first time
dotnet dev-certs https --trust
