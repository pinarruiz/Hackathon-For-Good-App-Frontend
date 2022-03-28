# Hackathon for Good: AWS y Intel

## Autores
Alejandro Pinar

Arturo Pinar

Alberto Jimenez

## Introducción
Hackathon for Good es un proyecto diseñado para elaborar una solución utilizando servicios de Amazon Web Services (AWS) y Intel para mejorar la sociedad. Para este proyecto nos hemos centrado en el campo del medio ambiente. 

Actualmente, una de las acciones más significativas en la disminuición de la contaminación global es el reciclaje. El reciclaje supone un ahorro de energía, recursos naturales y contaminación razones por las cuales cada vez adquiere mayor importancia en numerosos países. Sin embargo, a pesar de los esfuerzos de concienciación del gobierno, el desconocimiento de los contenedores adecuados para reciclar, impulsa a numerosas personas a no reciclar o a hacerlo de manera incorrecta. 

Para solucionar este problema, la Comunidad de Madrid ofrece un dataset de libre acceso en el que recopila una muestra de distintos tipos de contenedores en la ciudad con sus ubicaciones expresadas en coordenadas. 

Nuestra aplicación se basa en proveer de un medio a esas personas que desconocen en que tipo de contenedor reciclar un residuo que les indique la ubicación del tipo de contenedor adecuado más cercano a su posición para el residuo que necesitan reciclar. El caso de uso sería el siguiente: 
1. El usuario accede a una aplicacion web (a través del movil) donde tiene la opción de enviar una foto de un residuo que desconoce como reciclar. 
2. La aplicacion analiza la foto y obtiene a través del Machine Learning el tipo de contenedor adecuado para ese residuo. 
3. Posteriormente la aplicación cruza el tipo de contenedor adecuado con la posición de todos los contenedores de ese respectivo tipo mostrando al usuario en un mapa la ubicación exacta del contenedor buscado. 

El caso de uso descrito puede verse con mayor detalle en la siguiente imagen: 


![image](https://user-images.githubusercontent.com/23140351/160389762-3a07e114-eb1c-4b57-9b08-3087837518ea.png)


Nuestra aplicación está desarrollada de una manera modular en la cual cada modulo ofrece un servicio distinto que puede ser integrado con los otros modulos. Para esta solucion hemos desarrollado los siguientes modulos: Frontend, Machine Learning Model y Backend. 

Cada uno de los módulos se encuentra integrado en un repositorio distinto facilitando su desarrollo en paralelo. 

1. El módulo "Frontend" se encuentra alojado en https://github.com/pinarruiz/Hackathon-For-Good-App-Frontend. 
2. El módulo "Machine Learning Model" se encuentra alojado en https://github.com/ArturoPinar/MLModelHackathonAWSIntel. 
3. El módulo "Backend" se encuentra alojado en https://github.com/pinarruiz/Hackathon-For-Good-App-Backend. 

## Datasets

Los datasets utilizados para esta solución han sido los siguientes: 

### Dataset 1

Se trata de un fichero CSV que contiene una muestra de miles de contenedores de reciclaje repartidos por la ciudad de Madrid. Es un conjunto de datos abiertos que puede ser descargado desde la web de la Comunidad de Madrid en https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=38ed95bac1ba6610VgnVCM1000001d4a900aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default. Sin embargo, con el fin de poder utilizarlo para nuestra solución hemos realizado una serie de modificaciones (explicadas con más detalle en el capítulo "Machine Learning Model") y el dataset modificado que hemos utilizado puede ser descargado desde el siguiente enlace: https://www.dropbox.com/s/ytiunf665tux2rc/dataset1_final.csv. El proceso de modificaciones y el código desarrollado para ello puede ser encontrado en el siguiente enlace: https://github.com/ArturoPinar/MLModelHackathonAWSIntel/blob/main/DataPreparation/preprocessDataset1.ipynb

### Dataset 2

Está compuesto por distintas imágenes de residuos y basura general recopiladas a través de los siguientes enlaces: 
- https://github.com/garythung/trashnet
- https://www.kaggle.com/techsash/waste-classification-data

Las imagenes extraídas de los dos enlaces anteriores han sido clasificadas en carpetas correspondiendo a las distintas clases de contenedores: 
- Clase 1 (representada por el numero 1): Envases. 
- Clase 2 (representada por el numero 2): Vidrio. 
- Clase 3: (representada por el numero 3): Resto. 
- Clase 4: (representada por el numero 4): Organica.
- Clase 5: (representada por el numero 5): Papel-carton. 

Otro de los problemas presentado por este dataset es el desequilibrio. Un dataset esta desequilibrado cuando presenta grandes diferencias entre el número de ejemplos (imagenes en este caso) que hay de cada clase. Este problema puede llevar a lo que se conoce como overfitting en el modelo que no aprende a generalizar para nuevos casos. Tras generar el dataset descrito el número de imágenes por clase fue el siguiente: 

- Clase 1 = 803 imágenes. 
- Clase 2  = 451 imágenes. 
- Clase 3 = 137 imágenes. 
- Clase 4 = 592 imágenes.
- Clase 5 = 897 imágenes. 

 Una posible solución a este problema es lo que se conoce como Data Augmentation, una técnica que permite aumentar el número de imágenes de las clases deseadas mediante transformaciones como cambios de color, tamaño, orientacion, etc sobre las originales. Nuestro notebook para realizar Data Augmentation se puede descargar del siguente enlace: https://github.com/ArturoPinar/MLModelHackathonAWSIntel/blob/main/DataPreparation/aws-and-intel-hackathon-data-augmentation.ipynb
 
En nuestro caso tras realizar Data Augmentation generamos dos datasets utilizados en el modelo: 
- Una version reducida de aproximadamente 200 imagenes por clase. Disponible en https://www.dropbox.com/s/evm0ts2obk7n3cb/dataset_reduced.zip
- Una version aumentada de aproximadamente 1000 imagenes por clase.



## Frontend

El Frontend, cuyo código se encuentra en este repositorio, es el encargado del primer paso en el caso de uso descrito en la sección anterior. Su objetivo es proporcionar al usuario una interfaz en la cual pueda hacer una foto del residuo que no sabe como reciclar. La siguiente foto muestra la interfaz desplegada por el frontend: 

![image](https://user-images.githubusercontent.com/23140351/160395323-009fe735-da32-41a8-8f00-c56c239ad37a.png)

La implementación del Frontend se ha basado en el uso de estáticos utilizando el servicio Amazon S3. Nuestra elección de este servicio se basa en que los fines para los que más se utiliza son sitios concretos en linea, aplicaciones para el telefono movil, analisis de Big Data, etc debido a eso como el Frontend se basa en una aplicacion web hemos considerado que el mejor servicio para desarrollarlo era Amazon S3. 

## Modelo de Machine Learning

Una vez capturada la imagen del residuo por el usuario a través del Frontend, esta es enviada a un modelo de Machine Learning encargado de clasificar la imagen en uno de los tipos de contenedores descritos arriba. El modelo de Machine Learning se basa en dos fases: Entrenamiento y Despliegue. 

### Entrenamiento
El objetivo del entrenamiento es permitir al modelo aprender como clasificar imagenes que no ha visto en las distintas clases descritas arriba. El código desarrollado para ello se encuentra en https://github.com/ArturoPinar/MLModelHackathonAWSIntel/blob/main/MLModel/awsIntelHackathonModelTraining.ipynb. Debido a falta de tiempo, el notebook referenciado no se encuentra funcional y para poder serlo necesita ser ampliado en futuros desarrollos. 

Para el entrenamiento hemos utilizado Amazon Sagemaker ya que nos aporta un entorno basado en Jupyter Notebooks y óptimo para el desarrollo del modelo. Además, la instancia utilizada para el entrenamiento ha sido Amazon EC2 ml.m4.xlarge ya que ofrece una capa gratuita de 150 horas. Además ofrece un HW de Intel basado en procesadores Intel Xeon E5-2686 o Intel Xeon E5-2676 lo que nos ha proporcionado alta velocidad entrenando el modelo (5 epochs = 20 minutos). 

### Despliegue

Una vez entrenado el model se puede desplegar para responder a peticiones de predicción en tiempo real. De esta forma la idea era tener desplegado el modelo en una instancia a la que le llegaría una imagen del Frontend y el modelo devolvería el número de la clase correspondiente. Sin embargo, por falta del tiempo tampoco hemos podido realizar este paso. Esta funcionalidad puede ser considerada para futuros desarrollos. 


## Backend

El Backend, cuyo código se encuentra en el repositorio https://github.com/pinarruiz/Hackathon-For-Good-App-Backend, proporciona el punto de comunicación y procesamiento entre la imágen del Frontend y la clase devuelta por el modelo de Machine Learning. Tras recibir la respuesta del modelo, se ocupa de buscar el tipo de contenedor más cercano a la posición del usuario en el dataset 1. 

El backend esta desplegado en un contenedor EC2 bajo un elastic load balancer. El frontend y el backend estan bajo un Cloudfront. 


## Aplicación funcional y futuro desarrollo

El principal problema encontrado en el proyecto ha sido la falta del tiempo. El hackathon ha estado comprendido en una franja de tiempo de una semana en la cual todos los miembros del equipo hemos tenido otras obligaciones y compromisos que no nos han permitido dedicación completa al proyecto. 

Por este motivo no podemos presentar la solución completa descrita arriba. La solución presentada se describe en la siguiente imagen. 

![image](https://user-images.githubusercontent.com/23140351/160404687-174fe574-401d-484f-8cc3-01e0062fa76d.png)

En la imagen se muestran las distintas interacciones entre los módulos y servicios diseñados para la aplicación. Las flechas en negro muestran las interacciones implementadas y las flechas en rojo las interacciones diseñadas en un primer momento pero que por falta de tiempo no han podido ser implementadas. 

En resumen, un usuario puede subir una imagen a través del Frontend, a continuación la aplicacion mostrará al usuario el contenedor más cercano a su posición (pero no tiene porque ser el contenedor adecuado). Por otro lado, el modelo implementado permite ser entrenado. Como futuro desarrollo hará falta conectar el backend para que envíe al modelo desplegado la imagen indicada por el usuario, prediga el tipo de contenedor adecuado, y con la parte ya implementada actualmente, se localize el contenedor mas cercano del tipo indicado. 

La aplicacion funcional puede ser vista en el siguiente video: 
<link del video>

## Como ejecutar la aplicacion
1. En cualquier telefono movil abrir un navegador y acceder a la URL https://trashmap.apinar.es
2. Hacer una foto pulsando el botón de capturar. 
3. Se mostrará un mapa con el contenedor más cercano en un icono rojo y la ubicación del usuario en azul. Pinchando en el icono rojo aparecen las coordenadas para poder ser buscado en Google Maps. 

Como la aplicación no es completamente funcional (a falta de la conexión con el modelo de Machine Learning) se muestra como ejemplo el contenedor de papel y cartón más cercano al usuario. 
