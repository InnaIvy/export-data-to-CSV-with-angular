<?php
/**
 * Class RMD_EXPORT
 * dev: Inna Plyushch
 * mail: ipl@ciklum.com
 */

class RMD_EXPORT extends RMD{

    /**
     * export_to_csv
     *
     * export directory data to CSV
     *
     * @author    : Inna Plyushch | ipl@ciklum.com
     *
     * @copyright ReviMedia Inc. 2015
     */
    public static function export_to_csv($data) {

        //  variables
        global $wpdb;

        $errors     = 0;
        $messages   = array();
        $heads = array();


        try{

            if( !isset( $data ) ){
                throw new Exception( 'Data is undefined!' );
            }

            $limit = $data->data;


            if(!$limit || $limit == 'all'){
                $filter = '';
            } else{
                $filter = "LIMIT $limit";
            }

            $query = "SELECT name, email, status, category, state, zip, city, phone FROM  `rm_directory` WHERE type != 'puppy' $filter";


            $data_results = $wpdb->get_results($query, ARRAY_A);

            if( empty( $data_results ) ){
                throw new Exception( "We can't found directory by your query!");
            }

            // generated heads for columns
            $tmp = 0;
            foreach( $data_results as $k) if ($tmp++ < 1){
                $heads = array_keys($k);
            }
            $results = json_encode($data_results);

        } catch(Exception $e){
            $errors++;
            $messages[] = $e->getMessage();
        }

        TokensSecurity::sendResponse(array('errors' => $errors, 'messages' => $messages,  'result' => $results, 'heads'=>$heads ));

    }

}