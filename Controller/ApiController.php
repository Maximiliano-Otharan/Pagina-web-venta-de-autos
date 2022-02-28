<?php
    require_once './Model/AutosModel.php';
    require_once './View/ApiView.php';
    class ApiController{
        private $model;
        private $view;
        function __construct(){
            $this->model = new AutosModel();
            $this->view = new ApiView();
        }

        function getAutos($params = null){
            $autos = $this->model->getAutos();
            return $this->view->response($autos, 200);
        }

        function getAuto($params = null){
            $idAuto = $params[":ID"];
            $auto = $this->model->getAuto($idAuto);
            if($auto){
                return $this->view->response($auto, 200);
            }else{
                return $this->view->response("El automovil ($idAuto) no se encuentra en la base de datos", 404);
            }
        }

        function deleteAuto($params = null){
            $idAuto = $params[":ID"];
            $auto = $this->model->getAuto($idAuto);

            if($auto){
                $auto = $this->model->deleteAuto($idAuto);
                return $this->view->response("El auto ($idAuto) fue eliminado", 200);
            }else{
                return $this->view->response("El auto ($idAuto) no fue encontrado", 404);
            }
        }

        function addAuto($params = null){
            $body = $this->getBody();

            $id = $this->model->addAuto($body->Modelo, $body->Pais_de_origen, $body->Motor, $body->Peso, $body->Traccion, $body->Tipo_de_carroceria, $body->Potencia, $body->Velocidad_maxima, $body->Combustible, $body->Precio);
            if($id != 0){
                return $this->view->response("Se agrego un nuevo auto ($id)", 201);
            }else{
                return $this->view->response("EL nuevo auto no pudo ser agregado", 500);
            }
        }

        private function getBody(){
            $bodyString = file_get_contents("php://input");
            return json_decode($bodyString);
        }

        function updateAuto($params = null){
            $idAuto = $params[":ID"];
            $body = $this->getBody();

            $auto = $this->model->getAuto($idAuto);
            if($auto){
                return $this->model->updateAuto($idAuto, $body->Modelo, $body->Pais_de_origen, $body->Motor, $body->Peso, $body->Traccion, $body->Tipo_de_carroceria, $body->Potencia, $body->Velocidad_maxima, $body->Combustible, $body->Precio);
                return $this->view->response("El auto ($idAuto) fue modificado", 200);
            }else{
                return $this->view->response("El auto ($idAuto) no existe", 404);
            }
        }

    }