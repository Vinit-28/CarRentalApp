<?php

    // Defining Database-Related Constants //
    define("hostName", "@hostName");
    define("userName", "@userName");
    define("password", "*Password*");
    define("databaseName", "#databaseName");


    // Function to get the Database Connection Object //
    function get_DatabaseConnectionObject($dbName=""){
        
        $hostName = constant("hostName");
        $userName = constant("userName");
        $password = constant("password");

        if( $dbName == "" ){
            $dbName = constant("databaseName");
        }

        $databaseConnectionObject = new mysqli($hostName, $userName, $password);
        
        if( $databaseConnectionObject->errno ){
            die($databaseConnectionObject->error);
        }

        $databaseConnectionObject->select_db($dbName);
        return $databaseConnectionObject;
    }

    
    // Function to execute a SQL query and will return the result //
    function runQuery($databaseConnectionObject, $query, $parameterArray, $parameterTypes, $checkAfftectedRows=false){
        
        $stmt = $databaseConnectionObject->prepare($query);
        if( $stmt ){

            if( $parameterTypes != "" ){
                $stmt->bind_param($parameterTypes, ...$parameterArray);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            if( $checkAfftectedRows ) checkAffectedRows($stmt);
            $stmt->close();
            return $result;
        }
        die("STATEMENT ERROR !!!" . $query);
    }


    // Function to get a Column Value From a Database //
    function getColumnValue($databaseConnectionObject, $query, $parameterArray, $parameterTypes, $columnName){

        $result = runQuery($databaseConnectionObject, $query, $parameterArray, $parameterTypes);

        if( $result && $result->num_rows ){
            $row = $result->fetch_assoc();
            foreach($row as $col => $val){
                if( $col == $columnName ) return $val;
            }
        }
        else
            die("COLUMN FETCHING ERROR !!!");
    }


    // Function to check whether the previously executed query has changed the Database or Not //
    function checkAffectedRows($stmt){
        if( $stmt->affected_rows <= 0 ){
            die($stmt->error);
        }
    }
?>