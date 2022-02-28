<?php
    require_once './Model/CarritoModel.php';
    require_once './View/ApiView.php';
    class ApiControllerCarrito{
        private $model;
        private $view;
        function __construct(){
            $this->model = new CarritoModel();
            $this->view = new ApiView();
        }

        function getAutosDelCarrito($params = null){
            $autos = $this->model->getAutosDelCarrito();
            return $this->view->response($autos, 200);
        }

        function getAutoDelCarrito($params = null){
            $idAuto = $params[":ID"];
            $auto = $this->model->getAutoDelCarrito($idAuto);
            if($auto){
                return $this->view->response($auto, 200);
            }else{
                return $this->view->response("El automovil ($idAuto) no se encuentra en el carrito", 404);
            }
        }

        function deleteAutoDelCarrito($params = null){
            $idAuto = $params[":ID"];
            $auto = $this->model->getAutoDelCarrito($idAuto);

            if($auto){
                $auto = $this->model->deleteAutoDelCarrito($idAuto);
                return $this->view->response("El auto ($idAuto) fue eliminado", 200);
            }else{
                return $this->view->response("El auto ($idAuto) no fue encontrado", 404);
            }
        }

        function addAutoAlCarrito($params = null){
            $body = $this->getBody();

            $id = $this->model->addAutoAlCarrito($body->Modelo, $body->Pais_de_origen, $body->Precio, $body->Id_auto_fk);
            if($id != 0){
                $this->view->response("La tarea se inserto con el id=$id", 201);
            }else{
                $this->view->response("La tarea no se pudo insertar", 500);
            }
    }

        private function getBody(){
            $bodyString = file_get_contents("php://input");
            return json_decode($bodyString);
        }

    }