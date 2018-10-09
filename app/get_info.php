<?php

require_once "database_connection.php";
$query = 'select OreType_Name as \'Name\', Oretype_Weight as \'Weight\' from Ore_Type';
$result = mysqli_query($connect, $query);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        $output[] = $row;
    }
    echo json_encode($output);
}

//'select concat(Ore_Name, \' \', OreType_Name) as \'Name\', OreType_Weight as \'Weight\'
//from Ore join Ore_Type where Ore_instanceOf = OreType_ID;'