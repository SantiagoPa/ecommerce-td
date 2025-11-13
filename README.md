# Ecommerce TD



## Setup
1. clonar repositorio: `git clone https://github.com/SantiagoPa/ecommerce-td.git`
2. instalar dependencias: `npm install`
3. copiar `.env.example` y renombralo `.env` y generar los CLIENT_SECRET y CLIENT_ID para google y github
4. Configurar Secretos en la consola de google y las configuraciones de github (CLIENT_SECRET, SECRET_ID), tanto para google como para github y establecer las siguientes URL de Callback.
    - Google Cloud Console
        - Authorized redirect URIs: http://localhost:3000/api/auth/google
    - GitHub OAuth Apps
        - Authorization callback URL: http://localhost:3000/api/auth/github
5. run develop mode: `npm run dev`
6. run develop clean mode: `npm run dev:clean`
7. run preview mode: `npm run build && npm run preview`


## preview app

1. Pagina de inicio `("/")`
![page-index](/assests/imgs/page-index.png)

2. Pagina de inicio `("/")`, productos en el carrito
![page-index](/assests/imgs/page-cart.png)

3. Pagina de detaller del producto `("/product/:id")` 
![page-index](/assests/imgs/page-id-product.png)

4. Pagina de detaller del producto `("/product/:id")` , prodcutos en carrito
![page-index](/assests/imgs/page-id-cart.png)

2. Pagina de inicio `("/")`, con inicio de Sesion
![page-index](/assests/imgs/page-session.png)

2. Pagina de detalle del producto `("/product/:id")`, productos en el carrito e inicio de sesion
![page-index](/assests/imgs/page-session-id.png)

