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
<p>Wer die Aufgabe hat alle Daten von einen Strato ePages Webshop oder Onlineshop zu OXID eShop CE (Community Edition) zu migrieren, wird feststellen, dass man dazu kaum Infos im Netz finden kann. Auch im OXID Forum findet man nur Fragen aber keine Antworten. Wer nicht Knowhow einkaufen möchte kann selbst aktiv werden.</p>

<!--more-->

<p><span style="color: #ff0000;"><strong>Update:</strong></span> Das Script unterstützt nun ArtikelVarianten und splittet die SQLs in mehrere Teile auf. <a href="#update1">Mehr dazu im Text</a>.</p>
<p>Es gibt folgende Ansätze:</p>
<ol>
<li>OXIDs eigener Import-Assisten</li>
<li>Migration über anderes Shopsystem wie Magento</li>
<li>Eigenes Migrationsscript</li>
</ol>
<p><span id="more-229"></span></p>
<h2>OXID eShop build-in Import-Assistenten</h2>
<p>OXID eShop CE bringt von Haus aus einen Import/Export-Assistenten mit.</p>
<p>Hier eine kleine Übersicht wie fummelig das ganze ist:</p>
<p><strong>Schritt 1 – CSV-Datei hochladen</strong></p>
<p><a href="http://cms.rh-flow.de/wp-content/uploads/oxid_import_1.jpg"><img class="size-full wp-image-260 alignnone" src="http://cms.rh-flow.de/wp-content/uploads/oxid_import_1.jpg" alt="" width="644" height="233"></a></p>
<p><strong>Schritt 2: Felder zuordnen</strong></p>
<p><a href="http://cms.rh-flow.de/wp-content/uploads/oxid_import_2.png"><img class="size-full wp-image-261 alignnone" src="http://cms.rh-flow.de/wp-content/uploads/oxid_import_2.png" alt="" width="254" height="239"></a></p>
<p>Bei den über 20 Feldern artet das ganz schön aus – und weitergehend umkonfigurieren kann man es leider auch nicht.</p>
<h2>Idee: Zwischenschritt über anderes großes Shopsystem</h2>
<p>Vielleicht unterstützten andere große Shopsysteme wie Magento od. Shopware einen direkten Import der CSV-Export-Dateien von Stratos ePages Webshop? Durch die noch größeren Communitys lag der Gedanke nahe. Aber auch da: keine Infos od. konkrete Ansätze sind zu finden.</p>
<h2 style="text-align: left;">Lösung: Eigenes Migrationsscript für höchste Customiziung-Ansprüche</h2>
<p>Also blieb nur „selbermachen“….</p>
<p><span style="color: #993300;"><strong>Folgender Ansatz:</strong> Ein PHP-Script leitet aus den CSV-Daten über&nbsp; ein Regelwerk und Umformungen die entsprechenden SQL-Statements ab. Diese werden dann direkt in die Datenbank gekippt.</span></p>
<p><em>Hinweis</em>: Es werden REPLACE INTO Statements statt INSERT INTO verwendet, damit man diese auch mehrfach (für Tests) ausführen kann.</p>
<p>Das vollständige PHP-Script: <a title="Migrations-Script Strato zu OXID eShop CE" href="https://github.com/ronnyhartenstein/OXID-Migration-from-Strato/blob/master/version1/migration.php" target="_blank">migration.php</a> (bei GitHub gehostet)</p>
<p>Das Script ist als CLI-Variante ausgelegt. Daher folgende Aufruf-Parameter:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">migraton.php ["table"] ["source.csv"] ["output.sql"] [update]
    table: oxarticles | oxobject2category | oxcategories | oxuser
    source.csv: e.g.. "Kategorie-Produkt-Zuweisung.csv"
    output.sql: e.g. "oxobject2category.sql"
    update: just "update" - force UPDATE-SQL-statements instead of REPLACE-INTO</code></pre>
<p>Wird es ohne Parameter aufgerufen greifen automatisch die Standard-Dateinamen von Strato zusammen mit den OXID-Tabellennamen.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">$list = array(
    'oxarticles' =&gt; 'Produkte'.($test?'_test':'').'.csv',
    'oxobject2category' =&gt; 'Kategorie-Produkt-Zuweisung'.($test?'_test':'').'.csv',
    'oxcategories' =&gt; 'Inhalt__Kategorien__Seiten'.($test?'_test':'').'.csv',
    'oxuser' =&gt; 'Kunden'.($test?'_test':'').'.csv',
);</code></pre>
<p>Konzeptionell wird je Tabelle ein Key-Value-Hash definiert, in dem je Key (OXID-Tabelle-Feldname) ein Value mit Platzhaltern für die Daten aus der CSV aufgebaut wird. Am Beispiel vom oxarticles sieht man wie das Mapping generell geregelt ist.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">&lt;?php
public function oxarticles()
{
    $csv = $this-&gt;_getCSV();
    $rows = $csv-&gt;getRows();
    $n = 0;
    $map = array(
        'OXID' =&gt; 'MD5("#Alias#")',
        'OXSHOPID' =&gt; '"oxbaseshop"',
        'OXARTNUM' =&gt; '"#Alias#"',
        'OXTITLE' =&gt; '"#Name/de#"',
        'OXSHORTDESC' =&gt; '"#Description/de#"',
        'OXPRICE' =&gt; '"#ListPrices/EUR/gross#"',
        'OXACTIVE' =&gt; '#IsVisible#',
        'OXPIC1' =&gt; '"#ImageLarge#"',
        // OXPIC2-7 -&gt; ImagesSlideShowString -&gt; per Zusatzcode..
        //'OXPRICEC' =&gt; '#ManufacturerPrices/EUR/gross#', // wird nicht mehr gepflegt
        'OXSTOCK' =&gt; '#StockLevel#',
        'OXLENGTH' =&gt; '#Length#',
        'OXHEIGHT' =&gt; '#Height#',
        'OXWIDTH' =&gt; '#Width#',
        'OXWEIGHT' =&gt; '#Weight#',
        'OXSORT' =&gt; '#Position#',
        'OXMPN' =&gt; '#ManufacturerSKU#',
        // Text/de -&gt; oxartextends.oxlongdesc -&gt; per Zusatzcode
        'OXVARNAME' =&gt; '"#SelectedVariations#"',
    );
    $map_longdesc = array(
        'OXID' =&gt; 'MD5("#Alias#")',
        'OXLONGDESC' =&gt; '"#Text/de#"',
    );
    foreach ($rows as $row) {
        $row = $this-&gt;_convertRowKeys($row);
        $n++;
        //print "n".str_repeat("-",80);
        print "nprocess row $n ..";
        //print_r($row);
        $map_curr = $map;
        // Zusatzbilder
        $pics = split(";", $row['ImagesSlideShowString']);
        //print_r($pics);
        $has_pics = false;
        for ($i = 2; $i&lt;=7; $i++) {
            if (!empty($pics[$i - 2])) {
                if (strtolower($pics[$i - 2]) !== $pics[$i - 2]) {
                    print "nWARN: Please rename ".$pics[$i - 2]." to LOWERCASE! OxidShop have problems with mixed case filenames!";
                }
                $map_curr['OXPIC' . $i] = '"'.strtolower($pics[$i - 2]).'"';
                $has_pics = true;
            }
        }
        /*// nur Bilder migrieren? dann aktivieren
        if (!$has_pics) {
            continue;
        }*/

        // Hersteller mit in Kurzbeschreibung
        if (!empty($row['Manufacturer'])) {
            $map_curr['OXSHORTDESC'] = 'CONCAT("#Description/de#"," ","#Manufacturer#")';
        }
        // Parent..
        $row['SuperProduct'] = trim($row['SuperProduct']);
        if (!empty($row['SuperProduct'])) {
            $map_curr['OXPARENTID'] = 'MD5("#SuperProduct#")';
        }

        // SQL erzeugen
        $sql = $this-&gt;_sql($this-&gt;_tab, $map_curr, $row);
        //print "n". $sql;

        // lange Artikelbeschreibung
        $sql = $this-&gt;_sql("oxartextends", $map_longdesc, $row);
        //print "n". $sql;

        // nur leere Felder aktualisieren
        //$sql = $this-&gt;_sqlUpdateIfEmpty($this-&gt;_tab, $map_curr, $row);
        //print "n". implode("n",$sql);

    }
}</code></pre>
<p>Über die Funktion _sql wird dann die SQL aufgebaut und auch gleich in die SQL-Output-Datei geschrieben.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">&lt;?php
protected function _sql($_tab, $_map, $_data)
{
    $sets = array();
    $oxid = 0;
    foreach ($_map as $k =&gt; $v) {
        $v = $this-&gt;_replacePlaceholderForSql($v, $_data);
        if ($this-&gt;_update &amp;&amp; $k == 'OXID') {
            $oxid = $v;
        } else {
            $sets[] = $k . " = " . (empty($v) ? "0" : $v);
        }
    }
    if ($this-&gt;_update) {
        if (!empty($oxid)) {
            $sql = "UPDATE " . $_tab . " SET " . join(", ", $sets) . " WHERE OXID=" . $oxid;
        } else {
            $sql = "# OXID MISSING! .. UPDATE " . $_tab . " SET " . join(", ", $sets) . " ???";
        }
    } else {
        $sql = "REPLACE INTO " . $_tab . " SET " . join(", ", $sets);
    }
    file_put_contents($this-&gt;_sqlout, $sql . ";\n", FILE_APPEND);
    return $sql;
}</code></pre>
<p>Die Platzhalter in den Value-Definitionen wird über die Fkt. _replacePlaceholderForSql ersetzt.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">protected function _replacePlaceholderForSql($_val, $_data)
{
    while (preg_match('/#([a-zA-Z0-9/.]+?)#/',$_val,$m)) {
        $tmp_key = $m[1];
        $tmp_val = $_data[$tmp_key];
        // Fließkommazahlen korrigieren: 10,50 -<span class="token entity" title="&gt;">&amp;gt;</span> 10.50
        if (preg_match('/^(d+),(d+)$/', $tmp_val, $m)) {
            $tmp_val = $m[1] . '.' . $m[2];
        }
        $_val = str_replace('#'.$tmp_key.'#', mysql_real_escape_string($tmp_val), $_val);
    }
    return $_val;
}</code></pre>
<p>Als Ergebnis schreibt das Script SQL-Output-Dateien, die z.B. bei oxarticles folgenden Inhalt haben.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">REPLACE INTO oxarticles SET OXID = MD5("TS_3922"), OXARTNUM = "TS_3922", OXTITLE = "Test 1", OXSHORTDESC = "",
     OXPRICE = "54.9", OXACTIVE = 1, OXPIC1 = "test1.jpg", OXSTOCK = 1, OXLENGTH = 0, OXHEIGHT = 0, OXWIDTH = 0,
     OXWEIGHT = 1, OXSORT = 0, OXMPN = 0, OXVARNAME = "";
REPLACE INTO oxartextends SET OXID = MD5("TS_3922"), OXLONGDESC = "<span class="token entity" title="&lt;">&amp;lt;</span>p<span class="token entity" title="&gt;">&amp;gt;</span>Eine lange Beschreibung zum Artikel<span class="token entity" title="&lt;">&amp;lt;</span>/p<span class="token entity" title="&gt;">&amp;gt;</span>";
REPLACE INTO oxarticles SET OXID = MD5("TS_2289"), OXARTNUM = "TS_2289", OXTITLE = "Test 2", OXSHORTDESC = "",
     OXPRICE = "3.49", OXACTIVE = 1, OXPIC1 = "test2.jpg", OXSTOCK = 3, OXLENGTH = 0, OXHEIGHT = 0, OXWIDTH = 0,
     OXWEIGHT = 0, OXSORT = 10, OXMPN = 0, OXVARNAME = "";
REPLACE INTO oxartextends SET OXID = MD5("TS_2289"), OXLONGDESC = "<span class="token entity" title="&lt;">&amp;lt;</span>p<span class="token entity" title="&gt;">&amp;gt;</span>Mein Testartikel.<span class="token entity" title="&lt;">&amp;lt;</span>/p<span class="token entity" title="&gt;">&amp;gt;</span>";</code></pre>
<h2><a name="update1"></a><span style="color: #ff0000;">Update:</span> Attribute- und Varianten-Migration, SQL-Splitting, Lieferzeiten</h2>
<p>Im Rahmen eines Migrations-Auftragen wurde das Script tüchtig weiterentwickelt. Nun werden aus Strato Artikel-Attributen die äquivalenten Artikel-Varianten abgeleitet. Das Kategorie-Parsing wurde zuende geführt – inkl. Kategorie-Bild. Lieferzeiten werden nun auch übernommen.</p>
<p>Die Version 2 des Migrations-Scriptes findet ihr in meinem GitHub-Repository <a title="Migrations-Script Version 2 für Strato zu OXID eShop CE" href="https://github.com/ronnyhartenstein/OXID-Migration-from-Strato/tree/master/version2" target="_blank">OXID-Migration-from-Strato</a>.</p>
<p><strong>Migration von Artikel-Attributen zu Varianten</strong></p>
<p>Es werden nun aus Artikel-Attributen Varianten gezogen. Dies kann über das Klassen-Property $_attributes gesteuert werden. Es gilt: <em>titel</em> = Attribut-Name,&nbsp; <em>cols</em> = Attribut-Spalten-Namen in Artikel CSV.</p>
<p>Beispiel:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">protected $_attributes = array(
    array(
        'titel' =<span class="token entity" title="&gt;">&amp;gt;</span> 'Größe',
            'cols' =<span class="token entity" title="&gt;">&amp;gt;</span> array('Größe/Größe','Art/Größe'),
        ),
        array(
            'titel' =<span class="token entity" title="&gt;">&amp;gt;</span> 'Art',
            'cols' =<span class="token entity" title="&gt;">&amp;gt;</span> array('Art/Art','Typ/Art'),
        ),
        array(
            'titel' =<span class="token entity" title="&gt;">&amp;gt;</span> 'Schaft',
            'cols' =<span class="token entity" title="&gt;">&amp;gt;</span> array('Art/Schaft'),
        ),
..</code></pre>
<p>Die Erstellung erfolgt in&nbsp;<code>_oxarticlesProcessAttributes()</code> und <code>_createAttributes()</code></p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup"> protected function _createAttributes()
{
    foreach ($this-&gt;_attributes as $attr) {
        $sets = array(
            "OXID = MD5('" . $attr['titel'] . "')",
            "OXTITLE = '" . $attr['titel'] . "'",
            "OXTITLE_1 = '" . $attr['titel'] . "'",
            "OXSHOPID = 'oxbaseshop'",
        );
        $sql = "REPLACE INTO oxattribute SET " . join(", ", $sets);
        file_put_contents($this-&gt;_sqlout, $sql . ";n", FILE_APPEND);
        print "n$sql";
    }
}</code></pre>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">protected function _oxarticlesProcessAttributes($row)
{
    $map = array(
        'OXID' =&gt; 'MD5(CONCAT("#$col#","#Alias#"))', // $col + #Alias#
        'OXATTRID' =&gt; 'MD5("#$attr[titel]#")', // $attr['titel']
        'OXOBJECTID' =&gt; 'MD5("#Alias#")',
        'OXVALUE' =&gt; '"#$col#"',
    );
    $varname = '';
    foreach ($this-&gt;_attributes as $attr) {
        foreach ($attr['cols'] as $col) {
            //print "n attr $col? ".(!empty($row[$col])?1:0);
            if (!empty($row[$col])) {
                $map_curr = $map;
                $map_curr['OXID'] = 'MD5(CONCAT("#' . $col . '#","#Alias#"))';
                $map_curr['OXATTRID'] = 'MD5("' . $attr['titel'] . '")';
                $map_curr['OXVALUE'] = '"#' . $col . '#"';
                $sql = $this-&gt;_sql('oxobject2attribute', $map_curr, $row);
                //print "n". $sql;
                $varname .= (!empty($varname) ? ' | ' : '') . $row[$col];
            }
        }
    }
    return $varname;
}</code></pre>
<p><strong>SQL-Datei-Splitting</strong></p>
<p>Da die SQLs bei umfangreichen Artikelbeständen entsprechend groß werden, müssen diese für den bequemen Import via phpMyAdmin gesplittet werden. Hier ist der klar im Vorteil, der direkt in die DB per Kommandozeile spülen kann. Konnte ich leider nicht, weil der OXID-Ziel-Shop auch bei Strato gehostet wird.</p>
<p>Konfiguration für das Splitting:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">..
protected $_splitsize = 1024; // kb
protected $_splitnum = 1;
..</code></pre>
<p>&nbsp;</p>
<p><em><strong>Viel Spaß beim Ausprobieren und Verwenden!</strong><br>
Wer einigermaßen fit in PHP ist wird sich schnell reinfinden und kann das Script auch für andere Quell-Shopsysteme umbauen.<br>
Gern könnt ihr mir diese dann zuschicken und ich veröffentlich sie hier.</em></p>
<h2>Zusatz: Variante für nachträgliches Bildernamen migrieren</h2>
<p><strong>Problem</strong>: Bildnamen müssen in OXID eShop in Kleinschreibung sein, da sie sonst a) nicht erkannt und b) beim Speichern eines Artikels auch gelöscht werden.</p>
<p>Lösung: <a title="Migrations-Script für Bilder für Strato zu OXID eShop CE" href="https://github.com/ronnyhartenstein/OXID-Migration-from-Strato/blob/master/version1/migration_pics.php" target="_blank">migration_pics.php</a> und <a title="Schreibt Bildnamen auf Kleinschreibung um" href="https://github.com/ronnyhartenstein/OXID-Migration-from-Strato/blob/master/version1/files_to_lower.php" target="_blank">files_to_lower.php</a></p>
<p>Das migrations-Script ist eine leicht modifizierte Variante vom Originalscript und erzeugt UPDATE-Statements je PIC und je Artikel. Das Ergebnis sind dann SQLs wie folgt.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">UPDATE oxarticles SET OXPIC3 = "rotgrosskomp.jpg" WHERE (OXPIC3 = '' OR OXPIC3 IS NULL) AND OXID=MD5("K_64597");
UPDATE oxarticles SET OXPIC4 = "rotkomp.jpg" WHERE (OXPIC4 = '' OR OXPIC4 IS NULL) AND OXID=MD5("K_64597");
UPDATE oxarticles SET OXPIC2 = "indioschwarzblaukomp.jpg" WHERE (OXPIC2 = '' OR OXPIC2 IS NULL)
    AND OXID=MD5("K_64597-0001");</code></pre>
<p>Platziert die files_to_lower.php im Verz. <code>./out/pictures/master/product</code><br>
Ruft diese via Browser auf <code>http://deinshop.tld/out/pictures/master/product/files_to_lower.php</code><br>
Alle Bildnamen mit Großbuchstaben werden in Kleinschreibweise umbenannt.</p>
<p>Anschließen platziert die migration_pics.php in euern Migrations-Verz. mit den ganzen CSVs die ihr von Strato exportiert habt.<br>
Dann folgender Aufruf:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">php migration_pics.php oxarticles Produkte.csv oxarticles_Produkte.sql update</code></pre>
