<?php

class CarritoModel{

    private $db;

    function __construct(){
        $this->db =new PDO('mysql:host=localhost;'.'dbname=autos;charset=utf8', 'root', '');        
    }

    function getAutosDelCarrito(){
        $sentencia = $this->db->prepare("SELECT * FROM carrito");
        $sentencia->execute();
        $autos = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $autos;
    }

    function getAuto($id){
        $sentencia = $this->db->prepare("SELECT * FROM autosdisp WHERE Id=?");
        $sentencia->execute(array($id));
        $auto = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $auto;
    }

    function getAutoDelCarrito($id){
        $sentencia = $this->db->prepare("SELECT * FROM carrito WHERE Id=?");
        $sentencia->execute(array($id));
        $auto = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $auto;
    }

    function deleteAutoDelCarrito($id){
        $sentencia = $this->db->prepare("DELETE FROM carrito WHERE Id=?");
        $sentencia->execute(array($id));
    }

    function addAutoAlCarrito($Modelo, $Pais_de_origen, $Precio, $idAuto){
        $sentencia = $this->db->prepare("INSERT INTO carrito(`Modelo`, `Pais_de_origen`, `Precio`, Id_auto_fk) VALUES(?, ?, ?, ?)");
        $sentencia->execute(array($Modelo, $Pais_de_origen, $Precio, $idAuto));
        return $this->db->lastInsertId();
    }
}