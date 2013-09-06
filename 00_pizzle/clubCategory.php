<?php
	class Dao
	{     
		function getConnection(){
			$connectionString =mysql_connect("localhost", "oceanfog3", "hello1249");
			mysql_select_db("oceanfog3", $connectionString);
			 
			return $connectionString;  
		}
		 
		public function getResultSet($connection, $query){
			$result = mysql_query($query);
			mysql_close($connection);
			 
			return $result;
		}
		 
	 
		 
		public function getQuery( $resultSet  ){
			$resultArray = array();
			while( $rs = mysql_fetch_array( $resultSet ) ){
				$arrayMiddle = array("year"=-->urlencode($rs['year']), "data"=>array());
				 
				array_push($arrayMiddle['data'], (int)$rs['spring'] );
				array_push($arrayMiddle['data'], (int)$rs['summer'] );
				array_push($arrayMiddle['data'], (int)$rs['autumn'] );
				array_push($arrayMiddle['data'], (int)$rs['winter'] );
				 
				array_push($resultArray, $arrayMiddle);
			}
			 
			return $resultArray;
			 
		}
			 
	}
	 
	$dao = new Dao();
	 
	$resultSet = $dao->getResultSet( $dao->getConnection(), "SELECT * FROM rainFall" );
	 
	 
	print_r( urldecode( json_encode( $dao->getQuery( $resultSet ) ) ) );
?>