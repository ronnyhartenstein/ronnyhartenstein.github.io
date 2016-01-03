---
layout: post
status: publish
published: true
title: Daten-Migration von Strato ePages zu OXID eShop CE [Update]
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: "Wer die Aufgabe hat alle Daten von einen Strato ePages Webshop oder Onlineshop
  zu OXID eShop CE (Community Edition) zu migrieren, wird feststellen, dass man dazu
  kaum Infos im Netz finden kann. Auch im OXID Forum findet man nur Fragen aber keine
  Antworten. Wer nicht Knowhow einkaufen m&ouml;chte kann selbst aktiv werden.\r\n\r\n<span
  style=\"color: #ff0000;\"><strong>Update:<&#47;strong><&#47;span> Das Script unterst&uuml;tzt
  nun ArtikelVarianten und splittet die SQLs in mehrere Teile auf. <a href=\"#update1\">Mehr
  dazu im Text<&#47;a>.\r\n\r\nEs gibt folgende Ans&auml;tze:\r\n<ol>\r\n\t<li>OXIDs
  eigener Import-Assisten<&#47;li>\r\n\t<li>Migration &uuml;ber anderes Shopsystem
  wie Magento<&#47;li>\r\n\t<li>Eigenes Migrationsscript<&#47;li>\r\n<&#47;ol>\r\n"
wordpress_id: 229
wordpress_url: http://rh-flow.de/?p=229
date: '2012-03-31 09:09:18 +0200'
date_gmt: '2012-03-31 07:09:18 +0200'
categories:
- PHP
- OXID
tags:
- OXID
- Migration
- Import
- SQL
- eShop
---
<p>Wer die Aufgabe hat alle Daten von einen Strato ePages Webshop oder Onlineshop zu OXID eShop CE (Community Edition) zu migrieren, wird feststellen, dass man dazu kaum Infos im Netz finden kann. Auch im OXID Forum findet man nur Fragen aber keine Antworten. Wer nicht Knowhow einkaufen m&ouml;chte kann selbst aktiv werden.</p>
<p><span style="color: #ff0000;"><strong>Update:<&#47;strong><&#47;span> Das Script unterst&uuml;tzt nun ArtikelVarianten und splittet die SQLs in mehrere Teile auf. <a href="#update1">Mehr dazu im Text<&#47;a>.</p>
<p>Es gibt folgende Ans&auml;tze:</p>
<ol>
<li>OXIDs eigener Import-Assisten<&#47;li>
<li>Migration &uuml;ber anderes Shopsystem wie Magento<&#47;li>
<li>Eigenes Migrationsscript<&#47;li><br />
<&#47;ol><br />
<a id="more"></a><a id="more-229"></a></p>
<h2>OXID eShop build-in Import-Assistenten<&#47;h2><br />
OXID eShop CE bringt von Haus aus einen Import&#47;Export-Assistenten mit.</p>
<p>Hier eine kleine &Uuml;bersicht wie fummelig das ganze ist:</p>
<p><strong>Schritt 1 - CSV-Datei hochladen<&#47;strong></p>
<p><a href="http:&#47;&#47;cms.rh-flow.de&#47;wp-content&#47;uploads&#47;oxid_import_1.jpg"><img class="size-full wp-image-260 alignnone" src="http:&#47;&#47;cms.rh-flow.de&#47;wp-content&#47;uploads&#47;oxid_import_1.jpg" alt="" width="644" height="233" &#47;><&#47;a></p>
<p><strong>Schritt 2: Felder zuordnen<&#47;strong></p>
<p><a href="http:&#47;&#47;cms.rh-flow.de&#47;wp-content&#47;uploads&#47;oxid_import_2.png"><img class="size-full wp-image-261 alignnone" src="http:&#47;&#47;cms.rh-flow.de&#47;wp-content&#47;uploads&#47;oxid_import_2.png" alt="" width="254" height="239" &#47;><&#47;a></p>
<p>Bei den &uuml;ber 20 Feldern artet das ganz sch&ouml;n aus - und weitergehend umkonfigurieren kann man es leider auch nicht.</p>
<h2>Idee: Zwischenschritt &uuml;ber anderes gro&szlig;es Shopsystem<&#47;h2><br />
Vielleicht unterst&uuml;tzten andere gro&szlig;e Shopsysteme wie Magento od. Shopware einen direkten Import der CSV-Export-Dateien von Stratos ePages Webshop? Durch die noch gr&ouml;&szlig;eren Communitys lag der Gedanke nahe. Aber auch da: keine Infos od. konkrete Ans&auml;tze sind zu finden.</p>
<h2 style="text-align: left;">L&ouml;sung: Eigenes Migrationsscript f&uuml;r h&ouml;chste Customiziung-Anspr&uuml;che<&#47;h2><br />
Also blieb nur "selbermachen"....</p>
<p><span style="color: #993300;"><strong>Folgender Ansatz:<&#47;strong> Ein PHP-Script leitet aus den CSV-Daten &uuml;ber&nbsp; ein Regelwerk und Umformungen die entsprechenden SQL-Statements ab. Diese werden dann direkt in die Datenbank gekippt.<&#47;span></p>
<p><em>Hinweis<&#47;em>: Es werden REPLACE INTO Statements statt INSERT INTO verwendet, damit man diese auch mehrfach (f&uuml;r Tests) ausf&uuml;hren kann.</p>
<p>Das vollst&auml;ndige PHP-Script: <a title="Migrations-Script Strato zu OXID eShop CE" href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;OXID-Migration-from-Strato&#47;blob&#47;master&#47;version1&#47;migration.php" target="_blank">migration.php<&#47;a> (bei GitHub gehostet)</p>
<p>Das Script ist als CLI-Variante ausgelegt. Daher folgende Aufruf-Parameter:</p>
<p>[code light="true"]<br />
migraton.php ["table"] ["source.csv"] ["output.sql"] [update]<br />
&nbsp;&nbsp; &nbsp;table: oxarticles | oxobject2category | oxcategories | oxuser<br />
&nbsp;&nbsp; &nbsp;source.csv: e.g.. "Kategorie-Produkt-Zuweisung.csv"<br />
&nbsp;&nbsp; &nbsp;output.sql: e.g. "oxobject2category.sql"<br />
&nbsp;&nbsp; &nbsp;update: just "update" - force UPDATE-SQL-statements instead of REPLACE-INTO<br />
[&#47;code]</p>
<p>Wird es ohne Parameter aufgerufen greifen automatisch die Standard-Dateinamen von Strato zusammen mit den OXID-Tabellennamen.</p>
<p>[code language="php"]<br />
$list = array(<br />
&nbsp;&nbsp; &nbsp;'oxarticles' => 'Produkte'.($test?'_test':'').'.csv',<br />
&nbsp;&nbsp; &nbsp;'oxobject2category' => 'Kategorie-Produkt-Zuweisung'.($test?'_test':'').'.csv',<br />
&nbsp;&nbsp; &nbsp;'oxcategories' => 'Inhalt__Kategorien__Seiten'.($test?'_test':'').'.csv',<br />
&nbsp;&nbsp; &nbsp;'oxuser' => 'Kunden'.($test?'_test':'').'.csv',<br />
);<br />
[&#47;code]</p>
<p>Konzeptionell wird je Tabelle ein Key-Value-Hash definiert, in dem je Key (OXID-Tabelle-Feldname) ein Value mit Platzhaltern f&uuml;r die Daten aus der CSV aufgebaut wird. Am Beispiel vom oxarticles sieht man wie das Mapping generell geregelt ist.</p>
<p>[code language="php"]<br />
<?php<br />
public function oxarticles()<br />
{<br />
    $csv = $this->_getCSV();<br />
    $rows = $csv->getRows();<br />
    $n = 0;<br />
    $map = array(<br />
        'OXID' => 'MD5("#Alias#")',<br />
        'OXSHOPID' => '"oxbaseshop"',<br />
        'OXARTNUM' => '"#Alias#"',<br />
        'OXTITLE' => '"#Name&#47;de#"',<br />
        'OXSHORTDESC' => '"#Description&#47;de#"',<br />
        'OXPRICE' => '"#ListPrices&#47;EUR&#47;gross#"',<br />
        'OXACTIVE' => '#IsVisible#',<br />
        'OXPIC1' => '"#ImageLarge#"',<br />
        &#47;&#47; OXPIC2-7 -> ImagesSlideShowString -> per Zusatzcode..<br />
        &#47;&#47;'OXPRICEC' => '#ManufacturerPrices&#47;EUR&#47;gross#', &#47;&#47; wird nicht mehr gepflegt<br />
        'OXSTOCK' => '#StockLevel#',<br />
        'OXLENGTH' => '#Length#',<br />
        'OXHEIGHT' => '#Height#',<br />
        'OXWIDTH' => '#Width#',<br />
        'OXWEIGHT' => '#Weight#',<br />
        'OXSORT' => '#Position#',<br />
        'OXMPN' => '#ManufacturerSKU#',<br />
        &#47;&#47; Text&#47;de -> oxartextends.oxlongdesc -> per Zusatzcode<br />
        'OXVARNAME' => '"#SelectedVariations#"',<br />
    );<br />
    $map_longdesc = array(<br />
        'OXID' => 'MD5("#Alias#")',<br />
        'OXLONGDESC' => '"#Text&#47;de#"',<br />
    );<br />
    foreach ($rows as $row) {<br />
        $row = $this->_convertRowKeys($row);<br />
        $n++;<br />
        &#47;&#47;print "n".str_repeat("-",80);<br />
        print "nprocess row $n ..";<br />
        &#47;&#47;print_r($row);<br />
        $map_curr = $map;<br />
        &#47;&#47; Zusatzbilder<br />
        $pics = split(";", $row['ImagesSlideShowString']);<br />
        &#47;&#47;print_r($pics);<br />
        $has_pics = false;<br />
        for ($i = 2; $i<=7; $i++) {<br />
            if (!empty($pics[$i - 2])) {<br />
                if (strtolower($pics[$i - 2]) !== $pics[$i - 2]) {<br />
                    print "nWARN: Please rename ".$pics[$i - 2]." to LOWERCASE! OxidShop have problems with mixed case filenames!";<br />
                }<br />
                $map_curr['OXPIC' . $i] = '"'.strtolower($pics[$i - 2]).'"';<br />
                $has_pics = true;<br />
            }<br />
        }<br />
        &#47;*&#47;&#47; nur Bilder migrieren? dann aktivieren<br />
        if (!$has_pics) {<br />
            continue;<br />
        }*&#47;</p>
<p>        &#47;&#47; Hersteller mit in Kurzbeschreibung<br />
        if (!empty($row['Manufacturer'])) {<br />
            $map_curr['OXSHORTDESC'] = 'CONCAT("#Description&#47;de#"," ","#Manufacturer#")';<br />
        }<br />
        &#47;&#47; Parent..<br />
        $row['SuperProduct'] = trim($row['SuperProduct']);<br />
        if (!empty($row['SuperProduct'])) {<br />
            $map_curr['OXPARENTID'] = 'MD5("#SuperProduct#")';<br />
        }</p>
<p>        &#47;&#47; SQL erzeugen<br />
        $sql = $this->_sql($this->_tab, $map_curr, $row);<br />
        &#47;&#47;print "n". $sql;</p>
<p>        &#47;&#47; lange Artikelbeschreibung<br />
        $sql = $this->_sql("oxartextends", $map_longdesc, $row);<br />
        &#47;&#47;print "n". $sql;</p>
<p>        &#47;&#47; nur leere Felder aktualisieren<br />
        &#47;&#47;$sql = $this->_sqlUpdateIfEmpty($this->_tab, $map_curr, $row);<br />
        &#47;&#47;print "n". implode("n",$sql);</p>
<p>    }<br />
}<br />
[&#47;code]</p>
<p>&Uuml;ber die Funktion _sql wird dann die SQL aufgebaut und auch gleich in die SQL-Output-Datei geschrieben.<br />
[code language="php"]<br />
<?php<br />
protected function _sql($_tab, $_map, $_data)<br />
{<br />
    $sets = array();<br />
    $oxid = 0;<br />
    foreach ($_map as $k => $v) {<br />
        $v = $this->_replacePlaceholderForSql($v, $_data);<br />
        if ($this->_update &amp;&amp; $k == 'OXID') {<br />
            $oxid = $v;<br />
        } else {<br />
            $sets[] = $k . " = " . (empty($v) ? "0" : $v);<br />
        }<br />
    }<br />
    if ($this->_update) {<br />
        if (!empty($oxid)) {<br />
            $sql = "UPDATE " . $_tab . " SET " . join(", ", $sets) . " WHERE OXID=" . $oxid;<br />
        } else {<br />
            $sql = "# OXID MISSING! .. UPDATE " . $_tab . " SET " . join(", ", $sets) . " ???";<br />
        }<br />
    } else {<br />
        $sql = "REPLACE INTO " . $_tab . " SET " . join(", ", $sets);<br />
    }<br />
    file_put_contents($this->_sqlout, $sql . ";\n", FILE_APPEND);<br />
    return $sql;<br />
}<br />
[&#47;code]<br />
Die Platzhalter in den Value-Definitionen wird &uuml;ber die Fkt. _replacePlaceholderForSql ersetzt.<br />
[code language="php"]<br />
protected function _replacePlaceholderForSql($_val, $_data)<br />
{<br />
    while (preg_match('&#47;#([a-zA-Z0-9&#47;.]+?)#&#47;',$_val,$m)) {<br />
        $tmp_key = $m[1];<br />
        $tmp_val = $_data[$tmp_key];<br />
        &#47;&#47; Flie&szlig;kommazahlen korrigieren: 10,50 -&amp;gt; 10.50<br />
        if (preg_match('&#47;^(d+),(d+)$&#47;', $tmp_val, $m)) {<br />
            $tmp_val = $m[1] . '.' . $m[2];<br />
        }<br />
        $_val = str_replace('#'.$tmp_key.'#', mysql_real_escape_string($tmp_val), $_val);<br />
    }<br />
    return $_val;<br />
}<br />
[&#47;code]<br />
Als Ergebnis schreibt das Script SQL-Output-Dateien, die z.B. bei oxarticles folgenden Inhalt haben.<br />
[code language="mysql"]<br />
REPLACE INTO oxarticles SET OXID = MD5("TS_3922"), OXARTNUM = "TS_3922", OXTITLE = "Test 1", OXSHORTDESC = "",<br />
     OXPRICE = "54.9", OXACTIVE = 1, OXPIC1 = "test1.jpg", OXSTOCK = 1, OXLENGTH = 0, OXHEIGHT = 0, OXWIDTH = 0,<br />
     OXWEIGHT = 1, OXSORT = 0, OXMPN = 0, OXVARNAME = "";<br />
REPLACE INTO oxartextends SET OXID = MD5("TS_3922"), OXLONGDESC = "&amp;lt;p&amp;gt;Eine lange Beschreibung zum Artikel&amp;lt;&#47;p&amp;gt;";<br />
REPLACE INTO oxarticles SET OXID = MD5("TS_2289"), OXARTNUM = "TS_2289", OXTITLE = "Test 2", OXSHORTDESC = "",<br />
     OXPRICE = "3.49", OXACTIVE = 1, OXPIC1 = "test2.jpg", OXSTOCK = 3, OXLENGTH = 0, OXHEIGHT = 0, OXWIDTH = 0,<br />
     OXWEIGHT = 0, OXSORT = 10, OXMPN = 0, OXVARNAME = "";<br />
REPLACE INTO oxartextends SET OXID = MD5("TS_2289"), OXLONGDESC = "&amp;lt;p&amp;gt;Mein Testartikel.&amp;lt;&#47;p&amp;gt;";<br />
[&#47;code]</p>
<h2><a name="update1"><&#47;a><span style="color: #ff0000;">Update:<&#47;span> Attribute- und Varianten-Migration, SQL-Splitting, Lieferzeiten<&#47;h2><br />
Im Rahmen eines Migrations-Auftragen wurde das Script t&uuml;chtig weiterentwickelt. Nun werden aus Strato Artikel-Attributen die &auml;quivalenten Artikel-Varianten abgeleitet. Das Kategorie-Parsing wurde zuende gef&uuml;hrt - inkl. Kategorie-Bild. Lieferzeiten werden nun auch &uuml;bernommen.</p>
<p>Die Version 2 des Migrations-Scriptes findet ihr in meinem GitHub-Repository <a title="Migrations-Script Version 2 f&uuml;r Strato zu OXID eShop CE" href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;OXID-Migration-from-Strato&#47;tree&#47;master&#47;version2" target="_blank">OXID-Migration-from-Strato<&#47;a>.</p>
<p><strong>Migration von Artikel-Attributen zu Varianten<&#47;strong></p>
<p>Es werden nun aus Artikel-Attributen Varianten gezogen. Dies kann &uuml;ber das Klassen-Property $_attributes gesteuert werden. Es gilt: <em>titel<&#47;em> = Attribut-Name,&nbsp; <em>cols<&#47;em> = Attribut-Spalten-Namen in Artikel CSV.</p>
<p>Beispiel:<br />
[code language="php"]<br />
protected $_attributes = array(<br />
    array(<br />
        'titel' =&amp;gt; 'Gr&ouml;&szlig;e',<br />
            'cols' =&amp;gt; array('Gr&ouml;&szlig;e&#47;Gr&ouml;&szlig;e','Art&#47;Gr&ouml;&szlig;e'),<br />
        ),<br />
        array(<br />
            'titel' =&amp;gt; 'Art',<br />
            'cols' =&amp;gt; array('Art&#47;Art','Typ&#47;Art'),<br />
        ),<br />
        array(<br />
            'titel' =&amp;gt; 'Schaft',<br />
            'cols' =&amp;gt; array('Art&#47;Schaft'),<br />
        ),<br />
..<br />
[&#47;code]<br />
Die Erstellung erfolgt in&nbsp;<code>_oxarticlesProcessAttributes()<&#47;code> und <code>_createAttributes()<&#47;code><br />
[code language="php"]<br />
 protected function _createAttributes()<br />
{<br />
    foreach ($this->_attributes as $attr) {<br />
        $sets = array(<br />
            "OXID = MD5('" . $attr['titel'] . "')",<br />
            "OXTITLE = '" . $attr['titel'] . "'",<br />
            "OXTITLE_1 = '" . $attr['titel'] . "'",<br />
            "OXSHOPID = 'oxbaseshop'",<br />
        );<br />
        $sql = "REPLACE INTO oxattribute SET " . join(", ", $sets);<br />
        file_put_contents($this->_sqlout, $sql . ";n", FILE_APPEND);<br />
        print "n$sql";<br />
    }<br />
}<br />
[&#47;code]</p>
<p>[code language="php"]<br />
protected function _oxarticlesProcessAttributes($row)<br />
{<br />
    $map = array(<br />
        'OXID' => 'MD5(CONCAT("#$col#","#Alias#"))', &#47;&#47; $col + #Alias#<br />
        'OXATTRID' => 'MD5("#$attr[titel]#")', &#47;&#47; $attr['titel']<br />
        'OXOBJECTID' => 'MD5("#Alias#")',<br />
        'OXVALUE' => '"#$col#"',<br />
    );<br />
    $varname = '';<br />
    foreach ($this->_attributes as $attr) {<br />
        foreach ($attr['cols'] as $col) {<br />
            &#47;&#47;print "n attr $col? ".(!empty($row[$col])?1:0);<br />
            if (!empty($row[$col])) {<br />
                $map_curr = $map;<br />
                $map_curr['OXID'] = 'MD5(CONCAT("#' . $col . '#","#Alias#"))';<br />
                $map_curr['OXATTRID'] = 'MD5("' . $attr['titel'] . '")';<br />
                $map_curr['OXVALUE'] = '"#' . $col . '#"';<br />
                $sql = $this->_sql('oxobject2attribute', $map_curr, $row);<br />
                &#47;&#47;print "n". $sql;<br />
                $varname .= (!empty($varname) ? ' | ' : '') . $row[$col];<br />
            }<br />
        }<br />
    }<br />
    return $varname;<br />
}<br />
[&#47;code]<br />
<strong>SQL-Datei-Splitting<&#47;strong></p>
<p>Da die SQLs bei umfangreichen Artikelbest&auml;nden entsprechend gro&szlig; werden, m&uuml;ssen diese f&uuml;r den bequemen Import via phpMyAdmin gesplittet werden. Hier ist der klar im Vorteil, der direkt in die DB per Kommandozeile sp&uuml;len kann. Konnte ich leider nicht, weil der OXID-Ziel-Shop auch bei Strato gehostet wird.</p>
<p>Konfiguration f&uuml;r das Splitting:<br />
[code language="php"]<br />
..<br />
protected $_splitsize = 1024; &#47;&#47; kb<br />
protected $_splitnum = 1;<br />
..<br />
[&#47;code]<br />
&nbsp;</p>
<p><em><strong>Viel Spa&szlig; beim Ausprobieren und Verwenden!<&#47;strong><br />
Wer einigerma&szlig;en fit in PHP ist wird sich schnell reinfinden und kann das Script auch f&uuml;r andere Quell-Shopsysteme umbauen.<br />
Gern k&ouml;nnt ihr mir diese dann zuschicken und ich ver&ouml;ffentlich sie hier.<&#47;em></p>
<h2>Zusatz: Variante f&uuml;r nachtr&auml;gliches Bildernamen migrieren<&#47;h2><br />
<strong>Problem<&#47;strong>: Bildnamen m&uuml;ssen in OXID eShop in Kleinschreibung sein, da sie sonst a) nicht erkannt und b) beim Speichern eines Artikels auch gel&ouml;scht werden.</p>
<p>L&ouml;sung: <a title="Migrations-Script f&uuml;r Bilder f&uuml;r Strato zu OXID eShop CE" href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;OXID-Migration-from-Strato&#47;blob&#47;master&#47;version1&#47;migration_pics.php" target="_blank">migration_pics.php<&#47;a> und <a title="Schreibt Bildnamen auf Kleinschreibung um" href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;OXID-Migration-from-Strato&#47;blob&#47;master&#47;version1&#47;files_to_lower.php" target="_blank">files_to_lower.php<&#47;a></p>
<p>Das migrations-Script ist eine leicht modifizierte Variante vom Originalscript und erzeugt UPDATE-Statements je PIC und je Artikel. Das Ergebnis sind dann SQLs wie folgt.<br />
[code language="mysql"]<br />
UPDATE oxarticles SET OXPIC3 = "rotgrosskomp.jpg" WHERE (OXPIC3 = '' OR OXPIC3 IS NULL) AND OXID=MD5("K_64597");<br />
UPDATE oxarticles SET OXPIC4 = "rotkomp.jpg" WHERE (OXPIC4 = '' OR OXPIC4 IS NULL) AND OXID=MD5("K_64597");<br />
UPDATE oxarticles SET OXPIC2 = "indioschwarzblaukomp.jpg" WHERE (OXPIC2 = '' OR OXPIC2 IS NULL)<br />
    AND OXID=MD5("K_64597-0001");<br />
[&#47;code]<br />
Platziert die files_to_lower.php im Verz. <code>.&#47;out&#47;pictures&#47;master&#47;product<&#47;code><br />
Ruft diese via Browser auf <code>http:&#47;&#47;deinshop.tld&#47;out&#47;pictures&#47;master&#47;product&#47;files_to_lower.php<&#47;code><br />
Alle Bildnamen mit Gro&szlig;buchstaben werden in Kleinschreibweise umbenannt.</p>
<p>Anschlie&szlig;en platziert die migration_pics.php in euern Migrations-Verz. mit den ganzen CSVs die ihr von Strato exportiert habt.<br />
Dann folgender Aufruf:<br />
[code language="bash"]<br />
php migration_pics.php oxarticles Produkte.csv oxarticles_Produkte.sql update<br />
[&#47;code]</p>
