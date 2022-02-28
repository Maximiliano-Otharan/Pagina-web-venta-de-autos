<?php

class AutosModel{

    private $db;

    function __construct(){
        $this->db =new PDO('mysql:host=localhost;'.'dbname=autos;charset=utf8', 'root', '');        
    }

    function getAutos(){
        $sentencia = $this->db->prepare("SELECT * FROM autosdisp");
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

    function deleteAuto($id){
        $sentencia = $this->db->prepare("DELETE FROM autosdisp WHERE Id=?");
        $sentencia->execute(array($id));
    }

    function addAuto($Modelo, $Pais_de_origen, $Motor, $Peso, $Traccion, $Tipo_de_carroceria, $Potencia, $Velocidad_maxima, $Combustible, $Precio){
        $sentencia = $this->db->prepare("INSERT INTO autosdisp(`Modelo`, `Pais_de_origen`, `Motor`, `Peso`, `Traccion`, `Tipo_de_carroceria`, `Potencia`, `Velocidad_maxima`, `Combustible`, `Precio`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $sentencia->execute(array($Modelo, $Pais_de_origen, $Motor, $Peso, $Traccion, $Tipo_de_carroceria, $Potencia, $Velocidad_maxima, $Combustible, $Precio));
        return $this->db->lastInsertId();
    }

    function updateAuto($id, $Modelo, $Pais_de_origen, $Motor, $Peso, $Traccion, $Tipo_de_carroceria, $Potencia, $Velocidad_Maxima, $Combustible, $Precio){
        $sentencia = $this->db->prepare("UPDATE autosdisp SET Modelo = ?, Pais_de_origen = ?, Motor = ?, Peso = ?, Traccion = ?, Tipo_de_carroceria = ?, Potencia = ?, Velocidad_Maxima = ?, Combustible = ?, Precio = ? WHERE Id = ?");
        $sentencia->execute(array($Modelo, $Pais_de_origen, $Motor, $Peso, $Traccion, $Tipo_de_carroceria, $Potencia, $Velocidad_Maxima, $Combustible, $Precio, $id));
    }
}