[![CodeQL](https://github.com/eGroupAI/egroup-material/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/eGroupAI/egroup-material/actions/workflows/codeql-analysis.yml)
[![codecov](https://codecov.io/gh/eGroupAI/egroup-material/branch/master/graph/badge.svg)](https://codecov.io/gh/eGroupAI/egroup-material)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=eGroupAI/egroup-material)](https://dependabot.com)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/eGroupAI/egroup-material.svg)](http://isitmaintained.com/project/eGroupAI/egroup-material "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/eGroupAI/egroup-material.svg)](http://isitmaintained.com/project/eGroupAI/egroup-material "Percentage of issues still open")

[Doc](https://egroup-material.s3.ap-northeast-1.amazonaws.com/storybook-static/index.html)

You'll need create self signed certificate for develop. 

Use openssl

```sh
mkdir certificate && cd certificate
openssl req -x509 -out certificate.crt -keyout privateKey.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Fields answer

1. TW
2. Taiwan
3. Taipei
4. eGroupAI
5. IT
6. egroupjob@gmail.com

---
If your OS is Windows , must run npm at the Disk C 
1. Create token with write permission on github
2. Command run "npm adduser"
3. Login your github account
4. run "npm login" 

---
# Development environment settings
## Development location
1. C slot
     1. Avoid package installation failure due to computer access permission issues
2. Installation kit version
     1. Nodejs
         1. Version 14.19.0
             1. Download link
     2. Yarn
         1. V 1.22.18 version
             1. Download link

---
## Github Login
1. Create Github Token
     - Enter Setting
![](https://paper-attachments.dropbox.com/s_43628FD980F095D4C51A392ADF9B1BC50549CB5E8C1A519677F0DEADADDEAD92_1653378581373_image.png)
    - Enter Developer settings
![](https://paper-attachments.dropbox.com/s_43628FD980F095D4C51A392ADF9B1BC50549CB5E8C1A519677F0DEADADDEAD92_1653378692899_image.png)
    - Click Personal access tokens
![](https://paper-attachments.dropbox.com/s_43628FD980F095D4C51A392ADF9B1BC50549CB5E8C1A519677F0DEADADDEAD92_1653378732930_image.png)
    - Permission
        1. Read
        2. Write:packages
![](https://paper-attachments.dropbox.com/s_43628FD980F095D4C51A392ADF9B1BC50549CB5E8C1A519677F0DEADADDEAD92_1653378787609_image.png)

2. Login Github
    ```sh
      npm login --scope=@eGroupAI --registry=https://npm.pkg.github.com
    ```
    - Account
        - Github account
    - Password
        - Token generated in the first step
    - Read Me https://github.com/eGroupTeam/frontend-templates/tree/main/egroup-starter

