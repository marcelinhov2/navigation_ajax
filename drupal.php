<?php
    $controller = $_GET[ "controller" ];
    $action = $_GET[ "action" ];
    $params = $_GET[ "params" ];
?>

<div id="header_content">
    Teste <?php echo $params; ?> Header: Lorem ipsum duo causae utroque propriae ne, cu tota saperet suscipiantur usu. Propriae facilisi ne per, diam vide voluptaria ex his. No eum tantas civibus appareat. Eos eu stet solum aliquyam, aeterno facilisis quaerendum no nec.
</div>

<?php
    if( rand( 0, 10 ) % 2 == 0 )
    {
?>

<div id="content">
    Teste <?php echo $params; ?> Content: Mei ei appellantur necessitatibus, ferri facilisis te nec. Commodo incorrupte pro at. Tantas audire duo ei, vis modo affert disputationi in. Sed ad graeci hendrerit voluptaria, ei duis incorrupte eos.
    <br /><br />
    Nulla disputationi ad mea. Aliquip dignissim ut eum, id cum illud feugait apeirian, eu duo erat choro. Ei pri convenire explicari deseruisse, veritus appareat delicatissimi eu nec. Nusquam imperdiet liberavisse mel ad. Quo eu soleat insolens, est ex modus tantas reprimique.
</div>

<?php
    }
?>