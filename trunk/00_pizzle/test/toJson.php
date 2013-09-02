<?php

	class Pizle
	{
		 
		function getConnection(){
			$connectionString =mysql_connect("localhost", "mypaolo", "gusrnr2qlalf");
			mysql_select_db("mypaolo", $connectionString);
			 
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
				$arrayMiddle = array("wr_num"=-->urlencode((int)$rs['wr_num']), "data"=>array());

 				array_push($arrayMiddle['data'], (int)$rs['wr_is_comment'] );
 				array_push($arrayMiddle['data'], (int)$rs['wr_comment_reply'] );				
				array_push($arrayMiddle['data'], (int)$rs['wr_comment'] );
				array_push($arrayMiddle['data'], (int)$rs['summer'] );
				array_push($arrayMiddle['data'], (int)$rs['autumn'] );
				array_push($arrayMiddle['data'], (int)$rs['winter'] );
				 
				array_push($resultArray, $arrayMiddle);
			}
			 
			return $resultArray;
			 
		}
			 
	}
	 
	$Pizle = new Pizle();
	 
	$resultSet = $Pizle->getResultSet( $dao->getConnection(), "SELECT * FROM g4s_write_pzl_list" );
	 
	 
	print_r( urldecode( json_encode( $Pizle->getQuery( $resultSet ) ) ) );

?>